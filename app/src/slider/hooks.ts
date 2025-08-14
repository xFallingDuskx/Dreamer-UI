import { useState, useCallback } from 'react';

export interface UseSliderProps {
  /** Initial value */
  defaultValue?: number;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step increment */
  step?: number;
  /** Callback fired when the value changes */
  onValueChange?: (value: number) => void;
}

export interface UseSliderReturn {
  /** Current value */
  value: number;
  /** Function to update the value */
  setValue: (value: number) => void;
  /** Function to increment the value by step */
  increment: () => void;
  /** Function to decrement the value by step */
  decrement: () => void;
  /** Function to reset to default value */
  reset: () => void;
  /** Percentage representation of current value */
  percentage: number;
}

/**
 * Hook for managing slider state and providing utility functions
 */
export function useSlider({
  defaultValue = 0,
  min = 0,
  max = 100,
  step = 1,
  onValueChange,
}: UseSliderProps): UseSliderReturn {
  const [value, setValueState] = useState(defaultValue);

  const clampValue = useCallback((val: number) => {
    return Math.max(min, Math.min(max, Math.round(val / step) * step));
  }, [min, max, step]);

  const setValue = useCallback((newValue: number) => {
    const clampedValue = clampValue(newValue);
    setValueState(clampedValue);
    onValueChange?.(clampedValue);
  }, [clampValue, onValueChange]);

  const increment = useCallback(() => {
    setValue(value + step);
  }, [setValue, value, step]);

  const decrement = useCallback(() => {
    setValue(value - step);
  }, [setValue, value, step]);

  const reset = useCallback(() => {
    setValue(defaultValue);
  }, [setValue, defaultValue]);

  const percentage = ((value - min) / (max - min)) * 100;

  return {
    value,
    setValue,
    increment,
    decrement,
    reset,
    percentage,
  };
}
