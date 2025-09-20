import { Toggle } from '@moondreamsdev/dreamer-ui/components';
import { ComponentPage } from '../../components/layout/ComponentPage';

const tableOfContents = [
  { id: 'import', title: 'Import', level: 1 },
  { id: 'examples', title: 'Examples', level: 1 },
  { id: 'basic-usage', title: 'Basic Usage', level: 2 },
  { id: 'sizes', title: 'Sizes', level: 2 },
  { id: 'with-text', title: 'With Text', level: 2 },
  { id: 'disabled', title: 'Disabled State', level: 2 },
  { id: 'props', title: 'Props', level: 1 },
];

const toggleExamples = [
  {
    id: 'basic-usage',
    title: 'Basic Usage',
    description: 'Simple toggle switches for boolean states.',
    code: `<div className='space-y-4'>
  <div className='flex items-center space-x-2'>
    <Toggle id='notifications' />
    <label htmlFor='notifications'>Enable notifications</label>
  </div>
  <div className='flex items-center space-x-2'>
    <Toggle id='dark-mode' defaultChecked />
    <label htmlFor='dark-mode'>Dark mode</label>
  </div>
</div>`,
    children: (
      <div className='space-y-4'>
        <div className='flex items-center space-x-2'>
          <Toggle id='notifications' />
          <label htmlFor='notifications'>Enable notifications</label>
        </div>
        <div className='flex items-center space-x-2'>
          <Toggle id='dark-mode' defaultChecked />
          <label htmlFor='dark-mode'>Dark mode</label>
        </div>
      </div>
    ),
  },
  {
    id: 'sizes',
    title: 'Sizes',
    description: 'Different toggle sizes for various contexts.',
    code: `<div className='flex items-center space-x-6'>
  <div className='flex items-center space-x-2'>
    <Toggle id='small' size='sm' />
    <label htmlFor='small'>Small</label>
  </div>
  <div className='flex items-center space-x-2'>
    <Toggle id='medium' size='md' />
    <label htmlFor='medium'>Medium</label>
  </div>
  <div className='flex items-center space-x-2'>
    <Toggle id='large' size='lg' />
    <label htmlFor='large'>Large</label>
  </div>
</div>`,
    children: (
      <div className='flex items-center space-x-6'>
        <div className='flex items-center space-x-2'>
          <Toggle id='small' size='sm' />
          <label htmlFor='small'>Small</label>
        </div>
        <div className='flex items-center space-x-2'>
          <Toggle id='medium' size='md' />
          <label htmlFor='medium'>Medium</label>
        </div>
        <div className='flex items-center space-x-2'>
          <Toggle id='large' size='lg' />
          <label htmlFor='large'>Large</label>
        </div>
      </div>
    ),
  },
  {
    id: 'disabled',
    title: 'Disabled State',
    description: 'Disabled toggle switches.',
    code: `<div className='space-y-4'>
  <div className='flex items-center space-x-2'>
    <Toggle id='disabled-off' disabled />
    <label htmlFor='disabled-off' className='text-gray-500'>Disabled (off)</label>
  </div>
  <div className='flex items-center space-x-2'>
    <Toggle id='disabled-on' disabled defaultChecked />
    <label htmlFor='disabled-on' className='text-gray-500'>Disabled (on)</label>
  </div>
</div>`,
    children: (
      <div className='space-y-4'>
        <div className='flex items-center space-x-2'>
          <Toggle id='disabled-off' disabled />
          <label htmlFor='disabled-off' className='text-gray-500'>Disabled (off)</label>
        </div>
        <div className='flex items-center space-x-2'>
          <Toggle id='disabled-on' disabled defaultChecked />
          <label htmlFor='disabled-on' className='text-gray-500'>Disabled (on)</label>
        </div>
      </div>
    ),
  },
];

const toggleProps = [
  {
    name: 'size',
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: 'The size of the toggle switch.',
  },
  {
    name: 'checked',
    type: 'boolean',
    description: 'Whether the toggle is checked (controlled).',
  },
  {
    name: 'defaultChecked',
    type: 'boolean',
    description: 'Whether the toggle is initially checked (uncontrolled).',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Whether the toggle is disabled.',
  },
  {
    name: 'onCheckedChange',
    type: '(checked: boolean) => void',
    description: 'Callback fired when the toggle state changes.',
  },
  {
    name: 'className',
    type: 'string',
    description: 'Additional CSS classes to apply to the toggle.',
  },
];

export function TogglePage() {
  return (
    <ComponentPage
      title='Toggle'
      description='Switch component for boolean states and settings with smooth animations.'
      tableOfContents={tableOfContents}
      usageInstructions='The Toggle component provides an intuitive way for users to switch between two states (on/off, enabled/disabled, etc.). Use it for settings, preferences, or any binary choice. Always provide clear labels to indicate what the toggle controls.'
      importStatement="import { Toggle } from '@moondreamsdev/dreamer-ui/components';"
      componentProps={toggleProps}
      examples={toggleExamples}
    />
  );
}