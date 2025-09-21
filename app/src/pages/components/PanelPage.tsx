import { useState } from 'react';
import { Panel, Button } from '@moondreamsdev/dreamer-ui/components';
import { ComponentPage } from '../../components/layout/ComponentPage';

const tableOfContents = [
  { id: 'import', title: 'Import', level: 1 },
  { id: 'examples', title: 'Examples', level: 1 },
  { id: 'basic-usage', title: 'Basic Usage', level: 2 },
  { id: 'with-title-footer', title: 'With Title & Footer', level: 2 },
  { id: 'different-sizes', title: 'Different Sizes', level: 2 },
  { id: 'custom-styling', title: 'Custom Styling', level: 2 },
  { id: 'props', title: 'Props', level: 1 },
];

const panelExamples = [
  {
    id: 'basic-usage',
    title: 'Basic Usage',
    description: 'Simple panel with minimal configuration.',
    code: `function BasicPanelExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>
        Open Panel
      </Button>
      
      <Panel isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className='space-y-4'>
          <h3 className='text-lg font-medium'>Welcome!</h3>
          <p>This is a basic panel that slides in from the right side.</p>
          <p>Click the X button, press ESC, or click outside to close.</p>
          <Button onClick={() => setIsOpen(false)}>
            Close Panel
          </Button>
        </div>
      </Panel>
    </div>
  );
}`,
    children: (
      <BasicPanelExample />
    ),
  },
  {
    id: 'with-title-footer',
    title: 'With Title & Footer',
    description: 'Panel with header title and footer actions.',
    code: `function TitleFooterPanelExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsOpen(true)} variant="outline">
        Open Settings Panel
      </Button>
      
      <Panel 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        title="Account Settings"
        footer={
          <div className='flex justify-end gap-2'>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsOpen(false)}>
              Save Changes
            </Button>
          </div>
        }
      >
        <div className='space-y-6'>
          <div>
            <h4 className='font-medium mb-2'>Profile Information</h4>
            <div className='space-y-3'>
              <input 
                type="text" 
                placeholder="Full Name" 
                className='w-full p-2 border border-gray-600 bg-gray-800 rounded'
                defaultValue="John Doe"
              />
              <input 
                type="email" 
                placeholder="Email" 
                className='w-full p-2 border border-gray-600 bg-gray-800 rounded'
                defaultValue="john@example.com"
              />
            </div>
          </div>
          <div>
            <h4 className='font-medium mb-2'>Preferences</h4>
            <div className='space-y-2'>
              <label className='flex items-center gap-2'>
                <input type="checkbox" defaultChecked />
                <span className='text-sm'>Email notifications</span>
              </label>
              <label className='flex items-center gap-2'>
                <input type="checkbox" />
                <span className='text-sm'>Marketing emails</span>
              </label>
            </div>
          </div>
        </div>
      </Panel>
    </div>
  );
}`,
    children: (
      <TitleFooterPanelExample />
    ),
  },
  {
    id: 'different-sizes',
    title: 'Different Sizes',
    description: 'Panels with various size options.',
    code: `function PanelSizesExample() {
  const [activePanel, setActivePanel] = useState(null);

  return (
    <div className='flex flex-wrap gap-2'>
      <Button size="sm" onClick={() => setActivePanel('small')}>
        Small Panel
      </Button>
      <Button size="sm" onClick={() => setActivePanel('medium')}>
        Medium Panel
      </Button>
      <Button size="sm" onClick={() => setActivePanel('large')}>
        Large Panel
      </Button>
      <Button size="sm" onClick={() => setActivePanel('xl')}>
        XL Panel
      </Button>
      
      <Panel 
        isOpen={activePanel === 'small'} 
        onClose={() => setActivePanel(null)}
        title="Small Panel"
        size="sm"
      >
        <p>This is a small panel, perfect for simple content or notifications.</p>
      </Panel>
      
      <Panel 
        isOpen={activePanel === 'medium'} 
        onClose={() => setActivePanel(null)}
        title="Medium Panel"
        size="md"
      >
        <p>This is a medium panel (default size), suitable for most use cases.</p>
      </Panel>
      
      <Panel 
        isOpen={activePanel === 'large'} 
        onClose={() => setActivePanel(null)}
        title="Large Panel"
        size="lg"
      >
        <div>
          <p className='mb-4'>This is a large panel with more horizontal space.</p>
          <div className='grid grid-cols-2 gap-4'>
            <div className='bg-blue-900/20 p-3 rounded'>
              <h5 className='font-medium'>Column 1</h5>
              <p className='text-sm text-gray-400'>More content space</p>
            </div>
            <div className='bg-purple-900/20 p-3 rounded'>
              <h5 className='font-medium'>Column 2</h5>
              <p className='text-sm text-gray-400'>Better layouts</p>
            </div>
          </div>
        </div>
      </Panel>
      
      <Panel 
        isOpen={activePanel === 'xl'} 
        onClose={() => setActivePanel(null)}
        title="Extra Large Panel"
        size="xl"
      >
        <div>
          <p className='mb-4'>Extra large panel for complex interfaces.</p>
          <div className='grid grid-cols-3 gap-3'>
            <div className='bg-green-900/20 p-3 rounded text-center'>
              <h5 className='font-medium'>Section 1</h5>
            </div>
            <div className='bg-yellow-900/20 p-3 rounded text-center'>
              <h5 className='font-medium'>Section 2</h5>
            </div>
            <div className='bg-red-900/20 p-3 rounded text-center'>
              <h5 className='font-medium'>Section 3</h5>
            </div>
          </div>
        </div>
      </Panel>
    </div>
  );
}`,
    children: (
      <PanelSizesExample />
    ),
  },
  {
    id: 'custom-styling',
    title: 'Custom Styling',
    description: 'Panels with custom styling and behavior options.',
    code: `function CustomPanelExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsOpen(true)} variant="primary">
        Custom Styled Panel
      </Button>
      
      <Panel 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        title="Custom Panel"
        hideCloseButton={false}
        disableCloseOnOverlayClick={false}
        className="border-l-4 border-accent"
        overlayClassName="bg-accent/20"
      >
        <div className='space-y-4'>
          <div className='bg-accent/10 border border-accent/20 rounded-lg p-4'>
            <h4 className='text-accent font-medium mb-2'>Custom Styling</h4>
            <p className='text-sm'>This panel has custom styling with accent colors and themed overlay.</p>
          </div>
          <div className='space-y-2'>
            <p className='text-sm text-gray-400'>Features:</p>
            <ul className='text-sm space-y-1 ml-4'>
              <li>• Custom border accent</li>
              <li>• Themed overlay</li>
              <li>• Custom styling options</li>
            </ul>
          </div>
          <Button onClick={() => setIsOpen(false)} className='w-full'>
            Close
          </Button>
        </div>
      </Panel>
    </div>
  );
}`,
    children: (
      <CustomPanelExample />
    ),
  },
];

function BasicPanelExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>
        Open Panel
      </Button>
      
      <Panel isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className='space-y-4'>
          <h3 className='text-lg font-medium'>Welcome!</h3>
          <p>This is a basic panel that slides in from the right side.</p>
          <p>Click the X button, press ESC, or click outside to close.</p>
          <Button onClick={() => setIsOpen(false)}>
            Close Panel
          </Button>
        </div>
      </Panel>
    </div>
  );
}

function TitleFooterPanelExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsOpen(true)} variant="outline">
        Open Settings Panel
      </Button>
      
      <Panel 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        title="Account Settings"
        footer={
          <div className='flex justify-end gap-2'>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsOpen(false)}>
              Save Changes
            </Button>
          </div>
        }
      >
        <div className='space-y-6'>
          <div>
            <h4 className='font-medium mb-2'>Profile Information</h4>
            <div className='space-y-3'>
              <input 
                type="text" 
                placeholder="Full Name" 
                className='w-full p-2 border border-gray-600 bg-gray-800 rounded'
                defaultValue="John Doe"
              />
              <input 
                type="email" 
                placeholder="Email" 
                className='w-full p-2 border border-gray-600 bg-gray-800 rounded'
                defaultValue="john@example.com"
              />
            </div>
          </div>
          <div>
            <h4 className='font-medium mb-2'>Preferences</h4>
            <div className='space-y-2'>
              <label className='flex items-center gap-2'>
                <input type="checkbox" defaultChecked />
                <span className='text-sm'>Email notifications</span>
              </label>
              <label className='flex items-center gap-2'>
                <input type="checkbox" />
                <span className='text-sm'>Marketing emails</span>
              </label>
            </div>
          </div>
        </div>
      </Panel>
    </div>
  );
}

function PanelSizesExample() {
  const [activePanel, setActivePanel] = useState<string | null>(null);

  return (
    <div className='flex flex-wrap gap-2'>
      <Button size="sm" onClick={() => setActivePanel('small')}>
        Small Panel
      </Button>
      <Button size="sm" onClick={() => setActivePanel('medium')}>
        Medium Panel
      </Button>
      <Button size="sm" onClick={() => setActivePanel('large')}>
        Large Panel
      </Button>
      <Button size="sm" onClick={() => setActivePanel('xl')}>
        XL Panel
      </Button>
      
      <Panel 
        isOpen={activePanel === 'small'} 
        onClose={() => setActivePanel(null)}
        title="Small Panel"
        size="sm"
      >
        <p>This is a small panel, perfect for simple content or notifications.</p>
      </Panel>
      
      <Panel 
        isOpen={activePanel === 'medium'} 
        onClose={() => setActivePanel(null)}
        title="Medium Panel"
        size="md"
      >
        <p>This is a medium panel (default size), suitable for most use cases.</p>
      </Panel>
      
      <Panel 
        isOpen={activePanel === 'large'} 
        onClose={() => setActivePanel(null)}
        title="Large Panel"
        size="lg"
      >
        <div>
          <p className='mb-4'>This is a large panel with more horizontal space.</p>
          <div className='grid grid-cols-2 gap-4'>
            <div className='bg-blue-900/20 p-3 rounded'>
              <h5 className='font-medium'>Column 1</h5>
              <p className='text-sm text-gray-400'>More content space</p>
            </div>
            <div className='bg-purple-900/20 p-3 rounded'>
              <h5 className='font-medium'>Column 2</h5>
              <p className='text-sm text-gray-400'>Better layouts</p>
            </div>
          </div>
        </div>
      </Panel>
      
      <Panel 
        isOpen={activePanel === 'xl'} 
        onClose={() => setActivePanel(null)}
        title="Extra Large Panel"
        size="xl"
      >
        <div>
          <p className='mb-4'>Extra large panel for complex interfaces.</p>
          <div className='grid grid-cols-3 gap-3'>
            <div className='bg-green-900/20 p-3 rounded text-center'>
              <h5 className='font-medium'>Section 1</h5>
            </div>
            <div className='bg-yellow-900/20 p-3 rounded text-center'>
              <h5 className='font-medium'>Section 2</h5>
            </div>
            <div className='bg-red-900/20 p-3 rounded text-center'>
              <h5 className='font-medium'>Section 3</h5>
            </div>
          </div>
        </div>
      </Panel>
    </div>
  );
}

function CustomPanelExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsOpen(true)} variant="primary">
        Custom Styled Panel
      </Button>
      
      <Panel 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        title="Custom Panel"
        hideCloseButton={false}
        disableCloseOnOverlayClick={false}
        className="border-l-4 border-accent"
        overlayClassName="bg-accent/20"
      >
        <div className='space-y-4'>
          <div className='bg-accent/10 border border-accent/20 rounded-lg p-4'>
            <h4 className='text-accent font-medium mb-2'>Custom Styling</h4>
            <p className='text-sm'>This panel has custom styling with accent colors and themed overlay.</p>
          </div>
          <div className='space-y-2'>
            <p className='text-sm text-gray-400'>Features:</p>
            <ul className='text-sm space-y-1 ml-4'>
              <li>• Custom border accent</li>
              <li>• Themed overlay</li>
              <li>• Custom styling options</li>
            </ul>
          </div>
          <Button onClick={() => setIsOpen(false)} className='w-full'>
            Close
          </Button>
        </div>
      </Panel>
    </div>
  );
}

const panelProps = [
  {
    name: 'isOpen',
    type: 'boolean',
    description: 'Whether the panel is open.',
    required: true,
  },
  {
    name: 'onClose',
    type: '() => void',
    description: 'Callback when panel should close.',
    required: true,
  },
  {
    name: 'title',
    type: 'React.ReactNode',
    description: 'Panel title - can be a string or React node.',
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'Panel content.',
    required: true,
  },
  {
    name: 'footer',
    type: 'React.ReactNode',
    description: 'Panel footer - can be a string or React node.',
  },
  {
    name: 'size',
    type: '"sm" | "md" | "lg" | "xl" | "2xl" | "full" | "screen"',
    default: '"md"',
    description: 'Panel size variant.',
  },
  {
    name: 'id',
    type: 'string',
    description: 'Unique identifier for the panel.',
  },
  {
    name: 'className',
    type: 'string',
    description: 'Additional CSS classes for the panel.',
  },
  {
    name: 'overlayClassName',
    type: 'string',
    description: 'Additional CSS classes for the overlay.',
  },
  {
    name: 'hideCloseButton',
    type: 'boolean',
    default: 'false',
    description: 'Whether to hide the close button.',
  },
  {
    name: 'disableCloseOnOverlayClick',
    type: 'boolean',
    default: 'false',
    description: 'Whether to disable closing when clicking the overlay.',
  },
  {
    name: 'ariaLabelledBy',
    type: 'string',
    description: 'ARIA labelledby attribute.',
  },
  {
    name: 'ariaDescribedBy',
    type: 'string',
    description: 'ARIA describedby attribute.',
  },
];

export function PanelPage() {
  return (
    <ComponentPage
      title='Panel'
      description='Slide-in overlay panel component for additional content and interactions.'
      tableOfContents={tableOfContents}
      usageInstructions='The Panel component provides a slide-in overlay interface that appears from the right side of the screen. Use panels for settings, forms, detailed views, or any content that needs focus without leaving the current page context.'
      importStatement="import { Panel } from '@moondreamsdev/dreamer-ui/components';"
      componentProps={panelProps}
      examples={panelExamples}
    />
  );
}