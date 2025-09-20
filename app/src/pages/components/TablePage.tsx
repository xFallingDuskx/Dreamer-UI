import { Badge } from '@moondreamsdev/dreamer-ui/components';
import { ComponentPage } from '../../components/layout/ComponentPage';
import { ExampleSection } from '../../components/ui/ExampleSection';
import { Table, TableColumn } from '../../../table';

const tableOfContents = [
	{ id: 'basic-table', title: 'Basic Usage', level: 1 },
	{ id: 'sorting', title: 'Sorting', level: 1 },
	{ id: 'custom-cells', title: 'Custom Cells', level: 1 },
	{ id: 'selection', title: 'Row Selection', level: 1 },
	{ id: 'variants', title: 'Size Variants', level: 1 },
	{ id: 'states', title: 'States', level: 1 },
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

const sortableColumns: TableColumn<User>[] = [
	{
		key: 'name',
		header: 'Name',
		accessor: 'name',
		sortable: true,
	},
	{
		key: 'email',
		header: 'Email',
		accessor: 'email',
		sortable: true,
	},
	{
		key: 'score',
		header: 'Score',
		accessor: 'score',
		sortable: true,
		align: 'center',
	},
	{
		key: 'lastLogin',
		header: 'Last Login',
		accessor: 'lastLogin',
		sortable: true,
		cell: (user) => user.lastLogin.toLocaleDateString(),
	},
];

const customCellColumns: TableColumn<User>[] = [
	{
		key: 'name',
		header: 'User',
		accessor: 'name',
		cell: (user) => (
			<div className='flex flex-col'>
				<span className='font-medium'>{user.name}</span>
				<span className='text-sm text-muted-foreground'>{user.email}</span>
			</div>
		),
	},
	{
		key: 'role',
		header: 'Role',
		accessor: 'role',
		align: 'center',
		cell: (user) => (
			<Badge variant={user.role === 'Admin' ? 'accent' : user.role === 'Editor' ? 'secondary' : 'muted'}>
				{user.role}
			</Badge>
		),
		sortable: true,
		sortFunction: (a, b) => b.role.length - a.role.length, // Example custom sort by role name length
	},
	{
		key: 'status',
		header: 'Status',
		accessor: 'status',
		align: 'center',
		cell: (user) => <Badge variant={user.status === 'active' ? 'success' : 'destructive'}>{user.status}</Badge>,
	},
	{
		key: 'score',
		header: 'Score',
		accessor: 'score',
		align: 'center',
		cell: (user) => (
			<div className='flex items-center justify-center gap-2'>
				<div
					className={`w-2 h-2 rounded-full ${
						user.score >= 80 ? 'bg-green-500' : user.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
					}`}
				/>
				{user.score}%
			</div>
		),
		width: 100,
		columnClassName: 'bg-gray-500/20',
	},
];

export function TablePage() {
	return (
		<ComponentPage
			title='Table'
			description='A powerful data table component with sorting, selection, custom cell rendering, and responsive design. Perfect for displaying structured data with interactive features.'
			tableOfContents={tableOfContents}
		>
			<ExampleSection
				title='Basic Usage'
				description='Simple tables display data in rows and columns with proper HTML semantics and accessibility.'
				id='basic-table'
			>
				<Table data={sampleUsers} columns={basicColumns} caption='Basic user data table' />
			</ExampleSection>

			<ExampleSection
				title='Sorting'
				description='Columns can be made sortable to allow users to organize data by different criteria.'
				id='sorting'
			>
				<Table data={sampleUsers} columns={sortableColumns} caption='Sortable user data table' />
			</ExampleSection>

			<ExampleSection
				title='Custom Cells'
				description='Cell content can be customized with React components for rich data presentation.'
				id='custom-cells'
			>
				<Table data={sampleUsers} columns={customCellColumns} caption='Table with custom cell rendering' />
			</ExampleSection>

			<ExampleSection
				title='Row Selection'
				description='Tables support single and multi-row selection with checkboxes and callback functions.'
				id='selection'
			>
				<Table
					data={sampleUsers}
					columns={basicColumns}
					selectable={true}
					getRowId={(user) => user.id}
					onSelectionChange={(selectedIds) => console.log('Selected users:', selectedIds)}
					caption='Selectable user data table'
				/>
			</ExampleSection>

			<ExampleSection
				title='Size Variants'
				description='Tables are available in different sizes to match your design requirements.'
				id='variants'
			>
				<div className='space-y-6'>
					<div>
						<h4 className='text-sm font-medium mb-2'>Small</h4>
						<Table data={sampleUsers.slice(0, 2)} columns={basicColumns} size='sm' caption='Small sized table' />
					</div>
					<div>
						<h4 className='text-sm font-medium mb-2'>Medium (Default)</h4>
						<Table data={sampleUsers.slice(0, 2)} columns={basicColumns} size='md' caption='Medium sized table' />
					</div>
					<div>
						<h4 className='text-sm font-medium mb-2'>Large</h4>
						<Table data={sampleUsers.slice(0, 2)} columns={basicColumns} size='lg' caption='Large sized table' />
					</div>
				</div>
			</ExampleSection>

			<ExampleSection
				title='States'
				description='Tables can display loading states, empty states, and visual enhancements like stripes and hover effects.'
				id='states'
			>
				<div className='space-y-6'>
					<div>
						<h4 className='text-sm font-medium mb-2'>Striped with Hover</h4>
						<Table
							data={sampleUsers}
							columns={basicColumns}
							striped={true}
							hoverable={true}
							caption='Striped table with hover effects'
						/>
					</div>
					<div>
						<h4 className='text-sm font-medium mb-2'>Loading State</h4>
						<Table
							data={sampleUsers}
							columns={basicColumns}
							loading={true}
							loadingContent={
								<div className='flex items-center gap-2'>
									<div className='w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin'></div>
									Loading data...
								</div>
							}
							caption='Loading state table'
						/>
					</div>
					<div>
						<h4 className='text-sm font-medium mb-2'>Empty State</h4>
						<Table
							data={[]}
							columns={basicColumns}
							emptyState={
								<div className='text-center py-8'>
									<p className='text-muted-foreground'>No data available</p>
									<p className='text-sm text-muted-foreground mt-1'>Add some records to see them here</p>
								</div>
							}
							caption='Empty state table'
						/>
					</div>
				</div>
			</ExampleSection>
		</ComponentPage>
	);
}
