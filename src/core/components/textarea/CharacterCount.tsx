import { useEffect, useState } from 'react';
import { join } from '../../util/join';

interface CharacterCountProps {
  elementId: string;
  maxLength: number;
}

export default function CharacterCount({ elementId, maxLength }: CharacterCountProps) {
  const [characterCount, setCharacterCount] = useState(0);

  useEffect(() => {
    const textarea = document.getElementById(elementId) as HTMLTextAreaElement;
    if (!textarea) {
      return;
    }

    const updateCharacterCount = () => {
      const updatedCharacterCount = textarea.value.length;
      setCharacterCount(updatedCharacterCount);
      const isError = updatedCharacterCount >= maxLength;
      textarea.setAttribute('aria-describedby', `${elementId}-character-count`);
      textarea.setAttribute('aria-invalid', isError ? 'true' : 'false');

      if (isError) {
        textarea.setAttribute('data-error', 'true');
      } else {
        textarea.removeAttribute('data-error');
      }
    };

    updateCharacterCount();
    textarea.addEventListener('input', updateCharacterCount);
    textarea.setAttribute('maxlength', String(maxLength));

    return () => {
      textarea.removeEventListener('input', updateCharacterCount);
      textarea.removeAttribute('maxlength');
      textarea.removeAttribute('aria-describedby');
      textarea.removeAttribute('aria-invalid');
      textarea.removeAttribute('data-error');
    };
  }, [elementId, maxLength]);

  return (
    <small
      className={join(
        'mt-0.5 text-sm inline-flex items-center gap-1 w-full justify-end',
        characterCount >= maxLength && 'text-danger',
        characterCount < maxLength && 'text-current'
      )}
      role='status'
    >
      <span id={`${elementId}-character-count`}>
        {characterCount} / {maxLength} characters
      </span>
    </small>
  );
}
