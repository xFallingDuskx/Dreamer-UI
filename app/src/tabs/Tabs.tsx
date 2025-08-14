import { join } from '@moondreamsdev/dreamer-ui/utils';
import React, { createContext, useContext } from 'react';
import { useTabs } from './hooks';
import { tabContentVariants, tabsListVariants, TabsVariant, TabsWidth, tabTriggerVariants } from './variants';

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
}

export interface TabsListProps {
  id?: string;
  ref?: React.Ref<HTMLDivElement>;
  children?: React.ReactNode;
  className?: string;
}

export interface TabsTriggerProps {
  id?: string;
  ref?: React.Ref<HTMLButtonElement>;
  /** The value that identifies this tab */
  value: string;
  /** Whether this trigger is disabled */
  disabled?: boolean;
  /** Additional class names */
  className?: string;
  /** Tab trigger content */
  children?: React.ReactNode;
  /** Click handler */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface TabsContentProps {
  ref?: React.Ref<HTMLDivElement>;
  /** The value that identifies this tab content */
  value: string;
  /** Additional class names */
  className?: string;
  /** Tab content */
  children?: React.ReactNode;
}

// Context for sharing tabs state
interface TabsContextValue {
  selectedValue: string;
  onValueChange: (value: string) => void;
  tabsWidth: TabsWidth;
  variant: TabsVariant;
}

const TabsContext = createContext<TabsContextValue | null>(null);

const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs components must be used within a Tabs component');
  }
  return context;
};

export default function Tabs({
  defaultValue,
  value,
  onValueChange,
  tabsWidth = 'fit',
  variant = 'underline',
  className,
  children,
  ref,
  id,
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
  };

  return (
    <TabsContext.Provider value={contextValue}>
      <div
        id={id}
        ref={ref}
        className={join('tabs-root', className)}
        data-tabs-width={tabsWidth}
        data-variant={variant}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children, className, id, ref }: TabsListProps) {
  const { tabsWidth, variant } = useTabsContext();

  return (
    <div
      id={id}
      ref={ref}
      role='tablist'
      className={join('flex', tabsListVariants.width[tabsWidth], tabsListVariants.variant[variant], className)}
      data-tabs-width={tabsWidth}
      data-variant={variant}
    >
      {children}
    </div>
  );
}

export function TabsTrigger({ value, disabled = false, className, children, onClick, id, ref }: TabsTriggerProps) {
  const { selectedValue, onValueChange, variant } = useTabsContext();
  const isActive = selectedValue === value;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
      onValueChange(value);
    }
    onClick?.(event);
  };

  return (
    <button
      id={id}
      ref={ref}
      role='tab'
      type='button'
      aria-selected={isActive}
      aria-controls={`tabs-content-${value}`}
      data-state={isActive ? 'active' : 'inactive'}
      data-value={value}
      disabled={disabled}
      className={join(tabTriggerVariants.base, tabTriggerVariants.variant[variant], className)}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, className, children, ref }: TabsContentProps) {
  const { selectedValue } = useTabsContext();
  const isActive = selectedValue === value;

  if (!isActive) {
    return null;
  }

  return (
    <div
      ref={ref}
      role='tabpanel'
      id={`tabs-content-${value}`}
      aria-labelledby={`tabs-trigger-${value}`}
      data-state={isActive ? 'active' : 'inactive'}
      data-value={value}
      className={join(tabContentVariants.base, className)}
      tabIndex={0}
    >
      {children}
    </div>
  );
}
