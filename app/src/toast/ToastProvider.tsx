import { join } from '@moondreamsdev/dreamer-ui/utils';
import { ReactNode, useCallback, useState } from 'react';
import { Toast, ToastData, ToastType } from './Toast';
import { AddToastOptions, ToastContext, ToastContextValue } from './useToast';

interface ToastProviderProps {
  children: ReactNode;
  customTypes?: Record<string, { className: string; icon?: ReactNode }>;
  customComponent?: React.ComponentType<ToastData>;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
  maxToasts?: number;
}

const positionClasses = {
  'top-right': 'top-4 right-4',
  'top-left': 'top-4 left-4',
  'bottom-right': 'bottom-4 right-4',
  'bottom-left': 'bottom-4 left-4',
  'top-center': 'top-4 left-1/2 -translate-x-1/2',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
};

export function ToastProvider({
  children,
  customTypes,
  customComponent,
  position = 'top-right',
  maxToasts = 5,
}: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const addToast = useCallback(
    (options: AddToastOptions) => {
      const generatedId = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const id = options.id || generatedId;

      const newToast: ToastData = {
        id,
        title: options.title,
        description: options.description,
        type: (options.type as ToastType) || 'info',
        action: options.action,
        duration: options.duration ?? 5000,
      };

      setToasts((prevToasts) => {
        const updatedToasts = [newToast, ...prevToasts];
        // Keep only the most recent toasts if we exceed maxToasts
        return updatedToasts.slice(0, maxToasts);
      });

      return id;
    },
    [maxToasts]
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  const contextValue: ToastContextValue = {
    addToast,
    removeToast,
    toasts,
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}

      {/* Toast Container */}
      <div
        className={join('fixed z-50 pointer-events-none  max-w-sm w-full space-y-2', positionClasses[position])}
        role='region'
        aria-label='Notifications'
      >
        {toasts.map((toast) => (
          <div key={toast.id} className='pointer-events-auto'>
            <Toast {...toast} onRemove={removeToast} customTypes={customTypes} customComponent={customComponent} />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
