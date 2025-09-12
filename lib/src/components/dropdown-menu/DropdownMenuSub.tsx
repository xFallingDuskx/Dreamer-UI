import { useEffect, useId, useRef, useState } from 'react';
import { useDropdownMenuContext } from './DropdownContext';
import { MenuBody } from './DropdownMenuBody';
import { MenuOption } from './DropdownMenuOption';
import { DropdownMenuOption } from './types';

export function SubMenu({ option, level, index }: { option: DropdownMenuOption; level: number; index: number }) {
	const { focus, setFocus } = useDropdownMenuContext();
	const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
	const [hasExited, setHasExited] = useState(false); // if submenu was exited with keyboard
	const itemRef = useRef<HTMLDivElement>(null);
	const previousLevelRef = useRef<number | undefined>(undefined);
	const submenuId = useId();

	const handleMouseEnter = () => {
		if (option.disabled) return;
		setFocus({ level, index });
		handleOpen();
	};

	const handleMouseLeave = () => {
		setFocus(null);
		handleClose();
	};

	const handleOpen = () => {
		setIsSubMenuOpen(true);
	};

	const handleClose = () => {
		setIsSubMenuOpen(false);
	};

	// Can re-open submenu if it was exited with keyboard
	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'ArrowRight') {
			e.preventDefault();
			if (option.disabled) return;
			setHasExited(false);
		}
	};

	// Detect if submenu was exited with keyboard navigation
	useEffect(() => {
		const focusLevel = focus?.level;
		const previousLevel = previousLevelRef.current;
		const submenuLevel = level + 1;
		if (focusLevel && previousLevel && previousLevel === submenuLevel && focusLevel === previousLevel - 1) {
			setHasExited(true);
		} else {
			setHasExited(false);
		}
		previousLevelRef.current = focusLevel;
	}, [focus, level]); // include entire object to reset when index changes as well (allows reopening same submenu item)

	const hasSubitems = option.subItems !== undefined && option.subItems.length > 0;
	const showingSubmenu = isSubMenuOpen && !hasExited && hasSubitems;
	return (
		<div
			ref={itemRef}
			className='relative focus:outline-none focus:bg-popover-foreground/10'
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			onFocus={handleOpen}
			onBlur={handleClose}
			onKeyDown={handleKeyDown}
			tabIndex={0}
			data-menu-item={option.value}
			data-level={level}
			data-index={index}
			aria-haspopup={hasSubitems ? 'true' : undefined}
			aria-expanded={showingSubmenu ? 'true' : 'false'}
			aria-disabled={option.disabled ? 'true' : undefined}
			aria-label={option.label}
			aria-controls={showingSubmenu ? submenuId : undefined}
		>
			<MenuOption option={option} />

			{showingSubmenu && (
				<div className='absolute left-full top-0 z-30'>
					<MenuBody items={option.subItems ?? []} level={level + 1} id={submenuId} />
				</div>
			)}
		</div>
	);
}
