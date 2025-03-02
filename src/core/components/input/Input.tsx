import { Ref, useId } from 'react';
import { join } from '../../util/join';
import { inputDefaults, inputVariants, InputVariants, roundedVariants } from './variants';

interface InputProps extends Partial<InputVariants>, React.InputHTMLAttributes<HTMLInputElement> {
  ref?: Ref<HTMLInputElement>;
  errorMessage?: string;
  successMessage?: string;
}

/* TASK:
  - hide content

*/

export default function Input({
  variant = inputDefaults.variant,
  rounded,
  errorMessage,
  successMessage,
  type = 'text',
  className,
  ...rest
}: InputProps) {
  const id = useId();

  // Default `round` of `md` for `outline` variant
  let adjustedRound = rounded;
  if (variant === 'outline' && !rounded) {
    adjustedRound = 'md';
  }
  adjustedRound = adjustedRound || inputDefaults.rounded;

  const baseClasses =
    'appearance-none w-full px-2 py-1 focus:outline-none disabled:opacity-50 placeholder:text-muted/70 transition-all';
  const fileClasses = 'file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground';

  const inputClasses = join(
    baseClasses,
    fileClasses,
    inputVariants[variant],
    roundedVariants[adjustedRound],
    className
  );

  return (
    <div className='text-left'>
      <input
        {...rest}
        type={type}
        aria-disabled={rest.disabled}
        aria-invalid={errorMessage ? true : successMessage ? false : undefined}
        aria-describedby={errorMessage ? `${id}-error-message` : successMessage ? `${id}-success-message` : undefined}
        data-error={errorMessage ? true : undefined}
        data-success={successMessage ? true : undefined}
        className={inputClasses}
      />
      {errorMessage && (
        <small id={`${id}-error-message`} className='text-sm text-danger' role='alert'>
          {errorMessage}
        </small>
      )}
      {successMessage && (
        <small id={`${id}-success-message`} className='text-sm text-success' role='status'>
          {successMessage}
        </small>
      )}
    </div>
  );
}
