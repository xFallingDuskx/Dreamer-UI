import { Callout } from '@moondreamsdev/dreamer-ui/components';
import { ComponentPage } from '../../components/layout/ComponentPage';

const tableOfContents = [
	{ id: 'import', title: 'Import', level: 1 },
	{ id: 'examples', title: 'Examples', level: 1 },
	{ id: 'variants', title: 'Variants', level: 2 },
	{ id: 'with-icons', title: 'With Icons', level: 2 },
	{ id: 'dismissible', title: 'Dismissible', level: 2 },
	{ id: 'props', title: 'Props', level: 1 },
];

const calloutExamples = [
	{
		id: 'variants',
		title: 'Variants',
		description: 'Different callout styles for various message types.',
		code: `<div className='space-y-4'>
  <Callout variant='info' title='Information' description='This is an informational message to keep users informed.' />
  <Callout variant='warning' title='Warning' description='Please review this important warning message.' />
  <Callout variant='destructive' title='Error' description='An error occurred that requires attention.' />
  <Callout variant='success' title='Success' description='The action was completed successfully.' />
</div>`,
		children: (
			<div className='space-y-4'>
				<Callout variant='info' title='Information' description='This is an informational message to keep users informed.' />
				<Callout variant='warning' title='Warning' description='Please review this important warning message.' />
				<Callout variant='destructive' title='Error' description='An error occurred that requires attention.' />
				<Callout variant='success' title='Success' description='The action was completed successfully.' />
			</div>
		),
	},
	{
		id: 'with-icons',
		title: 'With Icons',
		description: 'Callouts with custom icons or without icons entirely.',
		code: `<div className='space-y-4'>
  <Callout 
    variant='info' 
    title='Default Icon' 
    description='This callout uses the default icon for the info variant.'
  />
  <Callout 
    variant='warning' 
    title='Custom Icon' 
    description='This callout has a custom icon instead of the default.'
    icon='⚡'
  />
  <Callout 
    variant='success' 
    title='No Icon' 
    description='This callout has no icon at all.'
    icon={null}
  />
</div>`,
		children: (
			<div className='space-y-4'>
				<Callout 
					variant='info' 
					title='Default Icon' 
					description='This callout uses the default icon for the info variant.'
				/>
				<Callout 
					variant='warning' 
					title='Custom Icon' 
					description='This callout has a custom icon instead of the default.'
					icon='⚡'
				/>
				<Callout 
					variant='success' 
					title='No Icon' 
					description='This callout has no icon at all.'
					icon={null}
				/>
			</div>
		),
	},
	{
		id: 'dismissible',
		title: 'Dismissible',
		description: 'Callouts that can be dismissed by users.',
		code: `<Callout 
  variant='info' 
  title='Dismissible Callout' 
  description='This callout can be dismissed by clicking the X button.'
  dismissible
  onDismiss={() => console.log('Dismissed')}
/>`,
		children: (
			<Callout 
				variant='info' 
				title='Dismissible Callout' 
				description='This callout can be dismissed by clicking the X button.'
				dismissible
				onDismiss={() => console.log('Dismissed')}
			/>
		),
	},
];

const calloutProps = [
	{
		name: 'variant',
		type: '"base" | "info" | "warning" | "destructive" | "success"',
		default: '"base"',
		description: 'The visual style variant of the callout.',
	},
	{
		name: 'title',
		type: 'React.ReactNode',
		description: 'Optional title for the callout.',
	},
	{
		name: 'description',
		type: 'React.ReactNode',
		description: 'The main content to display inside the callout.',
	},
	{
		name: 'icon',
		type: 'string | React.ReactElement | null',
		description: 'Custom icon to display. Will use default icon if not provided. Pass null to hide the icon.',
	},
	{
		name: 'dismissible',
		type: 'boolean',
		default: 'false',
		description: 'Whether the callout can be dismissed.',
	},
	{
		name: 'onDismiss',
		type: '() => void',
		description: 'Callback fired when the dismiss button is clicked.',
	},
	{
		name: 'className',
		type: 'string',
		description: 'Additional CSS classes to apply to the callout.',
	},
	{
		name: 'id',
		type: 'string',
		description: 'The id of the callout element.',
	},
	{
		name: 'ref',
		type: 'React.Ref<HTMLDivElement>',
		description: 'Reference to the callout element.',
	},
];

export const CalloutPage = () => {
	return (
		<ComponentPage
			title='Callout'
			description='A versatile component for displaying alerts, warnings, and informational messages.'
			tableOfContents={tableOfContents}
			usageInstructions='The Callout component provides prominent messaging for users with different visual styles for various types of information. Use it for alerts, warnings, success messages, or important information that needs to stand out from regular content.'
			importStatement="import { Callout } from '@moondreamsdev/dreamer-ui/components';"
			componentProps={calloutProps}
			examples={calloutExamples}
		/>
	);
};

