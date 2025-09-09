import React, { useEffect, useId, useMemo, useRef } from 'react';
import { join, mergeRefs } from '@moondreamsdev/dreamer-ui/utils';

export type PopoverPlacement = 'top' | 'bottom' | 'left' | 'right';
export type PopoverAlignment = 'start' | 'center' | 'end';

export interface PopoverProps {
  id?: string;
  ref?: React.Ref<HTMLDivElement>;
  isOpen?: boolean;
  children: React.ReactNode;
  trigger: React.ReactElement;
  placement?: PopoverPlacement;
  alignment?: PopoverAlignment;
  className?: string;
  closeOnOverlayClick?: boolean;
  closeOnTriggerClick?: boolean;
  /** Offset of the popover from the trigger element in pixel */
  offset?: number;
}

const POPOVER_POSITION_CLASSES: Record<PopoverPlacement, Record<PopoverAlignment, string>> = {
  bottom: {
    start: 'top-full left-0 mt-2 origin-top-left',
    center: 'top-full left-1/2 mt-2 -translate-x-1/2 origin-top',
    end: 'top-full right-0 mt-2 origin-top-right',
  },
  top: {
    start: 'bottom-full left-0 mb-2 origin-bottom-left',
    center: 'bottom-full left-1/2 mb-2 -translate-x-1/2 origin-bottom',
    end: 'bottom-full right-0 mb-2 origin-bottom-right',
  },
  left: {
    start: 'right-full top-0 mr-2 origin-top-right',
    center: 'right-full top-1/2 mr-2 -translate-y-1/2 origin-right',
    end: 'right-full bottom-0 mr-2 origin-bottom-right',
  },
  right: {
    start: 'left-full top-0 ml-2 origin-top-left',
    center: 'left-full top-1/2 ml-2 -translate-y-1/2 origin-left',
    end: 'left-full bottom-0 ml-2 origin-bottom-left',
  },
};

export function Popover({
  id,
  ref,
  isOpen,
  children,
  className,
  closeOnOverlayClick = true,
  trigger,
  placement = 'bottom',
  alignment = 'center',
  closeOnTriggerClick = true,
  offset = 8,
}: PopoverProps) {
  const [internalIsOpen, setInternalIsOpen] = React.useState(isOpen !== undefined ? isOpen : false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const popoverId = useId();

  const offsetStyle = useMemo(() => {
    switch (placement) {
      case 'top':
        return { marginBottom: `${offset}px` };
      case 'bottom':
        return { marginTop: `${offset}px` };
      case 'left':
        return { marginRight: `${offset}px` };
      case 'right':
        return { marginLeft: `${offset}px` };
      default:
        return {};
    }
  }, [placement, offset]);

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
      previousFocusRef.current = document.activeElement as HTMLElement;
      if (popoverRef.current) popoverRef.current.focus();
    } else {
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
        if (triggerProps.onClick) triggerProps.onClick(e);
        if (!closeOnTriggerClick && internalIsOpen) return;
        if (isOpen === undefined) {
          // Uncontrolled case
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
          'bg-popover text-popover-foreground z-[90] absolute transform rounded-md shadow-lg transition-all ease-out',
          internalIsOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none',
          POPOVER_POSITION_CLASSES[placement][alignment],
          className
        )}
        style={offsetStyle}
        role='dialog'
        aria-modal='true'
        tabIndex={-1}
      >
        {children}
      </div>
    </div>
  );
}
