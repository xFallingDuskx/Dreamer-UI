import { ReactNode, useCallback, useEffect, useState } from 'react';
import { CrossCircled, ExclamationTriangle, InfoCircled, X } from '../../symbols';
import { join } from '../../utils';
export type ToastType = 'info' | 'warning' | 'error';

export interface ToastAction {
  label: string;
  onClick: () => void;
}

/** Data for a toast notification */
export interface ToastData {
  /** Unique identifier for the toast */
  id: string;
  /** The main message text for the toast */
  title: string;
  /** Optional secondary message text */
  description?: string;
  /** The type of toast which determines styling and icon. Can be extended with customTypes */
  type?: ToastType;
  /** Optional action button configuration */
  action?: ToastAction;
  /** Duration in milliseconds before auto-dismiss. Set to 0 to disable auto-dismiss */
  duration?: number;
  /** Callback fired when the toast is removed */
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

/**
 * A notification toast component for displaying temporary messages to users.
 * Supports different types, actions, and auto-dismissal with customizable styling.
 * 
 * @example
 * ```tsx
 * // Basic toast
 * <Toast
 *   id="notification-1"
 *   title="Success!"
 *   description="Your changes have been saved."
 *   type="info"
 * />
 * 
 * // Toast with action button
 * <Toast
 *   id="undo-toast"
 *   title="Item deleted"
 *   action={{ label: "Undo", onClick: restoreItem }}
 *   duration={5000}
 * />
 * 
 * // Warning toast with custom duration
 * <Toast
 *   id="warning-toast"
 *   title="Connection lost"
 *   description="Trying to reconnect..."
 *   type="warning"
 *   duration={0}
 * />
 * ```
 */
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
        'relative flex items-start p-4 rounded-lg border shadow-lg transition-all ease-in-out',
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
