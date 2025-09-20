import React, { useState, useId } from 'react';
import { Modal, Select } from '@moondreamsdev/dreamer-ui/components';
import { join } from '@moondreamsdev/dreamer-ui/utils';
import { ChevronDown } from '@moondreamsdev/dreamer-ui/symbols';
import { timeVariants, roundedVariants, timeDefaults, TimeVariant, TimeRounded } from './variants';
import { useDeviceType, useTimeState, formatTime, parseTimeString } from './hooks';
import { ClockIcon, KeyboardIcon } from './icons';

export interface TimeProps {
  /** Minimum allowed time value */
  minValue?: string;
  /** Maximum allowed time value */
  maxValue?: string;
  /** Time increment in minutes */
  increment?: number;
  /** Use 24-hour format instead of 12-hour with AM/PM */
  use24HourFormat?: boolean;
  /** Default value for uncontrolled component */
  defaultValue?: string;
  /** Controlled value */
  value?: string;
  /** Called when time value changes */
  onChange?: (value: string) => void;
  /** Display variant */
  variant?: TimeVariant;
  /** Border radius */
  rounded?: TimeRounded;
  /** Custom CSS classes */
  className?: string;
  /** Component ID */
  id?: string;
  /** Ref to the container div */
  ref?: React.Ref<HTMLDivElement>;
  /** Placeholder text */
  placeholder?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Error message */
  errorMessage?: string;
}

export function Time({
  minValue,
  maxValue,
  increment = 15,
  use24HourFormat = false,
  defaultValue,
  value,
  onChange,
  variant = timeDefaults.variant,
  rounded,
  className,
  id,
  ref,
  placeholder = 'Select time',
  disabled = false,
  errorMessage,
  ...props
}: TimeProps) {
  const generatedId = useId();
  const activeId = id ?? generatedId;
  
  const { isMobile } = useDeviceType();
  const { currentValue, setValue, timeOptions } = useTimeState({
    defaultValue,
    value,
    onChange,
    increment,
    use24HourFormat,
    minValue,
    maxValue
  });

  // Mobile modal state
  const [showMobileModal, setShowMobileModal] = useState(false);
  const [showInputMode, setShowInputMode] = useState(false);
  const [tempHours, setTempHours] = useState(12);
  const [tempMinutes, setTempMinutes] = useState(0);
  const [tempPeriod, setTempPeriod] = useState<'AM' | 'PM'>('PM');

  // Parse current value for mobile clock display
  React.useEffect(() => {
    const parsed = parseTimeString(currentValue || '', use24HourFormat);
    if (parsed) {
      if (use24HourFormat) {
        setTempHours(parsed.hours);
        setTempMinutes(parsed.minutes);
      } else {
        const displayHours = parsed.hours === 0 ? 12 : parsed.hours > 12 ? parsed.hours - 12 : parsed.hours;
        setTempHours(displayHours);
        setTempMinutes(parsed.minutes);
        setTempPeriod(parsed.hours >= 12 ? 'PM' : 'AM');
      }
    }
  }, [currentValue, use24HourFormat, showMobileModal]);

  // Handle click
  const handleClick = () => {
    if (disabled) return;
    
    if (isMobile) {
      setShowMobileModal(true);
    }
  };

  // Handle mobile time selection
  const handleMobileTimeSelect = () => {
    let finalHours = tempHours;
    
    if (!use24HourFormat) {
      if (tempPeriod === 'AM' && tempHours === 12) finalHours = 0;
      else if (tempPeriod === 'PM' && tempHours !== 12) finalHours = tempHours + 12;
    }

    const timeString = formatTime(finalHours, tempMinutes, use24HourFormat);
    setValue(timeString);
    setShowMobileModal(false);
    setShowInputMode(false);
  };

  // Handle desktop select change
  const handleDesktopSelect = (selectedValue: string) => {
    setValue(selectedValue);
  };

  // Default `round` of `md` for `outline` variant
  let adjustedRound = rounded;
  if (variant === 'outline' && !rounded) {
    adjustedRound = 'md';
  }
  adjustedRound = adjustedRound || timeDefaults.rounded;

  const inputClasses = join(
    timeVariants.base,
    timeVariants[variant],
    roundedVariants[adjustedRound],
    'px-2 py-1',
    'flex items-center justify-between',
    errorMessage && 'data-error',
    className
  );

  // Generate hour options for mobile clock
  const hourOptions = use24HourFormat 
    ? Array.from({ length: 24 }, (_, i) => i)
    : Array.from({ length: 12 }, (_, i) => i + 1);

  const minuteOptions = Array.from({ length: 60 / increment }, (_, i) => i * increment);

  return (
    <div ref={ref} className="relative">
      {/* For Desktop, use Select component */}
      {!isMobile ? (
        <Select
          options={timeOptions}
          value={currentValue}
          onChange={handleDesktopSelect}
          placeholder={placeholder}
          disabled={disabled}
          className={className}
        />
      ) : (
        /* For Mobile, use custom input-like display */
        <div
          id={activeId}
          className={inputClasses}
          onClick={handleClick}
          role="button"
          tabIndex={disabled ? -1 : 0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleClick();
            }
          }}
          data-time-value={currentValue}
          aria-expanded={showMobileModal}
          aria-haspopup="dialog"
          {...props}
        >
          <span className={join(!currentValue && 'text-muted/70')}>
            {currentValue || placeholder}
          </span>
          <ChevronDown size={12} className="ml-2 opacity-70" />
        </div>
      )}

      {/* Mobile Modal */}
      {isMobile && (
        <Modal
          isOpen={showMobileModal}
          onClose={() => {
            setShowMobileModal(false);
            setShowInputMode(false);
          }}
          title="Select Time"
          className="max-w-sm"
        >
          <div className="space-y-6">
            {showInputMode ? (
              /* Input Mode */
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder={use24HourFormat ? "14:30" : "2:30 PM"}
                  value={currentValue}
                  onChange={(e) => setValue(e.target.value)}
                  className="w-full px-3 py-2 text-center text-lg bg-gray-700 border border-gray-600 rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowInputMode(false)}
                    className="flex items-center gap-2 px-3 py-2 text-sm bg-gray-700 hover:bg-gray-600 rounded-md transition-colors text-white"
                  >
                    <ClockIcon size={14} />
                    Clock
                  </button>
                </div>
              </div>
            ) : (
              /* Clock Mode */
              <div className="space-y-6">
                {/* Time Display */}
                <div className="text-center">
                  <div className="text-4xl font-mono font-bold text-primary">
                    {formatTime(
                      use24HourFormat ? tempHours : (tempPeriod === 'AM' && tempHours === 12) ? 0 : (tempPeriod === 'PM' && tempHours !== 12) ? tempHours + 12 : tempHours,
                      tempMinutes,
                      use24HourFormat
                    )}
                  </div>
                </div>

                {/* Time Selectors */}
                <div className="flex justify-center gap-4">
                  {/* Hours */}
                  <div className="text-center">
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      {use24HourFormat ? 'Hour' : 'Hour'}
                    </label>
                    <select
                      value={tempHours}
                      onChange={(e) => setTempHours(parseInt(e.target.value))}
                      className="w-16 px-2 py-1 bg-gray-700 border border-gray-600 rounded text-center text-white"
                    >
                      {hourOptions.map(hour => (
                        <option key={hour} value={hour}>
                          {use24HourFormat ? hour.toString().padStart(2, '0') : hour}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Minutes */}
                  <div className="text-center">
                    <label className="block text-sm font-medium text-gray-400 mb-2">Minutes</label>
                    <select
                      value={tempMinutes}
                      onChange={(e) => setTempMinutes(parseInt(e.target.value))}
                      className="w-16 px-2 py-1 bg-gray-700 border border-gray-600 rounded text-center text-white"
                    >
                      {minuteOptions.map(minute => (
                        <option key={minute} value={minute}>
                          {minute.toString().padStart(2, '0')}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* AM/PM for 12-hour format */}
                  {!use24HourFormat && (
                    <div className="text-center">
                      <label className="block text-sm font-medium text-gray-400 mb-2">Period</label>
                      <select
                        value={tempPeriod}
                        onChange={(e) => setTempPeriod(e.target.value as 'AM' | 'PM')}
                        className="w-16 px-2 py-1 bg-gray-700 border border-gray-600 rounded text-center text-white"
                      >
                        <option value="AM">AM</option>
                        <option value="PM">PM</option>
                      </select>
                    </div>
                  )}
                </div>

                {/* Switch to Input Mode */}
                <div className="flex justify-between items-center pt-4 border-t border-gray-600">
                  <button
                    onClick={() => setShowInputMode(true)}
                    className="flex items-center gap-2 px-3 py-2 text-sm bg-gray-700 hover:bg-gray-600 rounded-md transition-colors text-white"
                  >
                    <KeyboardIcon size={14} />
                    Input
                  </button>
                  
                  <button
                    onClick={handleMobileTimeSelect}
                    className="px-4 py-2 bg-primary hover:bg-primary/85 text-primary-foreground rounded-md transition-colors"
                  >
                    Set Time
                  </button>
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}

      {/* Error Message */}
      {errorMessage && (
        <p className="mt-1 text-sm text-destructive">{errorMessage}</p>
      )}
    </div>
  );
}