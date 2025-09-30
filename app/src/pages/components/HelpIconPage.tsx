import { HelpIcon } from '@moondreamsdev/dreamer-ui/components';
import { ComponentPage } from '../../components/layout/ComponentPage';

const tableOfContents = [
	{ id: 'import', title: 'Import', level: 1 },
	{ id: 'examples', title: 'Examples', level: 1 },
	{ id: 'design-variants', title: 'Design Variants', level: 2 },
	{ id: 'sizes', title: 'Sizes', level: 2 },
	{ id: 'placements', title: 'Placements', level: 2 },
	{ id: 'rich-content', title: 'Rich Content', level: 2 },
	{ id: 'props', title: 'Props', level: 1 },
];

const helpIconExamples = [
	{
		id: 'design-variants',
		title: 'Design Variants',
		description: 'Help icons can be displayed with filled or outlined designs to match your interface style.',
		code: `<div className='flex items-center space-x-6'>
  <div className='space-x-1'>
    <span>Filled Design</span>
    <HelpIcon message="This is a help tooltip with filled design" />
  </div>
  <div className='space-x-1'>
    <span>Outlined Design</span>
    <HelpIcon message="This is a help tooltip with outlined design" design="outlined" />
  </div>
</div>`,
		children: (
			<div className='flex items-center space-x-6'>
				<div className='space-x-1'>
					<span>Filled Design</span>
					<HelpIcon message='This is a help tooltip with filled design' />
				</div>
				<div className='space-x-1'>
					<span>Outlined Design</span>
					<HelpIcon message='This is a help tooltip with outlined design' design='outlined' />
				</div>
			</div>
		),
	},
	{
		id: 'sizes',
		title: 'Sizes',
		description: 'Multiple size variants to fit different contexts and layout requirements.',
		code: `<div className='flex items-center space-x-6'>
  <div className='space-x-1'>
    <span>Small</span>
    <HelpIcon message="Small help icon" iconSize={10} />
  </div>
  <div className='space-x-1'>
    <span>Medium</span>
    <HelpIcon message="Medium help icon (default)" iconSize={14} />
  </div>
  <div className='space-x-1'>
    <span>Large</span>
    <HelpIcon message="Large help icon" iconSize={18} />
  </div>
</div>`,
		children: (
			<div className='flex items-center space-x-6'>
				<div className='space-x-1'>
					<span className='text-sm'>Small</span>
					<HelpIcon message='Small help icon' iconSize={10} />
				</div>
				<div className='space-x-1'>
					<span>Medium</span>
					<HelpIcon message='Medium help icon (default)' iconSize={14} />
				</div>
				<div className='space-x-1'>
					<span className='text-lg'>Large</span>
					<HelpIcon message='Large help icon' iconSize={18} />
				</div>
			</div>
		),
	},
	{
		id: 'placements',
		title: 'Placements',
		description: 'Tooltips can be positioned on different sides of the help icon to accommodate layout constraints.',
		code: `<div className='grid grid-cols-2 md:grid-cols-4 gap-6 p-8'>
  <div className='flex flex-col items-center space-y-2'>
    <HelpIcon message="Tooltip appears on top" placement="top" />
    <span className='text-sm'>Top</span>
  </div>
  <div className='flex flex-col items-center space-y-2'>
    <HelpIcon message="Tooltip appears on the right" placement="right" />
    <span className='text-sm'>Right</span>
  </div>
  <div className='flex flex-col items-center space-y-2'>
    <HelpIcon message="Tooltip appears on bottom" placement="bottom" />
    <span className='text-sm'>Bottom</span>
  </div>
  <div className='flex flex-col items-center space-y-2'>
    <HelpIcon message="Tooltip appears on the left" placement="left" />
    <span className='text-sm'>Left</span>
  </div>
</div>`,
		children: (
			<div className='grid grid-cols-2 md:grid-cols-4 gap-6 p-8'>
				<div className='flex flex-col items-center space-y-2'>
					<HelpIcon message='Tooltip appears on top' placement='top' />
					<span className='text-sm'>Top</span>
				</div>
				<div className='flex flex-col items-center space-y-2'>
					<HelpIcon message='Tooltip appears on the right' placement='right' />
					<span className='text-sm'>Right</span>
				</div>
				<div className='flex flex-col items-center space-y-2'>
					<HelpIcon message='Tooltip appears on bottom' placement='bottom' />
					<span className='text-sm'>Bottom</span>
				</div>
				<div className='flex flex-col items-center space-y-2'>
					<HelpIcon message='Tooltip appears on the left' placement='left' />
					<span className='text-sm'>Left</span>
				</div>
			</div>
		),
	},
	{
		id: 'rich-content',
		title: 'Rich Content',
		description: 'Help icons can display complex content including formatted text, lists, and other React elements.',
		code: `<div className='space-y-4'>
  <div className='flex items-center space-x-1'>
    <span>Password Requirements</span>
    <HelpIcon 
      message={
        <div>
          <p className="font-semibold mb-1">Password Requirements</p>
          <ul className="text-xs space-y-1">
            <li>• At least 8 characters</li>
            <li>• One uppercase letter</li>
            <li>• One number or symbol</li>
          </ul>
        </div>
      }
      placement="bottom"
    />
  </div>
  <div className='flex items-center space-x-1'>
    <span>API Settings</span>
    <HelpIcon 
      message={
        <div className="max-w-xs">
          <p className="font-semibold mb-2">API Configuration</p>
          <p className="text-xs mb-2">Configure your API endpoints and authentication settings here.</p>
          <div className="bg-accent/20 p-2 rounded text-xs">
            <strong>Tip:</strong> Use environment variables for sensitive data.
          </div>
        </div>
      }
      iconSize={20}
      showArrow={false}
    />
  </div>
</div>`,
		children: (
			<div className='space-y-4'>
				<div className='flex items-center space-x-1'>
					<span>Password Requirements</span>
					<HelpIcon
						message={
							<div>
								<p className='font-semibold mb-1'>Password Requirements</p>
								<ul className='text-xs space-y-1'>
									<li>• At least 8 characters</li>
									<li>• One uppercase letter</li>
									<li>• One number or symbol</li>
								</ul>
							</div>
						}
						placement='bottom'
					/>
				</div>
				<div className='flex items-center space-x-1'>
					<span>API Settings</span>
					<HelpIcon
						message={
							<div className='max-w-xs'>
								<p className='font-semibold mb-2'>API Configuration</p>
								<p className='text-xs mb-2'>Configure your API endpoints and authentication settings here.</p>
								<div className='bg-accent/20 p-2 rounded text-xs'>
									<strong>Tip:</strong> Use environment variables for sensitive data.
								</div>
							</div>
						}
						iconSize={20}
						showArrow={false}
					/>
				</div>
			</div>
		),
	},
];

const helpIconProps = [
	{
		name: 'message',
		type: 'React.ReactNode',
		description: 'The content to display in the tooltip.',
		required: true,
	},
	{
		name: 'design',
		type: '"filled" | "outlined"',
		default: '"filled"',
		description: 'The visual design variant of the help icon.',
	},
	{
		name: 'iconSize',
		type: 'number',
		default: '14',
		description: 'The size of the help icon in pixels.',
	},
	{
		name: 'placement',
		type: '"top" | "right" | "bottom" | "left"',
		default: '"top"',
		description: 'The preferred side of the icon to render the tooltip.',
	},
	{
		name: 'delay',
		type: 'number',
		default: '100',
		description: 'The delay in milliseconds before the tooltip appears.',
	},
	{
		name: 'showArrow',
		type: 'boolean',
		default: 'true',
		description: 'Whether to show the arrow pointing to the help icon.',
	},
	{
		name: 'disabled',
		type: 'boolean',
		default: 'false',
		description: 'Whether the tooltip is disabled and should not appear.',
	},
	{
		name: 'className',
		type: 'string',
		description: 'Additional CSS classes to apply to the icon container.',
	},
	{
		name: 'id',
		type: 'string',
		description: 'HTML id attribute for the help icon.',
	},
];

export const HelpIconPage = () => {
	return (
		<ComponentPage
			title='Help Icon'
			description='A help icon component that combines the InfoCircled icon with a tooltip for displaying contextual help information. Supports both filled and outlined design variants with multiple size options.'
			tableOfContents={tableOfContents}
			examples={helpIconExamples}
			componentProps={helpIconProps}
			usageInstructions='Help icons are perfect for providing contextual assistance without cluttering your interface. They work great in forms, settings panels, and anywhere users might need additional guidance.'
			importStatement="import { HelpIcon } from '@moondreamsdev/dreamer-ui/components';"
		/>
	);
};
