import { join } from '@moondreamsdev/dreamer-ui/utils';
import React from 'react';
import { BadgeVariant, BadgeVariants, BadgeVariantsOutline } from './variants';

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
	...props
}: BadgeProps) {
	return (
		<span
			id={id}
			ref={ref}
			className={join(
				'text-sm rounded-full inline-flex',
				aspect === 'square' && 'p-1.5',
				aspect === 'video' && 'px-2.5 py-1',
				outline ? BadgeVariantsOutline[variant] : BadgeVariants[variant],
				className
			)}
			data-variant={variant}
			data-outline={outline}
			data-aspect={aspect}
			data-use={use}
			{...(use ? BadgeUseAriaAttributes[use] : {})}
			{...props}
		>
			{children}
		</span>
	);
}
