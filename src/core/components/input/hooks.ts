import { useEffect, useState } from 'react';

export function useDisplay(id: string) {
  const [inputtedText, setInputtedText] = useState('');
  const [font, setFont] = useState('');
  const [color, setColor] = useState('');

  // TASK: consider creating 2 custom hooks - useMutationObserver and useEventListener
  useEffect(() => {
    const input = document.getElementById(id) as HTMLInputElement;
    if (!input) {
      return;
    }

    const updateStyles = () => {
      const font = getComputedStyle(input).font;
      setFont(font);
      const color = getComputedStyle(input).color;
      setColor(color);
    };
    updateStyles();

    const handleInputChange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      setInputtedText(target.value);
    };

    input.addEventListener('input', handleInputChange);

    const observer = new MutationObserver(() => {
      updateStyles();
    });

    observer.observe(input, { attributes: true });

    return () => {
      input.removeEventListener('input', handleInputChange);
      observer.disconnect();
    };
  }, [id]);

  return { inputtedText, font, color };
}
