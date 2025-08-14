import React, { useState, useRef, useCallback } from 'react';
import { join } from '@moondreamsdev/dreamer-ui/utils';

export interface SliderProps {
  /** Current value of the slider */
  value?: number;
  /** Default value when uncontrolled */
  defaultValue?: number;
  /** Callback fired when the value changes */
  onValueChange?: (value: number) => void;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step increment */
  step?: number;
  /** Whether the slider is disabled */
  disabled?: boolean;
  /** Custom class name for the track element */
  trackClassName?: string;
  /** Custom class name for the range element */
  rangeClassName?: string;
  /** Custom class name for the thumb element */
  thumbClassName?: string;
  /** Custom class name for the root element */
  className?: string;
  /** Ref to the root element */
  ref?: React.Ref<HTMLDivElement>;
  /** ARIA label for accessibility */
  ariaLabel?: string;
  /** ARIA labelledby for accessibility */
  ariaLabelledBy?: string;
}

export default function Slider({
  value,
  defaultValue = 0,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  trackClassName,
  rangeClassName,
  thumbClassName,
  className,
  ref,
  ariaLabel,
  ariaLabelledBy,
  ...props
}: SliderProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const trackRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

  const updateValue = useCallback(
    (newValue: number) => {
      const clampedValue = Math.max(min, Math.min(max, newValue));
      const steppedValue = Math.round(clampedValue / step) * step;

      if (!isControlled) {
        setInternalValue(steppedValue);
      }
      onValueChange?.(steppedValue);
    },
    [min, max, step, isControlled, onValueChange]
  );

  const handlePointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (disabled) return;

      isDraggingRef.current = true;
      event.currentTarget.setPointerCapture(event.pointerId);

      const rect = trackRef.current?.getBoundingClientRect();
      if (!rect) return;

      const percentage = (event.clientX - rect.left) / rect.width;
      const newValue = min + (max - min) * percentage;
      updateValue(newValue);
    },
    [disabled, min, max, updateValue]
  );

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!isDraggingRef.current || disabled) return;

      const rect = trackRef.current?.getBoundingClientRect();
      if (!rect) return;

      const percentage = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
      const newValue = min + (max - min) * percentage;
      updateValue(newValue);
    },
    [disabled, min, max, updateValue]
  );

  const handlePointerUp = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = false;
    event.currentTarget.releasePointerCapture(event.pointerId);
  }, []);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (disabled) return;

      let newValue = currentValue;

      switch (event.key) {
        case 'ArrowRight':
        case 'ArrowUp':
          newValue = currentValue + step;
          break;
        case 'ArrowLeft':
        case 'ArrowDown':
          newValue = currentValue - step;
          break;
        case 'Home':
          newValue = min;
          break;
        case 'End':
          newValue = max;
          break;
        case 'PageUp':
          newValue = currentValue + step * 10;
          break;
        case 'PageDown':
          newValue = currentValue - step * 10;
          break;
        default:
          return;
      }

      event.preventDefault();
      updateValue(newValue);
    },
    [disabled, currentValue, step, min, max, updateValue]
  );

  // Calculate percentage for positioning
  const percentage = ((currentValue - min) / (max - min)) * 100;

  return (
    <div
      ref={ref}
      className={join(
        'relative flex items-center w-full touch-none select-none',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      data-disabled={disabled}
      data-value={currentValue}
      data-min={min}
      data-max={max}
      data-step={step}
      {...props}
    >
      <div
        ref={trackRef}
        className={join(
          'relative h-1.5 w-full rounded-full bg-muted cursor-pointer',
          disabled && 'cursor-not-allowed',
          trackClassName
        )}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        {/* Range (filled portion) */}
        <div
          className={join('absolute h-full rounded-full bg-primary transition-all', rangeClassName)}
          style={{ width: `${percentage}%` }}
        />

        {/* Thumb */}
        <div
          className={join(
            'absolute size-5 -top-2 rounded-full bg-primary border shadow-md cursor-grab transition-all',
            disabled && 'cursor-not-allowed',
            !disabled && 'cursor-grab focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
            isDraggingRef.current && 'cursor-grabbing scale-110',
            thumbClassName
          )}
          style={{ left: `calc(${percentage}% - 10px)` }}
          tabIndex={disabled ? -1 : 0}
          role='slider'
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={currentValue}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          aria-disabled={disabled}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
}
