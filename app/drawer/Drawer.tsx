import { join } from '@moondreamsdev/dreamer-ui/utils';
import React, { useId } from 'react';
import { createPortal } from 'react-dom';
import { useAnimationSlideIn, useDrawerDocumentChanges, useDrawerFocus, useDrawerDrag } from './hooks';
import { DrawerSize, drawerVariants } from './variants';
import { X } from '../../lib/src/symbols/X';

export interface DrawerProps {
  ref?: React.Ref<HTMLDivElement>;
  /** Unique identifier for the drawer */
  id?: string;
  /** Whether the drawer is open */
  isOpen: boolean;
  /** Callback when drawer should close */
  onClose: () => void;
  /** Drawer title - can be a string or React node */
  title?: React.ReactNode;
  /** Drawer content */
  children: React.ReactNode;
  /** Drawer footer - can be a string or React node */
  footer?: React.ReactNode;
  /** Drawer size variant */
  size?: DrawerSize;
  /** Additional CSS classes for the drawer */
  className?: string;
  /** Additional CSS classes for the overlay */
  overlayClassName?: string;
  /** Whether to hide the close button */
  hideCloseButton?: boolean;
  /** Whether to disable closing when clicking the overlay */
  disableCloseOnOverlayClick?: boolean;
  /** Whether to enable drag gestures on the notch */
  enableDragGestures?: boolean;
  /** Callback when drawer size changes via drag */
  onSizeChange?: (size: DrawerSize) => void;
  /** ARIA labelledby attribute */
  ariaLabelledBy?: string;
  /** ARIA describedby attribute */
  ariaDescribedBy?: string;
}

/**
 * Drawer component that slides in from the bottom of the screen.
 * Provides an overlay and slide-in animation for bottom sheet content display.
 */
export function Drawer({
  ref,
  id,
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  className,
  overlayClassName,
  hideCloseButton = false,
  disableCloseOnOverlayClick = false,
  enableDragGestures = true,
  onSizeChange,
  ariaLabelledBy,
  ariaDescribedBy,
}: DrawerProps) {
  const generatedId = useId();
  const drawerId = id || `drawer-${generatedId}`;
  const titleId = id ? `${id}-title` : `drawer-title-${generatedId}`;

  const { show, shouldRender } = useAnimationSlideIn(isOpen);
  const { dragHandlers, currentSize, translateY } = useDrawerDrag({
    isOpen,
    initialSize: size,
    onClose,
    onSizeChange,
    enabled: enableDragGestures,
  });
  useDrawerFocus(drawerId, shouldRender);
  useDrawerDocumentChanges(shouldRender, onClose);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp' && onSizeChange) {
      e.preventDefault();
      const sizes: DrawerSize[] = ['sm', 'md', 'lg', 'xl', 'screen'];
      const currentIndex = sizes.indexOf(currentSize);
      if (currentIndex < sizes.length - 1) {
        onSizeChange(sizes[currentIndex + 1]);
      }
    } else if (e.key === 'ArrowDown' && onSizeChange) {
      e.preventDefault();
      const sizes: DrawerSize[] = ['sm', 'md', 'lg', 'xl', 'screen'];
      const currentIndex = sizes.indexOf(currentSize);
      if (currentIndex > 0) {
        onSizeChange(sizes[currentIndex - 1]);
      } else {
        onClose();
      }
    }
  };

  if (!shouldRender) return null;

  const renderTitle = () => {
    if (!title) return null;

    if (React.isValidElement(title)) {
      return <div>{title}</div>;
    }

    return (
      <h2 className='text-2xl font-semibold' id={titleId}>
        {title}
      </h2>
    );
  };

  const renderFooter = () => {
    if (!footer) return null;

    if (React.isValidElement(footer)) {
      const footerElement = footer as React.ReactElement<{ className?: string }>;
      const existingClassName = footerElement.props.className || '';
      return React.cloneElement(footerElement, { className: join('px-6 py-4', existingClassName) } as Record<
        string,
        unknown
      >);
    }

    return <div className='px-6 py-4'>{footer}</div>;
  };

  return (
    <>
      {createPortal(
        <div
          aria-labelledby={ariaLabelledBy ?? title ? titleId : undefined}
          aria-describedby={ariaDescribedBy}
          role='dialog'
          aria-modal='true'
          className='fixed inset-0 z-[100] overflow-hidden'
          data-drawer-open={isOpen}
        >
          <div
            className={join(
              'fixed inset-0 bg-black/40 transition-opacity duration-300',
              show ? 'opacity-100' : 'opacity-0',
              overlayClassName
            )}
            onClick={() => {
              if (!disableCloseOnOverlayClick) {
                onClose();
              }
            }}
          />

          <div className='fixed inset-x-0 bottom-0 flex max-h-full'>
            <div
              id={drawerId}
              ref={ref}
              tabIndex={-1}
              className={join(
                'relative w-full transform shadow-xl bg-popover text-popover-foreground transition-transform duration-300 ease-in-out',
                currentSize !== 'screen' && 'border-t border-border rounded-t-lg',
                drawerVariants.size[currentSize],
                show ? 'translate-y-0' : 'translate-y-full',
                className
              )}
              data-drawer-size={currentSize}
              style={{
                transform: enableDragGestures && translateY !== 0 
                  ? `translateY(${translateY}px)` 
                  : undefined,
                transition: translateY !== 0 ? 'none' : undefined,
              }}
            >
              <div className='flex h-full flex-col'>
                {/* Draggable notch handle */}
                <div 
                  className={join(
                    'flex justify-center pt-3 pb-2 cursor-grab active:cursor-grabbing',
                    enableDragGestures && 'select-none'
                  )}
                  {...dragHandlers}
                  role="button"
                  tabIndex={0}
                  aria-label="Drag to resize drawer"
                  onKeyDown={handleKeyDown}
                >
                  <div className={join(
                    'w-12 h-1.5 bg-gray-300 rounded-full transition-colors',
                    enableDragGestures && 'hover:bg-gray-400'
                  )} />
                </div>

                {title && <div className='px-6 pt-4'>{renderTitle()}</div>}

                {!hideCloseButton && (
                  <button
                    type='button'
                    onClick={onClose}
                    data-drawer-close-button='true'
                    aria-label='Close drawer'
                    className='rounded-md p-0.5 top-3 right-3 absolute opacity-80 hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-gray-500 leading-0'
                  >
                    <X size={18} />
                  </button>
                )}

                <div className={join('flex-1 overflow-y-auto px-6 pb-6', title ? 'pt-6' : 'pt-4')}>{children}</div>

                {renderFooter()}
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}