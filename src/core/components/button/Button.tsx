// Button.tsx
import { ButtonHTMLAttributes, Ref } from 'react';
import { join } from '../../util/join';
import LoadingDots from './LoadingDots';
import { ButtonVariants, buttonDefaults, buttonVariants, roundedVariants, sizeVariants } from './variants';

interface ButtonProps extends Partial<ButtonVariants>, ButtonHTMLAttributes<HTMLButtonElement> {
  ref?: Ref<HTMLButtonElement>;
  loading?: boolean;
  linkTo?: string;
  linkProps?: React.AnchorHTMLAttributes<HTMLAnchorElement>;
}

export default function Button({
  variant = buttonDefaults.variant,
  size = buttonDefaults.size,
  rounded = buttonDefaults.rounded,
  loading,
  linkTo,
  linkProps,
  type = 'button',
  className,
  ...rest
}: ButtonProps) {
  const baseClasses =
    'appearance-none focus:outline-none focus:ring not-disabled:hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all';

  const buttonClasses = join(
    baseClasses,
    buttonVariants[variant],
    sizeVariants[size],
    roundedVariants[rounded],
    loading && 'relative pointer-events-none',
    linkTo && 'relative',
    className
  );

  return (
    <button {...rest} aria-disabled={rest.disabled} aria-busy={loading} type={type} className={buttonClasses}>
      {loading && <LoadingDots />}
      <span className={join(loading && 'invisible')}>{rest.children}</span>

      {linkTo && (
        <a
          {...linkProps}
          href={linkTo}
          target={linkProps?.target || '_blank'}
          rel={linkProps?.rel || 'noreferrer'}
          className='absolute inset-0'
        />
      )}
    </button>
  );
}
