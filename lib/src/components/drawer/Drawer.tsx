import React, { useId } from 'react';
import { createPortal } from 'react-dom';
import { X } from '../../symbols';
import { join } from '../../utils';
import { useAnimationSlideIn, useDrawerDocumentChanges, useDrawerDrag, useDrawerFocus } from './hooks';

export interface DrawerProps {
  /** Reference to the drawer element */
  ref?: React.Ref<HTMLDivElement>;
  /** Unique identifier for the drawer */
  id?: string;
  /** Whether the drawer is open */
  isOpen: boolean;
  /** Callback fired when the drawer should close */
  onClose: () => void;
  /** Optional title for the drawer header */
  title?: React.ReactNode;
  /** The content to display inside the drawer */
  children: React.ReactNode;
  /** Optional footer content for the drawer */
  footer?: React.ReactNode;
  /** Additional CSS classes to apply to the drawer */
  className?: string;
  /** Additional CSS classes to apply to the overlay */
  overlayClassName?: string;
  /** Whether to show the close button in the top-right corner */
  showCloseButton?: boolean;
  /** Whether to disable closing when clicking the overlay */
  disableCloseOnOverlayClick?: boolean;
  /** Whether to enable drag gestures on the notch for closing */
  enableDragGestures?: boolean;
  /** ARIA labelledby attribute */
  ariaLabelledBy?: string;
  /** ARIA describedby attribute */
  ariaDescribedBy?: string;
}

/**
 * A bottom-slide drawer component for mobile-friendly overlays and forms.
 * Includes drag gestures, focus management, and smooth animations.
 * 
 * @example
 * ```tsx
 * // Basic drawer
 * <Drawer
 *   isOpen={showDrawer}
 *   onClose={() => setShowDrawer(false)}
 *   title="Settings"
 * >
 *   <p>Drawer content goes here</p>
 * </Drawer>
 * 
 * // Full-featured drawer
 * <Drawer
 *   isOpen={showForm}
 *   onClose={handleClose}
 *   title="Edit Profile"
 *   footer={<Button onClick={save}>Save Changes</Button>}
 *   enableDragGestures
 *   showCloseButton
 * >
 *   <ProfileForm />
 * </Drawer>
 * ```
 */
export function Drawer({
  ref,
  id,
  isOpen,
  onClose,
  title,
  children,
  footer,
  className,
  overlayClassName,
  showCloseButton = false,
  disableCloseOnOverlayClick = false,
  enableDragGestures = true,
  ariaLabelledBy,
  ariaDescribedBy,
}: DrawerProps) {
  const generatedId = useId();
  const drawerId = id || `drawer-${generatedId}`;
  const titleId = `${generatedId}-title`;

  const { show, shouldRender } = useAnimationSlideIn(isOpen);
  const { dragHandlers, translateY, isDragging } = useDrawerDrag({
    isOpen,
    onClose,
    enabled: enableDragGestures,
  });
  useDrawerFocus(drawerId, shouldRender);
  useDrawerDocumentChanges(shouldRender, onClose);

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
              'fixed inset-0 bg-black/40 transition-opacity',
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
                'relative w-screen transform shadow-xl bg-popover text-popover-foreground transition-transform ease-in-out border-t border-border rounded-t-lg',
                show ? 'translate-y-0' : 'translate-y-full',
                className
              )}
              style={{
                transform: enableDragGestures && translateY !== 0 ? `translateY(${translateY}px)` : undefined,
                transition: translateY !== 0 ? 'none' : undefined,
              }}
            >
              <div className='flex h-full flex-col'>
                {enableDragGestures && (
                  <div
                    className={join(
                      'flex justify-center pt-3 pb-2 cursor-grab active:cursor-grabbing',
                      enableDragGestures && 'select-none'
                    )}
                    {...dragHandlers}
                    role={enableDragGestures ? 'button' : undefined}
                    tabIndex={enableDragGestures ? 0 : undefined}
                    aria-label={enableDragGestures ? 'Drag to resize drawer' : undefined}
                  >
                    <div
                      className={join(
                        'w-12 h-1.5 bg-popover-foreground/25 rounded-full transition-colors',
                        enableDragGestures && 'hover:bg-popover-foreground/50',
                        isDragging && 'bg-popover-foreground/50'
                      )}
                    />
                  </div>
                )}

                {title && <div className='px-6 pt-4'>{renderTitle()}</div>}

                {showCloseButton && (
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
