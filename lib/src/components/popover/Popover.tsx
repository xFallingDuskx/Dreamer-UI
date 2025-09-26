import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import { join, mergeRefs } from '../../utils';
import { useAutoSwitchPlacement } from './hooks';
import { placementVariants, PopoverAlignment, PopoverPlacement } from './variants';

export interface PopoverProps {
	/** Unique identifier for the popover */
	id?: string;
	/** Reference to the popover element */
	ref?: React.Ref<HTMLDivElement>;
	/** Whether the popover is open (controlled) */
	isOpen?: boolean;
	/** Callback fired when the open state changes */
	onOpenChange?: (open: boolean) => void;
	/** The content to display in the popover */
	children: React.ReactNode;
	/** The element that triggers the popover */
	trigger: React.ReactElement;
	/** The preferred side of the trigger to render against */
	placement?: PopoverPlacement;
	/** The preferred alignment against the trigger */
	alignment?: PopoverAlignment;
	/** Additional CSS classes to apply to the popover content */
	className?: string;
	/** Whether to close popover when clicking outside */
	closeOnOverlayClick?: boolean;
	/** Whether to close popover when clicking the trigger again */
	closeOnTriggerClick?: boolean;
	/** Offset of the popover from the trigger element in pixels */
	offset?: number;
	/** Automatically switch placement to opposite side if there is not enough space */
	autoSwitchPlacement?: boolean;
	/** Enable hover behavior - shows on hover, hides 200ms after mouse leaves */
	hoverable?: boolean;
}

function getOffsetStyle(effectivePlacement: PopoverPlacement, offset: number) {
	switch (effectivePlacement) {
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
}

/**
 * A floating content container that appears relative to a trigger element.
 * Supports hover and click interactions with intelligent positioning and focus management.
 * 
 * @example
 * ```tsx
 * // Basic popover
 * <Popover 
 *   trigger={<Button>Click me</Button>}
 *   placement="bottom"
 * >
 *   <div className="p-4">
 *     <h3>Popover Content</h3>
 *     <p>This is the popover content.</p>
 *   </div>
 * </Popover>
 * 
 * // Hover popover
 * <Popover
 *   trigger={<span>Hover me</span>}
 *   hoverable
 *   placement="top"
 *   alignment="start"
 * >
 *   <div className="p-2 text-sm">Tooltip-like content</div>
 * </Popover>
 * 
 * // Controlled popover
 * <Popover
 *   trigger={<Button>Controlled</Button>}
 *   isOpen={showPopover}
 *   onOpenChange={setShowPopover}
 * >
 *   <PopoverMenu />
 * </Popover>
 * ```
 */
export function Popover({
	id,
	ref,
	isOpen,
	onOpenChange,
	children,
	className,
	closeOnOverlayClick = true,
	trigger,
	placement = 'bottom',
	alignment = 'center',
	closeOnTriggerClick = true,
	offset = 8,
	autoSwitchPlacement = true,
	hoverable = false,
}: PopoverProps) {
	const [internalIsOpen, setInternalIsOpen] = useState(isOpen ?? false);
	const popoverRef = useRef<HTMLDivElement>(null);
	const triggerRef = useRef<HTMLElement>(null);
	const previousFocusRef = useRef<HTMLElement | null>(null);
	const popoverId = useId();
	const hoverTimeoutRef = useRef<number | null>(null);

	const effectivePlacement = useAutoSwitchPlacement({
		internalIsOpen,
		autoSwitchPlacement,
		placement,
		offset,
		triggerRef,
		popoverRef,
	});

	const handleOpenChange = useCallback(
		(open: boolean) => {
			if (onOpenChange) {
				onOpenChange(open);
			}
			if (isOpen === undefined) {
				setInternalIsOpen(open);
			}
		},
		[isOpen, onOpenChange]
	);

	// Hover handling functions
	const clearHoverTimeout = useCallback(() => {
		if (hoverTimeoutRef.current) {
			clearTimeout(hoverTimeoutRef.current);
			hoverTimeoutRef.current = null;
		}
	}, []);

	const handleMouseEnter = useCallback(() => {
		if (!hoverable) return;
		clearHoverTimeout();
		handleOpenChange(true);
	}, [hoverable, clearHoverTimeout, handleOpenChange]);

	const handleMouseLeave = useCallback(() => {
		if (!hoverable) return;
		clearHoverTimeout();
		hoverTimeoutRef.current = setTimeout(() => {
			handleOpenChange(false);
		}, 200);
	}, [hoverable, clearHoverTimeout, handleOpenChange]);

	useEffect(() => {
		if (isOpen !== undefined) {
			setInternalIsOpen(isOpen);
		}
	}, [isOpen]);

	// Cleanup hover timeout on unmount
	useEffect(() => {
		return () => {
			if (hoverTimeoutRef.current) {
				clearTimeout(hoverTimeoutRef.current);
			}
		};
	}, []);

	// Handle keyboard navigation
	useEffect(() => {
		if (!internalIsOpen) return;
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				handleOpenChange(false);
			}
		};
		document.addEventListener('keydown', handleKeyDown);
		return () => document.removeEventListener('keydown', handleKeyDown);
	}, [internalIsOpen, handleOpenChange]);

	// Handle click outside
	useEffect(() => {
		if (!internalIsOpen || !closeOnOverlayClick) return;
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as Node;
			if (
				popoverRef.current &&
				!popoverRef.current.contains(target) &&
				triggerRef.current &&
				!triggerRef.current.contains(target)
			) {
				handleOpenChange(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [internalIsOpen, closeOnOverlayClick, handleOpenChange]);

	// Handle focus management
	useEffect(() => {
		if (internalIsOpen) {
			previousFocusRef.current = document.activeElement as HTMLElement;
			popoverRef.current?.focus();
		} else {
			previousFocusRef.current?.focus();
			previousFocusRef.current = null;
		}
	}, [internalIsOpen]);

	// Trigger cloning
	const triggerProps = trigger.props as {
		ref?: React.Ref<HTMLElement>;
		onClick?: (e: React.MouseEvent<HTMLElement>) => void;
		onMouseEnter?: (e: React.MouseEvent<HTMLElement>) => void;
		onMouseLeave?: (e: React.MouseEvent<HTMLElement>) => void;
	};
	const triggerElement = React.cloneElement(trigger, {
		'aria-expanded': internalIsOpen,
		'aria-haspopup': 'dialog',
		'aria-controls': popoverId,
		ref: mergeRefs(triggerRef, triggerProps.ref),
		onClick: (e: React.MouseEvent<HTMLElement>) => {
			triggerProps.onClick?.(e);
			if (hoverable) return; // Don't handle click events in hoverable mode
			if (!closeOnTriggerClick && internalIsOpen) return;
			if (isOpen === undefined) {
				if (e.defaultPrevented) return;
				if (popoverRef.current?.contains(e.target as Node)) return;
				handleOpenChange(!internalIsOpen);
			}
		},
		onMouseEnter: (e: React.MouseEvent<HTMLElement>) => {
			triggerProps.onMouseEnter?.(e);
			handleMouseEnter();
		},
		onMouseLeave: (e: React.MouseEvent<HTMLElement>) => {
			triggerProps.onMouseLeave?.(e);
			handleMouseLeave();
		},
	} as Record<string, unknown>);

	return (
		<div id={id} ref={ref} className='relative inline-block'>
			{triggerElement}
			<div
				id={popoverId}
				ref={popoverRef}
				className={join(
					'absolute z-[90] transform rounded-md shadow-lg bg-popover text-popover-foreground transition-all ease-out',
					internalIsOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none',
					placementVariants[effectivePlacement][alignment],
					className
				)}
				style={getOffsetStyle(effectivePlacement, offset)}
				role='dialog'
				aria-modal='true'
				tabIndex={-1}
				inert={!internalIsOpen ? true : undefined} // prevents focus and interaction when popover is closed
				aria-hidden={!internalIsOpen ? true : undefined} // hide from screen readers when popover is closed
				onMouseEnter={hoverable ? handleMouseEnter : undefined}
				onMouseLeave={hoverable ? handleMouseLeave : undefined}
			>
				{children}
			</div>
		</div>
	);
}
