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
  <Callout variant='info' title='Information'>
    This is an informational message to keep users informed.
  </Callout>
  <Callout variant='warning' title='Warning'>
    Please review this important warning message.
  </Callout>
  <Callout variant='error' title='Error'>
    An error occurred that requires attention.
  </Callout>
  <Callout variant='success' title='Success'>
    The action was completed successfully.
  </Callout>
</div>`,
		children: (
			<div className='space-y-4'>
				<Callout variant='info' title='Information'>
					This is an informational message to keep users informed.
				</Callout>
				<Callout variant='warning' title='Warning'>
					Please review this important warning message.
				</Callout>
				<Callout variant='error' title='Error'>
					An error occurred that requires attention.
				</Callout>
				<Callout variant='success' title='Success'>
					The action was completed successfully.
				</Callout>
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
  onDismiss={() => console.log('Dismissed')}
>
  This callout can be dismissed by clicking the X button.
</Callout>`,
		children: (
			<Callout 
				variant='info' 
				title='Dismissible Callout' 
				onDismiss={() => console.log('Dismissed')}
			>
				This callout can be dismissed by clicking the X button.
			</Callout>
		),
	},
];

const calloutProps = [
	{
		name: 'variant',
		type: '"info" | "warning" | "error" | "success"',
		default: '"info"',
		description: 'The visual style variant of the callout.',
	},
	{
		name: 'title',
		type: 'string',
		description: 'Optional title for the callout.',
	},
	{
		name: 'icon',
		type: 'React.ReactNode | false',
		description: 'Custom icon to display. Set to false to hide the icon.',
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
		name: 'children',
		type: 'React.ReactNode',
		description: 'The content to display inside the callout.',
		required: true,
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

