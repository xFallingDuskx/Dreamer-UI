import { Button, ButtonProps } from '@moondreamsdev/dreamer-ui/components';
import { join } from '@moondreamsdev/dreamer-ui/utils';
import React, { useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import X from './X';
import { useDocumentChanges, useHandleFocus } from './hooks';

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
  const modalRef = useRef<HTMLDivElement>(null);
  const generatedId = useId();
  const modalId = id || `modal-${generatedId}`;
  const titleId = id ? `${id}-title` : `modal-title-${generatedId}`;

  useHandleFocus({ modalId, isOpen });
  useDocumentChanges({ isOpen, onClose });

  if (!isOpen) return null;

  const renderTitle = () => {
    if (!title) return null;

    if (React.isValidElement(title)) {
      return <div className='mb-4'>{title}</div>;
    }

    return (
      <div className='mb-4'>
        <h2 className='text-xl font-semibold' id={titleId}>
          {title}
        </h2>
      </div>
    );
  };

  const renderActions = () => {
    if (actions.length === 0) return null;

    return (
      <div className='pt-4 not-sm:grid gap-y-2 sm:flex sm:justify-start sm:flex-row-reverse sm:gap-x-3'>
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
                ref={modalRef}
                id={modalId}
                tabIndex={-1}
                className={join(
                  'relative w-full max-w-xl transform rounded-lg shadow-xl transition-all p-6 bg-inherit focus:border',
                  className
                )}
              >
                {!hideCloseButton && (
                  <button
                    onClick={onClose}
                    data-modal-close-button='true'
                    className='rounded-md p-0.5 top-3 right-3 absolute opacity-80 hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-gray-500 leading-0'
                  >
                    <X size={18} />
                  </button>
                )}

                {renderTitle()}

                <div className='text-gray-700 dark:text-gray-300'>{children}</div>

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
