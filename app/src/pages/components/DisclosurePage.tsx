import { Disclosure } from '@moondreamsdev/dreamer-ui/components';
import { ComponentPage } from '../../components/layout/ComponentPage';

const tableOfContents = [
  { id: 'import', title: 'Import', level: 1 },
  { id: 'examples', title: 'Examples', level: 1 },
  { id: 'basic-usage', title: 'Basic Usage', level: 2 },
  { id: 'styled-button', title: 'Styled Button', level: 2 },
  { id: 'disabled', title: 'Disabled State', level: 2 },
  { id: 'usage-patterns', title: 'Usage Patterns', level: 2 },
  { id: 'props', title: 'Props', level: 1 },
  { id: 'keyboard-shortcuts', title: 'Keyboard Shortcuts', level: 1 },
];

const disclosureExamples = [
  {
    id: 'basic-usage',
    title: 'Basic Usage',
    description: 'Simple disclosure for toggling content visibility.',
    code: `<div className='space-y-4'>
  <Disclosure label='Default Disclosure'>
    <p>This content can be toggled on and off.</p>
  </Disclosure>
  
  <Disclosure label='FAQ Item' isOpen={true}>
    <p>This disclosure is controlled and open. Click to toggle.</p>
  </Disclosure>
</div>`,
    children: (
      <div className='space-y-4'>
        <Disclosure label='Default Disclosure'>
          <p>This content can be toggled on and off.</p>
        </Disclosure>
        
        <Disclosure label='FAQ Item' isOpen={true}>
          <p>This disclosure is controlled and open. Click to toggle.</p>
        </Disclosure>
      </div>
    ),
  },
  {
    id: 'styled-button',
    title: 'Styled Button',
    description: 'Customize the appearance of the disclosure button.',
    code: `<div className='space-y-4'>
  <Disclosure 
    label='Custom Styled Button'
    buttonClassName='bg-blue-600 hover:bg-blue-700 text-white rounded-lg'
  >
    <div className='p-4 bg-blue-50 rounded-lg border border-blue-200'>
      <p className='text-blue-800'>This disclosure has custom button styling.</p>
    </div>
  </Disclosure>
  
  <Disclosure 
    label='Minimal Style'
    buttonClassName='text-left text-gray-300 hover:text-white border-l-2 border-purple-500 pl-4'
    className='bg-gray-800 rounded-lg'
  >
    <div className='p-4 ml-6 text-gray-300'>
      <p>Minimal styling with left accent border.</p>
    </div>
  </Disclosure>
</div>`,
    children: (
      <div className='space-y-4'>
        <Disclosure 
          label='Custom Styled Button'
          buttonClassName='bg-blue-600 hover:bg-blue-700 text-white rounded-lg'
        >
          <div className='p-4 bg-blue-50 rounded-lg border border-blue-200'>
            <p className='text-blue-800'>This disclosure has custom button styling.</p>
          </div>
        </Disclosure>
        
        <Disclosure 
          label='Minimal Style'
          buttonClassName='text-left text-gray-300 hover:text-white border-l-2 border-purple-500 pl-4'
          className='bg-gray-800 rounded-lg'
        >
          <div className='p-4 ml-6 text-gray-300'>
            <p>Minimal styling with left accent border.</p>
          </div>
        </Disclosure>
      </div>
    ),
  },
  {
    id: 'disabled',
    title: 'Disabled State',
    description: 'Disclosure that cannot be interacted with.',
    code: `<Disclosure label='Disabled Disclosure' disabled>
  <p>This disclosure is disabled and cannot be opened.</p>
</Disclosure>`,
    children: (
      <Disclosure label='Disabled Disclosure' disabled>
        <p>This disclosure is disabled and cannot be opened.</p>
      </Disclosure>
    ),
  },
  {
    id: 'usage-patterns',
    title: 'Usage Patterns',
    description: 'Common usage patterns for disclosure components.',
    code: `<div className='space-y-6'>
  {/* FAQ Section */}
  <div>
    <h3 className='text-lg font-semibold mb-4'>Frequently Asked Questions</h3>
    <div className='space-y-2'>
      <Disclosure label='How do I get started?'>
        <div className='p-4 text-gray-300'>
          <p>Getting started is easy! Simply install the package and import the components you need.</p>
        </div>
      </Disclosure>
      
      <Disclosure label='Is this component accessible?'>
        <div className='p-4 text-gray-300'>
          <p>Yes! This component follows ARIA guidelines and supports keyboard navigation.</p>
        </div>
      </Disclosure>
      
      <Disclosure label='Can I customize the styling?'>
        <div className='p-4 text-gray-300'>
          <p>Absolutely! Use the className and buttonClassName props to customize the appearance.</p>
        </div>
      </Disclosure>
    </div>
  </div>
  
  {/* Settings Panel */}
  <div>
    <h3 className='text-lg font-semibold mb-4'>Settings Panel</h3>
    <Disclosure label='Advanced Settings'>
      <div className='p-4 space-y-4 bg-gray-800 rounded-lg'>
        <div className='flex items-center justify-between'>
          <span>Enable notifications</span>
          <input type='checkbox' />
        </div>
        <div className='flex items-center justify-between'>
          <span>Auto-save</span>
          <input type='checkbox' defaultChecked />
        </div>
        <div className='flex items-center justify-between'>
          <span>Dark mode</span>
          <input type='checkbox' defaultChecked />
        </div>
      </div>
    </Disclosure>
  </div>
</div>`,
    children: (
      <div className='space-y-6'>
        {/* FAQ Section */}
        <div>
          <h3 className='text-lg font-semibold mb-4'>Frequently Asked Questions</h3>
          <div className='space-y-2'>
            <Disclosure label='How do I get started?'>
              <div className='p-4 text-gray-300'>
                <p>Getting started is easy! Simply install the package and import the components you need.</p>
              </div>
            </Disclosure>
            
            <Disclosure label='Is this component accessible?'>
              <div className='p-4 text-gray-300'>
                <p>Yes! This component follows ARIA guidelines and supports keyboard navigation.</p>
              </div>
            </Disclosure>
            
            <Disclosure label='Can I customize the styling?'>
              <div className='p-4 text-gray-300'>
                <p>Absolutely! Use the className and buttonClassName props to customize the appearance.</p>
              </div>
            </Disclosure>
          </div>
        </div>
        
        {/* Settings Panel */}
        <div>
          <h3 className='text-lg font-semibold mb-4'>Settings Panel</h3>
          <Disclosure label='Advanced Settings'>
            <div className='p-4 space-y-4 bg-gray-800 rounded-lg'>
              <div className='flex items-center justify-between'>
                <span>Enable notifications</span>
                <input type='checkbox' />
              </div>
              <div className='flex items-center justify-between'>
                <span>Auto-save</span>
                <input type='checkbox' defaultChecked />
              </div>
              <div className='flex items-center justify-between'>
                <span>Dark mode</span>
                <input type='checkbox' defaultChecked />
              </div>
            </div>
          </Disclosure>
        </div>
      </div>
    ),
  },
];

const disclosureProps = [
  {
    name: 'label',
    type: 'string | React.ReactNode',
    description: 'The label text or content for the disclosure button.',
    required: true,
  },
  {
    name: 'isOpen',
    type: 'boolean',
    description: 'Controls the open state (uncontrolled if not provided).',
  },
  {
    name: 'onToggle',
    type: '(open: boolean) => void',
    description: 'Called when disclosure is toggled.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Whether the disclosure is disabled.',
  },
  {
    name: 'className',
    type: 'string',
    description: 'Additional CSS classes to apply to the disclosure.',
  },
  {
    name: 'buttonClassName',
    type: 'string',
    description: 'Additional CSS classes to apply to the disclosure button.',
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'The content to show/hide.',
    required: true,
  },
];

const disclosureKeyboardShortcuts = [
  {
    keys: 'Enter',
    description: 'Toggle the disclosure when the button is focused',
  },
  {
    keys: 'Space',
    description: 'Toggle the disclosure when the button is focused',
  },
  {
    keys: 'Tab',
    description: 'Navigate to the next focusable element',
  },
];

export const DisclosurePage = () => {
  return (
    <ComponentPage
      title='Disclosure'
      description='A simple, accessible hide/show component for toggling content visibility.'
      tableOfContents={tableOfContents}
      usageInstructions='The Disclosure component provides an accessible way to show and hide content. Use it for FAQ sections, collapsible content areas, or any scenario where you need to toggle content visibility while maintaining good accessibility.'
      importStatement="import { Disclosure } from '@moondreamsdev/dreamer-ui/components';"
      componentProps={disclosureProps}
      keyboardShortcuts={disclosureKeyboardShortcuts}
      examples={disclosureExamples}
    />
  );
};
