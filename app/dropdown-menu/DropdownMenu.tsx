import { Popover, PopoverProps } from '@moondreamsdev/dreamer-ui/components';
import { join } from '@moondreamsdev/dreamer-ui/utils';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
    disabled ? 'opacity-50 cursor-default' : 'hover:bg-popover-foreground/10 cursor-pointer',
    additionalClasses
  );
};

// Sub-menu component
function SubMenu({ option, level, index }: { option: DropdownMenuOption; level: number; index: number }) {
  const { setFocus, onItemSelect, onClose } = useDropdownMenuContext();
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
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

  const handleItemClick = () => {
    if (option.onClick) {
      option.onClick();
    }
    if (option.value && onItemSelect) {
      onItemSelect(option.value);
    }
    if (onClose) {
      onClose();
    }
  };

  return (
    <div
      ref={itemRef}
      className='relative focus-within:outline-none focus-within:bg-popover-foreground/10'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleOpen}
      onBlur={handleClose}
      tabIndex={0}
      data-menu-item={option.value}
      data-level={level}
      data-index={index}
      onMouseOver={(e: React.MouseEvent) => {
        e.preventDefault();
        const index = Number(e.currentTarget.getAttribute('data-index'));
        setFocus({ level, index });
      }}
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
          {option.subItems && option.subItems.length > 0 && <ChevronRight className='size-4' />}
        </div>
      </div>

      {isSubMenuOpen && option.subItems && option.subItems.length > 0 && (
        <div className='absolute left-full top-0 z-30'>
          <MenuBody items={option.subItems} level={level + 1} />
        </div>
      )}
    </div>
  );
}

function MenuBody({ items, level }: { items: DropdownMenuItem[]; level: number }) {
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
              if (!item.disabled) {
                if (item.onClick) {
                  item.onClick();
                }
                if (item.value) {
                  onItemSelect?.(item.value);
                }
              }
            }}
            data-menu-item={item.value}
            data-level={level}
            data-index={itemIndex++}
            tabIndex={-1}
            onMouseOver={(e: React.MouseEvent) => {
              e.preventDefault();
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
        return <div key={key} className='my-1 mx-2 border-t border-popover-foreground/20' />;

      case 'custom':
        return <div key={key}>{item.render()}</div>;

      default:
        return null;
    }
  };

  return (
    <div
      className={join(
        'border py-1 border-popover-foreground/20 rounded-md min-w-52 shadow-lg bg-popover text-popover-foreground',
        className
      )}
      tabIndex={0}
      data-level={level}
      data-menu
    >
      {items.map((item, index) => renderItem(item, String(index)))}
    </div>
  );
}

function getMenuItem(level: number, index: number): HTMLElement | null {
  return document.querySelector<HTMLElement>(`[data-menu-item][data-level="${level}"][data-index="${index}"]`);
}

export function DropdownMenu({
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
  const [focus, setFocus] = useState<DropdownMenuContextFocus | null>(null);
  const [internalOpen, setInternalOpen] = useState(false);
  const isUncontrolled = open === undefined;
  const isOpen = isUncontrolled ? internalOpen : open;

  const handleItemSelect = useCallback(
    (value: string) => {
      if (onItemSelect) {
        onItemSelect(value);
      }
      setInternalOpen(false);
    },
    [onItemSelect]
  );

  const handleClose = useCallback(() => {
    setFocus(null);
    setInternalOpen(false);
  }, []);

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
      focus,
      setFocus,
      isOpen,
      onItemSelect: handleItemSelect,
      onClose: handleClose,
      className,
    }),
    [focus, handleItemSelect, handleClose, className, isOpen]
  );

  useKeyboardNavigation({
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
    console.log('focus', focus); // REMOVE
    if (focus) {
      const el = getMenuItem(focus.level, focus.index);
      if (el) {
        el.focus();
      }
    }
  }, [focus]);

  return (
    <Popover
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
