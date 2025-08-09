import { useEffect } from 'react';
import { CheckCircled, ExclamationTriangle } from '../../symbols';
import { join } from '../../utils';

interface StatusHelpMessageProps {
  elementId: string;
  type: 'error' | 'success';
  message?: string;
}

export default function StatusHelpMessage({ elementId, type, message }: StatusHelpMessageProps) {
  useEffect(() => {
    const element = document.getElementById(elementId) as HTMLElement;
    if (!element) {
      return;
    }
    if (!message && type === 'error') {
      element.removeAttribute('data-error');
      return;
    }
    if (!message && type === 'success') {
      element.removeAttribute('data-success');
      return;
    }

    element.setAttribute('aria-describedby', `${elementId}-${type}-message`);
    element.setAttribute('aria-invalid', type === 'error' ? 'true' : 'false');

    if (type === 'error') {
      element.setAttribute('data-error', 'true');
    }
    if (type === 'success') {
      element.setAttribute('data-success', 'true');
    }

    return () => {
      element.removeAttribute('aria-describedby');
      element.removeAttribute('aria-invalid');
      element.removeAttribute('data-error');
      element.removeAttribute('data-success');
    };
  }, [elementId, type, message]);

  if (!message) {
    return null;
  }

  return (
    <small
      className={join(
        'mt-0.5 text-sm inline-flex items-center gap-1 w-full justify-start',
        type === 'error' && 'text-destructive',
        type === 'success' && 'text-success'
      )}
      role='status'
    >
      {type === 'error' ? <ExclamationTriangle /> : <CheckCircled />}
      <span id={`${elementId}-${type}-message`}>{message}</span>
    </small>
  );
}
