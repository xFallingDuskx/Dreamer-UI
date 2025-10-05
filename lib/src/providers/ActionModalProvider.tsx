import { ReactNode, useCallback, useState } from 'react';
import { ActionModal } from '../components';
import { ActionModalContext } from '../hooks';

export interface ConfirmOptions {
  /** The title displayed in the confirmation modal header */
  title?: string;
  /** The main message content displayed in the modal body */
  message: ReactNode;
  /** Text for the confirm/accept button. Defaults to "Confirm" */
  confirmText?: string;
  /** Text for the cancel/dismiss button. Defaults to "Cancel" */
  cancelText?: string;
  /** Whether the action is destructive, affects button styling */
  destructive?: boolean;
}

export interface AlertOptions {
  /** The title displayed in the alert modal header */
  title?: string;
  /** The main message content displayed in the modal body */
  message: ReactNode;
  /** Text for the confirm/dismiss button. Defaults to "OK" */
  confirmText?: string;
  /** Whether the alert represents a destructive action, affects button styling */
  destructive?: boolean;
}

export interface ActionModalContextValue {
  /** Shows a confirmation modal and returns a promise that resolves to true if confirmed, false if cancelled */
  confirm: (options: ConfirmOptions) => Promise<boolean>;
  /** Shows an alert modal and returns a promise that resolves when dismissed */
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
        />
      )}
    </ActionModalContext.Provider>
  );
}
