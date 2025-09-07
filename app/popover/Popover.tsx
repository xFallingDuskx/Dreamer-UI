import React, { useEffect, useRef } from 'react';
import { join } from '../../lib/src/utils/join';
import { mergeRefs } from './util';

export type PopoverAlignment = 'left' | 'center' | 'right';

export interface PopoverProps {
  isOpen?: boolean;
  children: React.ReactNode;
  trigger: React.ReactElement;
  alignment?: PopoverAlignment;
  className?: string;
  closeOnOverlayClick?: boolean;
  closeOnTriggerClick?: boolean;
}

interface TriggerProps {
  'aria-expanded': boolean | undefined;
  'aria-haspopup': 'dialog';
  ref?: React.Ref<HTMLElement>;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

const POPOVER_ALIGNMENT_CLASSES: Record<PopoverAlignment, string> = {
  left: 'left-0',
  center: 'left-1/2 -translate-x-1/2',
  right: 'right-0',
};

export function Popover({
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

    const handleMouseAction = (event: MouseEvent) => {
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

    const handlePointerAction = (event: PointerEvent) => {
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

    document.addEventListener('pointerdown', handlePointerAction);
    document.addEventListener('mousedown', handleMouseAction);
    return () => {
      document.removeEventListener('pointerdown', handlePointerAction);
      document.removeEventListener('mousedown', handleMouseAction);
    };
  }, [internalIsOpen, closeOnOverlayClick]);

  // Handle focus management
  useEffect(() => {
    if (internalIsOpen) {
      // Store the currently focused element
      previousFocusRef.current = document.activeElement as HTMLElement;

      // Focus popover after it's rendered
      setTimeout(() => {
        if (popoverRef.current) {
          popoverRef.current.focus();
        }
      }, 0);
    } else {
      // Return focus to previously focused element
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
        previousFocusRef.current = null;
      }
    }
  }, [internalIsOpen]);

  const triggerProps = trigger.props as TriggerProps;
  const triggerElement = React.cloneElement(
    trigger as React.ReactElement,
    {
      'aria-expanded': internalIsOpen,
      'aria-haspopup': 'dialog',
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
    <div className='relative inline-block'>
      {triggerElement}
      <div
        ref={popoverRef}
        className={join(
          'bg-popover text-popover-foreground z-[90] absolute top-full mt-2 origin-top transform rounded-md shadow-lg transition-all ease-out',
          internalIsOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-0 pointer-events-none',
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
