import { Modal, ModalProps } from '@moondreamsdev/dreamer-ui/components';
import React, { useMemo } from 'react';

interface BaseActionModalProps extends Omit<ModalProps, 'children' | 'actions'> {
  /** The main content/message to display in the modal. */
  message: React.ReactNode;
  /** Whether to style the confirm button with destructive/danger styling. */
  destructive?: boolean;
}

interface AlertModalProps extends BaseActionModalProps {
  /** The type of action modal - alert shows only OK, confirm shows OK and Cancel. */
  type: 'alert';
  /** Custom text for the confirm/OK button. */
  confirmText?: string;
  /** Callback fired when the confirm/OK button is clicked. */
  onConfirm?: () => void;
  // Cancel-related props are not allowed for alerts
  cancelText?: never;
}

interface ConfirmModalProps extends BaseActionModalProps {
  /** The type of action modal - alert shows only OK, confirm shows OK and Cancel. */
  type: 'confirm';
  /** Custom text for the confirm/OK button. */
  confirmText?: string;
  /** Custom text for the cancel button (only for confirm type). */
  cancelText?: string;
  /** Callback fired when the confirm/OK button is clicked. */
  onConfirm?: () => void;
}

export type ActionModalProps = AlertModalProps | ConfirmModalProps;

export function ActionModal({
  type,
  message,
  cancelText,
  confirmText,
  onConfirm,
  onClose,
  destructive = false,
  title,
  ...modalProps
}: ActionModalProps) {
  const defaultTexts = useMemo(() => {
    if (type === 'confirm') {
      return {
        confirm: confirmText || 'Confirm',
        cancel: cancelText || 'Cancel',
        defaultTitle: title || 'Confirm Action',
      };
    }
    return {
      confirm: confirmText || 'OK',
      cancel: null,
      defaultTitle: title || 'Alert',
    };
  }, [type, confirmText, title, cancelText]);

  const actions: ModalProps['actions'] = useMemo(
    () => [
      ...(defaultTexts.cancel
        ? [
            {
              label: defaultTexts.cancel,
              variant: 'secondary' as const,
              onClick: onClose,
            },
          ]
        : []),
      {
        label: defaultTexts.confirm,
        variant: destructive ? 'destructive' : 'primary',
        onClick: () => {
          onConfirm?.();
          onClose();
        },
      },
    ],
    [defaultTexts, destructive, onConfirm, onClose]
  );

  return (
    <Modal
      {...modalProps}
      title={title || defaultTexts.defaultTitle}
      onClose={onClose}
      actions={actions}
      disableCloseOnOverlayClick={type === 'confirm'}
      hideCloseButton={type === 'confirm'}
    >
      {typeof message === 'string' ? <p className='text-sm'>{message}</p> : message}
    </Modal>
  );
}
