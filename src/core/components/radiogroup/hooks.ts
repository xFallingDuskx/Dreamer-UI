import { useCallback, useEffect, useState } from 'react';

export function useRadioFocus(id: string, selectedOptionIndex: number) {
  const [focused, setFocused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(selectedOptionIndex);

  const setInitialFocus = useCallback(
    (e: Event, options: HTMLElement[]) => {
      e.preventDefault();
      if (!options.length) return;

      const indexToFocus = selectedOptionIndex !== -1 ? selectedOptionIndex : 0;
      console.log('indexToFocus', indexToFocus); // REMOVE
      options[indexToFocus]?.focus();
      options[indexToFocus]?.click();
      setFocused(true);
      setSelectedIndex(indexToFocus);
    },
    [selectedOptionIndex]
  );

  const handleKeyboardNavigation = useCallback(
    (e: KeyboardEvent, options: HTMLElement[]) => {
      if (!options.length) return;

      const currentIndex = selectedIndex !== -1 ? selectedIndex : 0;
      let newIndex = currentIndex;

      switch (e.key) {
        case 'ArrowUp':
        case 'ArrowLeft':
          e.preventDefault();
          newIndex = currentIndex > 0 ? currentIndex - 1 : options.length - 1;
          break;

        case 'ArrowDown':
        case 'ArrowRight':
          e.preventDefault();
          newIndex = (currentIndex + 1) % options.length;
          break;

        case 'Tab':
          // Let default tab behavior handle focus movement
          setFocused(false);
          return;

        default:
          return;
      }

      options[newIndex]?.focus();
      options[newIndex]?.click();
      setFocused(true);
      setSelectedIndex(newIndex);
    },
    [selectedIndex]
  );

  const getRadioOptions = useCallback((): HTMLElement[] => {
    const radioGroup = document.querySelector(`[id="${id}"][role="radiogroup"]`);
    if (!radioGroup) return [];

    return Array.from(radioGroup.querySelectorAll('[role="radio"]'));
  }, [id]);

  useEffect(() => {
    const radioGroup = document.querySelector(`[id="${id}"][role="radiogroup"]`);
    if (!radioGroup) return;

    const options = getRadioOptions();
    const handleFocus = (e: Event) => setInitialFocus(e, options);
    const handleKeyDown = (e: KeyboardEvent) => handleKeyboardNavigation(e, options);

    document.addEventListener('keydown', handleKeyDown);
    radioGroup.addEventListener('focus', handleFocus);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      radioGroup.removeEventListener('focus', handleFocus);
    };
  }, [id, getRadioOptions, setInitialFocus, handleKeyboardNavigation]);

  return {
    focused,
    selectedIndex,
  };
}
