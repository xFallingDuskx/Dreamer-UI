import React, { Ref, useEffect, useId, useMemo, useState } from 'react';
import Check from '../../symbols/Check';
import { join } from '../../util/join';
import { useFilledBackgroundColor } from './hooks';

export interface CheckboxProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  ref?: Ref<HTMLButtonElement>;
  size?: number;
  color?: string; // can be adjusted with tailwindcss by using `text-<color>`
  filled?: boolean;
  rounded?: boolean;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export default function Checkbox({
  ref,
  id,
  size = 20,
  color,
  filled = false,
  rounded = true,
  checked = false,
  onCheckedChange,
  disabled,
  className = '',
  ...props
}: CheckboxProps) {
  const generatedId = useId();
  const checkboxId = useMemo(() => id || `checkbox-${generatedId}`, [id, generatedId]);
  const parentBackgroundColor = useFilledBackgroundColor(checkboxId);
  const [isChecked, setIsChecked] = useState(checked);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const handleChange = () => {
    if (!disabled) {
      setIsChecked(!isChecked);
      onCheckedChange?.(!isChecked);
    }
  };

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === ' ') {
      e.preventDefault();
      handleChange();
    }
  };

  const checkboxClasses = join(
    'flex items-center justify-center border outline outline-transparent focus:outline-current focus:outline-offset-2',
    rounded && 'rounded',
    disabled && 'opacity-40 cursor-not-allowed',
    !disabled && 'cursor-pointer',
    className
  );

  return (
    <button
      id={checkboxId}
      type='button'
      ref={ref}
      tabIndex={0}
      role='checkbox'
      onClick={handleChange}
      aria-checked={isChecked}
      aria-disabled={disabled}
      onKeyDownCapture={handleOnKeyDown}
      style={{
        width: size,
        height: size,
        color: color,
        backgroundColor: isChecked && filled ? 'currentcolor' : 'transparent',
      }}
      className={checkboxClasses}
      {...props}
    >
      {isChecked && <Check size={size} color={filled ? parentBackgroundColor : undefined} />}
    </button>
  );
}
