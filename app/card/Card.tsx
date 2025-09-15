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
  /** Padding in pixels (defaults to 16) */
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

  return (
    <div
      id={id}
      ref={ref}
      data-testid="card"
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
      {(imageSrc || imageComponent) && (
        <div className="w-full overflow-hidden">
          {imageComponent ? (
            imageComponent
          ) : (
            <img
              src={imageSrc}
              alt={imageAlt || ''}
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          )}
        </div>
      )}

      {/* Card Content */}
      <div style={{ padding }}>
        {/* Header */}
        {header && (
          <div 
            className={join(
              'mb-3',
              sizeVariant.header
            )}
          >
            {header}
          </div>
        )}

        {/* Main Content */}
        {children && (
          <div 
            className={join(
              sizeVariant.content,
              header && footer ? 'mb-3' : footer ? 'mb-3' : ''
            )}
          >
            {children}
          </div>
        )}

        {/* Footer */}
        {footer && (
          <div 
            className={join(
              'mt-auto',
              sizeVariant.footer
            )}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}