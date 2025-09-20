import { useState, useEffect, useMemo, useCallback } from 'react';

/**
 * Hook to detect device type for responsive behavior
 */
export function useDeviceType() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const isMobileDevice = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const hasSmallScreen = window.innerWidth <= 768;
      
      setIsMobile(isMobileDevice || (isTouchDevice && hasSmallScreen));
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return { isMobile, isDesktop: !isMobile };
}

/**
 * Time utility functions
 */
export function formatTime(hours: number, minutes: number, use24Hour = false): string {
  if (use24Hour) {
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }
  
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
}

export function parseTimeString(timeString: string, use24Hour = false): { hours: number; minutes: number } | null {
  if (!timeString) return null;

  if (use24Hour) {
    const match = timeString.match(/^(\d{1,2}):(\d{2})$/);
    if (!match) return null;
    const hours = parseInt(match[1], 10);
    const minutes = parseInt(match[2], 10);
    if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) return null;
    return { hours, minutes };
  } else {
    const match = timeString.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
    if (!match) return null;
    let hours = parseInt(match[1], 10);
    const minutes = parseInt(match[2], 10);
    const period = match[3].toUpperCase();
    
    if (hours < 1 || hours > 12 || minutes < 0 || minutes > 59) return null;
    
    if (period === 'AM' && hours === 12) hours = 0;
    if (period === 'PM' && hours !== 12) hours += 12;
    
    return { hours, minutes };
  }
}

export function roundToIncrement(hours: number, minutes: number, increment: number): { hours: number; minutes: number } {
  const totalMinutes = hours * 60 + minutes;
  const roundedMinutes = Math.round(totalMinutes / increment) * increment;
  return {
    hours: Math.floor(roundedMinutes / 60) % 24,
    minutes: roundedMinutes % 60
  };
}

export function getCurrentTime(increment: number = 1): { hours: number; minutes: number } {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  return roundToIncrement(hours, minutes, increment);
}

export function generateTimeOptions(
  minValue?: string,
  maxValue?: string,
  increment: number = 15,
  use24Hour: boolean = false
): { value: string; text: string }[] {
  const options: { value: string; text: string }[] = [];
  
  const minTime = minValue ? parseTimeString(minValue, use24Hour) : { hours: 0, minutes: 0 };
  const maxTime = maxValue ? parseTimeString(maxValue, use24Hour) : { hours: 23, minutes: 59 };
  
  if (!minTime || !maxTime) return options;
  
  const startMinutes = minTime.hours * 60 + minTime.minutes;
  const endMinutes = maxTime.hours * 60 + maxTime.minutes;
  
  for (let totalMinutes = startMinutes; totalMinutes <= endMinutes; totalMinutes += increment) {
    const hours = Math.floor(totalMinutes / 60) % 24;
    const minutes = totalMinutes % 60;
    const timeString = formatTime(hours, minutes, use24Hour);
    
    options.push({
      value: timeString,
      text: timeString
    });
  }
  
  return options;
}

interface UseTimeStateProps {
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  increment?: number;
  use24HourFormat?: boolean;
  minValue?: string;
  maxValue?: string;
}

/**
 * Hook for managing time state (controlled/uncontrolled)
 */
export function useTimeState({
  defaultValue,
  value,
  onChange,
  increment = 15,
  use24HourFormat = false,
  minValue,
  maxValue
}: UseTimeStateProps) {
  // Determine initial value
  const getInitialValue = useCallback(() => {
    if (value !== undefined) return value;
    if (defaultValue !== undefined) return defaultValue;
    
    // Default to current time, rounded to increment
    const currentTime = getCurrentTime(increment);
    return formatTime(currentTime.hours, currentTime.minutes, use24HourFormat);
  }, [value, defaultValue, increment, use24HourFormat]);

  const [internalValue, setInternalValue] = useState(getInitialValue);
  
  // Use controlled value if provided, otherwise use internal state
  const currentValue = value !== undefined ? value : internalValue;
  
  const setValue = useCallback((newValue: string) => {
    // Validate against min/max if provided
    if (minValue || maxValue) {
      const timeObj = parseTimeString(newValue, use24HourFormat);
      if (timeObj) {
        const minObj = minValue ? parseTimeString(minValue, use24HourFormat) : null;
        const maxObj = maxValue ? parseTimeString(maxValue, use24HourFormat) : null;
        
        const totalMinutes = timeObj.hours * 60 + timeObj.minutes;
        
        if (minObj) {
          const minTotalMinutes = minObj.hours * 60 + minObj.minutes;
          if (totalMinutes < minTotalMinutes) return;
        }
        
        if (maxObj) {
          const maxTotalMinutes = maxObj.hours * 60 + maxObj.minutes;
          if (totalMinutes > maxTotalMinutes) return;
        }
      }
    }
    
    if (value === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  }, [value, onChange, minValue, maxValue, use24HourFormat]);

  const timeOptions = useMemo(() => 
    generateTimeOptions(minValue, maxValue, increment, use24HourFormat),
    [minValue, maxValue, increment, use24HourFormat]
  );

  return {
    currentValue,
    setValue,
    timeOptions
  };
}