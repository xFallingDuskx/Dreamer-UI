import React, { useId, useState } from 'react';
import { join } from '../../utils';
import { AccordionItem, AccordionItemProps } from './AccordionItem';

export interface AccordionOption {
	/** Unique identifier for the accordion item. */
	id?: string;
	/** The title/header content for the accordion item. */
	title: React.ReactNode;
	/** The main content that will be shown when the item is expanded. */
	content: React.ReactNode;
	/** Whether the accordion item is disabled and cannot be toggled. */
	disabled?: boolean;
	/** Whether the accordion item should be open by default. */
	defaultOpen?: boolean;
}

export interface AccordionProps {
	/** Unique identifier for the accordion container. */
	id?: string;
	/** Array of accordion items with id, title, content, and optional disabled state. */
	items?: AccordionOption[];
	/** AccordionItem components when using the component approach. */
	children?: React.ReactElement<AccordionItemProps>[] | React.ReactElement<AccordionItemProps>;
	/** Additional CSS classes to apply to the accordion container. */
	className?: string;
	/** Additional CSS classes to apply to individual accordion items. */
	itemClassName?: string;
	/** Whether multiple items can be open simultaneously. */
	allowMultiple?: boolean;
	/** Array of item IDs that should be open by default. */
	defaultOpenItems?: string[];
	/** Additional CSS classes to apply to all trigger buttons. */
	triggersClassName?: string;
	/** Additional CSS classes to apply to all content bodies. */
	bodiesClassName?: string;
}

/**
 * A flexible accordion component that supports expandable/collapsible content sections.
 * Can be used either with an items array or with AccordionItem child components.
 *
 * @example
 * ```tsx
 * // Using items prop
 * <Accordion
 *   items={[
 *     { id: "1", title: "Section 1", content: "Content here" },
 *     { id: "2", title: "Section 2", content: "More content" }
 *   ]}
 *   allowMultiple={false}
 * />
 *
 * // Using children
 * <Accordion allowMultiple>
 *   <AccordionItem title="Custom Section" content="Custom content" />
 *   <AccordionItem title="Another Section" content="Another content" />
 * </Accordion>
 * ```
 */
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
