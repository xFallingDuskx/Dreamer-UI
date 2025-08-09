import React, { useId, useState } from 'react';
import { join } from '../../utils';
import { AccordionItem, AccordionItemProps } from './AccordionItem';

export interface AccordionOption {
  id?: string;
  title: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
  defaultOpen?: boolean;
}

export interface AccordionProps {
  id?: string;
  items?: AccordionOption[];
  children?: React.ReactElement<AccordionItemProps>[] | React.ReactElement<AccordionItemProps>;
  className?: string;
  itemClassName?: string;
  allowMultiple?: boolean;
  defaultOpenItems?: string[];
  triggersClassName?: string;
  bodiesClassName?: string;
}

export function Accordion({
  id,
  items = [],
  children,
  className = '',
  itemClassName = '',
  allowMultiple = false,
  defaultOpenItems = [],
  triggersClassName = '',
  bodiesClassName = '',
}: AccordionProps) {
  const groupId = useId();
  const groupName = id || `accordion-group-${groupId}`;
  const [openItems, setOpenItems] = useState<Set<string>>(new Set(defaultOpenItems));

  const toggleItem = (itemId: string) => {
    setOpenItems((prev) => {
      const newOpenItems = new Set(prev);

      if (newOpenItems.has(itemId)) {
        newOpenItems.delete(itemId);
      } else {
        if (!allowMultiple) {
          newOpenItems.clear();
        }
        newOpenItems.add(itemId);
      }

      return newOpenItems;
    });
  };

  const getItemId = (index: number) => `${groupId}-item-${index}`;
  const isItemOpen = (itemId: string) => openItems.has(itemId);

  return (
    <div id={groupName} className={className}>
      {/* Render from items prop */}
      {items.length > 0 &&
        items.map((item, index) => {
          const itemId = item.id || getItemId(index);
          return (
            <AccordionItem
              key={itemId}
              id={itemId}
              title={item.title}
              content={item.content}
              disabled={item.disabled}
              isOpen={isItemOpen(itemId)}
              onToggle={() => toggleItem(itemId)}
              className={itemClassName}
              triggerClassName={triggersClassName}
              bodyClassName={bodiesClassName}
            />
          );
        })}

      {/* Render AccordionItem components */}
      {items.length === 0 &&
        children &&
        React.Children.map(children, (child, index) => {
          if (React.isValidElement<AccordionItemProps>(child) && child.type === AccordionItem) {
            const itemId = child.props.id || getItemId(index);
            return (
              <AccordionItem
                {...child.props}
                key={itemId}
                id={itemId}
                className={join(itemClassName, child.props.className)}
                isOpen={isItemOpen(itemId)}
                onToggle={() => toggleItem(itemId)}
                triggerClassName={join(triggersClassName, child.props.triggerClassName)}
                bodyClassName={join(bodiesClassName, child.props.bodyClassName)}
              />
            );
          }
          return null;
        })}
    </div>
  );
}
