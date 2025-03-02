import { useEffect } from 'react';
import { CheckCircled, ExclamationTriangle } from '../../symbols';
import { join } from '../../util/join';

interface StatusHelpMessageProps {
  elementId: string;
  type: 'error' | 'success';
  message?: string;
}

export default function StatusHelpMessage({ elementId, type, message }: StatusHelpMessageProps) {
  useEffect(() => {
    const element = document.getElementById(elementId) as HTMLElement;
    if (element && message) {
      element.setAttribute('aria-describedby', `${elementId}-${type}-message`);
    }
  }, [elementId, type, message]);

  if (!message) {
    return null;
  }

  return (
    <small
      className={join(
        'mt-0.5 text-sm inline-flex items-center gap-1',
        type === 'error' && 'text-danger',
        type === 'success' && 'text-success'
      )}
      role='status'
    >
      {type === 'error' ? <ExclamationTriangle /> : <CheckCircled />}
      <span id={`${elementId}-${type}-message`}>{message}</span>
    </small>
  );
}
