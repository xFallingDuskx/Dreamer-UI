import { Tooltip } from '@moondreamsdev/dreamer-ui/components';
import { ComponentPage } from '../../components/layout/ComponentPage';

const tableOfContents = [
  { id: 'import', title: 'Import', level: 1 },
  { id: 'examples', title: 'Examples', level: 1 },
  { id: 'basic-usage', title: 'Basic Usage', level: 2 },
  { id: 'positions', title: 'Positions', level: 2 },
  { id: 'with-delay', title: 'With Delay', level: 2 },
  { id: 'props', title: 'Props', level: 1 },
];

const tooltipExamples = [
  {
    id: 'basic-usage',
    title: 'Basic Usage',
    description: 'Simple tooltips that appear on hover or focus.',
    code: `<div className='flex space-x-4'>
  <Tooltip content='This is a helpful tooltip'>
    <button className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'>
      Hover me
    </button>
  </Tooltip>
  <Tooltip content='Save your changes to continue'>
    <button className='px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700'>
      Save
    </button>
  </Tooltip>
</div>`,
    children: (
      <div className='flex space-x-4'>
        <Tooltip content='This is a helpful tooltip'>
          <button className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'>
            Hover me
          </button>
        </Tooltip>
        <Tooltip content='Save your changes to continue'>
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
  <Tooltip content='Top tooltip' side='top'>
    <button className='px-3 py-2 bg-gray-600 text-white rounded'>Top</button>
  </Tooltip>
  <Tooltip content='Right tooltip' side='right'>
    <button className='px-3 py-2 bg-gray-600 text-white rounded'>Right</button>
  </Tooltip>
  <Tooltip content='Bottom tooltip' side='bottom'>
    <button className='px-3 py-2 bg-gray-600 text-white rounded'>Bottom</button>
  </Tooltip>
  <Tooltip content='Left tooltip' side='left'>
    <button className='px-3 py-2 bg-gray-600 text-white rounded'>Left</button>
  </Tooltip>
</div>`,
    children: (
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4 place-items-center'>
        <Tooltip content='Top tooltip' side='top'>
          <button className='px-3 py-2 bg-gray-600 text-white rounded'>Top</button>
        </Tooltip>
        <Tooltip content='Right tooltip' side='right'>
          <button className='px-3 py-2 bg-gray-600 text-white rounded'>Right</button>
        </Tooltip>
        <Tooltip content='Bottom tooltip' side='bottom'>
          <button className='px-3 py-2 bg-gray-600 text-white rounded'>Bottom</button>
        </Tooltip>
        <Tooltip content='Left tooltip' side='left'>
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
  <Tooltip content='Quick tooltip (no delay)' delayDuration={0}>
    <button className='px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700'>
      No delay
    </button>
  </Tooltip>
  <Tooltip content='Delayed tooltip (1000ms)' delayDuration={1000}>
    <button className='px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700'>
      Delayed
    </button>
  </Tooltip>
</div>`,
    children: (
      <div className='flex space-x-4'>
        <Tooltip content='Quick tooltip (no delay)' delayDuration={0}>
          <button className='px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700'>
            No delay
          </button>
        </Tooltip>
        <Tooltip content='Delayed tooltip (1000ms)' delayDuration={1000}>
          <button className='px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700'>
            Delayed
          </button>
        </Tooltip>
      </div>
    ),
  },
];

const tooltipProps = [
  {
    name: 'content',
    type: 'React.ReactNode',
    description: 'The content to display in the tooltip.',
    required: true,
  },
  {
    name: 'side',
    type: '"top" | "right" | "bottom" | "left"',
    default: '"top"',
    description: 'The preferred side of the trigger to render against.',
  },
  {
    name: 'align',
    type: '"start" | "center" | "end"',
    default: '"center"',
    description: 'The preferred alignment against the trigger.',
  },
  {
    name: 'delayDuration',
    type: 'number',
    default: '700',
    description: 'The duration from when the pointer enters the trigger until the tooltip opens.',
  },
  {
    name: 'skipDelayDuration',
    type: 'number',
    default: '300',
    description: 'How long a user has to enter another trigger without incurring a delay again.',
  },
  {
    name: 'className',
    type: 'string',
    description: 'Additional CSS classes to apply to the tooltip content.',
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'The element that triggers the tooltip.',
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