import React from 'react';
import { join } from '../../utils';
import { AvatarPresets } from './icons';
import { AvatarPreset, AvatarShape, AvatarShapes, AvatarSize, AvatarSizes } from './variants';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
	/** Unique identifier for the avatar */
	id?: string;
	/** Reference to the avatar element */
	ref?: React.Ref<HTMLDivElement>;
	/** Size of the avatar */
	size?: AvatarSize;
	/** Shape of the avatar */
	shape?: AvatarShape;
	/** Pre-defined avatar preset */
	preset?: AvatarPreset;
	/** Alt text for accessibility */
	alt?: string;
	/** Additional CSS classes */
	className?: string;
	/** Custom image source (overrides preset) */
	src?: string;
	/** Initials to display (overrides preset if no src) */
	initials?: string;
}

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
