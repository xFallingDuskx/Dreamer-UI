// Button.tsx
import { ButtonHTMLAttributes } from 'react';
import { join } from '../../util/join';
import { ButtonVariants, buttonDefaults, buttonVariants, roundedVariants, sizeVariants } from './variants';

interface ButtonProps extends Partial<ButtonVariants>, ButtonHTMLAttributes<HTMLButtonElement> {}

/* TASK:
  - useFullWidth
  - disabled state
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
  const baseClass = 'appearance-none focus:outline-none hover:cursor-pointer transition-all';
  const variantClasses = variant ? buttonVariants[variant] : '';
  const sizeClasses = size ? sizeVariants[size] : '';
  const roundedClasses = rounded ? roundedVariants[rounded] : '';

  const buttonClasses = join(baseClass, variantClasses, sizeClasses, roundedClasses, className);

  return (
    <button type={type} {...rest} className={buttonClasses}>
      {rest.children}
    </button>
  );
}

export default Button;
