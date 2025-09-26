import React from 'react';
import { join } from '../../utils';
import { AvatarPresets } from './icons';
import { AvatarPreset, AvatarShape, AvatarShapes, AvatarSize, AvatarSizes } from './variants';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
	/** The HTML id attribute for the avatar */
	id?: string;
	/** Reference to the avatar element */
	ref?: React.Ref<HTMLDivElement>;
	/** The size of the avatar */
	size?: AvatarSize;
	/** The shape of the avatar */
	shape?: AvatarShape;
	/** Pre-defined cartoon-like avatar to display */
	preset?: AvatarPreset;
	/** Alternative text for the avatar image */
	alt?: string;
	/** Additional CSS classes to apply to the avatar */
	className?: string;
	/** Custom image source URL */
	src?: string;
	/** Initials to display when no preset or src is provided */
	initials?: string;
}

/**
 * Displays user avatars with support for images, preset icons, or initials.
 * Provides various size and shape options with built-in fallback handling.
 * 
 * @example
 * ```tsx
 * // With custom image
 * <Avatar src="/user-photo.jpg" alt="John Doe" size="lg" />
 * 
 * // With preset character
 * <Avatar preset="astronaut" size="md" shape="circle" />
 * 
 * // With initials fallback
 * <Avatar initials="JD" size="sm" />
 * ```
 */
export function Avatar({
	id,
	ref,
	size = 'md',
	shape = 'circle',
	preset,
	alt,
	className,
	src,
	initials,
	...props
}: AvatarProps) {
	const sizeClasses = AvatarSizes[size];
	const shapeClasses = AvatarShapes[shape];

	const PresetComponent = preset ? AvatarPresets[preset] : null;

	return (
		<div
			id={id}
			ref={ref}
			className={join(
				'relative inline-flex items-center justify-center overflow-hidden bg-gray-100 border-2 border-border',
				sizeClasses.size,
				shapeClasses,
				className
			)}
			data-size={size}
			data-shape={shape}
			data-preset={preset}
			role='img'
			aria-label={alt || `Avatar ${preset ? `of ${preset}` : ''}`}
			{...props}
		>
			{src ? (
				<img src={src} alt={alt || 'User avatar'} className='w-full h-full object-cover' />
			) : PresetComponent ? (
				<PresetComponent size={sizeClasses.iconSize} />
			) : initials ? (
				<span className='text-gray-600 font-medium text-sm'>{initials.slice(0, 2).toUpperCase()}</span>
			) : (
				<div className='w-full h-full bg-gradient-to-br from-gray-300 to-gray-400' />
			)}
		</div>
	);
}
