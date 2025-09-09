import { useEffect, useState, useRef, useCallback } from 'react';

export function useAnimationSlideIn(isOpen: boolean) {
  const [show, setShow] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // Small delay to ensure the element is rendered before animation
      const timer = setTimeout(() => setShow(true), 10);
      return () => clearTimeout(timer);
    } else {
      setShow(false);
      // Wait for animation to complete before unmounting
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return { show, shouldRender };
}

export function useDrawerDrag({
  isOpen,
  onClose,
  enabled = true,
}: {
  isOpen: boolean;
  onClose: () => void;
  enabled?: boolean;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [translateY, setTranslateY] = useState(0);
  const [startY, setStartY] = useState(0);

  const handleStart = useCallback((clientY: number) => {
    if (!enabled || !isOpen) return;
    
    setIsDragging(true);
    setStartY(clientY);
    
    // Prevent text selection during drag
    document.body.style.userSelect = 'none';
  }, [enabled, isOpen]);

  const handleMove = useCallback((clientY: number) => {
    if (!isDragging || !enabled) return;

    const deltaY = clientY - startY; // Positive when dragging down
    const clampedDeltaY = Math.max(0, deltaY); // Only allow downward drag
    
    setTranslateY(clampedDeltaY);
  }, [isDragging, enabled, startY]);

  const handleEnd = useCallback(() => {
    if (!isDragging || !enabled) return;

    setIsDragging(false);
    document.body.style.userSelect = '';

    // Close drawer if dragged down more than threshold
    const threshold = 100; // pixels
    if (translateY > threshold) {
      onClose();
    }

    // Reset translate
    setTranslateY(0);
  }, [isDragging, enabled, translateY, onClose]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    handleStart(e.clientY);
  }, [handleStart]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    handleMove(e.clientY);
  }, [handleMove]);

  const handleMouseUp = useCallback(() => {
    handleEnd();
  }, [handleEnd]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    handleStart(e.touches[0].clientY);
  }, [handleStart]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    e.preventDefault();
    handleMove(e.touches[0].clientY);
  }, [handleMove]);

  const handleTouchEnd = useCallback(() => {
    handleEnd();
  }, [handleEnd]);

  // Add global event listeners when dragging for when it goes outside the drawer
  useEffect(() => {
    if (!isDragging) return;

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!enabled) return;

    if (e.key === 'ArrowDown' || e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  }, [enabled, onClose]);

  const dragHandlers = enabled ? {
    onMouseDown: handleMouseDown,
    onTouchStart: handleTouchStart,
    onKeyDown: handleKeyDown,
  } : {};

  return {
    dragHandlers,
    translateY,
    isDragging,
  };
}

export function useDrawerFocus(drawerId: string, shouldRender: boolean) {
  const previousActiveElement = useRef<Element | null>(null);

  useEffect(() => {
    if (!shouldRender) return;

    // Store the previously focused element
    previousActiveElement.current = document.activeElement;

    const drawerElement = document.getElementById(drawerId);
    if (drawerElement) {
      // Focus the drawer container
      drawerElement.focus();
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      const drawerElement = document.getElementById(drawerId);
      if (!drawerElement) return;

      const focusableElements = drawerElement.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement?.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      
      // Restore focus to the previously active element
      if (previousActiveElement.current && typeof (previousActiveElement.current as HTMLElement).focus === 'function') {
        (previousActiveElement.current as HTMLElement).focus();
      }
    };
  }, [drawerId, shouldRender]);
}

export function useDrawerDocumentChanges(shouldRender: boolean, onClose: () => void) {
  useEffect(() => {
    if (!shouldRender) return;

    // Prevent body scroll when drawer is open
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';

    // Handle escape key
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = originalStyle;
      document.removeEventListener('keydown', handleEscape);
    };
  }, [shouldRender, onClose]);
}