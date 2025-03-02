import { CheckCircled, ExclamationTriangle } from '../../symbols';
import { join } from '../../util/join';

interface BottomMessageProps {
  id: string;
  type: 'error' | 'success';
  message: string;
}

export default function HelpMessage({ id, type, message }: BottomMessageProps) {
  return (
    <small
      id={`${id}-success-message`}
      className={join(
        'mt-0.5 text-sm inline-flex items-center gap-1',
        type === 'error' && 'text-danger',
        type === 'success' && 'text-success'
      )}
      role='status'
    >
      {type === 'error' ? <ExclamationTriangle /> : <CheckCircled />}
      {message}
    </small>
  );
}
