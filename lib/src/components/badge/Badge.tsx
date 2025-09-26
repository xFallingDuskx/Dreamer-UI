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
	/** The HTML id attribute for the badge */
	id?: string;
	/** Reference to the badge element */
	ref?: React.Ref<HTMLSpanElement>;
	/** The visual style variant of the badge */
	variant?: BadgeVariant;
	/** Whether to render the badge with an outline style */
	outline?: boolean;
	/** The content to display inside the badge */
	children?: React.ReactNode;
	/** The aspect ratio of the badge - square for equal padding, video for horizontal padding */
	aspect?: 'square' | 'video';
	/** The semantic use of the badge for accessibility purposes */
	use?: BadgeUse;
	/** The size of the badge */
	size?: BadgeSize;
}

/**
 * A small UI element for displaying status, labels, or categories.
 * Supports various colors, sizes, and semantic accessibility attributes.
 * 
 * @example
 * ```tsx
 * // Status badge
 * <Badge variant="success" use="status">Active</Badge>
 * 
 * // Notification count
 * <Badge variant="destructive" aspect="square" use="status">5</Badge>
 * 
 * // Category tag
 * <Badge variant="muted" outline>JavaScript</Badge>
 * ```
 */
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
