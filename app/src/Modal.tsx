import { join } from '@moondreamsdev/dreamer-ui/utils';
import React from 'react';
import { createPortal } from 'react-dom';
import X from './X';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children: React.ReactNode;
  contentOnly?: boolean;
  className?: string;
}

export function Modal({ isOpen, onClose, title, children, contentOnly = false, className }: ModalProps) {
  if (!isOpen) return null;

  return (
    <>
      {createPortal(
        <div role='dialog' className='fixed inset-0 z-[100] overflow-y-auto'>
          <div className='flex min-h-screen items-center justify-center p-4'>
            <div className='fixed inset-0 bg-black/20 transition-all' onClick={onClose} />
            <div
              className={join(
                'relative w-full max-w-xl transform rounded-lg shadow-xl transition-all',
                contentOnly && 'bg-transparent',
                !contentOnly && 'p-6',
                className
              )}
            >
              {!contentOnly && title && (
                <div className='mb-1'>
                  {typeof title === 'object' ? title : <h1 className='text-2xl font-bold'>{title}</h1>}
                </div>
              )}
              {!contentOnly && (
                <button
                  onClick={onClose}
                  className='rounded-md p-0.5 top-3 right-3 absolute focus:outline-none focus:ring leading-0'
                >
                  <X size={16} />
                </button>
              )}
              {children}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
