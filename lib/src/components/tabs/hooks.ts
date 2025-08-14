import { useState, useCallback } from 'react';

export interface UseTabsProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

export const useTabs = ({ defaultValue, value, onValueChange }: UseTabsProps = {}) => {
  const [internalValue, setInternalValue] = useState<string>(defaultValue || '');
  
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;
  
  const handleValueChange = useCallback((newValue: string) => {
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
  }, [isControlled, onValueChange]);

  return {
    value: currentValue,
    onValueChange: handleValueChange
  };
};
