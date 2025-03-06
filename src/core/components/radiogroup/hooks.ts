import { useCallback, useEffect, useState } from 'react';

export function useRadioFocus(id: string, selectedOptionIndex: number) {
  // manage state locally to avoid race conditions, which can result in
  // the an option failing to be selected or incorrectly selected
  const [selectedIndex, setSelectedIndex] = useState<number>(selectedOptionIndex);

  const setInitialFocus = useCallback(
    (e: Event, options: HTMLElement[]) => {
      e.preventDefault();
      if (!options.length) return;

      const indexToFocus = selectedOptionIndex !== -1 ? selectedOptionIndex : 0;
      options[indexToFocus]?.focus();
      options[indexToFocus]?.click();
      setSelectedIndex(indexToFocus);
    },
    [selectedOptionIndex]
  );

  /* Focus preceding element when Shift + Tab is pressed */
  const handleFocusPreceding = useCallback(
    (e: KeyboardEvent) => {
      // If the Shift key is not pressed while tab is entered, do nothing
      if (!e.shiftKey) {
        return;
      }

      e.preventDefault();
      const focusableElements = Array.from(
        document.querySelectorAll<HTMLElement>(
          'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => !el.hasAttribute('disabled') && el.tabIndex >= 0);
      const currentIndex = focusableElements.findIndex((el) => el.id === id);
      const previousIndex = currentIndex > 0 ? currentIndex - 1 : focusableElements.length - 1;
      focusableElements[previousIndex]?.focus();
    },
    [id]
  );

  const handleKeyboardNavigation = useCallback(
    (e: KeyboardEvent, options: HTMLElement[]) => {
      if (!options.length) return;

      // Ensure we only toggle options part of radio group
      const target = e.target as HTMLElement;
      const isGroupOption = options.some((option) => option.id === target.id);
      if (!isGroupOption) return;

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
          handleFocusPreceding(e);
          return;

        default:
          return;
      }

      options[newIndex]?.focus();
      options[newIndex]?.click();
      setSelectedIndex(newIndex);
    },
    [selectedIndex, handleFocusPreceding]
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
}
