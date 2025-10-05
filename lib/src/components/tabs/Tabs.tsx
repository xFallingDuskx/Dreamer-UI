import React from 'react';
import { useTabs } from './hooks';
import { TabsContext, TabsContextValue } from './TabsContext';
import { TabsList } from './TabsList';
import { TabsTrigger } from './TabsTrigger';
import { TabsVariant, TabsWidth } from './variants';

export interface TabItem {
  value: string;
  label: string | React.ReactElement;
}

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
  /** Array of tab items to render automatically. If provided, will render TabsList with TabsTrigger components */
  tabsList?: TabItem[];
  /** The tab list and content elements */
  children?: React.ReactNode;
  /** Ref to the tabs container */
  ref?: React.Ref<HTMLDivElement>;
  /** Additional CSS classes to apply to the tab triggers */
  triggersClassName?: string;
  /** Additional CSS classes to apply to the tab content */
  contentClassName?: string;
}

/**
 * A tabs component for organizing content into switchable sections.
 * Use the tabsList prop for automatic tab rendering, or manually compose with TabsList, TabsTrigger, and TabsContent.
 * 
 * @example
 * ```tsx
 * // Preferred: Using tabsList prop for automatic rendering
 * <Tabs 
 *   defaultValue="tab1" 
 *   variant="underline"
 *   tabsList={[
 *     { value: "tab1", label: "Overview" },
 *     { value: "tab2", label: "Details" },
 *     { value: "tab3", label: "Settings" }
 *   ]}
 * >
 *   <TabsContent value="tab1">
 *     <h3>Overview Content</h3>
 *   </TabsContent>
 *   <TabsContent value="tab2">
 *     <h3>Details Content</h3>
 *   </TabsContent>
 *   <TabsContent value="tab3">
 *     <h3>Settings Content</h3>
 *   </TabsContent>
 * </Tabs>
 * 
 * // Alternative: Manual composition with TabsList
 * <Tabs defaultValue="tab1" variant="underline">
 *   <TabsList>
 *     <TabsTrigger value="tab1">Overview</TabsTrigger>
 *     <TabsTrigger value="tab2">Details</TabsTrigger>
 *     <TabsTrigger value="tab3">Settings</TabsTrigger>
 *   </TabsList>
 *   
 *   // Tab content components go here
 * </Tabs>
 * ```
 */
export function Tabs({
  defaultValue,
  value,
  onValueChange,
  tabsWidth = 'fit',
  variant = 'underline',
  className,
  tabsList,
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
        {tabsList && (
          <TabsList>
            {tabsList.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        )}
        {children}
      </div>
    </TabsContext.Provider>
  );
}
