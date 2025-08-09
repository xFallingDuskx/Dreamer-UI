import { useCallback, useEffect, useRef, useState } from 'react';
import { ModalProps } from './Modal';

export function useAnimationOpenClose({ isOpen }: Pick<ModalProps, 'isOpen'>) {
  const [show, setShow] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setTimeout(() => setShow(true), 10);
    } else {
      setShow(false);
      setTimeout(() => setShouldRender(false), 150);
    }
  }, [isOpen]);

  return { show, shouldRender };
}

export function useDocumentChanges({ isOpen, onClose }: Pick<ModalProps, 'isOpen' | 'onClose'>) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    // Prevent background scrolling when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);
}

export function useHandleFocus({ modalId, isOpen }: { modalId: string; isOpen: boolean }) {
  const previousActiveElement = useRef<Element | null>(null);

  const focusAppropriateElement = useCallback(() => {
    const modalElement = document.getElementById(modalId);
    if (!modalElement) return;

    // 1. First, try to focus on the first action button, if available
    const modalActions = modalElement.querySelectorAll('[data-modal-action="true"]');
    if (modalActions.length > 0) {
      (modalActions[0] as HTMLElement).focus();
      return;
    }

    // 2. Then try first focusable element in content (giving preference to non-close button)
    const focusableElements = modalElement.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements.length > 0) {
      const allBesidesCloseButton = Array.from(focusableElements).filter((el) => {
        return !(el instanceof HTMLButtonElement && el.getAttribute('data-modal-close-button') === 'true');
      });

      if (allBesidesCloseButton.length > 0) {
        (allBesidesCloseButton[0] as HTMLElement).focus();
        return;
      }

      (focusableElements[0] as HTMLElement).focus();
      return;
    }

    // 3. Fallback to modal container
    modalElement.focus();
  }, [modalId]);

  useEffect(() => {
    if (isOpen) {
      // Store the currently focused element to restore focus later
      previousActiveElement.current = document.activeElement;

      focusAppropriateElement();
    }

    return () => {
      document.body.style.overflow = 'auto';

      // Restore focus to the previously focused element when modal closes
      if (previousActiveElement.current instanceof HTMLElement) {
        previousActiveElement.current.focus();
      }
    };
  }, [isOpen, focusAppropriateElement]);
}
