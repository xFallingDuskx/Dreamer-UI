import { ReactNode, useCallback, useState } from 'react';
import { ActionModal } from '../components';
import { ActionModalContext } from '../hooks';

export interface ConfirmOptions {
  title?: string;
  message: ReactNode;
  confirmText?: string;
  cancelText?: string;
  destructive?: boolean;
}

export interface AlertOptions {
  title?: string;
  message: ReactNode;
  confirmText?: string;
  destructive?: boolean;
}

export interface ActionModalContextValue {
  confirm: (options: ConfirmOptions) => Promise<boolean>;
  alert: (options: AlertOptions) => Promise<void>;
}

interface ActionModalState {
  isOpen: boolean;
  type: 'alert' | 'confirm';
  title?: string;
  message: ReactNode;
  confirmText?: string;
  cancelText?: string;
  destructive?: boolean;
  resolve?: ((value: boolean) => void) | (() => void);
}

export function ActionModalProvider({ children }: { children: ReactNode }) {
  const [modalState, setModalState] = useState<ActionModalState | null>(null);

  const confirm = useCallback((options: ConfirmOptions): Promise<boolean> => {
    return new Promise((resolve) => {
      setModalState({
        isOpen: true,
        type: 'confirm',
        title: options.title,
        message: options.message,
        confirmText: options.confirmText,
        cancelText: options.cancelText,
        destructive: options.destructive,
        resolve,
      });
    });
  }, []);

  const alert = useCallback((options: AlertOptions): Promise<void> => {
    return new Promise((resolve) => {
      setModalState({
        isOpen: true,
        type: 'alert',
        title: options.title,
        message: options.message,
        confirmText: options.confirmText,
        destructive: options.destructive,
        resolve,
      });
    });
  }, []);

  const handleClose = useCallback(() => {
    if (modalState?.resolve) {
      if (modalState.type === 'confirm') {
        (modalState.resolve as (value: boolean) => void)(false);
      } else {
        (modalState.resolve as () => void)();
      }
    }
    setModalState(null);
  }, [modalState]);

  const handleConfirm = useCallback(() => {
    if (modalState?.resolve) {
      if (modalState.type === 'confirm') {
        (modalState.resolve as (value: boolean) => void)(true);
      } else {
        (modalState.resolve as () => void)();
      }
    }
    setModalState(null);
  }, [modalState]);

  const contextValue: ActionModalContextValue = {
    confirm,
    alert,
  };

  return (
    <ActionModalContext.Provider value={contextValue}>
      {children}
      {modalState && modalState.type === 'alert' && (
        <ActionModal
          type='alert'
          isOpen={modalState.isOpen}
          onClose={handleClose}
          title={modalState.title}
          message={modalState.message}
          confirmText={modalState.confirmText}
          destructive={modalState.destructive}
          onConfirm={handleConfirm}
          className='bg-white dark:bg-gray-800 rounded-lg'
        />
      )}
      {modalState && modalState.type === 'confirm' && (
        <ActionModal
          type='confirm'
          isOpen={modalState.isOpen}
          onClose={handleClose}
          title={modalState.title}
          message={modalState.message}
          confirmText={modalState.confirmText}
          cancelText={modalState.cancelText}
          destructive={modalState.destructive}
          onConfirm={handleConfirm}
          className='bg-white dark:bg-gray-800 rounded-lg'
        />
      )}
    </ActionModalContext.Provider>
  );
}
