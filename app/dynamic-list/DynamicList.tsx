import React, { useState, useRef } from 'react';
import { join } from '@moondreamsdev/dreamer-ui/utils';
import { listVariants } from './variants';
import { ChevronUp, ChevronDown, GripVertical, Trash, Plus, DiscMarker, DashMarker } from './icons';
import { useDynamicList, type DynamicListItem } from './hooks';

export type MarkerType = 'disc' | 'dash' | 'decimal' | React.ReactElement;

export interface DynamicListProps {
	/** Items to display in the list */
	items?: DynamicListItem[];
	/** Size variant */
	size?: keyof typeof listVariants.size;
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
	onItemsChange?: (items: DynamicListItem[]) => void;
	/** Custom render function for items */
	renderItem?: (item: DynamicListItem, index: number) => React.ReactNode;
	/** Marker type for list items */
	marker?: MarkerType;
	/** Custom item renderer function (alternative name for renderItem) */
	itemRenderer?: (item: DynamicListItem, index: number) => React.ReactNode;
	/** Whether to show dividers between items */
	showDividers?: boolean;
}

export function DynamicList({
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
}: DynamicListProps) {
	const [newItemText, setNewItemText] = useState('');
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
	const inputRef = useRef<HTMLInputElement>(null);

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
	} = useDynamicList(initialItems);

	// Use itemRenderer if provided, otherwise use renderItem
	const itemRenderFunction = itemRenderer || renderItem;

	// Call onChange callback when items change
	React.useEffect(() => {
		onItemsChange?.(items);
	}, [items, onItemsChange]);

	const handleAddItem = () => {
		if (newItemText.trim()) {
			addItem(newItemText.trim());
			setNewItemText('');
			inputRef.current?.focus();
		}
	};

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			handleAddItem();
		}
	};

	const handleItemKeyDown = (e: React.KeyboardEvent, index: number) => {
		if (!allowReorder) return;

		switch (e.key) {
			case 'ArrowUp':
				e.preventDefault();
				moveItemUp(index);
				break;
			case 'ArrowDown':
				e.preventDefault();
				moveItemDown(index);
				break;
			case 'Delete':
				if (allowDelete) {
					e.preventDefault();
					deleteItem(items[index].id);
				}
				break;
		}
	};

	// Render marker based on type
	const renderMarker = (index: number) => {
		if (!marker) return null;

		if (React.isValidElement(marker)) {
			return marker;
		}

		switch (marker) {
			case 'disc':
				return <DiscMarker className='text-slate-400' />;
			case 'dash':
				return <DashMarker className='text-slate-400' />;
			case 'decimal':
				return (
					<span className='text-sm font-medium text-slate-400 flex-shrink-0 min-w-6 text-right'>{index + 1}.</span>
				);
			default:
				return <DiscMarker className='text-slate-400' />;
		}
	};

	const sizeClasses = listVariants.size[size];

	return (
		<div
			ref={ref}
			id={id}
			className={join('border border-slate-200 rounded-lg bg-white dark:bg-slate-800 dark:border-slate-700', className)}
			data-size={size}
			data-allow-add={allowAdd}
			data-allow-delete={allowDelete}
			data-allow-reorder={allowReorder}
			data-marker={typeof marker === 'string' ? marker : 'custom'}
		>
			{/* List Items */}
			<ul className={join(showDividers && 'divide-y divide-slate-200 dark:divide-slate-700', sizeClasses)} role='list'>
				{visualItems.map((item, visualIndex) => {
					// Find the original index of this item in the actual items array
					const originalIndex = items.findIndex((originalItem) => originalItem.id === item.id);
					const isDraggedItem = draggedItem?.id === item.id;
					const isHovered = hoveredIndex === originalIndex;

					return (
						<li
							key={item.id}
							className={join(
								'flex items-center group relative transition-all duration-150',
								isDraggedItem && 'opacity-0',
								isHovered ? 'bg-slate-50 dark:bg-slate-700/50' : '',
								// Add drag feedback styling
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
							tabIndex={0}
							role='listitem'
							aria-label={`List item ${originalIndex + 1}: ${item.content}`}
							onKeyDown={(e) => handleItemKeyDown(e, originalIndex)}
						>
							{/* Drag Handle */}
							{allowReorder && (
								<div className='flex-shrink-0 p-2 cursor-move opacity-0 group-hover:opacity-100 transition-opacity'>
									<GripVertical size={16} className='text-slate-400' />
								</div>
							)}

							{/* Marker */}
							{marker && (
								<div className='flex-shrink-0 px-3 flex items-center justify-center'>{renderMarker(originalIndex)}</div>
							)}

							{/* Item Content */}
							<div className='flex-1 min-w-0'>
								{itemRenderFunction ? (
									itemRenderFunction(item, originalIndex)
								) : (
									<span className='block text-slate-900 dark:text-slate-100 truncate'>{item.content}</span>
								)}
							</div>

							{/* Control Buttons */}
							<div
								className={join(
									'flex-shrink-0 flex items-center gap-1 opacity-0 transition-opacity',
									isHovered ? 'opacity-100' : ''
								)}
							>
								{/* Move Up/Down Buttons */}
								{allowReorder && (
									<>
										<button
											type='button'
											onClick={() => moveItemUp(originalIndex)}
											disabled={originalIndex === 0}
											className='p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed rounded transition-colors'
											aria-label={`Move item up`}
										>
											<ChevronUp size={14} />
										</button>
										<button
											type='button'
											onClick={() => moveItemDown(originalIndex)}
											disabled={originalIndex === items.length - 1}
											className='p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed rounded transition-colors'
											aria-label={`Move item down`}
										>
											<ChevronDown size={14} />
										</button>
									</>
								)}

								{/* Delete Button */}
								{allowDelete && (
									<button
										type='button'
										onClick={() => deleteItem(item.id)}
										className='p-1.5 text-red-400 hover:text-red-600 dark:hover:text-red-300 rounded transition-colors'
										aria-label={`Delete item`}
									>
										<Trash size={14} />
									</button>
								)}
							</div>
						</li>
					);
				})}

				{/* Empty State */}
				{items.length === 0 && (
					<li className={join('text-center text-slate-500 dark:text-slate-400 py-8', sizeClasses)}>
						No items yet. {allowAdd && 'Add an item below to get started.'}
					</li>
				)}
			</ul>

			{/* Add New Item */}
			{allowAdd && (
				<div className={join('border-t border-slate-200 dark:border-slate-700 flex items-center gap-2', sizeClasses)}>
					<input
						ref={inputRef}
						type='text'
						value={newItemText}
						onChange={(e) => setNewItemText(e.target.value)}
						onKeyPress={handleKeyPress}
						placeholder={addPlaceholder}
						className='flex-1 bg-transparent border-none outline-none text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400'
						aria-label='Add new list item'
					/>
					<button
						type='button'
						onClick={handleAddItem}
						disabled={!newItemText.trim()}
						className='flex-shrink-0 p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed rounded transition-colors'
						aria-label='Add item'
					>
						<Plus size={16} />
					</button>
				</div>
			)}
		</div>
	);
}
