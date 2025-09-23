import { Badge, Table, TableColumn } from '@moondreamsdev/dreamer-ui/components';
import { ComponentPage } from '../../components/layout/ComponentPage';

const tableOfContents = [
	{ id: 'import', title: 'Import', level: 1 },
	{ id: 'examples', title: 'Examples', level: 1 },
	{ id: 'basic-table', title: 'Basic Usage', level: 2 },
	{ id: 'sorting', title: 'Sorting', level: 2 },
	{ id: 'custom-cells', title: 'Custom Cells', level: 2 },
	{ id: 'selection', title: 'Row Selection', level: 2 },
	{ id: 'variants', title: 'Size Variants', level: 2 },
	{ id: 'states', title: 'States', level: 2 },
	{ id: 'props', title: 'Props', level: 1 },
	{ id: 'keyboard-shortcuts', title: 'Keyboard Shortcuts', level: 1 },
];

// Sample data for examples
interface User {
	id: number;
	name: string;
	email: string;
	role: string;
	status: 'active' | 'inactive';
	lastLogin: Date;
	score: number;
}

const sampleUsers: User[] = [
	{
		id: 1,
		name: 'Alice Johnson',
		email: 'alice@example.com',
		role: 'Admin',
		status: 'active',
		lastLogin: new Date('2024-01-15T10:30:00'),
		score: 95,
	},
	{
		id: 2,
		name: 'Bob Smith',
		email: 'bob@example.com',
		role: 'User',
		status: 'active',
		lastLogin: new Date('2024-01-14T15:45:00'),
		score: 78,
	},
	{
		id: 3,
		name: 'Carol Davis',
		email: 'carol@example.com',
		role: 'Editor',
		status: 'inactive',
		lastLogin: new Date('2024-01-10T09:20:00'),
		score: 82,
	},
	{
		id: 4,
		name: 'David Wilson',
		email: 'david@example.com',
		role: 'User',
		status: 'active',
		lastLogin: new Date('2024-01-16T11:15:00'),
		score: 67,
	},
];

const basicColumns: TableColumn<User>[] = [
	{
		key: 'name',
		header: 'Name',
		accessor: 'name',
	},
	{
		key: 'email',
		header: 'Email',
		accessor: 'email',
	},
	{
		key: 'role',
		header: 'Role',
		accessor: 'role',
	},
];

const tableExamples = [
	{
		id: 'basic-table',
		title: 'Basic Usage',
		description: 'Simple tables display data in rows and columns with proper HTML semantics and accessibility.',
		code: `const columns = [
  { key: 'name', header: 'Name', accessor: 'name' },
  { key: 'email', header: 'Email', accessor: 'email' },
  { key: 'role', header: 'Role', accessor: 'role' },
];

<Table data={sampleUsers} columns={columns} caption='Basic user data table' />`,
		children: (
			<Table data={sampleUsers} columns={basicColumns} caption='Basic user data table' />
		),
	},
	{
		id: 'sorting',
		title: 'Sorting',
		description: 'Tables can be sorted by clicking column headers. Add sortable: true to enable sorting.',
		code: `const sortableColumns = [
  { key: 'name', header: 'Name', accessor: 'name', sortable: true },
  { key: 'email', header: 'Email', accessor: 'email', sortable: true },
  { key: 'role', header: 'Role', accessor: 'role', sortable: true },
  { key: 'score', header: 'Score', accessor: 'score', sortable: true },
];

<Table data={sampleUsers} columns={sortableColumns} />`,
		children: (
			<Table
				data={sampleUsers}
				columns={[
					{ key: 'name', header: 'Name', accessor: 'name', sortable: true },
					{ key: 'email', header: 'Email', accessor: 'email', sortable: true },
					{ key: 'role', header: 'Role', accessor: 'role', sortable: true },
					{ key: 'score', header: 'Score', accessor: 'score', sortable: true },
				]}
				caption='Sortable user data table'
			/>
		),
	},
	{
		id: 'custom-cells',
		title: 'Custom Cells',
		description: 'Customize cell rendering with cell functions for complex data presentation.',
		code: `const customColumns = [
  { key: 'name', header: 'Name', accessor: 'name' },
  { 
    key: 'status', 
    header: 'Status', 
    accessor: 'status',
    cell: (_, value) => (
      <Badge variant={value === 'active' ? 'success' : 'secondary'}>
        {value}
      </Badge>
    )
  },
  {
    key: 'lastLogin',
    header: 'Last Login',
    accessor: 'lastLogin',
    cell: (_, value) => new Date(value).toLocaleDateString(),
  },
];

<Table data={sampleUsers} columns={customColumns} />`,
		children: (
			<Table
				data={sampleUsers}
				columns={[
					{ key: 'name', header: 'Name', accessor: 'name' },
					{
						key: 'status',
						header: 'Status',
						accessor: 'status',
						cell: (_, value) => (
							<Badge variant={value === 'active' ? 'success' : 'secondary'}>
								{value as string}
							</Badge>
						),
					},
					{
						key: 'lastLogin',
						header: 'Last Login',
						accessor: 'lastLogin',
						cell: (_, value) => (value as Date).toLocaleDateString(),
					},
				]}
				caption='Table with custom cell rendering'
			/>
		),
	},
	{
		id: 'selection',
		title: 'Row Selection',
		description: 'Enable row selection with checkboxes for bulk operations and data management.',
		code: `<Table
  data={sampleUsers}
  columns={basicColumns}
  selectable
  onSelectionChange={(selectedRows) => {
    console.log('Selected rows:', selectedRows);
  }}
/>`,
		children: (
			<Table
				data={sampleUsers}
				columns={basicColumns}
				selectable
				onSelectionChange={(selectedRows) => {
					console.log('Selected rows:', selectedRows);
				}}
				caption='Table with row selection'
			/>
		),
	},
	{
		id: 'variants',
		title: 'Size Variants',
		description: 'Different size variants for various design contexts and space constraints.',
		code: `// Small variant
<Table data={sampleUsers} columns={basicColumns} size="sm" />

// Medium variant (default)
<Table data={sampleUsers} columns={basicColumns} size="md" />

// Large variant
<Table data={sampleUsers} columns={basicColumns} size="lg" />`,
		children: (
			<div className="space-y-6">
				<div>
					<h4 className="text-sm font-medium mb-2">Small</h4>
					<Table data={sampleUsers.slice(0, 2)} columns={basicColumns} size="sm" />
				</div>
				<div>
					<h4 className="text-sm font-medium mb-2">Medium (default)</h4>
					<Table data={sampleUsers.slice(0, 2)} columns={basicColumns} size="md" />
				</div>
				<div>
					<h4 className="text-sm font-medium mb-2">Large</h4>
					<Table data={sampleUsers.slice(0, 2)} columns={basicColumns} size="lg" />
				</div>
			</div>
		),
	},
	{
		id: 'states',
		title: 'States',
		description: 'Handle loading and empty states with built-in UI feedback.',
		code: `// Loading state
<Table data={[]} columns={basicColumns} loading />

// Empty state with custom message
<Table 
  data={[]} 
  columns={basicColumns} 
  emptyState={<div className="text-center py-4">No users found</div>}
/>`,
		children: (
			<div className="space-y-6">
				<div>
					<h4 className="text-sm font-medium mb-2">Loading State</h4>
					<Table data={[]} columns={basicColumns} loading />
				</div>
				<div>
					<h4 className="text-sm font-medium mb-2">Empty State</h4>
					<Table 
						data={[]} 
						columns={basicColumns} 
						emptyState={<div className="text-center py-4">No users found</div>}
					/>
				</div>
			</div>
		),
	},
];

const tableProps = [
	{
		name: 'data',
		type: 'T[]',
		required: true,
		description: 'Array of data objects to display in the table.',
	},
	{
		name: 'columns',
		type: 'TableColumn<T>[]',
		required: true,
		description: 'Column definitions specifying headers, accessors, and rendering options.',
	},
	{
		name: 'size',
		type: '"sm" | "md" | "lg"',
		default: '"md"',
		description: 'Size variant affecting padding and font sizes.',
	},
	{
		name: 'selectable',
		type: 'boolean',
		default: 'false',
		description: 'Whether to show row selection checkboxes.',
	},
	{
		name: 'onSelectionChange',
		type: '(selectedIds: (string | number)[]) => void',
		description: 'Callback fired when row selection changes.',
	},
	{
		name: 'loading',
		type: 'boolean',
		default: 'false',
		description: 'Whether to show loading state.',
	},
	{
		name: 'emptyState',
		type: 'React.ReactNode',
		description: 'Custom content to show when data is empty.',
	},
	{
		name: 'striped',
		type: 'boolean',
		default: 'false',
		description: 'Whether to add striped row styling.',
	},
	{
		name: 'hoverable',
		type: 'boolean',
		default: 'true',
		description: 'Whether to add hover effects on rows.',
	},
	{
		name: 'caption',
		type: 'string',
		description: 'Table caption for accessibility.',
	},
];

const keyboardShortcuts = [
	{
		keys: 'Space, Enter',
		description: 'Select/deselect row when focused on checkbox',
	},
	{
		keys: 'Tab',
		description: 'Navigate through interactive elements',
	},
];

export function TablePage() {
	return (
		<ComponentPage
			title='Table'
			description='A powerful data table component with sorting, selection, custom cell rendering, and responsive design.'
			tableOfContents={tableOfContents}
			usageInstructions='The Table component displays tabular data with rich features like sorting, selection, and custom cell rendering. Use it for data grids, user lists, dashboards, or any structured information.'
			importStatement="import { Table, TableColumn } from '@moondreamsdev/dreamer-ui/components';"
			componentProps={tableProps}
			keyboardShortcuts={keyboardShortcuts}
			examples={tableExamples}
		/>
	);
}