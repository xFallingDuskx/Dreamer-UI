import { join } from '@moondreamsdev/dreamer-ui/utils';
import React from 'react';
import { createPortal } from 'react-dom';
import { Button, ButtonProps } from '@moondreamsdev/dreamer-ui/components';
import X from './X';

interface ModalAction extends Omit<ButtonProps, 'children'> {
  label: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children: React.ReactNode;
  contentOnly?: boolean;
  className?: string;
  hideCloseButton?: boolean;
  actions?: ModalAction[];
  disableCloseOnOverlayClick?: boolean;
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  contentOnly = false,
  className,
  hideCloseButton = false,
  actions = [],
  disableCloseOnOverlayClick = false,
}: ModalProps) {
  if (!isOpen) return null;

  const renderTitle = () => {
    if (typeof title === 'string') {
      return (
        <div className='mb-4'>
          <h2 className='text-xl font-semibold'>{title}</h2>
        </div>
      );
    }
    if (React.isValidElement(title)) {
      return <div className='mb-4'>{title}</div>;
    }

    return null;
  };

  const renderActions = () => {
    if (actions.length === 0) return null;

    return (
      <div className='pt-4 not-sm:grid gap-y-2 sm:flex sm:justify-start sm:flex-row-reverse sm:gap-x-3'>
        {actions.map((action, index) => {
          const { label, className, ...buttonProps } = action;
          return (
            <Button key={index} className={className} {...buttonProps}>
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
        <div role='dialog' className='fixed inset-0 z-[100] overflow-y-auto'>
          <div className='flex min-h-screen items-center justify-center p-4'>
            <div
              className='fixed inset-0 bg-black/20 transition-all'
              onClick={() => {
                if (!disableCloseOnOverlayClick) {
                  onClose();
                }
              }}
            />

            {contentOnly && <div className={join('relative w-fit', className)}>{children}</div>}

            {!contentOnly && (
              <div
                className={join(
                  'relative w-full max-w-xl transform rounded-lg shadow-xl transition-all p-6 bg-inherit',
                  className
                )}
              >
                {!hideCloseButton && (
                  <button
                    onClick={onClose}
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
