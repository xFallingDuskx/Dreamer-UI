import { Popover, PopoverProps } from '@moondreamsdev/dreamer-ui/components';
import { ChevronRight } from '@moondreamsdev/dreamer-ui/symbols';
import React, { useCallback, useRef, useState } from 'react';
import { DropdownMenuItem, DropdownMenuOption } from './types';

export interface DropdownMenuProps extends Omit<PopoverProps, 'children'> {
  /** Dropdown options, separators, groups, or custom items */
  items: DropdownMenuItem[];
  /** Callback when an item is selected, returns the value of the selected item */
  onItemSelect?: (value: string) => void;
}

interface SubMenuProps {
  option: DropdownMenuOption;
  onItemSelect?: (value: string) => void;
  onClose?: () => void;
}

// Sub-menu component
export function SubMenu({ option, onItemSelect, onClose }: SubMenuProps) {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    setIsSubMenuOpen(true);
  };

  const handleMouseLeave = () => {
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
    <div ref={itemRef} className='relative' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div
        className={`
          flex items-center justify-between px-3 py-2 text-sm cursor-pointer
          hover:bg-gray-100 dark:hover:bg-gray-700
          ${option.disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        onClick={!option.disabled ? handleItemClick : undefined}
      >
        <div className='flex items-center gap-2'>
          {option.icon && <span className='w-4 h-4'>{option.icon}</span>}
          <span>{option.label}</span>
        </div>
        {option.subItems && option.subItems.length > 0 && <ChevronRight className='w-4 h-4' />}
      </div>

      {isSubMenuOpen && option.subItems && option.subItems.length > 0 && (
        <div className='absolute left-full top-0 ml-1 z-30'>
          <MainMenu items={option.subItems} onItemSelect={onItemSelect} onClose={onClose} className='min-w-48' />
        </div>
      )}
    </div>
  );
}

interface MainMenuProps {
  items: DropdownMenuItem[];
  onItemSelect?: (value: string) => void;
  onClose?: () => void;
  className?: string;
}

export function MainMenu({ items, onItemSelect, onClose, className = '' }: MainMenuProps) {
  const handleItemSelect = useCallback(
    (value: string) => {
      if (onItemSelect) {
        onItemSelect(value);
      }
      if (onClose) {
        onClose();
      }
    },
    [onItemSelect, onClose]
  );

  const renderItem = (item: DropdownMenuItem, key: string) => {
    switch (item.__type) {
      case 'option':
        if (item.subItems && item.subItems.length > 0) {
          return <SubMenu key={key} option={item} onItemSelect={handleItemSelect} onClose={onClose} />;
        }

        return (
          <div
            key={key}
            className={`
              flex items-center gap-2 px-3 py-2 text-sm cursor-pointer
              hover:bg-gray-100 dark:hover:bg-gray-700
              ${item.disabled ? 'opacity-50 cursor-not-allowed' : ''}
            `}
            onClick={() => {
              if (!item.disabled) {
                if (item.onClick) {
                  item.onClick();
                }
                if (item.value) {
                  handleItemSelect(item.value);
                }
              }
            }}
          >
            {item.icon && <span className='w-4 h-4'>{item.icon}</span>}
            <div className='flex-1'>
              <div>{item.label}</div>
              {item.description && <div className='text-xs text-gray-500 dark:text-gray-400'>{item.description}</div>}
            </div>
          </div>
        );

      case 'group':
        return (
          <div key={key}>
            {item.title && (
              <div className='px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase'>
                {item.title}
              </div>
            )}
            {item.items.map((groupItem, groupIndex) => renderItem(groupItem, `${key}-${groupIndex}`))}
          </div>
        );

      case 'separator':
        return <div key={key} className='my-1 border-t border-gray-200 dark:border-gray-600' />;

      case 'custom':
        return <div key={key}>{item.render()}</div>;

      default:
        return null;
    }
  };

  return (
    <div
      className={`
      bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 
      rounded-md shadow-lg py-1 min-w-48 max-h-96 overflow-y-auto
      ${className}
    `}
    >
      {items.map((item, index) => renderItem(item, String(index)))}
    </div>
  );
}

export function DropdownMenu({
  items,
  onItemSelect,
  trigger,
  isOpen,
  placement = 'bottom',
  alignment = 'start',
  onOpenChange,
  ...popoverProps
}: DropdownMenuProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isUncontrolled = isOpen === undefined;

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

  const dropdownTrigger = React.cloneElement(trigger, {
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

  return (
    <Popover
      isOpen={isUncontrolled ? internalOpen : isOpen}
      trigger={dropdownTrigger}
      placement={placement}
      alignment={alignment}
      onOpenChange={handleOpenChange}
      {...popoverProps}
    >
      <MainMenu items={items} onItemSelect={handleItemSelect} onClose={handleClose} />
    </Popover>
  );
}
