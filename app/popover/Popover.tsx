import { useEffect, useRef } from 'react';
import React from 'react';
import { join } from '../../lib/src/utils/join';
import { mergeRefs } from './util';

export interface PopoverProps {
  isOpen?: boolean;
  children: React.ReactNode;
  className?: string;
  closeOnOverlayClick?: boolean;
  trigger: React.ReactElement
}

interface TriggerProps {
  'aria-expanded': boolean | undefined;
  'aria-haspopup': 'dialog';
  ref?: React.Ref<HTMLElement>;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

export function Popover({
  isOpen,
  children,
  className,
  closeOnOverlayClick = true,
  trigger,
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
  const triggerElement = React.cloneElement(trigger as React.ReactElement, {
    'aria-expanded': internalIsOpen,
    'aria-haspopup': 'dialog',
    ref: mergeRefs(triggerRef, triggerProps.ref),
    onClick: (e: React.MouseEvent<HTMLElement>) => {
      if (triggerProps.onClick) {
        triggerProps.onClick(e);
      }
      if (isOpen === undefined) {
        // Uncontrolled mode
        if (e.defaultPrevented) return;
        if (popoverRef.current?.contains(e.target as Node)) return;
        setInternalIsOpen((prev) => !prev);
      } else {
        // Controlled mode
        if (e.defaultPrevented) return;
        if (popoverRef.current?.contains(e.target as Node)) return;
      }
    }
  } as Record<string, unknown>);

  return (
    <div className="relative inline-block">
      {triggerElement}
      {internalIsOpen && (
        <div
          ref={popoverRef}
          className={join(
            'bg-popover text-popover-foreground z-[90] absolute top-full mt-2 origin-top transform rounded-md py-1 shadow-lg transition-transform duration-1000 ease-out',
            className,
          )}
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
        >
          {children}
        </div>
      )}
    </div>
  );
}