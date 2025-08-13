import { useCallback, useEffect, useRef, useState } from 'react';

export function useAnimationSlideIn(isOpen: boolean) {
  const [show, setShow] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setTimeout(() => setShow(true), 10);
    } else {
      setShow(false);
      setTimeout(() => setShouldRender(false), 300);
    }
  }, [isOpen]);

  return { show, shouldRender };
}

export function usePanelDocumentChanges(isOpen: boolean, onClose: () => void) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    // Prevent background scrolling when panel is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);
}

export function usePanelFocus(panelId: string, isOpen: boolean) {
  const previousActiveElement = useRef<Element | null>(null);

  const focusAppropriateElement = useCallback(() => {
    const panelElement = document.getElementById(panelId);
    if (!panelElement) return;

    // 1. First, try to focus on the first action button, if available
    const panelActions = panelElement.querySelectorAll('[data-panel-action="true"]');
    if (panelActions.length > 0) {
      (panelActions[0] as HTMLElement).focus();
      return;
    }

    // 2. Then try first focusable element in content (giving preference to non-close button)
    const focusableElements = panelElement.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements.length > 0) {
      const allBesidesCloseButton = Array.from(focusableElements).filter((el) => {
        return !(el instanceof HTMLButtonElement && el.getAttribute('data-panel-close-button') === 'true');
      });

      if (allBesidesCloseButton.length > 0) {
        (allBesidesCloseButton[0] as HTMLElement).focus();
        return;
      }

      (focusableElements[0] as HTMLElement).focus();
      return;
    }

    // 3. Fallback to panel container
    panelElement.focus();
  }, [panelId]);

  useEffect(() => {
    if (isOpen) {
      // Store the currently focused element to restore focus later
      previousActiveElement.current = document.activeElement;

      focusAppropriateElement();
    }

    return () => {
      document.body.style.overflow = 'auto';

      // Restore focus to the previously focused element when panel closes
      if (previousActiveElement.current instanceof HTMLElement) {
        previousActiveElement.current.focus();
      }
    };
  }, [isOpen, focusAppropriateElement]);
}
