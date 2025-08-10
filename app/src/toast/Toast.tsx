import { ExclamationTriangle } from '@moondreamsdev/dreamer-ui/symbols';
import { join } from '@moondreamsdev/dreamer-ui/utils';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { X } from '../../../lib/src/symbols';
import { CrossCircled } from '../symbols/CrossCircled';
import InfoCircled from '../symbols/Info';

export type ToastType = 'info' | 'warning' | 'error';

export interface ToastAction {
  label: string;
  onClick: () => void;
}

export interface ToastData {
  id: string;
  title: string;
  description?: string;
  type?: ToastType;
  action?: ToastAction;
  duration?: number;
  onRemove?: (id: string) => void;
}

interface ToastProps extends ToastData {
  customTypes?: Record<string, { className: string; icon?: ReactNode }>;
  customComponent?: React.ComponentType<ToastData>;
}

const defaultTypeStyles: Record<ToastType, { className: string; icon: ReactNode }> = {
  info: {
    className: 'bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-800 dark:border-blue-950 dark:text-blue-100',
    icon: <InfoCircled size={20} />,
  },
  warning: {
    className:
      'bg-yellow-50 border-yellow-200 text-yellow-900 dark:bg-yellow-800 dark:border-yellow-950 dark:text-yellow-100',
    icon: <ExclamationTriangle size={20} />,
  },
  error: {
    className: 'bg-red-50 border-red-200 text-red-900 dark:bg-red-800 dark:border-red-950 dark:text-red-100',
    icon: <CrossCircled size={20} />,
  },
};

export function Toast({
  id,
  title,
  description,
  type = 'info',
  action,
  duration = 5000,
  onRemove,
  customTypes,
  customComponent: CustomComponent,
}: ToastProps) {
  const [isExiting, setIsExiting] = useState(false);

  const handleRemove = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      onRemove?.(id);
    }, 150); // Match animation duration
  }, [id, onRemove]);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleRemove();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, id, onRemove, handleRemove]);

  if (CustomComponent) {
    return (
      <CustomComponent
        id={id}
        title={title}
        description={description}
        type={type}
        action={action}
        duration={duration}
        onRemove={onRemove}
      />
    );
  }

  // Check custom types first, then fall back to default
  const typeStyle = customTypes?.[type] || defaultTypeStyles[type as ToastType] || defaultTypeStyles.info;

  return (
    <div
      role={type === 'error' ? 'alert' : 'status'}
      aria-live={type === 'error' ? undefined : 'polite'}
      className={join(
        'relative flex items-start p-4 rounded-lg border shadow-lg transition-all duration-150 ease-in-out',
        action && 'pb-3',
        typeStyle.className,
        isExiting ? 'opacity-0 translate-x-full' : 'opacity-100 translate-x-0'
      )}
    >
      {/* Icon */}
      <div className='flex-shrink-0 mr-3'>{typeStyle.icon}</div>

      {/* Content */}
      <div className='flex-grow min-w-0'>
        <div className='font-medium text-sm leading-5'>{title}</div>
        {description && <div className='mt-1 text-sm opacity-90 leading-5'>{description}</div>}
        {action && (
          <div className='mt-1.5'>
            <button
              onClick={action.onClick}
              className='text-sm font-medium underline hover:no-underline focus:outline-none focus:ring-1 focus:ring-current rounded px-1 py-0.5 hover:cursor-pointer'
            >
              {action.label}
            </button>
          </div>
        )}
      </div>

      {/* Close button */}
      <button
        onClick={handleRemove}
        className='flex-shrink-0 ml-3 p-1 rounded-md hover:bg-black/10 dark:hover:bg-white/10 focus:outline-none focus:ring-1 focus:ring-current leading-0'
      >
        <X size={16} />
      </button>
    </div>
  );
}
