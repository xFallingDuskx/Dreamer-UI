import React, { Ref, useEffect, useId, useMemo, useState } from 'react';
import { join } from '../../../lib/src/utils';
import { sizeVariants, toggleDefaults, variantStyles } from './variants';

export interface ToggleProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  ref?: Ref<HTMLButtonElement>;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'success' | 'destructive';
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  thumbClassName?: string;
}

export default function Toggle({
  ref,
  id,
  size = toggleDefaults.size,
  variant = toggleDefaults.variant,
  checked = false,
  onCheckedChange,
  disabled = false,
  className,
  thumbClassName,
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
      setIsChecked(newChecked);
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
    isChecked ? variantConfig.checked : variantConfig.unchecked,
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
