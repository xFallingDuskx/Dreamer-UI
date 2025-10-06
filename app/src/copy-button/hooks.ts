import { useState, useCallback } from 'react';

/**
 * Hook to manage copy state with automatic reset after a delay.
 * 
 * @param delay - Time in milliseconds before resetting the copied state (default: 2000ms)
 * @returns Object containing copied state and handleCopy function
 */
export function useCopy(delay: number = 2000) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      
      setTimeout(() => {
        setCopied(false);
      }, delay);
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  }, [delay]);

  return { copied, handleCopy };
}
