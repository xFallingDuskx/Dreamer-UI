import { join } from '@moondreamsdev/dreamer-ui/utils';
import { useTabsContext } from './TabsContext';
import { tabTriggerVariants } from './variants';

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

export function TabsTrigger({ value, disabled = false, className, children, onClick, id, ref }: TabsTriggerProps) {
  const { selectedValue, onValueChange, variant, triggersClassName } = useTabsContext();
  const isActive = selectedValue === value;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
      onValueChange(value);
    }
    onClick?.(event);
  };

  const baseClassName =
    'inline-flex items-center justify-center whitespace-nowrap px-3 py-2 text-sm ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';

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
      className={join(
        baseClassName,
        isActive ? 'font-medium' : 'font-light',
        tabTriggerVariants[variant],
        triggersClassName,
        className
      )}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
