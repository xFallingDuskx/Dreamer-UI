import { Button, ButtonProps } from '@moondreamsdev/dreamer-ui/components';
import { join } from '@moondreamsdev/dreamer-ui/utils';
import React, { useId } from 'react';
import { createPortal } from 'react-dom';
import X from './X';
import { useAnimationOpenClose, useDocumentChanges, useHandleFocus } from './hooks';

interface ModalAction extends Omit<ButtonProps, 'children'> {
  label: string;
}

export interface ModalProps {
  id?: string;
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children: React.ReactNode;
  contentOnly?: boolean;
  className?: string;
  overlayClassName?: string;
  hideCloseButton?: boolean;
  actions?: ModalAction[];
  disableCloseOnOverlayClick?: boolean;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
}

export function Modal({
  id,
  isOpen,
  onClose,
  title,
  children,
  contentOnly = false,
  className,
  overlayClassName,
  hideCloseButton = false,
  actions = [],
  disableCloseOnOverlayClick = false,
  ariaLabelledBy,
  ariaDescribedBy,
}: ModalProps) {
  const generatedId = useId();
  const modalId = id || `modal-${generatedId}`;
  const titleId = id ? `${id}-title` : `modal-title-${generatedId}`;

  const { show, shouldRender } = useAnimationOpenClose({ isOpen });
  useHandleFocus({ modalId, isOpen: shouldRender });
  useDocumentChanges({ isOpen: shouldRender, onClose });

  if (!shouldRender) return null;

  const renderTitle = () => {
    if (!title) return null;

    if (React.isValidElement(title)) {
      return <div className='mb-4'>{title}</div>;
    }

    return (
      <h2 className='mb-4 text-xl font-semibold' id={titleId}>
        {title}
      </h2>
    );
  };

  const renderActions = () => {
    if (actions.length === 0) return null;

    return (
      <div className='mt-6 not-sm:grid gap-y-2 sm:flex sm:justify-start sm:flex-row-reverse sm:gap-x-3'>
        {actions.map((action, index) => {
          const { label, className, ...buttonProps } = action;
          return (
            <Button key={index} className={className} type='button' {...buttonProps} data-modal-action='true'>
              {label}
            </Button>
          );
        })}
      </div>
    );
  };

  return (
    <>
      {createPortal(
        <div
          aria-labelledby={ariaLabelledBy ?? title ? titleId : undefined}
          aria-describedby={ariaDescribedBy}
          role='dialog'
          aria-modal='true'
          className='fixed inset-0 z-[100] overflow-y-auto'
        >
          <div className='flex min-h-screen items-center justify-center p-4'>
            <div
              className={join('fixed inset-0 bg-black/20 transition-all', overlayClassName)}
              onClick={() => {
                if (!disableCloseOnOverlayClick) {
                  onClose();
                }
              }}
            />

            {contentOnly && <div className={join('relative w-fit', className)}>{children}</div>}

            {!contentOnly && (
              <div
                id={modalId}
                tabIndex={-1}
                className={join(
                  'relative w-full max-w-xl transform rounded-lg shadow-xl transition-all p-6 bg-inherit focus:border ease-in duration-75',
                  show ? 'opacity-100 scale-100' : 'opacity-0 scale-90',
                  className
                )}
              >
                {!hideCloseButton && (
                  <button
                    onClick={onClose}
                    data-modal-close-button='true'
                    className='rounded-md p-0.5 top-2.5 right-2.5 absolute opacity-80 hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-gray-500 leading-0'
                  >
                    <X size={18} />
                  </button>
                )}

                {renderTitle()}

                {children}

                {renderActions()}
              </div>
            )}
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
