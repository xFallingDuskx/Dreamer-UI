import { Modal, ModalProps } from '@moondreamsdev/dreamer-ui/components';
import React, { useMemo } from 'react';

interface BaseActionModalProps extends Omit<ModalProps, 'children' | 'actions'> {
  message: React.ReactNode;
  destructive?: boolean;
}

interface AlertModalProps extends BaseActionModalProps {
  type: 'alert';
  confirmText?: string;
  onConfirm?: () => void;
  // Cancel-related props are not allowed for alerts
  cancelText?: never;
}

interface ConfirmModalProps extends BaseActionModalProps {
  type: 'confirm';
  confirmText?: string;
  cancelText?: string;
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
