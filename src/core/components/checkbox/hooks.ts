import { useCallback, useEffect, useState } from 'react';

export function useFilledBackgroundColor(id: string) {
  const [filledBackgroundColor, setFilledBackgroundColor] = useState<string>('');

  const getFirstNonTransparentBackgroundColor = useCallback((element: Element | null): string => {
    let currentElement = element;
    let color = '';
    while (currentElement && !color) {
      const backgroundColor = window.getComputedStyle(currentElement).backgroundColor;
      if (backgroundColor && backgroundColor !== 'transparent' && backgroundColor !== 'rgba(0, 0, 0, 0)') {
        color = backgroundColor;
      }
      currentElement = currentElement.parentElement;
    }
    return color || 'transparent';
  }, []);

  useEffect(() => {
    const checkbox = document.getElementById(id);
    if (checkbox) {
      const backgroundColor = getFirstNonTransparentBackgroundColor(checkbox.parentElement);
      setFilledBackgroundColor(backgroundColor);
    }
  }, [id, getFirstNonTransparentBackgroundColor]);

  return filledBackgroundColor;
}
