// Button.tsx
import React, { ButtonHTMLAttributes, Ref } from 'react';
import { join } from '../../utils';
import { LoadingDots } from './LoadingDots';
import { ButtonSize, ButtonVariants, buttonDefaults, buttonVariants, roundedVariants, sizeVariants } from './variants';

interface ButtonButtonProps extends Partial<ButtonVariants>, ButtonHTMLAttributes<HTMLButtonElement> {
	href?: never;
	/** Reference to the button element. */
	ref?: Ref<HTMLButtonElement>;
	/** Whether the button is in a loading state. */
	loading?: boolean;
}

interface ButtonLinkProps
	extends Partial<ButtonVariants>,
		Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'role'> {
	/** When provided, renders the button as a link. */
	href: string;
	/** Reference to the anchor element. */
	ref?: Ref<HTMLAnchorElement>;
	loading?: never;
	/** Whether the button is disabled. */
	disabled?: boolean;
}

export type ButtonProps = ButtonButtonProps | ButtonLinkProps;

export function Button({
	variant = buttonDefaults.variant,
	size,
	rounded = buttonDefaults.rounded,
	loading,
	className,
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
		className
	);

	if (rest.href && !rest.disabled) {
		return (
			<a
				{...rest}
				rel={rest.rel ? rest.rel : rest.target === '_blank' ? 'noopener noreferrer' : undefined}
				aria-label={rest['aria-label']}
				aria-description={rest['aria-description']}
				href={rest.href}
				className={buttonClasses}
			>
				{rest.children}
			</a>
		);
	}

	const buttonRest = rest as ButtonButtonProps; // necessary to cast to avoid TS complaining
	const getButtonChildren = () => {
		if (!buttonRest.children) {
			return null;
		}

		if (
			typeof buttonRest.children === 'string' ||
			typeof buttonRest.children === 'number' ||
			typeof buttonRest.children === 'boolean'
		) {
			return <span className={join(loading && 'invisible')}>{buttonRest.children}</span>;
		}

		const clonedChildren = React.Children.map(buttonRest.children, (child, index) => {
			if (React.isValidElement(child)) {
				const childrenProps = child.props as { className?: string };
				return React.cloneElement(child, {
					key: index,
					className: join(loading && 'invisible', childrenProps.className),
				} as Record<string, unknown>);
			}
			return child;
		});
		return clonedChildren;
	};

	return (
		<button
			{...buttonRest}
			aria-label={buttonRest['aria-label']}
			aria-description={buttonRest['aria-description']}
			aria-disabled={buttonRest.disabled || loading}
			aria-busy={loading}
			type={buttonRest.type ?? 'button'}
			className={buttonClasses}
		>
			{loading && <LoadingDots />}
			{getButtonChildren()}
		</button>
	);
}
