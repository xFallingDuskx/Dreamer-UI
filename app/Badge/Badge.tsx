import { join } from '@moondreamsdev/dreamer-ui/utils';
import React from 'react';
import { BadgeVariant, BadgeVariants, BadgeVariantsOutline } from './variants';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
	id?: string;
	ref?: React.Ref<HTMLSpanElement>;
	variant?: BadgeVariant;
	outline?: boolean;
	children?: React.ReactNode;
	aspect?: 'square' | 'video';
}

export function Badge({ id, ref, variant = 'muted', outline = false, children, className, aspect = 'video', ...props }: BadgeProps) {
	return (
		<span
			id={id}
			ref={ref}
			className={join(
				'text-sm rounded-full inline-flex',
        aspect === 'square' && 'p-2',
        aspect === 'video' && 'px-2.5 py-1',
				outline ? BadgeVariantsOutline[variant] : BadgeVariants[variant],
				className
			)}
			data-variant={variant}
			data-outline={outline}
			{...props}
		>
			{children}
		</span>
	);
}
