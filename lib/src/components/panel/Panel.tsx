import { join } from '@moondreamsdev/dreamer-ui/utils';
import React, { useId } from 'react';
import { createPortal } from 'react-dom';
import { X } from '../../symbols';
import { useAnimationSlideIn, usePanelDocumentChanges, usePanelFocus } from './hooks';
import { PanelSize, panelVariants } from './variants';

export interface PanelProps {
  ref?: React.Ref<HTMLDivElement>;
  /** Unique identifier for the panel */
  id?: string;
  /** Whether the panel is open */
  isOpen: boolean;
  /** Callback when panel should close */
  onClose: () => void;
  /** Panel title - can be a string or React node */
  title?: React.ReactNode;
  /** Panel content */
  children: React.ReactNode;
  /** Panel footer - can be a string or React node */
  footer?: React.ReactNode;
  /** Panel size variant */
  size?: PanelSize;
  /** Additional CSS classes for the panel */
  className?: string;
  /** Additional CSS classes for the overlay */
  overlayClassName?: string;
  /** Whether to hide the close button */
  hideCloseButton?: boolean;
  /** Whether to disable closing when clicking the overlay */
  disableCloseOnOverlayClick?: boolean;
  /** ARIA labelledby attribute */
  ariaLabelledBy?: string;
  /** ARIA describedby attribute */
  ariaDescribedBy?: string;
}

/**
 * Panel component that slides in from the right side of the screen.
 * Provides an overlay and slide-in animation for side content display.
 */
export function Panel({
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
  ariaLabelledBy,
  ariaDescribedBy,
}: PanelProps) {
  const generatedId = useId();
  const panelId = id || `panel-${generatedId}`;
  const titleId = id ? `${id}-title` : `panel-title-${generatedId}`;

  const { show, shouldRender } = useAnimationSlideIn(isOpen);
  usePanelFocus(panelId, shouldRender);
  usePanelDocumentChanges(shouldRender, onClose);

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
          data-panel-open={isOpen}
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

          <div className='fixed inset-y-0 right-0 flex max-w-full'>
            <div
              id={panelId}
              ref={ref}
              tabIndex={-1}
              className={join(
                'relative h-full transform shadow-xl bg-popover text-popover-foreground transition-transform duration-300 ease-in-out',
                size !== 'screen' && 'border-l border-border',
                panelVariants.size[size],
                show ? 'translate-x-0' : 'translate-x-full',
                className
              )}
              data-panel-size={size}
            >
              <div className='flex h-full flex-col'>
                {title && <div className='px-6 pt-6'>{renderTitle()}</div>}

                {!hideCloseButton && (
                  <button
                    type='button'
                    onClick={onClose}
                    data-panel-close-button='true'
                    aria-label='Close panel'
                    className='rounded-md p-0.5 top-3 right-3 absolute opacity-80 hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-gray-500 leading-0'
                  >
                    <X size={18} />
                  </button>
                )}

                <div className={join('flex-1 overflow-y-auto px-6 pb-6', title ? 'pt-6' : 'pt-10')}>{children}</div>

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
