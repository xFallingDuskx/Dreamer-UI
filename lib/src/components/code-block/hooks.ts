import { useCallback, useEffect, useRef, useState } from 'react';

export function useCopyToClipboard(text: string) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);

      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  }, [text]);

  return { copied, handleCopy };
}

/**
 * Hook for managing fullscreen mode with focus management and body scroll prevention
 */
export function useFullscreenMode(isFullscreen: boolean, setIsFullscreen: (value: boolean) => void) {
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isFullscreen) {
      previousActiveElement.current = document.activeElement as HTMLElement;

      // Prevent document scrolling
      document.body.style.overflow = 'hidden';

      // Focus the container in fullscreen mode
      setTimeout(() => {
        containerRef.current?.focus();
      }, 100);

      // Trap focus within the fullscreen container
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsFullscreen(false);
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        // Restore document scrolling
        document.body.style.overflow = '';
      };
    } else if (previousActiveElement.current) {
      // Restore focus when exiting fullscreen
      previousActiveElement.current.focus();
      previousActiveElement.current = null;
    }
  }, [isFullscreen, setIsFullscreen]);

  return { containerRef };
}

/**
 * Hook for keyboard navigation shortcuts
 */
export function useKeyboardShortcuts(
  allowCopy: boolean,
  allowFullscreen: boolean,
  onCopy: () => void,
  onToggleFullscreen: () => void
) {
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'c' && (e.metaKey || e.ctrlKey) && allowCopy) {
        e.preventDefault();
        onCopy();
      } else if (e.key === 'f' && allowFullscreen) {
        e.preventDefault();
        onToggleFullscreen();
      }
    },
    [allowCopy, allowFullscreen, onCopy, onToggleFullscreen]
  );

  return { handleKeyDown };
}
