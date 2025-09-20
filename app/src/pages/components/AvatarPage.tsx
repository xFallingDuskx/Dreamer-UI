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
