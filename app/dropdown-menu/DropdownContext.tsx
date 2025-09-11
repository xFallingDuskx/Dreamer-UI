import { createContext, useContext } from 'react';

export interface DropdownMenuContextValue {
  isOpen: boolean;
  onItemSelect?: (value: string) => void;
  onClose?: () => void;
  className?: string;
}

export const DropdownMenuContext = createContext<DropdownMenuContextValue | null>(null);

export const useDropdownMenuContext = () => {
  const context = useContext(DropdownMenuContext);
  if (!context) {
    throw new Error('DropdownMenu components must be used within a DropdownMenu component');
  }
  return context;
};
