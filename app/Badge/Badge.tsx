import { join } from '@moondreamsdev/dreamer-ui/utils';
import React from 'react';
import { BadgeVariant, BadgeVariants, BadgeVariantsOutline } from './variants';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
	id?: string;
	ref?: React.Ref<HTMLSpanElement>;
	variant?: BadgeVariant;
	outline?: boolean;
	children?: React.ReactNode;
}

export function Badge({ id, ref, variant = 'muted', outline = false, children, className, ...props }: BadgeProps) {
	return (
		<span
			id={id}
			ref={ref}
			className={join('min-w-1 min-h-1 rounded-full px-2 py-1', outline ? BadgeVariantsOutline[variant] : BadgeVariants[variant], className)}
			data-variant={variant}
			data-outline={outline}
			{...props}
		>
			{children}
		</span>
	);
}
