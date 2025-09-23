import { Avatar } from '@moondreamsdev/dreamer-ui/components';
import { ComponentPage } from '../../components/layout/ComponentPage';

const tableOfContents = [
	{ id: 'import', title: 'Import', level: 1 },
	{ id: 'examples', title: 'Examples', level: 1 },
	{ id: 'presets', title: 'Presets', level: 2 },
	{ id: 'sizes', title: 'Sizes', level: 2 },
	{ id: 'shapes', title: 'Shapes', level: 2 },
	{ id: 'custom-content', title: 'Custom Content', level: 2 },
	{ id: 'usage-examples', title: 'Usage Examples', level: 2 },
	{ id: 'props', title: 'Props', level: 1 },
];

const avatarExamples = [
	{
		id: 'presets',
		title: 'Presets',
		description: '12 unique cartoon-like avatars with space and dream themes created specifically for Moon Dreams Dev.',
		code: `<div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6'>
	<Avatar preset='astronaut' size='xl' alt='Astronaut avatar' />
	<Avatar preset='moon' size='xl' alt='Moon avatar' />
	<Avatar preset='star' size='xl' alt='Star avatar' />
	<Avatar preset='galaxy' size='xl' alt='Galaxy avatar' />
	<Avatar preset='nebula' size='xl' alt='Nebula avatar' />
	<Avatar preset='planet' size='xl' alt='Planet avatar' />
	<Avatar preset='cosmic-cat' size='xl' alt='Cosmic cat avatar' />
	<Avatar preset='dream-cloud' size='xl' alt='Dream cloud avatar' />
	<Avatar preset='rocket' size='xl' alt='Rocket avatar' />
	<Avatar preset='constellation' size='xl' alt='Constellation avatar' />
	<Avatar preset='comet' size='xl' alt='Comet avatar' />
	<Avatar preset='twilight' size='xl' alt='Twilight avatar' />
</div>`,
		children: (
			<div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6'>
				<div className='flex flex-col items-center gap-2'>
					<Avatar preset='astronaut' size='xl' alt='Astronaut avatar' />
					<span className='text-sm text-gray-400'>Astronaut</span>
				</div>
				<div className='flex flex-col items-center gap-2'>
					<Avatar preset='moon' size='xl' alt='Moon avatar' />
					<span className='text-sm text-gray-400'>Moon</span>
				</div>
				<div className='flex flex-col items-center gap-2'>
					<Avatar preset='star' size='xl' alt='Star avatar' />
					<span className='text-sm text-gray-400'>Star</span>
				</div>
				<div className='flex flex-col items-center gap-2'>
					<Avatar preset='galaxy' size='xl' alt='Galaxy avatar' />
					<span className='text-sm text-gray-400'>Galaxy</span>
				</div>
				<div className='flex flex-col items-center gap-2'>
					<Avatar preset='nebula' size='xl' alt='Nebula avatar' />
					<span className='text-sm text-gray-400'>Nebula</span>
				</div>
				<div className='flex flex-col items-center gap-2'>
					<Avatar preset='planet' size='xl' alt='Planet avatar' />
					<span className='text-sm text-gray-400'>Planet</span>
				</div>
				<div className='flex flex-col items-center gap-2'>
					<Avatar preset='cosmic-cat' size='xl' alt='Cosmic cat avatar' />
					<span className='text-sm text-gray-400'>Cosmic Cat</span>
				</div>
				<div className='flex flex-col items-center gap-2'>
					<Avatar preset='dream-cloud' size='xl' alt='Dream cloud avatar' />
					<span className='text-sm text-gray-400'>Dream Cloud</span>
				</div>
				<div className='flex flex-col items-center gap-2'>
					<Avatar preset='rocket' size='xl' alt='Rocket avatar' />
					<span className='text-sm text-gray-400'>Rocket</span>
				</div>
				<div className='flex flex-col items-center gap-2'>
					<Avatar preset='constellation' size='xl' alt='Constellation avatar' />
					<span className='text-sm text-gray-400'>Constellation</span>
				</div>
				<div className='flex flex-col items-center gap-2'>
					<Avatar preset='comet' size='xl' alt='Comet avatar' />
					<span className='text-sm text-gray-400'>Comet</span>
				</div>
				<div className='flex flex-col items-center gap-2'>
					<Avatar preset='twilight' size='xl' alt='Twilight avatar' />
					<span className='text-sm text-gray-400'>Twilight</span>
				</div>
			</div>
		),
	},
	{
		id: 'sizes',
		title: 'Sizes',
		description: 'Six different sizes available to fit various use cases.',
		code: `<div className='flex items-end gap-4'>
	<Avatar preset='astronaut' size='xs' alt='Extra small avatar' />
	<Avatar preset='moon' size='sm' alt='Small avatar' />
	<Avatar preset='star' size='md' alt='Medium avatar' />
	<Avatar preset='galaxy' size='lg' alt='Large avatar' />
	<Avatar preset='nebula' size='xl' alt='Extra large avatar' />
	<Avatar preset='planet' size='2xl' alt='2XL avatar' />
</div>`,
		children: (
			<div className='flex items-end gap-4'>
				<div className='flex flex-col items-center gap-2'>
					<Avatar preset='astronaut' size='xs' alt='Extra small avatar' />
					<span className='text-xs text-gray-400'>xs</span>
				</div>
				<div className='flex flex-col items-center gap-2'>
					<Avatar preset='moon' size='sm' alt='Small avatar' />
					<span className='text-xs text-gray-400'>sm</span>
				</div>
				<div className='flex flex-col items-center gap-2'>
					<Avatar preset='star' size='md' alt='Medium avatar' />
					<span className='text-xs text-gray-400'>md</span>
				</div>
				<div className='flex flex-col items-center gap-2'>
					<Avatar preset='galaxy' size='lg' alt='Large avatar' />
					<span className='text-xs text-gray-400'>lg</span>
				</div>
				<div className='flex flex-col items-center gap-2'>
					<Avatar preset='nebula' size='xl' alt='Extra large avatar' />
					<span className='text-xs text-gray-400'>xl</span>
				</div>
				<div className='flex flex-col items-center gap-2'>
					<Avatar preset='planet' size='2xl' alt='2XL avatar' />
					<span className='text-xs text-gray-400'>2xl</span>
				</div>
			</div>
		),
	},
	{
		id: 'shapes',
		title: 'Shapes',
		description: 'Choose between circular or square shapes for different design contexts.',
		code: `<div className='flex items-center gap-8'>
	<Avatar preset='cosmic-cat' size='2xl' shape='circle' alt='Circle avatar' />
	<Avatar preset='rocket' size='2xl' shape='square' alt='Square avatar' />
</div>`,
		children: (
			<div className='flex items-center gap-8'>
				<div className='flex flex-col items-center gap-2'>
					<Avatar preset='cosmic-cat' size='2xl' shape='circle' alt='Circle avatar' />
					<span className='text-sm text-gray-400'>Circle</span>
				</div>
				<div className='flex flex-col items-center gap-2'>
					<Avatar preset='rocket' size='2xl' shape='square' alt='Square avatar' />
					<span className='text-sm text-gray-400'>Square</span>
				</div>
			</div>
		),
	},
	{
		id: 'custom-content',
		title: 'Custom Content',
		description: 'Use custom images or initials when presets are not suitable.',
		code: `<div className='flex items-center gap-6'>
	<Avatar 
		src='/path/to/custom/image.jpg'
		alt='Custom profile image'
		size='xl'
	/>
	<Avatar 
		initials='JS'
		alt='John Smith'
		size='xl'
		shape='square'
	/>
	<Avatar 
		initials='AD'
		alt='Alice Doe'
		size='xl'
	/>
</div>`,
		children: (
			<div className='flex items-center gap-6'>
				<div className='flex flex-col items-center gap-2'>
					<Avatar 
						src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face'
						alt='Custom profile image'
						size='xl'
					/>
					<span className='text-sm text-gray-400'>Custom Image</span>
				</div>
				<div className='flex flex-col items-center gap-2'>
					<Avatar 
						initials='JS'
						alt='John Smith'
						size='xl'
						shape='square'
					/>
					<span className='text-sm text-gray-400'>Square Initials</span>
				</div>
				<div className='flex flex-col items-center gap-2'>
					<Avatar 
						initials='AD'
						alt='Alice Doe'
						size='xl'
					/>
					<span className='text-sm text-gray-400'>Circle Initials</span>
				</div>
			</div>
		),
	},
	{
		id: 'usage-examples',
		title: 'Usage Examples',
		description: 'Common patterns for using avatars in real applications.',
		code: `// User Profile Header
<div className='flex items-center gap-4'>
	<Avatar preset='astronaut' size='2xl' alt='User avatar' />
	<div>
		<h2 className='text-xl font-semibold'>John Astronaut</h2>
		<p className='text-gray-500'>Space Explorer</p>
	</div>
</div>

// Comment System
<div className='flex gap-3'>
	<Avatar preset='moon' size='md' alt='Commenter avatar' />
	<div className='flex-1'>
		<div className='bg-gray-100 rounded-lg p-3'>
			<p className='font-medium'>Luna Moon</p>
			<p>Great article about space exploration!</p>
		</div>
	</div>
</div>

// Team Grid
<div className='grid grid-cols-4 gap-4'>
	<Avatar preset='star' size='lg' alt='Team member' />
	<Avatar preset='galaxy' size='lg' alt='Team member' />
	<Avatar preset='nebula' size='lg' alt='Team member' />
	<Avatar preset='planet' size='lg' alt='Team member' />
</div>`,
		children: (
			<div className='space-y-8'>
				<div>
					<h4 className='text-sm font-medium text-gray-400 mb-3'>User Profile Header</h4>
					<div className='flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg'>
						<Avatar preset='astronaut' size='2xl' alt='User avatar' />
						<div>
							<h2 className='text-xl font-semibold'>John Astronaut</h2>
							<p className='text-gray-500'>Space Explorer</p>
						</div>
					</div>
				</div>
				<div>
					<h4 className='text-sm font-medium text-gray-400 mb-3'>Comment System</h4>
					<div className='flex gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg'>
						<Avatar preset='moon' size='md' alt='Commenter avatar' />
						<div className='flex-1'>
							<div className='bg-white dark:bg-gray-700 rounded-lg p-3'>
								<p className='font-medium text-sm'>Luna Moon</p>
								<p className='text-sm'>Great article about space exploration!</p>
							</div>
						</div>
					</div>
				</div>
				<div>
					<h4 className='text-sm font-medium text-gray-400 mb-3'>Team Grid</h4>
					<div className='grid grid-cols-4 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg'>
						<Avatar preset='star' size='lg' alt='Team member' />
						<Avatar preset='galaxy' size='lg' alt='Team member' />
						<Avatar preset='nebula' size='lg' alt='Team member' />
						<Avatar preset='planet' size='lg' alt='Team member' />
					</div>
				</div>
			</div>
		),
	},
];

const avatarProps = [
	{
		name: 'preset',
		type: '"astronaut" | "moon" | "star" | "galaxy" | "nebula" | "planet" | "cosmic-cat" | "dream-cloud" | "rocket" | "constellation" | "comet" | "twilight"',
		description: 'Pre-defined cartoon-like avatar to display.',
	},
	{
		name: 'size',
		type: '"xs" | "sm" | "md" | "lg" | "xl" | "2xl"',
		default: '"md"',
		description: 'The size of the avatar.',
	},
	{
		name: 'shape',
		type: '"circle" | "square"',
		default: '"circle"',
		description: 'The shape of the avatar.',
	},
	{
		name: 'src',
		type: 'string',
		description: 'Custom image source URL.',
	},
	{
		name: 'initials',
		type: 'string',
		description: 'Initials to display when no preset or src is provided.',
	},
	{
		name: 'alt',
		type: 'string',
		description: 'Alternative text for the avatar image.',
		required: true,
	},
	{
		name: 'className',
		type: 'string',
		description: 'Additional CSS classes to apply to the avatar.',
	},
];

export function AvatarPage() {
	return (
		<ComponentPage
			title='Avatar'
			description='Display user profile pictures with 12 pre-defined cartoon-like avatars inspired by Moon Dreams Dev. Supports custom images, initials, and fallback states.'
			tableOfContents={tableOfContents}
			usageInstructions='The Avatar component displays user profile pictures with beautiful pre-defined cartoon avatars. Use presets for consistent branding, custom images for personalization, or initials as fallbacks. Perfect for user profiles, team displays, and comment systems.'
			importStatement="import { Avatar } from '@moondreamsdev/dreamer-ui/components';"
			componentProps={avatarProps}
			examples={avatarExamples}
		/>
	);
}
