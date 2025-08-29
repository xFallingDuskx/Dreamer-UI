import { join } from '@moondreamsdev/dreamer-ui/utils';
import React, { useEffect, useId, useState } from 'react';
import { CaretCollapse, CaretExpand } from './icons';

export interface DisclosureProps {
  /** The content to show/hide when disclosure is open.*/
  children: React.ReactNode;
  /** The label for the disclosure button. */
  label: React.ReactNode;
  /** Controls the open state (uncontrolled if not provided).*/
  open?: boolean;
  /**Called when disclosure is toggled.*/
  onToggle?: (open: boolean) => void;
  /** Optional id for accessibility and testing. */
  id?: string;
  /** Optional ref to the root div. */
  ref?: React.Ref<HTMLDivElement>;
  /** Disabled state for the button. */
  disabled?: boolean;
  /** Optional class name for the root div. */
  className?: string;
}

export function Disclosure({ children, label, open, onToggle, id, ref, disabled = false, className }: DisclosureProps) {
  const generatedId = useId();
  const activeId = id ?? generatedId;
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = open !== undefined ? open : internalOpen;

  const handleToggle = () => {
    if (disabled) return;
    if (open === undefined) {
      setInternalOpen((prev) => !prev);
    }
    onToggle?.(!isOpen);
  };

  useEffect(() => {
    setInternalOpen(open ?? false);
  }, [open]);

  return (
    <div ref={ref} id={activeId} data-open={isOpen} className={join('group overflow-hidden', className)}>
      <button
        id={`${activeId}-button`}
        type='button'
        aria-expanded={isOpen}
        aria-controls={`${activeId}-panel`}
        disabled={disabled}
        tabIndex={0}
        className={join(
          'w-full px-4 py-3 gap-2 font-medium focus:outline-none hover:bg-primary/10',
          disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
        )}
        onClick={handleToggle}
        data-open={isOpen}
        data-label={typeof label === 'string' ? label : undefined}
      >
        <div className='flex items-center w-full gap-2'>
          <span className='flex-1 text-left'>{label}</span>
          {isOpen ? (
            <CaretCollapse className='size-5' aria-hidden='true' />
          ) : (
            <CaretExpand className='size-5' aria-hidden='true' />
          )}
        </div>
      </button>

      <div
        id={`${activeId}-panel`}
        role='region'
        aria-labelledby={activeId}
        className={join('transition-all', isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1 h-0')}
        aria-live='polite'
        aria-hidden={!isOpen}
      >
        {children}
      </div>
    </div>
  );
}
