import { join } from '@moondreamsdev/dreamer-ui/utils';
import { CardSize, CardSizes } from './variants';

export interface CardProps {
	/** Unique identifier for the card */
	id?: string;
	/** Custom CSS classes */
	className?: string;
	/** React ref for the card container */
	ref?: React.Ref<HTMLDivElement>;
	/** Card size variant */
	size?: CardSize;
	/** Padding in pixels (defaults to 16). Used for card itself and spacing between its content within the card. */
	padding?: number;
	/** Card header content */
	header?: React.ReactNode;
	/** Card footer content */
	footer?: React.ReactNode;
	/** Main card content */
	children?: React.ReactNode;
	/** Image source for the card */
	imageSrc?: string;
	/** Alt text for the image */
	imageAlt?: string;
	/** Custom image component */
	imageComponent?: React.ReactNode;
}

export function Card({
	id,
	className,
	ref,
	size = 'md',
	padding = 16,
	header,
	footer,
	children,
	imageSrc,
	imageAlt,
	imageComponent,
	...props
}: CardProps) {
	const sizeVariant = CardSizes[size];
	const showImage = imageSrc || imageComponent;
  
	return (
		<div
			id={id}
			ref={ref}
			data-testid='card'
			data-size={size}
			data-padding={padding}
			className={join(
				// Base styles
				'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm overflow-hidden',
				// Responsive design
				'w-full max-w-full',
				// Size-specific styles
				sizeVariant.container,
				className
			)}
			style={{ padding }}
			{...props}
		>
			{/* Image Section */}
			{showImage && (
				<div className='w-full overflow-hidden'>
					{imageComponent ? (
						imageComponent
					) : (
						<img src={imageSrc} alt={imageAlt || ''} className='w-full h-auto object-cover' loading='lazy' />
					)}
				</div>
			)}

			{/* Card Content */}
			<div style={{ paddingTop: showImage ? padding / 2 : undefined, rowGap: padding / 2 }} className='flex flex-col h-full'>
				{/* Header */}
				{header && <div className={sizeVariant.header}>{header}</div>}

				{/* Main Content */}
				{children && (
					<div className={sizeVariant.content}>{children}</div>
				)}

				{/* Footer */}
				{footer && <div className={sizeVariant.footer}>{footer}</div>}
			</div>
		</div>
	);
}
