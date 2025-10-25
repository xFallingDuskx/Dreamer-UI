import React, { useState, useRef, useCallback } from 'react';
import { join } from '../../utils';

export interface SliderProps {
  id?: string;
  /** The controlled value of the slider */
  value?: number;
  /** The initial value of the slider (uncontrolled) */
  defaultValue?: number;
  /** Callback fired when the slider value changes */
  onValueChange?: (value: number) => void;
  /** The minimum value of the slider */
  min?: number;
  /** The maximum value of the slider */
  max?: number;
  /** The step increment of the slider */
  step?: number;
  /** Whether the slider is disabled */
  disabled?: boolean;
  /** Additional CSS classes to apply to the track element */
  trackClassName?: string;
  /** Additional CSS classes to apply to the filled range element */
  rangeClassName?: string;
  /** Additional CSS classes to apply to the thumb element */
  thumbClassName?: string;
  /** Additional CSS classes to apply to the slider */
  className?: string;
  /** Ref to the root element */
  ref?: React.Ref<HTMLDivElement>;
  /** ARIA label for accessibility */
  ariaLabel?: string;
  /** ARIA labelledby for accessibility */
  ariaLabelledBy?: string;
}

/**
 * A horizontal slider component for selecting numeric values within a specified range.
 * Supports both controlled and uncontrolled modes with keyboard navigation and touch support.
 * 
 * @example
 * ```tsx
 * // Basic slider
 * <Slider
 *   min={0}
 *   max={100}
 *   value={volume}
 *   onValueChange={setVolume}
 *   ariaLabel="Volume control"
 * />
 * 
 * // Uncontrolled with custom step
 * <Slider
 *   defaultValue={50}
 *   min={0}
 *   max={200}
 *   step={5}
 *   onValueChange={(value) => console.log('Price:', value)}
 * />
 * 
 * // Customized appearance
 * <Slider
 *   value={opacity}
 *   onValueChange={setOpacity}
 *   min={0}
 *   max={1}
 *   step={0.1}
 *   rangeClassName="bg-blue-500"
 *   thumbClassName="bg-blue-600 border-2 border-white"
 * />
 * ```
 */
export function Slider({
  id,
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
  const dragOffsetRef = useRef(0);

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

  const getValueFromPointerEvent = useCallback(
    (event: PointerEvent | React.PointerEvent, isDragging = false) => {
      const rect = trackRef.current?.getBoundingClientRect();
      if (!rect) return currentValue;

      let clientX = event.clientX;

      // If we're dragging, account for the offset from where the user initially clicked on the thumb
      if (isDragging) {
        clientX = clientX - dragOffsetRef.current;
      }

      const percentage = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      return min + (max - min) * percentage;
    },
    [min, max, currentValue]
  );

  const handleTrackPointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (disabled) return;

      // Only handle track clicks, not thumb clicks
      if (event.target !== event.currentTarget) return;

      const newValue = getValueFromPointerEvent(event);
      updateValue(newValue);
    },
    [disabled, getValueFromPointerEvent, updateValue]
  );

  const handleThumbPointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (disabled) return;

      // Prevent the track click handler from firing
      event.stopPropagation();

      isDraggingRef.current = true;

      // Calculate the offset from the click position to the center of the thumb
      const trackRect = trackRef.current?.getBoundingClientRect();
      const thumbRect = event.currentTarget.getBoundingClientRect();

      if (trackRect && thumbRect) {
        const thumbCenter = thumbRect.left + thumbRect.width / 2;
        dragOffsetRef.current = event.clientX - thumbCenter;
      }

      // Set pointer capture on the thumb element for better tracking
      event.currentTarget.setPointerCapture(event.pointerId);

      // Add global event listeners for smooth dragging
      const handleGlobalPointerMove = (e: PointerEvent) => {
        if (!isDraggingRef.current) return;
        const newValue = getValueFromPointerEvent(e, true);
        updateValue(newValue);
      };

      const handleGlobalPointerUp = (e: PointerEvent) => {
        if (e.pointerId !== event.pointerId) return;
        isDraggingRef.current = false;
        dragOffsetRef.current = 0;

        // Try to release capture from both the thumb and document
        try {
          event.currentTarget.releasePointerCapture(e.pointerId);
        } catch {
          // Ignore errors if element is no longer available
        }

        document.removeEventListener('pointermove', handleGlobalPointerMove);
        document.removeEventListener('pointerup', handleGlobalPointerUp);
      };

      document.addEventListener('pointermove', handleGlobalPointerMove);
      document.addEventListener('pointerup', handleGlobalPointerUp);
    },
    [disabled, getValueFromPointerEvent, updateValue]
  );

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
  const percentage = max === min ? 0 : ((currentValue - min) / (max - min)) * 100;

  return (
    <div
      id={id}
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
          'relative h-1.5 w-full rounded-full bg-muted-foreground cursor-pointer',
          disabled && 'cursor-not-allowed',
          trackClassName
        )}
        onPointerDown={handleTrackPointerDown}
      >
        {/* Range (filled portion) */}
        <div
          className={join(
            'absolute h-full rounded-full pointer-events-none', // pointer-events are disabled so that user interactions are handled by the track element, enabling correct slider behavior
            !isDraggingRef.current && 'transition-all',
            rangeClassName
          )}
          style={{ width: `${percentage}%` }}
        />

        {/* Thumb */}
        <div
          className={join(
            'absolute size-5 -top-2 rounded-full shadow-md cursor-grab',
            disabled && 'cursor-not-allowed',
            !disabled && 'cursor-grab focus:outline-none focus:ring-2',
            isDraggingRef.current ? 'cursor-grabbing scale-110' : 'transition-all',
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
          onPointerDown={handleThumbPointerDown}
        />
      </div>
    </div>
  );
}
