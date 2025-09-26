import React, { useEffect, useId, useState } from 'react';
import { CaretCollapse, CaretExpand } from '../../symbols';
import { join } from '../../utils';

export interface DisclosureProps {
  /** The content to show/hide */
  children: React.ReactNode;
  /** The label text or content for the disclosure button */
  label: React.ReactNode;
  /** Controls the open state (uncontrolled if not provided) */
  isOpen?: boolean;
  /** Called when disclosure is toggled */
  onToggle?: (open: boolean) => void;
  /** Optional id for accessibility and testing */
  id?: string;
  /** Optional ref to the root div */
  ref?: React.Ref<HTMLDivElement>;
  /** Whether the disclosure is disabled */
  disabled?: boolean;
  /** Additional CSS classes to apply to the disclosure */
  className?: string;
  /** Additional CSS classes to apply to the disclosure button */
  buttonClassName?: string;
}

/**
 * A simple disclosure component for showing and hiding content sections.
 * Provides keyboard navigation and accessibility features with expand/collapse functionality.
 * 
 * @example
 * ```tsx
 * // Uncontrolled disclosure
 * <Disclosure label="Show Details">
 *   <p>Hidden content that will be revealed when expanded.</p>
 * </Disclosure>
 * 
 * // Controlled disclosure
 * <Disclosure 
 *   label="Advanced Options"
 *   isOpen={showAdvanced}
 *   onToggle={setShowAdvanced}
 * >
 *   <div>Advanced configuration options...</div>
 * </Disclosure>
 * ```
 */
export function Disclosure({
  children,
  label,
  isOpen: open,
  onToggle,
  id,
  ref,
  disabled = false,
  className,
  buttonClassName,
}: DisclosureProps) {
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
    <div ref={ref} id={activeId} data-open={isOpen} className={join('overflow-hidden', className)}>
      <button
        id={`${activeId}-button`}
        type='button'
        aria-expanded={isOpen}
        aria-controls={`${activeId}-panel`}
        disabled={disabled}
        tabIndex={0}
        className={join(
          'w-full px-4 py-3 font-medium hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed',
          buttonClassName
        )}
        onClick={handleToggle}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleToggle();
          }
        }}
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

      <div id={`${activeId}-panel`} role='region' aria-labelledby={activeId} aria-live='polite' hidden={!isOpen}>
        {children}
      </div>
    </div>
  );
}
