import { Tooltip } from '@moondreamsdev/dreamer-ui/components';
import { ComponentPage } from '../../components/layout/ComponentPage';

const tableOfContents = [
  { id: 'import', title: 'Import', level: 1 },
  { id: 'examples', title: 'Examples', level: 1 },
  { id: 'basic-usage', title: 'Basic Usage', level: 2 },
  { id: 'positions', title: 'Positions', level: 2 },
  { id: 'with-delay', title: 'With Delay', level: 2 },
  { id: 'rich-content', title: 'Rich Content', level: 2 },
  { id: 'props', title: 'Props', level: 1 },
];

const tooltipExamples = [
  {
    id: 'basic-usage',
    title: 'Basic Usage',
    description: 'Simple tooltips that appear on hover or focus.',
    code: `<div className='flex space-x-4'>
  <Tooltip message='This is a helpful tooltip'>
    <button className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'>
      Hover me
    </button>
  </Tooltip>
  <Tooltip message='Save your changes to continue'>
    <button className='px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700'>
      Save
    </button>
  </Tooltip>
</div>`,
    children: (
      <div className='flex space-x-4'>
        <Tooltip message='This is a helpful tooltip'>
          <button className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'>
            Hover me
          </button>
        </Tooltip>
        <Tooltip message='Save your changes to continue'>
          <button className='px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700'>
            Save
          </button>
        </Tooltip>
      </div>
    ),
  },
  {
    id: 'positions',
    title: 'Positions',
    description: 'Tooltips can be positioned in different directions.',
    code: `<div className='grid grid-cols-2 md:grid-cols-4 gap-4 place-items-center'>
  <Tooltip message='Top tooltip' placement='top'>
    <button className='px-3 py-2 bg-gray-600 text-white rounded'>Top</button>
  </Tooltip>
  <Tooltip message='Right tooltip' placement='right'>
    <button className='px-3 py-2 bg-gray-600 text-white rounded'>Right</button>
  </Tooltip>
  <Tooltip message='Bottom tooltip' placement='bottom'>
    <button className='px-3 py-2 bg-gray-600 text-white rounded'>Bottom</button>
  </Tooltip>
  <Tooltip message='Left tooltip' placement='left'>
    <button className='px-3 py-2 bg-gray-600 text-white rounded'>Left</button>
  </Tooltip>
</div>`,
    children: (
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4 place-items-center'>
        <Tooltip message='Top tooltip' placement='top'>
          <button className='px-3 py-2 bg-gray-600 text-white rounded'>Top</button>
        </Tooltip>
        <Tooltip message='Right tooltip' placement='right'>
          <button className='px-3 py-2 bg-gray-600 text-white rounded'>Right</button>
        </Tooltip>
        <Tooltip message='Bottom tooltip' placement='bottom'>
          <button className='px-3 py-2 bg-gray-600 text-white rounded'>Bottom</button>
        </Tooltip>
        <Tooltip message='Left tooltip' placement='left'>
          <button className='px-3 py-2 bg-gray-600 text-white rounded'>Left</button>
        </Tooltip>
      </div>
    ),
  },
  {
    id: 'with-delay',
    title: 'With Delay',
    description: 'Tooltips with custom show/hide delays.',
    code: `<div className='flex space-x-4'>
  <Tooltip message='Quick tooltip (no delay)' delay={0}>
    <button className='px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700'>
      No delay
    </button>
  </Tooltip>
  <Tooltip message='Delayed tooltip (1000ms)' delay={1000}>
    <button className='px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700'>
      Delayed
    </button>
  </Tooltip>
</div>`,
    children: (
      <div className='flex space-x-4'>
        <Tooltip message='Quick tooltip (no delay)' delay={0}>
          <button className='px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700'>
            No delay
          </button>
        </Tooltip>
        <Tooltip message='Delayed tooltip (1000ms)' delay={1000}>
          <button className='px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700'>
            Delayed
          </button>
        </Tooltip>
      </div>
    ),
  },
  {
    id: 'rich-content',
    title: 'Rich Content',
    description: 'Tooltips can contain complex content including JSX elements.',
    code: `<div className='flex space-x-4'>
  <Tooltip 
    message={
      <div>
        <p className='font-semibold mb-1'>Rich Tooltip</p>
        <p>Tooltips can contain <strong>formatted text</strong> and other elements!</p>
        <div className='mt-2 text-xs opacity-75'>💡 This is a React.ReactNode</div>
      </div>
    }
    className='max-w-xs'
  >
    <button className='px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700'>
      Rich Content
    </button>
  </Tooltip>
  <Tooltip 
    message='Disabled tooltip'
    disabled
  >
    <button className='px-4 py-2 bg-gray-400 text-white rounded cursor-not-allowed'>
      Disabled
    </button>
  </Tooltip>
</div>`,
    children: (
      <div className='flex space-x-4'>
        <Tooltip 
          message={
            <div>
              <p className='font-semibold mb-1'>Rich Tooltip</p>
              <p>Tooltips can contain <strong>formatted text</strong> and other elements!</p>
              <div className='mt-2 text-xs opacity-75'>💡 This is a React.ReactNode</div>
            </div>
          }
          className='max-w-xs'
        >
          <button className='px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700'>
            Rich Content
          </button>
        </Tooltip>
        <Tooltip 
          message='Disabled tooltip'
          disabled
        >
          <button className='px-4 py-2 bg-gray-400 text-white rounded cursor-not-allowed'>
            Disabled
          </button>
        </Tooltip>
      </div>
    ),
  },
];

const tooltipProps = [
  {
    name: 'message',
    type: 'React.ReactNode',
    description: 'The content to display in the tooltip.',
    required: true,
  },
  {
    name: 'placement',
    type: '"top" | "right" | "bottom" | "left"',
    default: '"top"',
    description: 'The preferred side of the trigger to render the tooltip.',
  },
  {
    name: 'delay',
    type: 'number',
    default: '200',
    description: 'The delay in milliseconds before the tooltip appears.',
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
    description: 'Additional CSS classes to apply to the tooltip content.',
  },
  {
    name: 'id',
    type: 'string',
    description: 'Optional ID for the tooltip element.',
  },
  {
    name: 'children',
    type: 'React.ReactElement',
    description: 'The element that triggers the tooltip. Must be a single React element.',
    required: true,
  },
];

export function TooltipPage() {
  return (
    <ComponentPage
      title='Tooltip'
      description='Contextual information component that appears on hover or focus to provide helpful details.'
      tableOfContents={tableOfContents}
      usageInstructions='The Tooltip component provides contextual information about an element when users hover or focus on it. Use tooltips to explain functionality, provide additional details, or clarify abbreviations. Keep tooltip content concise and informative.'
      importStatement="import { Tooltip } from '@moondreamsdev/dreamer-ui/components';"
      componentProps={tooltipProps}
      examples={tooltipExamples}
    />
  );
}