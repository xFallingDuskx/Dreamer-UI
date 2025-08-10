import { createContext, useContext } from 'react';
import { ToastAction, ToastData, ToastType } from '../components/toast';

export interface AddToastOptions {
  id?: string;
  title: string;
  description?: string;
  type?: ToastType | string;
  action?: ToastAction;
  duration?: number;
}

export interface ToastContextValue {
  addToast: (options: AddToastOptions) => string;
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
