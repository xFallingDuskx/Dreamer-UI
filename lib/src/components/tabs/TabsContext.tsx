import { createContext, useContext } from 'react';
import { TabsVariant, TabsWidth } from './variants';

export interface TabsContextValue {
  selectedValue: string;
  onValueChange: (value: string) => void;
  tabsWidth: TabsWidth;
  variant: TabsVariant;
  triggersClassName?: string;
  contentClassName?: string;
}

export const TabsContext = createContext<TabsContextValue | null>(null);

export const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs components must be used within a Tabs component');
  }
  return context;
};
