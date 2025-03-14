import { useCallback, useEffect, useState } from 'react';

export function useRadioFocus(id: string, selectedOptionIndex: number) {
  // Manage state locally to avoid race conditions, which can result in
  // the an option failing to be selected or incorrectly selected
  const [focusedIndex, setFocusedIndex] = useState<number>(selectedOptionIndex);
  const [clickedIndex, setClickedIndex] = useState<number>(-1);
  // Prevent onClicks from triggering focus events and automatically selecting the first option
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);

  const handleClicked = useCallback((options: HTMLElement[], index: number) => {
    const target = options[index] as HTMLElement;

    // Check if the target element is disabled
    const isDisabled = target.hasAttribute('disabled') || target.getAttribute('aria-disabled') === 'true';
    if (isDisabled) return;

    // Update the selected index
    options[index]?.click();
    setClickedIndex(index);
  }, []);

  const setInitialFocus = useCallback(
    (e: Event, options: HTMLElement[]) => {
      e.preventDefault();
      if (isMouseDown) return;
      if (!options.length) return;

      const indexToFocus = selectedOptionIndex !== -1 ? selectedOptionIndex : 0;
      options[indexToFocus]?.focus();
      setFocusedIndex(indexToFocus);

      // Only update the selected index if one is already set
      if (selectedOptionIndex !== -1) {
        handleClicked(options, indexToFocus);
      }
    },
    [selectedOptionIndex, isMouseDown, handleClicked]
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

      const currentIndex = focusedIndex !== -1 ? focusedIndex : 0;
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

        // Select the option when the space key is pressed
        case ' ':
          e.preventDefault();
          handleClicked(options, currentIndex);
          return;

        case 'Tab':
          handleFocusPreceding(e);
          return;

        default:
          return;
      }

      options[newIndex]?.focus();
      setFocusedIndex(newIndex);
      // Only update the selected index if one is already set
      if (clickedIndex !== -1) {
        handleClicked(options, newIndex);
      }
    },
    [focusedIndex, clickedIndex, handleFocusPreceding, handleClicked]
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
    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);

    document.addEventListener('keydown', handleKeyDown);
    radioGroup.addEventListener('focus', handleFocus);
    radioGroup.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp); // place on document since mouseup event can occur outside of radio group
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      radioGroup.removeEventListener('focus', handleFocus);
      radioGroup.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [id, getRadioOptions, setInitialFocus, handleKeyboardNavigation]);
}
