import { Popover, PopoverProps } from '@moondreamsdev/dreamer-ui/components';
import { join } from '@moondreamsdev/dreamer-ui/utils';
import React, { useCallback, useRef, useState } from 'react';
import { ChevronRight } from '../../lib/src/symbols';
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

const getOptionClasses = (disabled?: boolean, additionalClasses?: string) => {
  return join(
    'flex items-center gap-2 px-3 py-2 text-sm',
    disabled ? 'opacity-50 cursor-default' : 'hover:bg-popover-foreground/10 cursor-pointer',
    additionalClasses
  );
};

// Sub-menu component
function SubMenu({ option, onItemSelect, onClose }: SubMenuProps) {
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
        className={getOptionClasses(option.disabled, 'justify-between')}
        onClick={!option.disabled ? handleItemClick : undefined}
      >
        <div className='flex items-center gap-2'>
          {option.icon && <span className='size-4'>{option.icon}</span>}
          <span>{option.label}</span>
        </div>
        {option.subItems && option.subItems.length > 0 && <ChevronRight className='size-4' />}
      </div>

      {isSubMenuOpen && option.subItems && option.subItems.length > 0 && (
        <div className='absolute left-full top-0 z-30'>
          <MenuBody items={option.subItems} onItemSelect={onItemSelect} onClose={onClose} />
        </div>
      )}
    </div>
  );
}

interface MenuBodyProps {
  items: DropdownMenuItem[];
  onItemSelect?: (value: string) => void;
  onClose?: () => void;
  className?: string;
}

function MenuBody({ items, onItemSelect, onClose, className = '' }: MenuBodyProps) {
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
          return <SubMenu key={key} option={item} onItemSelect={onItemSelect} onClose={onClose} />;
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
                  handleItemSelect(item.value);
                }
              }
            }}
          >
            {item.icon && <span className='size-4'>{item.icon}</span>}
            <div className='flex-1'>
              <div>{item.label}</div>
              {item.description && <div className='text-xs text-popover-foreground/60'>{item.description}</div>}
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
        return <div key={key} className='my-1 mx-2 border-t border-popover-foreground/20' />;

      case 'custom':
        return <div key={key}>{item.render()}</div>;

      default:
        return null;
    }
  };

  return (
    <div className={join('border py-1 border-popover-foreground/20 rounded-md min-w-48 shadow-lg bg-popover text-popover-foreground', className)}>
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
  className = '',
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
      className={join('min-w-52', className)}
      {...popoverProps}
    >
      <MenuBody items={items} onItemSelect={handleItemSelect} onClose={handleClose} className={className} />
    </Popover>
  );
}
