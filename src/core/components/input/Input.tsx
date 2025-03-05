import { Ref, useId, useState } from 'react';
import { EyeClosed, EyeOpened } from '../../symbols';
import { join } from '../../util/join';
import './styles.css';
import { inputDefaults, inputVariants, InputVariants, roundedVariants } from './variants';
import { StatusHelpMessage } from '../../shared/forms';

interface InputProps extends Partial<InputVariants>, React.InputHTMLAttributes<HTMLInputElement> {
  ref?: Ref<HTMLInputElement>;
  displayOnlyMode?: boolean;
  errorMessage?: string;
  successMessage?: string;
}

export default function Input({
  variant = inputDefaults.variant,
  rounded,
  displayOnlyMode = false,
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
    'appearance-none w-full focus:outline-none disabled:opacity-50 placeholder:text-muted/70 hide-number-input-arrows transition-all';
  const fileClasses =
    'file:mr-2 file:border-0 file:rounded-md file:px-1.5 file:py-1 file:bg-primary hover:file:bg-primary/85 file:text-sm file:font-medium file:text-foreground file:transition-colors';

  const inputClasses = join(
    baseClasses,
    fileClasses,
    !displayOnlyMode && inputVariants[variant],
    !displayOnlyMode && roundedVariants[adjustedRound],
    type === 'password' && 'pr-10',
    !displayOnlyMode && 'px-2 py-1',
    displayOnlyMode && 'pointer-events-none',
    className
  );

  return (
    <div className='text-left' style={{ height: rest.height, width: rest.width }}>
      <div className={join(type === 'password' && 'relative')}>
        <input
          {...rest}
          id={id}
          type={type === 'password' && showPassword ? 'text' : type}
          aria-disabled={rest.disabled}
          readOnly={displayOnlyMode}
          aria-readonly={displayOnlyMode || rest['aria-readonly']}
          data-error={errorMessage ? true : undefined}
          data-success={successMessage ? true : undefined}
          className={inputClasses}
        />
        {type === 'password' && (
          <button
            onClick={() => setShowPassword(!showPassword)}
            className='absolute inset-y-0 right-0 px-2 hover:cursor-pointer'
            aria-label='Toggle password visibility'
            data-state={showPassword ? 'visible' : 'hidden'}
          >
            {showPassword ? <EyeOpened size={20} /> : <EyeClosed size={20} />}
          </button>
        )}
      </div>
      {!displayOnlyMode && <StatusHelpMessage elementId={id} type='error' message={errorMessage} />}
      {!displayOnlyMode && <StatusHelpMessage elementId={id} type='success' message={successMessage} />}
    </div>
  );
}
