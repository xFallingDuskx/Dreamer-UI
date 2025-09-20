interface TableVariantStyles {
	container: string;
	table: string;
	header: string;
	headerCell: string;
	sortButton: string;
	cell: string;
	selectedRow: string;
	checkbox: string;
	checkboxSize: number;
}

export type TableSize = 'sm' | 'md' | 'lg';

export const TableSizes: Record<TableSize, TableVariantStyles> = {
	sm: {
		container: 'text-sm',
		table: 'w-full border-collapse',
		header: 'border-b border-border',
		headerCell: 'px-3 py-2.5 font-medium',
		sortButton: 'inline-flex items-center gap-1 hover:text-accent transition-colors',
		cell: 'px-3 py-2 text-sm',
		selectedRow: 'bg-accent/10 hover:bg-accent/20',
		checkbox: 'pl-5 pr-2 text-left w-3',
		checkboxSize: 12,
	},
	md: {
		container: 'text-base',
		table: 'w-full border-collapse',
		header: 'border-b-2 border-border',
		headerCell: 'px-4 py-3 font-semibold',
		sortButton: 'inline-flex items-center gap-2 hover:text-accent transition-colors',
		cell: 'px-4 py-3',
		selectedRow: 'bg-accent/10 hover:bg-accent/20',
		checkbox: 'pl-6 pr-3 py-3 text-left w-6',
		checkboxSize: 16,
	},
	lg: {
		container: 'text-lg',
		table: 'w-full border-collapse',
		header: 'border-b-2 border-border',
		headerCell: 'px-6 py-4 font-bold',
		sortButton: 'inline-flex items-center gap-2 hover:text-accent transition-colors',
		cell: 'px-6 py-4',
		selectedRow: 'bg-accent/10 hover:bg-accent/20',
		checkbox: 'pl-6 pr-3 py-4 text-left w-8',
		checkboxSize: 18,
	},
};
