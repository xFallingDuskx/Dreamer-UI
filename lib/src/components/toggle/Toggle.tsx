import React, { Ref, useEffect, useId, useMemo, useState } from 'react';
import { join } from '../../utils';
import {
  sizeVariants,
  ToggleBackgroundClasses,
  toggleDefaults,
  ToggleSize,
  ToggleVariant,
  variantStyles,
} from './variants';

export interface ToggleProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  /** Reference to the toggle button element. */
  ref?: Ref<HTMLButtonElement>;
  /** The size of the toggle switch. */
  size?: ToggleSize;
  /** The color variant of the toggle switch. */
  variant?: ToggleVariant;
  /** Whether the toggle is checked. If not provided, the toggle will be uncontrolled. */
  checked?: boolean;
  /** Callback fired when the toggle state changes. */
  onCheckedChange?: (checked: boolean) => void;
  /** Whether the toggle is disabled. */
  disabled?: boolean;
  /** Additional CSS classes to apply to the toggle thumb. */
  thumbClassName?: string;
  /** Custom background CSS classes for different toggle states. */
  backgroundClassNames?: ToggleBackgroundClasses;
}

export function Toggle({
  ref,
  id,
  size = toggleDefaults.size,
  variant = toggleDefaults.variant,
  checked,
  onCheckedChange,
  disabled = false,
  className,
  thumbClassName,
  backgroundClassNames,
  ...props
}: ToggleProps) {
  const generatedId = useId();
  const toggleId = useMemo(() => id || `toggle-${generatedId}`, [id, generatedId]);
  const [isChecked, setIsChecked] = useState(checked);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const handleToggle = () => {
    if (!disabled) {
      const newChecked = !isChecked;

      if (checked === undefined) {
        // Only update state if the toggle is uncontrolled
        setIsChecked(newChecked);
      }
      onCheckedChange?.(newChecked);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      handleToggle();
    }
  };

  const sizeConfig = sizeVariants[size];
  const variantConfig = variantStyles[variant];

  const toggleClasses = join(
    // Base styles
    'relative inline-flex items-center rounded-full transition-all duration-200 ease-in-out',
    'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
    // Size
    sizeConfig.container,
    // Variant and state
    isChecked
      ? backgroundClassNames?.checked || variantConfig.checked
      : backgroundClassNames?.unchecked || variantConfig.unchecked,
    // Disabled state
    disabled && 'opacity-50 cursor-not-allowed',
    !disabled && 'cursor-pointer',
    className
  );

  const thumbClasses = join(
    // Base thumb styles
    'absolute left-0.5 top-1/2 -translate-y-1/2 rounded-full bg-white shadow-sm transition-transform duration-200 ease-in-out',
    // Size
    sizeConfig.thumb,
    // Position based on state
    isChecked && sizeConfig.translate,
    thumbClassName
  );

  return (
    <button
      ref={ref}
      id={toggleId}
      type='button'
      role='switch'
      tabIndex={0}
      aria-checked={isChecked}
      aria-disabled={disabled}
      disabled={disabled}
      onClick={handleToggle}
      onKeyDown={handleKeyDown}
      className={toggleClasses}
      {...props}
    >
      <span className={thumbClasses} />
      <span className='sr-only'>{isChecked ? 'Enabled' : 'Disabled'}</span>
    </button>
  );
}
