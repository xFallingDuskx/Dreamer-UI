import { useEffect } from 'react';

export function useAutoExpand(id: string, autoExpand: boolean) {
  useEffect(() => {
    const textarea = document.getElementById(id) as HTMLTextAreaElement;
    if (!textarea) {
      return;
    }

    if (!autoExpand) {
      textarea.style.height = 'auto';
      return;
    }

    const adjustHeight = () => {
      // necessary to reset the height to `auto` before calculating the new height
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    };

    adjustHeight();
    textarea.addEventListener('input', adjustHeight);
    textarea.addEventListener('resize', adjustHeight);
    window.addEventListener('resize', adjustHeight);

    return () => {
      textarea.removeEventListener('input', adjustHeight);
      textarea.removeEventListener('resize', adjustHeight);
      window.removeEventListener('resize', adjustHeight);
    };
  }, [id, autoExpand]);
}
