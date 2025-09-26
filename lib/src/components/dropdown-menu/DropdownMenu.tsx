import React, { useCallback, useEffect, useId, useMemo, useState } from 'react';
import { join } from '../../utils';
import { Popover, PopoverProps } from '../popover';
import { DropdownMenuContext, DropdownMenuContextFocus, DropdownMenuContextValue } from './DropdownContext';
import { MenuBody } from './DropdownMenuBody';
import { useKeyboardNavigation } from './hooks';
import { DropdownMenuItem } from './types';

export interface DropdownMenuProps extends Omit<PopoverProps, 'children'> {
	/** Dropdown options, separators, groups, or custom items */
	items: DropdownMenuItem[];
	/** Callback when an item is selected, returns the value of the selected item */
	onItemSelect?: (value: string) => void;
}

function getMenuItem(dropdownId: string, level: number, index: number): HTMLElement | null {
	return document.querySelector<HTMLElement>(
		`#${dropdownId} [data-menu-item][data-level="${level}"][data-index="${index}"]`
	);
}

/**
 * A fully-featured dropdown menu with keyboard navigation, nested submenus, and flexible item types.
 * Supports separators, groups, and custom content with accessibility features.
 * 
 * @example
 * ```tsx
 * // Basic dropdown menu
 * <DropdownMenu
 *   trigger={<Button>Options</Button>}
 *   items={[
 *     { type: 'item', label: 'Edit', value: 'edit' },
 *     { type: 'item', label: 'Delete', value: 'delete' },
 *     { type: 'separator' }
 *   ]}
 *   onItemSelect={(value) => handleAction(value)}
 * />
 * 
 * // With nested submenus
 * <DropdownMenu
 *   trigger={<Button>More Actions</Button>}
 *   items={[
 *     { 
 *       type: 'submenu', 
 *       label: 'Export',
 *       items: [
 *         { type: 'item', label: 'PDF', value: 'pdf' },
 *         { type: 'item', label: 'CSV', value: 'csv' }
 *       ]
 *     }
 *   ]}
 *   placement="bottom-end"
 * />
 * ```
 */
export function DropdownMenu({
	id,
	items,
	onItemSelect,
	trigger,
	isOpen: open,
	placement = 'bottom',
	alignment = 'start',
	onOpenChange,
	className = '',
	...popoverProps
}: DropdownMenuProps) {
	const generatedId = useId();
	const dropdownId = id || `dropdown-menu-${generatedId}`;
	const [focus, setFocus] = useState<DropdownMenuContextFocus | null>(null);
	const [internalOpen, setInternalOpen] = useState(false);
	const isUncontrolled = open === undefined;
	const isOpen = isUncontrolled ? internalOpen : open;

	const handleClose = useCallback(() => {
		setFocus(null);
		setInternalOpen(false);
	}, []);

	const handleItemSelect = useCallback(
		(value: string) => {
			if (onItemSelect) {
				onItemSelect(value);
			}
			handleClose();
		},
		[onItemSelect, handleClose]
	);

	const handleOpenChange = useCallback(
		(open: boolean) => {
			if (isUncontrolled) {
				setInternalOpen(open);
			}
			if (onOpenChange) {
				onOpenChange(open);
			}
		},
		[isUncontrolled, onOpenChange]
	);

	const value = useMemo<DropdownMenuContextValue>(
		() => ({
			id: dropdownId,
			focus,
			setFocus,
			isOpen,
			onItemSelect: handleItemSelect,
			onClose: handleClose,
			className,
		}),
		[focus, setFocus, handleItemSelect, handleClose, className, isOpen, dropdownId]
	);

	useKeyboardNavigation({
		dropdownId,
		focus,
		setFocus,
		isOpen,
		onClose: handleClose,
	});

	const dropdownTrigger = useMemo(() => {
		return React.cloneElement(trigger, {
			onClick: (e: React.MouseEvent) => {
				if (isUncontrolled) {
					setInternalOpen((prev) => !prev);
				}
				const props = trigger.props as {
					onClick?: (e: React.MouseEvent) => void;
				};
				if (props.onClick) {
					props.onClick(e);
				}
			},
		} as Record<string, unknown>);
	}, [isUncontrolled, setInternalOpen, trigger]);

	useEffect(() => {
		if (focus) {
			const el = getMenuItem(dropdownId, focus.level, focus.index);
			el?.focus();
		}
	}, [focus, dropdownId]);

	return (
		<Popover
			id={dropdownId}
			isOpen={isUncontrolled ? internalOpen : isOpen}
			trigger={dropdownTrigger}
			placement={placement}
			alignment={alignment}
			onOpenChange={handleOpenChange}
			className={join('min-w-52', className)}
			{...popoverProps}
		>
			<DropdownMenuContext.Provider value={value}>
				<MenuBody items={items} level={1} />
			</DropdownMenuContext.Provider>
		</Popover>
	);
}
