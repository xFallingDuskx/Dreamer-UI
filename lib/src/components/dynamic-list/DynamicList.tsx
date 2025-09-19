import React, { useEffect, useId, useRef, useState } from 'react';
import { useDynamicList, type DynamicListItem } from './hooks';
import { DynamicListSize, iconSize, listVariants, titleVariants } from './variants';
import { join } from '../../utils';
import { ChevronDown, ChevronUp, GripVertical, Plus, Trash } from '../../symbols';
import { DashMarker, DiscMarker } from './markers';

export type DynamicListMarkerType = 'disc' | 'dash' | 'decimal' | React.ReactElement;

export interface DynamicListProps<T extends object> {
	/** Items to display in the list */
	items?: DynamicListItem<T>[];
	/** Size variant */
	size?: DynamicListSize;
	/** Optional ID for the component */
	id?: string;
	/** Additional CSS classes */
	className?: string;
	/** Reference to the list container element */
	ref?: React.Ref<HTMLDivElement>;
	/** Whether items can be added */
	allowAdd?: boolean;
	/** Whether items can be deleted */
	allowDelete?: boolean;
	/** Whether items can be reordered */
	allowReorder?: boolean;
	/** Placeholder text for new items */
	addPlaceholder?: string;
	/** Callback when items change */
	onItemsChange?: (items: DynamicListItem<T>[]) => void;
	/** Custom render function for items */
	renderItem?: (item: DynamicListItem<T>, index: number) => React.ReactNode;
	/** Marker type for list items */
	marker?: DynamicListMarkerType;
	/** Custom item renderer function (alternative name for renderItem) */
	itemRenderer?: (item: DynamicListItem<T>, index: number) => React.ReactNode;
	/** Whether to show dividers between items */
	showDividers?: boolean;
	/** Whether to always show reorder buttons (if allowReorder is true) */
	showReorderButtons?: boolean;
	/** Optional title for the list */
	title?: string | React.ReactElement;
	/** Whether to truncate long text in items (default: true) */
	truncateText?: boolean;
}

export function DynamicList<T extends object>({
	items: initialItems = [],
	size = 'md',
	id,
	className = '',
	ref,
	allowAdd = true,
	allowDelete = true,
	allowReorder = true,
	addPlaceholder = 'Add new item...',
	onItemsChange,
	renderItem,
	marker,
	itemRenderer,
	showDividers = true,
	showReorderButtons = true,
	title,
	truncateText = false,
}: DynamicListProps<T>) {
	const [newItemText, setNewItemText] = useState('');
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const generatedId = useId();
	const hasMounted = useRef(false);
	const lastOnChangeItems = useRef<DynamicListItem<T>[]>(initialItems);
	const listId = id || `dynamic-list-${generatedId}`;
	const titleId = `${listId}-title`;

	const {
		items,
		visualItems,
		addItem,
		deleteItem,
		moveItemUp,
		moveItemDown,
		draggedItem,
		draggedOverIndex,
		handleDragStart,
		handleDragOver,
		handleDragEnd,
		handleDrop,
	} = useDynamicList<T>(initialItems);

	// Use itemRenderer if provided, otherwise use renderItem
	const itemRenderFunction = itemRenderer || renderItem;

	// Call onChange callback when items change
	// Avoid calling onItemsChange on initial mount
	useEffect(() => {
		if (!hasMounted.current) {
			hasMounted.current = true;
			return;
		}
		if (lastOnChangeItems.current !== items) {
			lastOnChangeItems.current = items;
			onItemsChange?.(items);
		}
	}, [items, onItemsChange]);

	const getItemElementById = (itemId: string) =>
		// must escape special characters in ID for querySelector
		document.querySelector(`#${listId} #${CSS.escape(itemId)}`) as HTMLElement | null;

	const handleAddItem = () => {
		if (newItemText.trim()) {
			addItem(newItemText.trim());
			setNewItemText('');
			inputRef.current?.focus();
		}
	};

	const handleDeleteItem = (e: React.MouseEvent | React.KeyboardEvent, index: number) => {
		if (!allowDelete) {
			return;
		}
		e.preventDefault();
		const nextIndex = index < items.length - 1 ? index + 1 : index - 1;
		const nextItem = items[nextIndex];
		deleteItem(items[index].id);

		// After deletion, set focus to the next item or previous if last was deleted
		if (nextIndex >= 0 && nextItem) {
			// Use a timeout to ensure the item is removed from the DOM before focusing
			setTimeout(() => {
				const nextElement = getItemElementById(nextItem.id);
				nextElement?.focus();
			}, 0);
		} else {
			// If no items left, focus the input for adding new items
			inputRef.current?.focus();
			setHoveredIndex(null);
		}
	};

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			handleAddItem();
		}
	};

	const handleItemKeyDown = (e: React.KeyboardEvent, index: number) => {
		switch (e.key) {
			case 'ArrowUp':
				if (!allowReorder) return;
				e.preventDefault();
				moveItemUp(index);

				if (index > 0) {
					setHoveredIndex(index - 1);
				}
				break;
			case 'ArrowDown':
				if (!allowReorder) return;
				e.preventDefault();
				moveItemDown(index);

				if (index < items.length - 1) {
					setHoveredIndex(index + 1);
				}
				break;
			case 'Backspace':
			case 'Delete':
				handleDeleteItem(e, index);
				break;
			default:
				break;
		}
	};

	const renderTitle = () => {
		if (!title) return null;

		const titleClasses = join('font-medium opacity-60', titleVariants[size]);
		if (typeof title === 'string') {
			return (
				<h4 id={titleId} className={titleClasses}>
					{title}
				</h4>
			);
		}

		const prop = title.props as { className?: string };
		return React.cloneElement(title, { id: titleId, className: join(titleClasses, prop.className) } as Record<
			string,
			unknown
		>);
	};

	// Render marker based on type
	const renderMarker = (index: number) => {
		if (!marker) return null;

		if (React.isValidElement(marker)) {
			return marker;
		}

		switch (marker) {
			case 'disc':
				return <DiscMarker className='text-muted-foreground' />;
			case 'dash':
				return <DashMarker className='text-muted-foreground' />;
			case 'decimal':
				return (
					<span className='text-sm font-medium text-muted-foreground flex-shrink-0 min-w-4 text-right'>
						{index + 1}.
					</span>
				);
			default:
				return <DiscMarker className='text-muted-foreground' />;
		}
	};

	const sizeClasses = listVariants[size];
	const iconSizeValue = iconSize[size];

	return (
		<div
			ref={ref}
			id={listId}
			className={className}
			data-size={size}
			data-allow-add={allowAdd}
			data-allow-delete={allowDelete}
			data-allow-reorder={allowReorder}
			data-marker={typeof marker === 'string' ? marker : 'custom'}
		>
			{/* Title */}
			{renderTitle()}

			{/* List Items */}
			<ul className={sizeClasses} role='list' aria-labelledby={title ? titleId : undefined}>
				{visualItems.map((item, visualIndex) => {
					// Find the original index of this item in the actual items array
					const originalIndex = items.findIndex((originalItem) => originalItem.id === item.id);
					const isDraggedItem = draggedItem?.id === item.id;
					const isHovered = hoveredIndex === originalIndex;

					return (
						<div key={item.id}>
							<li
								id={item.id}
								title={truncateText ? item.content : undefined}
								className={join(
									'flex items-center group relative transition-all duration-150',
									isDraggedItem && 'opacity-30',
									// Drag feedback styling
									draggedItem && draggedOverIndex === visualIndex && !isDraggedItem ? 'border-t-2 border-primary' : ''
								)}
								draggable={allowReorder}
								onDragStart={(e) => {
									e.dataTransfer.effectAllowed = 'move';
									handleDragStart(item, originalIndex);
								}}
								onDragOver={(e) => handleDragOver(e, visualIndex)}
								onDragEnd={handleDragEnd}
								onDrop={handleDrop}
								onMouseEnter={() => setHoveredIndex(originalIndex)}
								onMouseLeave={() => setHoveredIndex(null)}
								onFocus={(e) => {
									// Check if the focused element is the current list item
									if (e.currentTarget === e.target) {
										setHoveredIndex(originalIndex);
									}
								}}
								tabIndex={0}
								role='listitem'
								aria-label={`List item ${originalIndex + 1}: ${item.content}`}
								onKeyDown={(e) => handleItemKeyDown(e, originalIndex)}
								aria-description={`${allowReorder ? 'Use up/down arrow keys to reorder. ' : ''}${
									allowDelete ? 'Press Backspace/Delete to remove this item.' : ''
								}`}
							>
								{/* Drag Handle */}
								{allowReorder && (
									<div className={join('absolute -translate-x-full flex-shrink-0 pl-2 pr-1 py-2 cursor-move transition-opacity opacity-0', (isDraggedItem || (isHovered && !draggedItem)) && 'opacity-100')}>
										<GripVertical size={iconSizeValue + 2} />
									</div>
								)}

								{/* Marker */}
								{marker && (
									<div className={join('flex-shrink-0 flex items-center justify-center py-2 pr-2')}>
										{renderMarker(originalIndex)}
									</div>
								)}

								{/* Item Content */}
								<div className={join('flex-1 flex min-w-0')}>
									<div className={join('flex-1 min-w-0 py-2 pr-2')}>
										{itemRenderFunction ? (
											itemRenderFunction(item, originalIndex)
										) : (
											<span className={join('block', truncateText && 'truncate')}>{item.content}</span>
										)}
									</div>

									{/* Control Buttons */}
									{!draggedItem && (
										<div
											className={join(
												'flex-shrink-0 flex items-center gap-1 pr-2 opacity-0 transition-opacity',
												isHovered && 'opacity-100'
											)}
										>
											{/* Move Up/Down Buttons */}
											{allowReorder && showReorderButtons && (
												<>
													<button
														type='button'
														onClick={() => moveItemUp(originalIndex)}
														disabled={originalIndex === 0}
														className='p-0.5 opacity-50 leading-0 hover:opacity-80 disabled:opacity-30 disabled:cursor-not-allowed rounded transition-colors'
														// Prevent from tabbing to this button since the behavior is not ideal
														aria-hidden={true}
														tabIndex={-1}
													>
														<ChevronUp size={iconSizeValue} />
													</button>
													<button
														type='button'
														onClick={() => moveItemDown(originalIndex)}
														disabled={originalIndex === items.length - 1}
														className='p-0.5 opacity-50 leading-0 hover:opacity-80 disabled:opacity-30 disabled:cursor-not-allowed rounded transition-colors'
														// Prevent from tabbing to this button since the behavior is not ideal
														aria-hidden={true}
														tabIndex={-1}
													>
														<ChevronDown size={iconSizeValue} />
													</button>
												</>
											)}

											{/* Delete Button */}
											{allowDelete && (
												<button
													tabIndex={isHovered ? 0 : -1}
													type='button'
													onClick={(e) => handleDeleteItem(e, originalIndex)}
													className='p-0.5 text-destructive opacity-70 h-fit hover:opacity-90 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-destructive'
													aria-label={`Delete item`}
												>
													<Trash size={iconSizeValue} />
												</button>
											)}
										</div>
									)}
								</div>
							</li>
							{showDividers && visualIndex < items.length - 1 && <hr className='border-border/50' />}
						</div>
					);
				})}

				{/* Empty State */}
				{items.length === 0 && (
					<li className={join('text-center text-muted-foreground py-8', sizeClasses)}>
						No items yet. {allowAdd && 'Add an item below to get started.'}
					</li>
				)}
			</ul>

			{/* Add New Item */}
			{allowAdd && (
				<div className={join('border-t border-border/50 flex items-center gap-2', sizeClasses)}>
					<input
						id={`${listId}-new-item-input`}
						ref={inputRef}
						type='text'
						value={newItemText}
						onChange={(e) => setNewItemText(e.target.value)}
						onKeyDown={handleKeyPress}
						placeholder={addPlaceholder}
						className='flex-1 bg-transparent border-none outline-none  placeholder-muted-foreground pt-1'
						aria-label='Add new list item'
					/>
					<button
						type='button'
						onClick={handleAddItem}
						disabled={!newItemText.trim()}
						className='flex-shrink-0 p-1.5 text-muted-foreground hover: disabled:opacity-30 disabled:cursor-not-allowed rounded transition-colors'
						aria-label='Add item'
					>
						<Plus size={16} />
					</button>
				</div>
			)}
		</div>
	);
}
