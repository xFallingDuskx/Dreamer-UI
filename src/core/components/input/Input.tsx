import { Ref } from 'react';
import { join } from '../../util/join';
import { inputDefaults, inputVariants, InputVariants, roundedVariants } from './variants';

interface InputProps extends Partial<InputVariants>, React.InputHTMLAttributes<HTMLInputElement> {
  ref?: Ref<HTMLInputElement>;
}

export default function Input({
  variant = inputDefaults.variant,
  rounded,
  type = 'text',
  className,
  ...rest
}: InputProps) {
  // Default `round` of `md` for `outline` variant
  let adjustedRound = rounded;
  if (variant === 'outline' && !rounded) {
    adjustedRound = 'md';
  }
  adjustedRound = adjustedRound || inputDefaults.rounded;

  const baseClasses = 'appearance-none px-2 py-1 focus:outline-none disabled:opacity-50 placeholder:text-muted/70 transition-all';
  const fileClasses = 'file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground';

  const inputClasses = join(
    baseClasses,
    fileClasses,
    inputVariants[variant],
    roundedVariants[adjustedRound],
    className
  );

  return <input {...rest} className={inputClasses} type={type} />;
}
