// Button.tsx
import { ButtonHTMLAttributes, Ref } from 'react';
import { join } from '../../util/join';
import LoadingDots from './LoadingDots';
import { ButtonSize, ButtonVariants, buttonDefaults, buttonVariants, roundedVariants, sizeVariants } from './variants';

interface ButtonProps extends Partial<ButtonVariants>, ButtonHTMLAttributes<HTMLButtonElement> {
  ref?: Ref<HTMLButtonElement>;
  loading?: boolean;
  linkTo?: string;
  linkProps?: Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>;
}

export default function Button({
  variant = buttonDefaults.variant,
  size,
  rounded = buttonDefaults.rounded,
  loading,
  linkTo,
  linkProps,
  type = 'button',
  className,
  ...rest
}: ButtonProps) {
  let adjustedSize: ButtonSize;
  if (variant === 'link' && !size) { // default links to fitted size
    adjustedSize = 'fitted';
  } else {
    adjustedSize = size || buttonDefaults.size;
  }

  const baseClasses =
    'appearance-none focus:outline-none focus:ring not-disabled:hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all';

  const buttonClasses = join(
    baseClasses,
    buttonVariants[variant],
    sizeVariants[adjustedSize],
    roundedVariants[rounded],
    loading && 'relative pointer-events-none',
    linkTo && 'relative',
    className
  );

  return (
    <button
      {...rest}
      role={linkTo ? 'link' : rest.role}
      aria-label={rest['aria-label'] || linkProps?.['aria-label']}
      aria-description={rest['aria-description'] || linkProps?.['aria-description']}
      aria-disabled={rest.disabled || loading}
      aria-busy={loading}
      type={type}
      className={buttonClasses}
    >
      {loading && <LoadingDots />}
      <span className={join(loading && 'invisible')}>{rest.children}</span>

      {linkTo && (
        <a
          {...linkProps}
          aria-hidden={true} // Hide from screen readers since the button is already accessible
          href={linkTo}
          target={linkProps?.target || '_blank'}
          rel={linkProps?.rel || 'noreferrer'}
          className='absolute inset-0'
        />
      )}
    </button>
  );
}
