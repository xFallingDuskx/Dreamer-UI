import { createContext, useContext } from 'react';
import { ToastData, ToastType, ToastAction } from './Toast';

export interface AddToastOptions {
  title: string;
  description?: string;
  type?: ToastType | string;
  action?: ToastAction;
  duration?: number;
}

export interface ToastContextValue {
  addToast: (options: AddToastOptions) => void;
  removeToast: (id: string) => void;
  toasts: ToastData[];
}

export const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
