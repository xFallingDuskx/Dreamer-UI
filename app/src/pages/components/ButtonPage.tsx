import { Button } from '@moondreamsdev/dreamer-ui/components';
import { ComponentPage } from '../../components/layout/ComponentPage';
import { ExampleSection } from '../../components/ui/ExampleSection';

const tableOfContents = [
  { id: 'import', title: 'Import', level: 1 },
  { id: 'examples', title: 'Examples', level: 1 },
  { id: 'variants', title: 'Variants', level: 2 },
  { id: 'states', title: 'States', level: 2 },
  { id: 'links', title: 'Links', level: 2 },
  { id: 'usage-examples', title: 'Usage Examples', level: 2 },
  { id: 'props', title: 'Props', level: 1 },
  { id: 'keyboard-shortcuts', title: 'Keyboard Shortcuts', level: 1 },
];

const buttonProps = [
  {
    name: 'variant',
    type: "'primary' | 'secondary' | 'tertiary' | 'destructive' | 'outline' | 'link' | 'base'",
    default: "'primary'",
    required: false,
    description: 'The visual style variant of the button'
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg' | 'fitted'",
    default: "'md'",
    required: false,
    description: 'The size of the button'
  },
  {
    name: 'loading',
    type: 'boolean',
    required: false,
    description: 'Whether the button is in a loading state'
  },
  {
    name: 'disabled',
    type: 'boolean',
    required: false,
    description: 'Whether the button is disabled'
  },
  {
    name: 'href',
    type: 'string',
    required: false,
    description: 'When provided, renders the button as a link'
  },
  {
    name: 'target',
    type: 'string',
    required: false,
    description: 'The target attribute for link buttons'
  },
  {
    name: 'rel',
    type: 'string',
    required: false,
    description: 'The rel attribute for link buttons'
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    required: true,
    description: 'The content to display inside the button'
  },
  {
    name: 'className',
    type: 'string',
    required: false,
    description: 'Additional CSS classes to apply to the button'
  },
  {
    name: 'id',
    type: 'string',
    required: false,
    description: 'The HTML id attribute for the button'
  }
];

const keyboardShortcuts = [
  {
    keys: 'Space',
    description: 'Activate the button'
  },
  {
    keys: 'Enter',
    description: 'Activate the button'
  },
  {
    keys: 'Tab',
    description: 'Move focus to the next focusable element'
  },
  {
    keys: 'Shift + Tab',
    description: 'Move focus to the previous focusable element'
  }
];

export function ButtonPage() {
  return (
    <ComponentPage
      title='Button'
      description='A versatile button component with multiple variants, sizes, and states. Supports both regular buttons and link functionality.'
      tableOfContents={tableOfContents}
      usageInstructions='The Button component is a fundamental interactive element that can be used for actions, form submissions, navigation, and more. It supports multiple variants, sizes, loading states, and can function as both a button and a link.'
      importStatement="import { Button } from '@moondreamsdev/dreamer-ui/components';"
      componentProps={buttonProps}
      keyboardShortcuts={keyboardShortcuts}
    >
      <section id="examples">
        <div className='group relative flex items-center font-semibold text-white mb-6 text-2xl'>
          <button
            onClick={() => {
              const url = new URL(window.location.href);
              url.hash = 'examples';
              navigator.clipboard.writeText(url.toString());
            }}
            className='absolute -left-8 w-6 h-6 flex items-center justify-center rounded text-accent transition-opacity group-hover:opacity-100 opacity-0'
            title='Copy link to Examples'
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"/>
            </svg>
          </button>
          Examples
        </div>
        
        <ExampleSection 
          title='Variants'
          description='Different button styles to fit your design needs.'
          id='variants'
        code={`<div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
  <Button>Primary</Button>
  <Button variant='secondary'>Secondary</Button>
  <Button variant='tertiary'>Tertiary</Button>
  <Button variant='destructive'>Destructive</Button>
  <Button variant='outline'>Outline</Button>
  <Button variant='link' size='md'>Link</Button>
  <Button variant='base'>Base</Button>
</div>`}
      >
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
          <Button>Primary</Button>
          <Button variant='secondary'>Secondary</Button>
          <Button variant='tertiary'>Tertiary</Button>
          <Button variant='destructive'>Destructive</Button>
          <Button variant='outline'>Outline</Button>
          <Button variant='link' size='md'>Link</Button>
          <Button variant='base'>Base</Button>
        </div>
      </ExampleSection>

      <ExampleSection 
        title='States'
        description='Loading and disabled states for different user interactions.'
        id='states'
        code={`<div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
  <Button loading={true}>Loading</Button>
  <Button disabled={true}>Disabled</Button>
  <Button variant='base' size='fitted'>Fitted Size</Button>
</div>`}
      >
        <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
          <Button loading={true}>Loading</Button>
          <Button disabled={true}>Disabled</Button>
          <Button variant='base' size='fitted'>Fitted Size</Button>
        </div>
      </ExampleSection>

      <ExampleSection 
        title='Links'
        description='Buttons that function as links to external or internal destinations.'
        id='links'
        code={`<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
  <Button href='https://google.com' target='_blank' rel='noopener noreferrer'>
    External Link
  </Button>
  <Button href='https://google.com' disabled={true}>
    Disabled Link
  </Button>
</div>`}
      >
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <Button href='https://google.com' target='_blank' rel='noopener noreferrer'>
            External Link
          </Button>
          <Button href='https://google.com' disabled={true}>
            Disabled Link
          </Button>
        </div>
      </ExampleSection>

      <ExampleSection 
        title='Usage Examples'
        description='Common button usage patterns in real applications.'
        id='usage-examples'
        code={`<div className='space-y-4'>
  <div className='flex gap-2'>
    <Button>Save Changes</Button>
    <Button variant='outline'>Cancel</Button>
  </div>
  <div className='flex gap-2'>
    <Button variant='destructive'>Delete</Button>
    <Button variant='secondary'>Archive</Button>
  </div>
  <div className='text-center'>
    <Button size='fitted' variant='link'>
      Learn More →
    </Button>
  </div>
</div>`}
      >
        <div className='space-y-4'>
          <div className='flex gap-2'>
            <Button>Save Changes</Button>
            <Button variant='outline'>Cancel</Button>
          </div>
          <div className='flex gap-2'>
            <Button variant='destructive'>Delete</Button>
            <Button variant='secondary'>Archive</Button>
          </div>
          <div className='text-center'>
            <Button size='fitted' variant='link'>
              Learn More →
            </Button>
          </div>
        </div>
      </ExampleSection>
      </section>
    </ComponentPage>
  );
}
