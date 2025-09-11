import { Popover, PopoverProps } from '@moondreamsdev/dreamer-ui/components';
import { join } from '@moondreamsdev/dreamer-ui/utils';
import React, { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { ChevronRight } from '../../lib/src/symbols';
import {
  DropdownMenuContext,
  DropdownMenuContextFocus,
  DropdownMenuContextValue,
  useDropdownMenuContext,
} from './DropdownContext';
import { useKeyboardNavigation } from './hooks';
import { DropdownMenuItem, DropdownMenuOption } from './types';

export interface DropdownMenuProps extends Omit<PopoverProps, 'children'> {
  /** Dropdown options, separators, groups, or custom items */
  items: DropdownMenuItem[];
  /** Callback when an item is selected, returns the value of the selected item */
  onItemSelect?: (value: string) => void;
}

const getOptionClasses = (disabled?: boolean, additionalClasses?: string) => {
  return join(
    'flex items-center gap-2 px-3 py-2 text-sm focus:outline-none focus:bg-popover-foreground/10',
    disabled ? 'opacity-50 cursor-default' : 'cursor-pointer',
    additionalClasses
  );
};

// Sub-menu component
function SubMenu({ option, level, index }: { option: DropdownMenuOption; level: number; index: number }) {
  const { focus, setFocus, onItemSelect, onClose } = useDropdownMenuContext();
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

  const handleItemClick = () => {
    if (option.onClick) {
      option.onClick();
    }
    if (option.value) {
      onItemSelect(option.value);
    }
    onClose();
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
      <div className={getOptionClasses(option.disabled)} onClick={!option.disabled ? handleItemClick : undefined}>
        <div className='flex items-center gap-2 flex-1'>
          {option.icon && <span className='size-4'>{option.icon}</span>}
          <span>{option.label}</span>
        </div>
        <div className='flex items-center gap-0.5'>
          {option.keyboardShortcut && (
            <div className='text-xs text-popover-foreground/60'>{option.keyboardShortcut}</div>
          )}
          {hasSubitems && <ChevronRight className='size-4' />}
        </div>
      </div>

      {showingSubmenu && (
        <div className='absolute left-full top-0 z-30'>
          <MenuBody items={option.subItems ?? []} level={level + 1} id={submenuId} />
        </div>
      )}
    </div>
  );
}

function MenuBody({ items, level, id }: { items: DropdownMenuItem[]; level: number; id?: string }) {
  const { setFocus, onItemSelect, className = '' } = useDropdownMenuContext();
  let itemIndex = 0;

  const renderItem = (item: DropdownMenuItem, key: string) => {
    switch (item.__type) {
      case 'option':
        if (item.subItems && item.subItems.length > 0) {
          return <SubMenu key={key} option={item} level={level} index={itemIndex++} />;
        }

        return (
          <div
            key={key}
            className={getOptionClasses(item.disabled)}
            onClick={() => {
              if (item.disabled) return;

              if (item.onClick) {
                item.onClick();
              }
              if (item.value) {
                onItemSelect(item.value);
              }
            }}
            data-menu-item={item.value}
            data-level={level}
            data-index={itemIndex++}
            tabIndex={-1}
            aria-disabled={item.disabled ? 'true' : undefined}
            onMouseOver={(e: React.MouseEvent) => {
              e.preventDefault();
              if (item.disabled) return;
              const index = Number(e.currentTarget.getAttribute('data-index'));
              setFocus({ level, index });
            }}
            onMouseLeave={(e: React.MouseEvent) => {
              e.preventDefault();
              setFocus(null);
            }}
          >
            {item.icon && <span className='size-4'>{item.icon}</span>}
            <div className='flex-1'>
              <div>{item.label}</div>
              {item.description && <div className='text-xs text-popover-foreground/60'>{item.description}</div>}
            </div>
            {item.keyboardShortcut && <div className='text-xs text-popover-foreground/60'>{item.keyboardShortcut}</div>}
          </div>
        );

      case 'group':
        return (
          <div key={key}>
            {item.title && (
              <div className='px-3 py-2 text-xs font-semibold text-popover-foreground/50 uppercase'>{item.title}</div>
            )}
            {item.items.map((groupItem, groupIndex) => renderItem(groupItem, `${key}-${groupIndex}`))}
          </div>
        );

      case 'separator':
        return <div key={key} aria-hidden={true} className='my-1 mx-2 border-t border-popover-foreground/20' />;

      case 'custom':
        return <div key={key}>{item.render()}</div>;

      default:
        return null;
    }
  };

  return (
    <div
      id={id}
      className={join(
        'border py-1 border-popover-foreground/20 rounded-md min-w-52 shadow-lg bg-popover text-popover-foreground',
        className
      )}
      tabIndex={0}
      data-level={level}
      data-menu
      role='menu'
      aria-label={`Dropdown menu level ${level}`}
    >
      {items.map((item, index) => renderItem(item, String(index)))}
    </div>
  );
}

function getMenuItem(dropdownId: string, level: number, index: number): HTMLElement | null {
  return document.querySelector<HTMLElement>(
    `#${dropdownId} [data-menu-item][data-level="${level}"][data-index="${index}"]`
  );
}

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
    onItemSelect: handleItemSelect,
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
