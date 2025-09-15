import React from 'react';
import { join } from '../../utils';
import { BadgeSize, BadgeSizes, BadgeVariant, BadgeVariants, BadgeVariantsOutline } from './variants';

type BadgeUse = 'decorative' | 'status' | 'alert';

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

const BadgeUseAriaAttributes: Record<BadgeUse, object> = {
	decorative: { 'aria-hidden': true },
	status: { role: 'status' },
	alert: { role: 'alert' },
};

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
			{...(use ? BadgeUseAriaAttributes[use] : {})}
			{...props}
		>
			{children}
		</span>
	);
}
