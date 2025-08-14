import { join } from '../../utils';
import { useTabsContext } from './TabsContext';

export interface TabsContentProps {
  ref?: React.Ref<HTMLDivElement>;
  /** The value that identifies this tab content */
  value: string;
  /** Additional class names */
  className?: string;
  /** Tab content */
  children?: React.ReactNode;
}

export function TabsContent({ value, className, children, ref }: TabsContentProps) {
  const { selectedValue, contentClassName } = useTabsContext();
  const isActive = selectedValue === value;

  if (!isActive) {
    return null;
  }

  const baseClassName =
    'mt-4 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2';

  return (
    <div
      ref={ref}
      role='tabpanel'
      id={`tabs-content-${value}`}
      aria-labelledby={`tabs-trigger-${value}`}
      data-state={isActive ? 'active' : 'inactive'}
      data-value={value}
      className={join(baseClassName, contentClassName, className)}
      tabIndex={0}
    >
      {children}
    </div>
  );
}
