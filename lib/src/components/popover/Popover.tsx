import React, { useEffect, useId, useRef } from 'react';
import { join, mergeRefs } from '../../utils';

export type PopoverAlignment = 'left' | 'center' | 'right';

export interface PopoverProps {
  id?: string;
  ref?: React.Ref<HTMLDivElement>;
  isOpen?: boolean;
  children: React.ReactNode;
  trigger: React.ReactElement;
  alignment?: PopoverAlignment;
  className?: string;
  closeOnOverlayClick?: boolean;
  closeOnTriggerClick?: boolean;
}

const POPOVER_ALIGNMENT_CLASSES: Record<PopoverAlignment, string> = {
  left: 'left-0 origin-top-left',
  center: 'left-1/2 -translate-x-1/2 origin-top',
  right: 'right-0 origin-top-right',
};

export function Popover({
  id,
  ref,
  isOpen,
  children,
  className,
  closeOnOverlayClick = true,
  trigger,
  alignment = 'center',
  closeOnTriggerClick = true,
}: PopoverProps) {
  const [internalIsOpen, setInternalIsOpen] = React.useState(isOpen !== undefined ? isOpen : false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const popoverId = useId();

  useEffect(() => {
    if (isOpen !== undefined) {
      setInternalIsOpen(isOpen);
    }
  }, [isOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!internalIsOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setInternalIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [internalIsOpen]);

  // Handle click outside
  useEffect(() => {
    if (!internalIsOpen || !closeOnOverlayClick) return;

    const handleAction = (event: PointerEvent | MouseEvent) => {
      const target = event.target as Node;

      if (
        popoverRef.current &&
        !popoverRef.current.contains(target) &&
        triggerRef.current &&
        !triggerRef.current.contains(target)
      ) {
        setInternalIsOpen(false);
      }
    };

    document.addEventListener('pointerdown', handleAction);
    document.addEventListener('mousedown', handleAction);
    return () => {
      document.removeEventListener('pointerdown', handleAction);
      document.removeEventListener('mousedown', handleAction);
    };
  }, [internalIsOpen, closeOnOverlayClick]);

  // Handle focus management
  useEffect(() => {
    if (internalIsOpen) {
      // Store the currently focused element
      previousFocusRef.current = document.activeElement as HTMLElement;

      // Focus popover after it's rendered
      if (popoverRef.current) {
        popoverRef.current.focus();
      }
    } else {
      // Return focus to previously focused element
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
        previousFocusRef.current = null;
      }
    }
  }, [internalIsOpen]);

  const triggerProps = trigger.props as {
    ref?: React.Ref<HTMLElement>;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  };
  const triggerElement = React.cloneElement(
    trigger as React.ReactElement,
    {
      'aria-expanded': internalIsOpen,
      'aria-haspopup': 'dialog',
      'aria-controls': popoverId,
      ref: mergeRefs(triggerRef, triggerProps.ref),
      onClick: (e: React.MouseEvent<HTMLElement>) => {
        if (triggerProps.onClick) {
          triggerProps.onClick(e);
        }

        // If clicking the trigger should not close the popover when it's open
        if (!closeOnTriggerClick && internalIsOpen) {
          return;
        }

        // Uncontrolled mode
        if (isOpen === undefined) {
          if (e.defaultPrevented) return;
          if (popoverRef.current?.contains(e.target as Node)) return;
          setInternalIsOpen((prev) => !prev);
        }
      },
    } as Record<string, unknown>
  );

  return (
    <div id={id} ref={ref} className='relative inline-block'>
      {triggerElement}
      <div
        id={popoverId}
        ref={popoverRef}
        className={join(
          'bg-popover text-popover-foreground z-[90] absolute top-full mt-2 transform rounded-md shadow-lg transition-all ease-out',
          internalIsOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none',
          POPOVER_ALIGNMENT_CLASSES[alignment],
          className
        )}
        role='dialog'
        aria-modal='true'
        tabIndex={-1}
      >
        {children}
      </div>
    </div>
  );
}
