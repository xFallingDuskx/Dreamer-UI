import { join } from '../../utils';
import { CardSize, CardSizes } from './variants';

export interface CardProps {
	/** The HTML id attribute for the card */
	id?: string;
	/** Additional CSS classes to apply to the card */
	className?: string;
	/** React ref for the card container */
	ref?: React.Ref<HTMLDivElement>;
	/** The size variant of the card */
	size?: CardSize;
	/** The amount of padding inside the card */
	padding?: number;
	/** Content to display in the card header */
	header?: React.ReactNode;
	/** Content to display in the card footer */
	footer?: React.ReactNode;
	/** The main content of the card */
	children?: React.ReactNode;
	/** Image source for the card */
	imageSrc?: string;
	/** Alt text for the image */
	imageAlt?: string;
	/** Custom image component */
	imageComponent?: React.ReactNode;
	/** If true, the image will extend to the edges of the card, ignoring padding. Default is false. */
	imageToEdge?: boolean;
}

/**
 * A flexible container component for displaying content in a structured format.
 * Supports headers, footers, images, and customizable padding with responsive design.
 * 
 * @example
 * ```tsx
 * // Simple card
 * <Card header="Card Title" size="lg">
 *   <p>Your content goes here</p>
 * </Card>
 * 
 * // Card with image and footer
 * <Card 
 *   imageSrc="/photo.jpg" 
 *   imageAlt="Product photo"
 *   header={<h3>Product Name</h3>}
 *   footer={<Button>Buy Now</Button>}
 * >
 *   Product description text here.
 * </Card>
 * ```
 */
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
	imageToEdge = true,
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
				'border border-border rounded-lg shadow-sm overflow-hidden',
				// Responsive design
				'w-full max-w-full',
				// Size-specific styles
				sizeVariant.container,
				className
			)}
			{...props}
		>
			{/* Image Section */}
			{showImage && (
				<div
					style={imageToEdge ? undefined : { padding, paddingBottom: 0 }}
					className='w-full overflow-hidden'
				>
					{imageComponent ? (
						imageComponent
					) : (
						<img src={imageSrc} alt={imageAlt || ''} className='w-full h-auto object-cover rounded-xs' loading='lazy' />
					)}
				</div>
			)}

			{/* Card Content */}
			<div style={{ padding, rowGap: padding * sizeVariant.paddingMulti }} className='flex flex-col'>
				{/* Header */}
				{header && <div className={sizeVariant.header}>{header}</div>}

				{/* Main Content */}
				{children && <div className={sizeVariant.content}>{children}</div>}

				{/* Footer */}
				{footer && <div className={sizeVariant.footer}>{footer}</div>}
			</div>
		</div>
	);
}
