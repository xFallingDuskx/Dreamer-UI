// Button.tsx
import { ButtonHTMLAttributes, Ref } from 'react';
import { join } from '../../utils';
import { LoadingDots } from './LoadingDots';
import { ButtonSize, ButtonVariants, buttonDefaults, buttonVariants, roundedVariants, sizeVariants } from './variants';

export interface ButtonProps extends Partial<ButtonVariants>, ButtonHTMLAttributes<HTMLButtonElement> {
	ref?: Ref<HTMLButtonElement>;
	loading?: boolean;
	linkTo?: string;
	linkProps?: Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>;
}

export function Button({
	variant = buttonDefaults.variant,
	size,
	rounded = buttonDefaults.rounded,
	loading,
	linkTo,
	linkProps,
	type = 'button',
	className,
  onClick,
	...rest
}: ButtonProps) {
	let adjustedSize: ButtonSize;
	if (variant === 'link' && !size) {
		// default links to fitted size
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

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (loading || rest.disabled) {
      e.preventDefault();
      return;
    }
    onClick?.(e);

    if (linkTo) {
      window.location.href = linkTo;
    }
  }

	return (
		<button
			{...rest}
      onClick={handleClick}
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

			{linkTo && !rest.disabled && (
				<a
					{...linkProps}
					tabIndex={-1} // Prevents keyboard focus
					aria-label='' // Prevents duplicate screen reader announcement
					href={linkTo}
					rel={linkProps?.rel || 'noreferrer'}
					className='absolute inset-0'
          data-button-link={true}
          onClick={(e) => e.preventDefault()} // Prevent double navigation
				/>
			)}
		</button>
	);
}
