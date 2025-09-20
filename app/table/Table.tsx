import { Checkbox } from '@moondreamsdev/dreamer-ui/components';
import { ChevronDown, ChevronUp } from '@moondreamsdev/dreamer-ui/symbols';
import { join } from '@moondreamsdev/dreamer-ui/utils';
import React from 'react';
import { useTableSelection, useTableSort } from './hooks';
import { TableSize, TableSizes } from './variants';

export interface TableColumn<T extends object, U = unknown> {
	/** Unique key for the column */
	key: Extract<keyof T, string>;
	/** Column header label */
	header: string;
	/** Accessor function or property name to get cell value */
	accessor?: keyof T | ((item: T) => U);
	/** Custom cell renderer */
	cell?: (item: T, value: U) => React.ReactNode;
	/** Whether the column is sortable */
	sortable?: boolean;
	/** Custom sort function. Negative result indicates descending order. */
	sortFunction?: (a: T, b: T) => number;
	/** Column width */
	width?: string | number;
	/** Column alignment */
	align?: 'left' | 'center' | 'right';
	/** Additional header class names */
	headerClassName?: string;
	/** Additional cell class names */
	cellClassName?: string;
  /** Additional column class names */
  columnClassName?: string;
}

export interface TableProps<T extends object> {
	/** Unique identifier for the table */
	id?: string;
	/** Custom CSS classes */
	className?: string;
	/** React ref for the table container */
	ref?: React.Ref<HTMLDivElement>;
	/** Table size variant */
	size?: TableSize;
	/** Table data */
	data: T[];
	/** Column definitions */
	columns: TableColumn<T>[];
	/** Whether to show row selection checkboxes */
	selectable?: boolean;
	/** Function to get unique row ID */
	getRowId?: (item: T, index: number) => string | number;
	/** Initial selected row IDs */
	initialSelected?: (string | number)[];
	/** Callback when selection changes */
	onSelectionChange?: (selectedIds: (string | number)[]) => void;
	/** Whether to show table header */
	showHeader?: boolean;
	/** Whether to add striped row styling */
	striped?: boolean;
	/** Whether to add hover effects */
	hoverable?: boolean;
	/** Empty state content */
	emptyState?: React.ReactNode;
	/** Loading state */
	loading?: boolean;
	/** Loading content */
	loadingContent?: React.ReactNode;
	/** Table caption for accessibility */
	caption?: string;
}

export function Table<T extends object>({
	id,
	className,
	ref,
	size = 'md',
	data,
	columns,
	selectable = false,
	getRowId = (_, index) => index,
	initialSelected = [],
	onSelectionChange,
	showHeader = true,
	striped = false,
	hoverable = true,
	emptyState,
	loading = false,
	loadingContent,
	caption,
	...props
}: TableProps<T>) {
	const sizeVariant = TableSizes[size];

	const { sortedData, sortConfig, handleSort } = useTableSort({
		data,
		initialSort: { key: null, direction: null },
	});

	const {
		selectedRows,
		isRowSelected,
		selectRow,
		deselectRow,
		selectAll,
		deselectAll,
		isAllSelected,
		isPartiallySelected,
	} = useTableSelection({ initialSelected });

	// Get all row IDs for select all functionality
	const allRowIds = data.map((item, index) => getRowId(item, index));

	// Handle selection changes
	React.useEffect(() => {
		if (onSelectionChange) {
			onSelectionChange(Array.from(selectedRows));
		}
	}, [selectedRows, onSelectionChange]);

	const handleSelectAll = () => {
		if (isAllSelected(allRowIds)) {
			deselectAll();
		} else {
			selectAll(allRowIds);
		}
	};

	const getCellValue = (item: T, column: TableColumn<T>) => {
		if (column.accessor) {
			if (typeof column.accessor === 'function') {
				return column.accessor(item);
			} else {
				return item[column.accessor];
			}
		}
		return item[column.key];
	};

	const renderCell = (item: T, column: TableColumn<T>) => {
		const value = getCellValue(item, column);

		if (column.cell) {
			return column.cell(item, value);
		}

		return <>{value}</>;
	};

	const getAlignmentClass = (align?: 'left' | 'center' | 'right') => {
		switch (align) {
			case 'center':
				return 'text-center';
			case 'right':
				return 'text-right';
			default:
				return 'text-left';
		}
	};

	if (loading) {
		return (
			<div
				id={id}
				ref={ref}
				className={join('flex items-center justify-center p-8', sizeVariant.container, className)}
				{...props}
			>
				{loadingContent || <div>Loading...</div>}
			</div>
		);
	}

	if (data.length === 0) {
		return (
			<div
				id={id}
				ref={ref}
				className={join('flex items-center justify-center p-8', sizeVariant.container, className)}
				{...props}
			>
				{emptyState || <div className='text-muted-foreground'>No data available</div>}
			</div>
		);
	}

	return (
		<div
			id={id}
			ref={ref}
			className={join('overflow-x-auto border border-border rounded-lg', sizeVariant.container, className)}
			data-testid='table-container'
			data-size={size}
			data-selectable={selectable}
			{...props}
		>
			<table className={sizeVariant.table} role='table'>
				{caption && <caption className='sr-only'>{caption}</caption>}

        <colgroup>
          {selectable && <col style={{ width: '1%' }} />}
          {columns.map((column) => (
            <col key={column.key} style={column.width ? { width: column.width } : {}} className={column.columnClassName} />
          ))}
        </colgroup>

				{showHeader && (
					<thead className={sizeVariant.header} role='rowgroup'>
						<tr role='row'>
							{selectable && (
								<th className={sizeVariant.checkbox} role='columnheader' aria-label='Select all rows'>
									<Checkbox
										size={sizeVariant.checkboxSize}
										checked={isAllSelected(allRowIds)}
										indeterminate={isPartiallySelected(allRowIds)}
										onCheckedChange={handleSelectAll}
										aria-label='Select all rows'
										className='align-middle'
									/>
								</th>
							)}

							{columns.map((column) => {
								const sortDirection = sortConfig.key === column.key ? sortConfig.direction : null;
								return (
									<th
										key={column.key}
										className={join(sizeVariant.headerCell, getAlignmentClass(column.align), column.headerClassName)}
										role='columnheader'
										aria-sort={
											sortConfig.key === column.key
												? sortConfig.direction === 'asc'
													? 'ascending'
													: sortConfig.direction === 'desc'
													? 'descending'
													: 'none'
												: column.sortable
												? 'none'
												: undefined
										}
									>
										{column.sortable ? (
											<button
												className={sizeVariant.sortButton}
												onClick={() => handleSort(column.key, column.sortFunction)}
												aria-label={`Sort by ${column.header}`}
											>
												{column.header}
												<div className='flex flex-col items-center -space-y-1'>
													<ChevronUp
														size={sizeVariant.checkboxSize - 4 - 2}
														className={sortDirection === 'asc' ? 'text-accent' : 'opacity-40'}
													/>
													<ChevronDown
														size={sizeVariant.checkboxSize - 4}
														className={sortDirection === 'desc' ? 'text-accent' : 'opacity-40'}
													/>
												</div>
											</button>
										) : (
											column.header
										)}
									</th>
								);
							})}
						</tr>
					</thead>
				)}

				<tbody role='rowgroup'>
					{sortedData.map((item, index) => {
						const rowId = getRowId(item, index);
						const isSelected = isRowSelected(rowId);
						const isFinalItem = index === sortedData.length - 1;

						return (
							<tr
								key={rowId}
								className={join(
									'transition-all',
									!isFinalItem && 'border-b border-border',
									hoverable && 'hover:bg-accent/15',
									striped && index % 2 === 1 && 'bg-accent/25',
									isSelected && sizeVariant.selectedRow
								)}
								role='row'
								aria-selected={selectable ? isSelected : undefined}
								data-testid='table-row'
								data-row-id={rowId}
								data-selected={isSelected}
							>
								{selectable && (
									<td className={sizeVariant.checkbox} role='cell'>
										<Checkbox
											size={sizeVariant.checkboxSize}
											checked={isSelected}
											onCheckedChange={(checked) => {
												if (checked) {
													selectRow(rowId);
												} else {
													deselectRow(rowId);
												}
											}}
											aria-label={`Select row ${index + 1}`}
										/>
									</td>
								)}

								{columns.map((column) => (
									<td
										key={column.key}
										className={join(sizeVariant.cell, getAlignmentClass(column.align), column.cellClassName)}
										role='cell'
									>
										{renderCell(item, column)}
									</td>
								))}
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
