import React from 'react';
import { useTabs } from './hooks';
import { TabsContext, TabsContextValue } from './TabsContext';
import { TabsVariant, TabsWidth } from './variants';

export interface TabsProps {
  id?: string;
  /** The value of the tab that should be active when initially rendered */
  defaultValue?: string;
  /** The controlled value of the tab to activate */
  value?: string;
  /** Event handler called when the value changes */
  onValueChange?: (value: string) => void;
  /** How the tabs should be sized. "fit" sizes tabs to content, "full" makes them equal width */
  tabsWidth?: TabsWidth;
  /** The visual style variant of the tabs */
  variant?: TabsVariant;
  /** Additional CSS classes to apply to the tabs container */
  className?: string;
  /** The tab list and content elements */
  children?: React.ReactNode;
  /** Ref to the tabs container */
  ref?: React.Ref<HTMLDivElement>;
  /** Additional CSS classes to apply to the tab triggers */
  triggersClassName?: string;
  /** Additional CSS classes to apply to the tab content */
  contentClassName?: string;
}

export function Tabs({
  defaultValue,
  value,
  onValueChange,
  tabsWidth = 'fit',
  variant = 'underline',
  className,
  children,
  ref,
  id,
  triggersClassName,
  contentClassName,
}: TabsProps) {
  const { value: selectedValue, onValueChange: handleValueChange } = useTabs({
    defaultValue,
    value,
    onValueChange,
  });

  const contextValue: TabsContextValue = {
    selectedValue,
    onValueChange: handleValueChange,
    tabsWidth,
    variant,
    triggersClassName,
    contentClassName,
  };

  return (
    <TabsContext.Provider value={contextValue}>
      <div id={id} ref={ref} className={className} data-tabs-width={tabsWidth} data-variant={variant}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}
