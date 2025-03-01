// Button.tsx
import { ButtonHTMLAttributes } from 'react';
import { join } from '../../util/join';
import { ButtonVariants, buttonDefaults, buttonVariants, roundedVariants, sizeVariants } from './variants';

interface ButtonProps extends Partial<ButtonVariants>, ButtonHTMLAttributes<HTMLButtonElement> {}

/* TASK:
  - loading state
  - icon button
*/

function Button({
  variant = buttonDefaults.variant,
  size = buttonDefaults.size,
  rounded = buttonDefaults.rounded,
  type = 'button',
  className,
  ...rest
}: ButtonProps) {
  const baseClass =
    'appearance-none focus:outline-none not-disabled:hover:cursor-pointer disabled:opacity-50 transition-all';

  const buttonClasses = join(
    baseClass,
    buttonVariants[variant],
    sizeVariants[size],
    roundedVariants[rounded],
    className
  );

  return (
    <button type={type} {...rest} className={buttonClasses}>
      {rest.children}
    </button>
  );
}

export default Button;
