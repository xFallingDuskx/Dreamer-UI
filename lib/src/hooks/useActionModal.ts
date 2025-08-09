import { createContext, useContext } from 'react';
import { ActionModalContextValue } from '../providers';

export const ActionModalContext = createContext<ActionModalContextValue | undefined>(undefined);

export function useActionModal(): ActionModalContextValue {
  const context = useContext(ActionModalContext);
  if (!context) {
    throw new Error('useActionModal must be used within an ActionModalProvider');
  }
  return context;
}
