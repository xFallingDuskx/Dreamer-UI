import { useEffect, useState, useRef, useCallback } from 'react';
import { DrawerSize } from './variants';

/**
 * Hook to manage slide-in animation state
 */
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

/**
 * Hook to manage drag gestures for drawer resizing
 */
export function useDrawerDrag({
  isOpen,
  initialSize,
  onClose,
  onSizeChange,
  enabled = true,
}: {
  isOpen: boolean;
  initialSize: DrawerSize;
  onClose: () => void;
  onSizeChange?: (size: DrawerSize) => void;
  enabled?: boolean;
}) {
  const [currentSize, setCurrentSize] = useState<DrawerSize>(initialSize);
  const [isDragging, setIsDragging] = useState(false);
  const [translateY, setTranslateY] = useState(0);
  const [startY, setStartY] = useState(0);
  const initialHeight = useRef(0);

  // Update current size when prop changes
  useEffect(() => {
    if (!isDragging) {
      setCurrentSize(initialSize);
    }
  }, [initialSize, isDragging]);

  const getSizeFromHeight = useCallback((height: number): DrawerSize => {
    const vh = window.innerHeight;
    const percentage = (height / vh) * 100;
    
    if (percentage >= 95) return 'screen';
    if (percentage >= 80) return 'xl';
    if (percentage >= 70) return 'lg';
    if (percentage >= 55) return 'md';
    return 'sm'
  }, []);

  const getHeightFromSize = useCallback((size: DrawerSize): number => {
    const vh = window.innerHeight;
    switch (size) {
      case 'sm': return vh * 0.4;
      case 'md': return vh * 0.6;
      case 'lg': return vh * 0.75;
      case 'xl': return vh * 0.85;
      case 'screen': return vh;
      default: return vh * 0.6;
    }
  }, []);

  const handleStart = useCallback((clientY: number) => {
    if (!enabled || !isOpen) return;
    
    setIsDragging(true);
    setStartY(clientY);
    initialHeight.current = getHeightFromSize(currentSize);
    
    // Prevent text selection during drag
    document.body.style.userSelect = 'none';
  }, [enabled, isOpen, currentSize, getHeightFromSize]);

  const handleMove = useCallback((clientY: number) => {
    if (!isDragging || !enabled) return;

    const deltaY = startY - clientY; // Inverted: dragging up increases height
    const newHeight = Math.max(100, initialHeight.current + deltaY);
    const maxHeight = window.innerHeight;
    const clampedHeight = Math.min(newHeight, maxHeight);
    
    // Calculate translate for smooth dragging
    const targetTranslateY = Math.max(0, initialHeight.current - clampedHeight);
    setTranslateY(targetTranslateY);

    // Update size based on height
    const newSize = getSizeFromHeight(clampedHeight);
    setCurrentSize(newSize);
  }, [isDragging, enabled, startY, getSizeFromHeight]);

  const handleEnd = useCallback(() => {
    if (!isDragging || !enabled) return;

    setIsDragging(false);
    document.body.style.userSelect = '';

    // Determine final action based on drag distance and velocity
    const dragDistance = translateY;
    const threshold = getHeightFromSize(currentSize) * 0.3;

    if (dragDistance > threshold) {
      // Dragged down significantly - close drawer
      onClose();
    } else {
      // Snap to current size
      if (onSizeChange && currentSize !== initialSize) {
        onSizeChange(currentSize);
      }
    }

    // Reset translate
    setTranslateY(0);
  }, [isDragging, enabled, translateY, currentSize, initialSize, onClose, onSizeChange, getHeightFromSize]);

  // Mouse events
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

  // Touch events
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

  // Add global event listeners when dragging
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

  const dragHandlers = enabled ? {
    onMouseDown: handleMouseDown,
    onTouchStart: handleTouchStart,
  } : {};

  return {
    dragHandlers,
    currentSize,
    translateY,
    isDragging,
  };
}

/**
 * Hook to manage focus trapping within the drawer
 */
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

/**
 * Hook to manage document changes when drawer is open (prevent body scroll, handle escape key)
 */
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