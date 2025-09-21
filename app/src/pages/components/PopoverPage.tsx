import { useState } from 'react';
import { Popover, Button } from '@moondreamsdev/dreamer-ui/components';
import { ComponentPage } from '../../components/layout/ComponentPage';

const tableOfContents = [
  { id: 'import', title: 'Import', level: 1 },
  { id: 'examples', title: 'Examples', level: 1 },
  { id: 'basic-usage', title: 'Basic Usage', level: 2 },
  { id: 'controlled-popover', title: 'Controlled Popover', level: 2 },
  { id: 'placement-alignment', title: 'Placement & Alignment', level: 2 },
  { id: 'rich-content', title: 'Rich Content', level: 2 },
  { id: 'props', title: 'Props', level: 1 },
];

const popoverExamples = [
  {
    id: 'basic-usage',
    title: 'Basic Usage',
    description: 'Simple popovers that appear on click.',
    code: `function BasicPopoverExample() {
  return (
    <div className='flex gap-4'>
      <Popover
        trigger={<Button>Click me</Button>}
        className='p-4 max-w-sm'
      >
        <div>
          <h4 className='font-medium mb-2'>Welcome!</h4>
          <p className='text-sm text-gray-400'>
            This is a basic popover with some helpful information.
          </p>
        </div>
      </Popover>

      <Popover
        trigger={<Button variant="outline">Info Button</Button>}
        className='p-3'
      >
        <p className='text-sm'>Quick info tooltip replacement.</p>
      </Popover>
    </div>
  );
}`,
    children: (
      <BasicPopoverExample />
    ),
  },
  {
    id: 'controlled-popover',
    title: 'Controlled Popover',
    description: 'Manage popover state externally for advanced control.',
    code: `function ControlledPopoverExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='space-y-4'>
      <div className='flex gap-2'>
        <Button 
          size="sm" 
          variant="outline" 
          onClick={() => setIsOpen(true)}
        >
          Open
        </Button>
        <Button 
          size="sm" 
          variant="outline" 
          onClick={() => setIsOpen(false)}
        >
          Close
        </Button>
        <span className='text-sm text-gray-400 self-center'>
          Status: {isOpen ? 'Open' : 'Closed'}
        </span>
      </div>
      
      <Popover
        trigger={<Button>Controlled Popover</Button>}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        className='p-4'
      >
        <div>
          <h4 className='font-medium mb-2'>Controlled State</h4>
          <p className='text-sm text-gray-400 mb-3'>
            This popover's open state is controlled externally.
          </p>
          <Button size="sm" onClick={() => setIsOpen(false)}>
            Close from inside
          </Button>
        </div>
      </Popover>
    </div>
  );
}`,
    children: (
      <ControlledPopoverExample />
    ),
  },
  {
    id: 'placement-alignment',
    title: 'Placement & Alignment',
    description: 'Control where the popover appears relative to the trigger.',
    code: `function PlacementAlignmentExample() {
  return (
    <div className='grid grid-cols-2 gap-8'>
      <div>
        <h4 className='font-medium mb-4'>Placement Options</h4>
        <div className='grid grid-cols-2 gap-3'>
          <Popover
            trigger={<Button size="sm">Top</Button>}
            placement="top"
            className='p-3'
          >
            <p className='text-sm'>Top placement</p>
          </Popover>
          
          <Popover
            trigger={<Button size="sm">Right</Button>}
            placement="right"
            className='p-3'
          >
            <p className='text-sm'>Right placement</p>
          </Popover>
          
          <Popover
            trigger={<Button size="sm">Bottom</Button>}
            placement="bottom"
            className='p-3'
          >
            <p className='text-sm'>Bottom placement</p>
          </Popover>
          
          <Popover
            trigger={<Button size="sm">Left</Button>}
            placement="left"
            className='p-3'
          >
            <p className='text-sm'>Left placement</p>
          </Popover>
        </div>
      </div>

      <div>
        <h4 className='font-medium mb-4'>Alignment Options</h4>
        <div className='space-y-3'>
          <Popover
            trigger={<Button size="sm" className='w-full'>Start Aligned</Button>}
            placement="bottom"
            alignment="start"
            className='p-3'
          >
            <p className='text-sm'>Aligned to start</p>
          </Popover>
          
          <Popover
            trigger={<Button size="sm" className='w-full'>Center Aligned</Button>}
            placement="bottom"
            alignment="center"
            className='p-3'
          >
            <p className='text-sm'>Aligned to center</p>
          </Popover>
          
          <Popover
            trigger={<Button size="sm" className='w-full'>End Aligned</Button>}
            placement="bottom"
            alignment="end"
            className='p-3'
          >
            <p className='text-sm'>Aligned to end</p>
          </Popover>
        </div>
      </div>
    </div>
  );
}`,
    children: (
      <PlacementAlignmentExample />
    ),
  },
  {
    id: 'rich-content',
    title: 'Rich Content',
    description: 'Popovers with forms, lists, and interactive content.',
    code: `function RichContentExample() {
  const [email, setEmail] = useState('');

  return (
    <div className='flex gap-4'>
      <Popover
        trigger={<Button variant="outline">Subscribe Form</Button>}
        className='p-4 w-72'
        closeOnOverlayClick={true}
      >
        <div>
          <h4 className='font-medium mb-3'>Subscribe to Newsletter</h4>
          <div className='space-y-3'>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full p-2 border border-gray-600 bg-gray-800 rounded text-sm'
            />
            <div className='flex gap-2'>
              <Button size="sm" className='flex-1'>
                Subscribe
              </Button>
              <Button size="sm" variant="outline">
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </Popover>

      <Popover
        trigger={<Button variant="outline">Menu Options</Button>}
        className='p-2'
        placement="bottom"
        alignment="start"
      >
        <div className='space-y-1'>
          <div className='px-3 py-2 text-sm hover:bg-gray-700 rounded cursor-pointer'>
            Edit Profile
          </div>
          <div className='px-3 py-2 text-sm hover:bg-gray-700 rounded cursor-pointer'>
            Settings
          </div>
          <hr className='border-gray-600 my-1' />
          <div className='px-3 py-2 text-sm hover:bg-gray-700 rounded cursor-pointer text-red-400'>
            Delete Account
          </div>
        </div>
      </Popover>

      <Popover
        trigger={<Button variant="outline">Color Picker</Button>}
        className='p-3'
        closeOnTriggerClick={false}
      >
        <div>
          <h4 className='font-medium mb-3 text-sm'>Choose Color</h4>
          <div className='grid grid-cols-4 gap-2'>
            {['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 
              'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-gray-500'].map((color) => (
              <div
                key={color}
                className={\`w-8 h-8 rounded cursor-pointer hover:scale-110 transition-transform \${color}\`}
                onClick={() => console.log('Selected:', color)}
              />
            ))}
          </div>
        </div>
      </Popover>
    </div>
  );
}`,
    children: (
      <RichContentExample />
    ),
  },
];

function BasicPopoverExample() {
  return (
    <div className='flex gap-4'>
      <Popover
        trigger={<Button>Click me</Button>}
        className='p-4 max-w-sm'
      >
        <div>
          <h4 className='font-medium mb-2'>Welcome!</h4>
          <p className='text-sm text-gray-400'>
            This is a basic popover with some helpful information.
          </p>
        </div>
      </Popover>

      <Popover
        trigger={<Button variant="outline">Info Button</Button>}
        className='p-3'
      >
        <p className='text-sm'>Quick info tooltip replacement.</p>
      </Popover>
    </div>
  );
}

function ControlledPopoverExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='space-y-4'>
      <div className='flex gap-2'>
        <Button 
          size="sm" 
          variant="outline" 
          onClick={() => setIsOpen(true)}
        >
          Open
        </Button>
        <Button 
          size="sm" 
          variant="outline" 
          onClick={() => setIsOpen(false)}
        >
          Close
        </Button>
        <span className='text-sm text-gray-400 self-center'>
          Status: {isOpen ? 'Open' : 'Closed'}
        </span>
      </div>
      
      <Popover
        trigger={<Button>Controlled Popover</Button>}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        className='p-4'
      >
        <div>
          <h4 className='font-medium mb-2'>Controlled State</h4>
          <p className='text-sm text-gray-400 mb-3'>
            This popover's open state is controlled externally.
          </p>
          <Button size="sm" onClick={() => setIsOpen(false)}>
            Close from inside
          </Button>
        </div>
      </Popover>
    </div>
  );
}

function PlacementAlignmentExample() {
  return (
    <div className='grid grid-cols-2 gap-8'>
      <div>
        <h4 className='font-medium mb-4'>Placement Options</h4>
        <div className='grid grid-cols-2 gap-3'>
          <Popover
            trigger={<Button size="sm">Top</Button>}
            placement="top"
            className='p-3'
          >
            <p className='text-sm'>Top placement</p>
          </Popover>
          
          <Popover
            trigger={<Button size="sm">Right</Button>}
            placement="right"
            className='p-3'
          >
            <p className='text-sm'>Right placement</p>
          </Popover>
          
          <Popover
            trigger={<Button size="sm">Bottom</Button>}
            placement="bottom"
            className='p-3'
          >
            <p className='text-sm'>Bottom placement</p>
          </Popover>
          
          <Popover
            trigger={<Button size="sm">Left</Button>}
            placement="left"
            className='p-3'
          >
            <p className='text-sm'>Left placement</p>
          </Popover>
        </div>
      </div>

      <div>
        <h4 className='font-medium mb-4'>Alignment Options</h4>
        <div className='space-y-3'>
          <Popover
            trigger={<Button size="sm" className='w-full'>Start Aligned</Button>}
            placement="bottom"
            alignment="start"
            className='p-3'
          >
            <p className='text-sm'>Aligned to start</p>
          </Popover>
          
          <Popover
            trigger={<Button size="sm" className='w-full'>Center Aligned</Button>}
            placement="bottom"
            alignment="center"
            className='p-3'
          >
            <p className='text-sm'>Aligned to center</p>
          </Popover>
          
          <Popover
            trigger={<Button size="sm" className='w-full'>End Aligned</Button>}
            placement="bottom"
            alignment="end"
            className='p-3'
          >
            <p className='text-sm'>Aligned to end</p>
          </Popover>
        </div>
      </div>
    </div>
  );
}

function RichContentExample() {
  const [email, setEmail] = useState('');

  return (
    <div className='flex gap-4'>
      <Popover
        trigger={<Button variant="outline">Subscribe Form</Button>}
        className='p-4 w-72'
        closeOnOverlayClick={true}
      >
        <div>
          <h4 className='font-medium mb-3'>Subscribe to Newsletter</h4>
          <div className='space-y-3'>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full p-2 border border-gray-600 bg-gray-800 rounded text-sm'
            />
            <div className='flex gap-2'>
              <Button size="sm" className='flex-1'>
                Subscribe
              </Button>
              <Button size="sm" variant="outline">
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </Popover>

      <Popover
        trigger={<Button variant="outline">Menu Options</Button>}
        className='p-2'
        placement="bottom"
        alignment="start"
      >
        <div className='space-y-1'>
          <div className='px-3 py-2 text-sm hover:bg-gray-700 rounded cursor-pointer'>
            Edit Profile
          </div>
          <div className='px-3 py-2 text-sm hover:bg-gray-700 rounded cursor-pointer'>
            Settings
          </div>
          <hr className='border-gray-600 my-1' />
          <div className='px-3 py-2 text-sm hover:bg-gray-700 rounded cursor-pointer text-red-400'>
            Delete Account
          </div>
        </div>
      </Popover>

      <Popover
        trigger={<Button variant="outline">Color Picker</Button>}
        className='p-3'
        closeOnTriggerClick={false}
      >
        <div>
          <h4 className='font-medium mb-3 text-sm'>Choose Color</h4>
          <div className='grid grid-cols-4 gap-2'>
            {['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 
              'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-gray-500'].map((color) => (
              <div
                key={color}
                className={`w-8 h-8 rounded cursor-pointer hover:scale-110 transition-transform ${color}`}
                onClick={() => console.log('Selected:', color)}
              />
            ))}
          </div>
        </div>
      </Popover>
    </div>
  );
}

const popoverProps = [
  {
    name: 'trigger',
    type: 'React.ReactElement',
    description: 'The element that triggers the popover.',
    required: true,
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'The content to display in the popover.',
    required: true,
  },
  {
    name: 'placement',
    type: '"top" | "right" | "bottom" | "left"',
    default: '"bottom"',
    description: 'The preferred side of the trigger to render against.',
  },
  {
    name: 'alignment',
    type: '"start" | "center" | "end"',
    default: '"center"',
    description: 'The preferred alignment against the trigger.',
  },
  {
    name: 'isOpen',
    type: 'boolean',
    description: 'Whether the popover is open (controlled).',
  },
  {
    name: 'onOpenChange',
    type: '(open: boolean) => void',
    description: 'Callback fired when the open state changes.',
  },
  {
    name: 'className',
    type: 'string',
    description: 'Additional CSS classes to apply to the popover content.',
  },
  {
    name: 'id',
    type: 'string',
    description: 'Unique identifier for the popover.',
  },
  {
    name: 'closeOnOverlayClick',
    type: 'boolean',
    default: 'true',
    description: 'Whether to close popover when clicking outside.',
  },
  {
    name: 'closeOnTriggerClick',
    type: 'boolean',
    default: 'true',
    description: 'Whether to close popover when clicking the trigger again.',
  },
  {
    name: 'offset',
    type: 'number',
    default: '8',
    description: 'Offset of the popover from the trigger element in pixels.',
  },
  {
    name: 'autoSwitchPlacement',
    type: 'boolean',
    default: 'true',
    description: 'Automatically switch placement to opposite side if there is not enough space.',
  },
];

export function PopoverPage() {
  return (
    <ComponentPage
      title='Popover'
      description='Floating content container that appears relative to a trigger element for contextual information.'
      tableOfContents={tableOfContents}
      usageInstructions='The Popover component displays floating content relative to a trigger element. Use it for contextual information, forms, tooltips, or any content that should appear on demand without navigating away from the current context.'
      importStatement="import { Popover } from '@moondreamsdev/dreamer-ui/components';"
      componentProps={popoverProps}
      examples={popoverExamples}
    />
  );
}