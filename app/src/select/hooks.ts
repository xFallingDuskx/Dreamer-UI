import { useCallback, useEffect, useState, RefObject } from 'react';

export interface SelectOption {
  text: string;
  value: string;
  description?: string;
  disabled?: boolean;
}

export function useSelectDropdown(isOpen: boolean) {
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

interface UseSelectKeyboardNavigationProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  filteredOptions: SelectOption[];
  highlightedIndex: number;
  setHighlightedIndex: (index: number) => void;
  onSelect: (option: SelectOption) => void;
  triggerRef: RefObject<HTMLButtonElement | null>;
}

export function useSelectKeyboardNavigation({
  isOpen,
  setIsOpen,
  filteredOptions,
  highlightedIndex,
  setHighlightedIndex,
  onSelect,
  triggerRef,
}: UseSelectKeyboardNavigationProps) {
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          const nextIndex = highlightedIndex < filteredOptions.length - 1 ? highlightedIndex + 1 : 0;
          // Skip disabled options
          let finalIndex = nextIndex;
          for (let i = 0; i < filteredOptions.length; i++) {
            const checkIndex = (nextIndex + i) % filteredOptions.length;
            if (!filteredOptions[checkIndex].disabled) {
              finalIndex = checkIndex;
              break;
            }
          }
          setHighlightedIndex(finalIndex);
        }
        break;
      
      case 'ArrowUp':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          const prevIndex = highlightedIndex > 0 ? highlightedIndex - 1 : filteredOptions.length - 1;
          // Skip disabled options
          let finalIndex = prevIndex;
          for (let i = 0; i < filteredOptions.length; i++) {
            const checkIndex = (prevIndex - i + filteredOptions.length) % filteredOptions.length;
            if (!filteredOptions[checkIndex].disabled) {
              finalIndex = checkIndex;
              break;
            }
          }
          setHighlightedIndex(finalIndex);
        }
        break;
      
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else if (highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
          const selectedOption = filteredOptions[highlightedIndex];
          if (!selectedOption.disabled) {
            onSelect(selectedOption);
          }
        }
        break;
      
      case 'Escape':
        e.preventDefault();
        if (isOpen) {
          setIsOpen(false);
          triggerRef.current?.focus();
        }
        break;
      
      case 'Tab':
        if (isOpen) {
          setIsOpen(false);
        }
        break;
    }
  }, [isOpen, setIsOpen, filteredOptions, highlightedIndex, setHighlightedIndex, onSelect, triggerRef]);

  return { handleKeyDown };
}
