import React from 'react';
import { useTabs } from './hooks';
import { TabsContext, TabsContextValue } from './TabsContext';
import { TabsVariant, TabsWidth } from './variants';

export interface TabsProps {
  id?: string;
  /** The default selected tab value (uncontrolled) */
  defaultValue?: string;
  /** The selected tab value (controlled) */
  value?: string;
  /** Callback fired when the tab selection changes */
  onValueChange?: (value: string) => void;
  /** How the tabs should be sized */
  tabsWidth?: TabsWidth;
  /** The visual style variant */
  variant?: TabsVariant;
  /** Additional class names for the tabs container */
  className?: string;
  /** The tab content and triggers */
  children?: React.ReactNode;
  /** Ref to the tabs container */
  ref?: React.Ref<HTMLDivElement>;
  /** Additional class names for the tab triggers */
  triggersClassName?: string;
  /** Additional class names for the tab content */
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
