import { Badge } from '@moondreamsdev/dreamer-ui/components';
import { ComponentPage } from '../../components/layout/ComponentPage';

const tableOfContents = [
	{ id: 'import', title: 'Import', level: 1 },
	{ id: 'examples', title: 'Examples', level: 1 },
	{ id: 'variants', title: 'Variants', level: 2 },
	{ id: 'practical-usage', title: 'Practical Usage', level: 2 },
	{ id: 'sizes', title: 'Sizes', level: 2 },
	{ id: 'props', title: 'Props', level: 1 },
];

const badgeExamples = [
	{
		id: 'variants',
		title: 'Variants',
		description: 'Different badge styles for various use cases.',
		code: `<div className='flex flex-wrap gap-4'>
  <Badge variant='primary'>Primary</Badge>
  <Badge variant='secondary'>Secondary</Badge>
  <Badge variant='success'>Success</Badge>
  <Badge variant='warning'>Warning</Badge>
  <Badge variant='destructive'>Destructive</Badge>
  <Badge outline={true}>Outline</Badge>
</div>`,
		children: (
			<div className='flex flex-wrap gap-4'>
				<Badge variant='primary'>Primary</Badge>
				<Badge variant='secondary'>Secondary</Badge>
				<Badge variant='success'>Success</Badge>
				<Badge variant='warning'>Warning</Badge>
				<Badge variant='destructive'>Destructive</Badge>
				<Badge outline={true}>Outline</Badge>
			</div>
		),
	},
	{
		id: 'practical-usage',
		title: 'Practical Usage',
		description: 'Real-world examples showing badges in common UI patterns.',
		code: `<div className='space-y-6'>
  {/* Status indicators */}
  <div className='flex items-center gap-2'>
    <span>Server Status:</span>
    <Badge variant='accent'>Online</Badge>
  </div>
  
  {/* Category tags */}
  <div className='flex items-center gap-2'>
    <span>Categories:</span>
    <Badge variant='secondary'>React</Badge>
    <Badge variant='secondary'>TypeScript</Badge>
    <Badge outline={true}>UI Library</Badge>
  </div>
  
  {/* Notification counts */}
  <div className='flex items-center gap-4'>
    <div className='flex items-center gap-2'>
      <span>Messages</span>
      <Badge size='sm'>3</Badge>
    </div>
    <div className='flex items-center gap-2'>
      <span>Warnings</span>
      <Badge variant='warning' size='sm'>5</Badge>
    </div>
    <div className='flex items-center gap-2'>
      <span>Alerts</span>
      <Badge variant='destructive' size='sm'>12</Badge>
    </div>
  </div>
  
  {/* Feature flags */}
  <div className='space-y-2'>
    <div className='flex items-center gap-2'>
      <span>Dark Mode</span>
      <Badge outline={true} size='sm'>Beta</Badge>
    </div>
    <div className='flex items-center gap-2'>
      <span>New Dashboard</span>
      <Badge size='sm'>New</Badge>
    </div>
  </div>
</div>`,
		children: (
			<div className='space-y-6'>
				{/* Status indicators */}
				<div className='flex items-center gap-2'>
					<span>Server Status:</span>
					<Badge variant='accent'>Online</Badge>
				</div>

				{/* Category tags */}
				<div className='flex items-center gap-2'>
					<span>Categories:</span>
					<Badge variant='secondary'>React</Badge>
					<Badge variant='secondary'>TypeScript</Badge>
					<Badge outline={true}>UI Library</Badge>
				</div>

				{/* Notification counts */}
				<div className='flex items-center gap-4'>
					<div className='flex items-center gap-2'>
						<span>Messages</span>
						<Badge size='sm'>3</Badge>
					</div>
					<div className='flex items-center gap-2'>
						<span>Warnings</span>
						<Badge variant='warning' size='sm'>
							5
						</Badge>
					</div>
					<div className='flex items-center gap-2'>
						<span>Alerts</span>
						<Badge variant='destructive' size='sm'>
							12
						</Badge>
					</div>
				</div>

				{/* Feature flags */}
				<div className='space-y-2'>
					<div className='flex items-center gap-2'>
						<span>Dark Mode</span>
						<Badge outline={true} size='sm'>
							Beta
						</Badge>
					</div>
					<div className='flex items-center gap-2'>
						<span>New Dashboard</span>
						<Badge size='sm'>New</Badge>
					</div>
				</div>
			</div>
		),
	},
	{
		id: 'sizes',
		title: 'Sizes',
		description: 'Available badge sizes for different contexts.',
		code: `<div className='flex flex-wrap items-center gap-4'>
  <Badge size='xs'>Extra Small</Badge>
  <Badge size='sm'>Small</Badge>
  <Badge size='md'>Medium</Badge>
</div>`,
		children: (
			<div className='flex flex-wrap items-center gap-4'>
				<Badge size='xs'>Extra Small</Badge>
				<Badge size='sm'>Small</Badge>
				<Badge size='md'>Medium</Badge>
			</div>
		),
	},
];

const badgeProps = [
	{
		name: 'variant',
		type: '"base" | "primary" | "secondary" | "accent" | "destructive" | "success" | "warning" | "muted"',
		default: '"muted"',
		description: 'The visual style variant of the badge.',
	},
	{
		name: 'outline',
		type: 'boolean',
		default: 'false',
		description: 'Whether to render the badge with an outline style.',
	},
	{
		name: 'size',
		type: '"xs" | "sm" | "md"',
		default: '"xs"',
		description: 'The size of the badge.',
	},
	{
		name: 'aspect',
		type: '"square" | "video"',
		default: '"video"',
		description: 'The aspect ratio of the badge - square for equal padding, video for horizontal padding.',
	},
	{
		name: 'use',
		type: '"decorative" | "status" | "alert"',
		default: '"decorative"',
		description: 'The semantic use of the badge for accessibility purposes.',
	},
	{
		name: 'className',
		type: 'string',
		description: 'Additional CSS classes to apply to the badge.',
	},
	{
		name: 'id',
		type: 'string',
		description: 'The HTML id attribute for the badge.',
	},
	{
		name: 'children',
		type: 'React.ReactNode',
		description: 'The content to display inside the badge.',
		required: true,
	},
];

export function BadgePage() {
	return (
		<ComponentPage
			title='Badge'
			description='Small status indicators and labels for highlighting information.'
			tableOfContents={tableOfContents}
			usageInstructions='The Badge component is perfect for displaying status, categories, counts, or any small piece of information that needs to stand out. It comes in various styles and sizes to fit different contexts.'
			importStatement="import { Badge } from '@moondreamsdev/dreamer-ui/components';"
			componentProps={badgeProps}
			examples={badgeExamples}
		/>
	);
}
