import React from 'react';
import { join } from '../../utils';
import {
	BadgeSize,
	BadgeSizes,
	BadgeUse,
	BadgeUseAriaAttributes,
	BadgeVariant,
	BadgeVariants,
	BadgeVariantsOutline,
} from './variants';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
	id?: string;
	ref?: React.Ref<HTMLSpanElement>;
	variant?: BadgeVariant;
	outline?: boolean;
	children?: React.ReactNode;
	aspect?: 'square' | 'video';
	/** Used for accessibility purposes to define the aria attributes of the badge. */
	use?: BadgeUse;
	/** Size of the badge. `md` uses `text-base` */
	size?: BadgeSize;
}

export function Badge({
	id,
	ref,
	variant = 'muted',
	outline = false,
	children,
	className,
	aspect = 'video',
	use = 'decorative',
	size = 'xs',
	...props
}: BadgeProps) {
	return (
		<span
			id={id}
			ref={ref}
			className={join(
				'font-medium rounded-full inline-flex select-none',
				BadgeSizes[size].text,
				aspect === 'square' && BadgeSizes[size].aspectSquare,
				aspect === 'video' && BadgeSizes[size].aspectVideo,
				outline ? BadgeVariantsOutline[variant] : BadgeVariants[variant],
				className
			)}
			data-variant={variant}
			data-outline={outline}
			data-aspect={aspect}
			data-use={use}
			data-size={size}
			{...BadgeUseAriaAttributes[use]}
			{...props}
		>
			{children}
		</span>
	);
}
