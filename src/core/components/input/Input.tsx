import { Ref, useId, useState } from 'react';
import { join } from '../../util/join';
import HelpMessage from './HelpMessage';
import { inputDefaults, inputVariants, InputVariants, roundedVariants } from './variants';
import { EyeClosed, EyeOpened } from '../../symbols';

interface InputProps extends Partial<InputVariants>, React.InputHTMLAttributes<HTMLInputElement> {
  ref?: Ref<HTMLInputElement>;
  errorMessage?: string;
  successMessage?: string;
}

/* TASK:
  - label (?)
  - file input

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
  const [showPassword, setShowPassword] = useState(false);

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
    type === 'password' && 'pr-10',
    className
  );

  return (
    <div className='text-left'>
      <div className='relative'>
        <input
          {...rest}
          type={type === 'password' && showPassword ? 'text' : type}
          aria-disabled={rest.disabled}
          aria-invalid={errorMessage ? true : successMessage ? false : undefined}
          aria-describedby={errorMessage ? `${id}-error-message` : successMessage ? `${id}-success-message` : undefined}
          data-error={errorMessage ? true : undefined}
          data-success={successMessage ? true : undefined}
          className={inputClasses}
        />
        {type === 'password' && (
          <button
            onClick={() => setShowPassword(!showPassword)}
            className='absolute inset-y-0 right-0 px-2 hover:cursor-pointer'
          >
            {showPassword ? <EyeOpened size={20} /> : <EyeClosed size={20} />}
          </button>
        )}
      </div>
      {errorMessage && <HelpMessage id={id} type='error' message={errorMessage} />}
      {successMessage && <HelpMessage id={id} type='success' message={successMessage} />}
    </div>
  );
}
