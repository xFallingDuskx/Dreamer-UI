import { CopyButton } from '@moondreamsdev/dreamer-ui/components';
import { ComponentPage } from '../../components/layout/ComponentPage';

const tableOfContents = [
  { id: 'import', title: 'Import', level: 1 },
  { id: 'examples', title: 'Examples', level: 1 },
  { id: 'basic-usage', title: 'Basic Usage', level: 2 },
  { id: 'variants', title: 'Variants', level: 2 },
  { id: 'sizes', title: 'Sizes', level: 2 },
  { id: 'icon-only', title: 'Icon Only', level: 2 },
  { id: 'custom-delay', title: 'Custom Delay', level: 2 },
  { id: 'usage-examples', title: 'Usage Examples', level: 2 },
  { id: 'props', title: 'Props', level: 1 },
  { id: 'keyboard-shortcuts', title: 'Keyboard Shortcuts', level: 1 },
];

const copyButtonExamples = [
  {
    id: 'basic-usage',
    title: 'Basic Usage',
    description: 'Simple copy buttons with default text and custom content.',
    code: `<div className='flex flex-wrap gap-4'>
  <CopyButton textToCopy="Hello, World!" showCopyText={true} />
  <CopyButton textToCopy="npm install @moondreamsdev/dreamer-ui">
    Copy Install Command
  </CopyButton>
</div>`,
    children: (
      <div className='flex flex-wrap gap-4'>
        <CopyButton textToCopy="Hello, World!" showCopyText={true} />
        <CopyButton textToCopy="npm install @moondreamsdev/dreamer-ui">
          Copy Install Command
        </CopyButton>
      </div>
    ),
  },
  {
    id: 'variants',
    title: 'Variants',
    description: 'Different button style variants to match your design system.',
    code: `<div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
  <CopyButton textToCopy="Primary variant" variant="primary">
    Primary
  </CopyButton>
  <CopyButton textToCopy="Secondary variant" variant="secondary">
    Secondary
  </CopyButton>
  <CopyButton textToCopy="Tertiary variant" variant="tertiary">
    Tertiary
  </CopyButton>
  <CopyButton textToCopy="Destructive variant" variant="destructive">
    Destructive
  </CopyButton>
  <CopyButton textToCopy="Outline variant" variant="outline">
    Outline
  </CopyButton>
  <CopyButton textToCopy="Base variant" variant="base">
    Base
  </CopyButton>
</div>`,
    children: (
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
        <CopyButton textToCopy="Primary variant" variant="primary">
          Primary
        </CopyButton>
        <CopyButton textToCopy="Secondary variant" variant="secondary">
          Secondary
        </CopyButton>
        <CopyButton textToCopy="Tertiary variant" variant="tertiary">
          Tertiary
        </CopyButton>
        <CopyButton textToCopy="Destructive variant" variant="destructive">
          Destructive
        </CopyButton>
        <CopyButton textToCopy="Outline variant" variant="outline">
          Outline
        </CopyButton>
        <CopyButton textToCopy="Base variant" variant="base">
          Base
        </CopyButton>
      </div>
    ),
  },
  {
    id: 'sizes',
    title: 'Sizes',
    description: 'Different button sizes for various use cases.',
    code: `<div className='flex flex-wrap gap-4 items-center'>
  <CopyButton textToCopy="Small size" size="sm">
    Small
  </CopyButton>
  <CopyButton textToCopy="Medium size" size="md">
    Medium
  </CopyButton>
  <CopyButton textToCopy="Large size" size="lg">
    Large
  </CopyButton>
</div>`,
    children: (
      <div className='flex flex-wrap gap-4 items-center'>
        <CopyButton textToCopy="Small size" size="sm">
          Small
        </CopyButton>
        <CopyButton textToCopy="Medium size" size="md">
          Medium
        </CopyButton>
        <CopyButton textToCopy="Large size" size="lg">
          Large
        </CopyButton>
      </div>
    ),
  },
  {
    id: 'icon-only',
    title: 'Icon Only',
    description: 'Copy buttons that show only icons without any text (this is the default behavior).',
    code: `<div className='flex flex-wrap gap-4 items-center'>
  <CopyButton textToCopy="Icon only button" />
  <CopyButton 
    textToCopy="Icon only secondary" 
    variant="secondary" 
  />
  <CopyButton 
    textToCopy="Icon only outline" 
    variant="outline" 
  />
  <CopyButton 
    textToCopy="Icon only large" 
    size="lg" 
  />
</div>`,
    children: (
      <div className='flex flex-wrap gap-4 items-center'>
        <CopyButton textToCopy="Icon only button" />
        <CopyButton 
          textToCopy="Icon only secondary" 
          variant="secondary" 
        />
        <CopyButton 
          textToCopy="Icon only outline" 
          variant="outline" 
        />
        <CopyButton 
          textToCopy="Icon only large" 
          size="lg" 
        />
      </div>
    ),
  },
  {
    id: 'custom-delay',
    title: 'Custom Delay',
    description: 'Control how long the copied state is shown before reverting to the copy icon.',
    code: `<div className='flex flex-wrap gap-4'>
  <CopyButton textToCopy="Default delay (2 seconds)">
    Default Delay
  </CopyButton>
  <CopyButton textToCopy="Short delay (1 second)" delay={1000}>
    Short Delay (1s)
  </CopyButton>
  <CopyButton textToCopy="Long delay (5 seconds)" delay={5000}>
    Long Delay (5s)
  </CopyButton>
</div>`,
    children: (
      <div className='flex flex-wrap gap-4'>
        <CopyButton textToCopy="Default delay (2 seconds)">
          Default Delay
        </CopyButton>
        <CopyButton textToCopy="Short delay (1 second)" delay={1000}>
          Short Delay (1s)
        </CopyButton>
        <CopyButton textToCopy="Long delay (5 seconds)" delay={5000}>
          Long Delay (5s)
        </CopyButton>
      </div>
    ),
  },
  {
    id: 'usage-examples',
    title: 'Usage Examples',
    description: 'Common usage patterns for the CopyButton component.',
    code: `<div className='space-y-4'>
  {/* Code snippet copy */}
  <div className='bg-gray-800 p-4 rounded-lg'>
    <div className='flex justify-between items-center mb-2'>
      <span className='text-sm text-gray-400'>Installation</span>
      <CopyButton 
        textToCopy="npm install @moondreamsdev/dreamer-ui" 
        variant="secondary"
        size="sm"
      >
        Copy
      </CopyButton>
    </div>
    <code className='text-green-400'>npm install @moondreamsdev/dreamer-ui</code>
  </div>

  {/* API key copy */}
  <div className='bg-gray-800 p-4 rounded-lg'>
    <div className='flex justify-between items-center'>
      <div>
        <p className='text-sm text-gray-400 mb-1'>API Key</p>
        <code className='text-sm text-white'>sk_live_4eC39HqLyjWDarjtT1zdp7dc</code>
      </div>
      <CopyButton 
        textToCopy="sk_live_4eC39HqLyjWDarjtT1zdp7dc"
        size="sm"
      />
    </div>
  </div>

  {/* URL copy */}
  <div className='bg-gray-800 p-4 rounded-lg'>
    <div className='flex justify-between items-center'>
      <div className='flex-1 mr-4'>
        <p className='text-sm text-gray-400 mb-1'>Share Link</p>
        <p className='text-sm text-white truncate'>https://example.com/share/abc123</p>
      </div>
      <CopyButton 
        textToCopy="https://example.com/share/abc123"
        variant="outline"
        size="sm"
      >
        Share
      </CopyButton>
    </div>
  </div>
</div>`,
    children: (
      <div className='space-y-4'>
        {/* Code snippet copy */}
        <div className='bg-gray-800 p-4 rounded-lg'>
          <div className='flex justify-between items-center mb-2'>
            <span className='text-sm text-gray-400'>Installation</span>
            <CopyButton 
              textToCopy="npm install @moondreamsdev/dreamer-ui" 
              variant="secondary"
              size="sm"
            >
              Copy
            </CopyButton>
          </div>
          <code className='text-green-400'>npm install @moondreamsdev/dreamer-ui</code>
        </div>

        {/* API key copy */}
        <div className='bg-gray-800 p-4 rounded-lg'>
          <div className='flex justify-between items-center'>
            <div>
              <p className='text-sm text-gray-400 mb-1'>API Key</p>
              <code className='text-sm text-white'>sk_live_4eC39HqLyjWDarjtT1zdp7dc</code>
            </div>
            <CopyButton 
              textToCopy="sk_live_4eC39HqLyjWDarjtT1zdp7dc"
              size="sm"
            />
          </div>
        </div>

        {/* URL copy */}
        <div className='bg-gray-800 p-4 rounded-lg'>
          <div className='flex justify-between items-center'>
            <div className='flex-1 mr-4'>
              <p className='text-sm text-gray-400 mb-1'>Share Link</p>
              <p className='text-sm text-white truncate'>https://example.com/share/abc123</p>
            </div>
            <CopyButton 
              textToCopy="https://example.com/share/abc123"
              variant="outline"
              size="sm"
            >
              Share
            </CopyButton>
          </div>
        </div>
      </div>
    ),
  },
];

const copyButtonProps = [
  {
    name: 'textToCopy',
    type: 'string',
    required: true,
    description: 'The text content to copy to the clipboard.'
  },
  {
    name: 'delay',
    type: 'number',
    default: '2000',
    required: false,
    description: 'Time in milliseconds to show the "copied" state before reverting to the copy icon (default: 2000ms).'
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    required: false,
    description: 'Optional text to display on the button when not copied.'
  },
  {
    name: 'icon',
    type: 'React.ReactNode',
    required: false,
    description: 'Custom icon to display instead of the default Copy icon.'
  },
  {
    name: 'copiedIcon',
    type: 'React.ReactNode',
    required: false,
    description: 'Custom icon to display instead of the default Check icon when copied.'
  },
  {
    name: 'showCopyText',
    type: 'boolean',
    default: 'false',
    required: false,
    description: 'Whether to show "Copy" and "Copied!" text (default: false).'
  },
  {
    name: 'variant',
    type: "'primary' | 'secondary' | 'tertiary' | 'destructive' | 'outline' | 'link' | 'base'",
    default: "'primary'",
    required: false,
    description: 'Button variant style.'
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg' | 'fitted' | 'icon' | 'stripped' | 'full'",
    default: "'md'",
    required: false,
    description: 'Button size.'
  },
  {
    name: 'rounded',
    type: "'sm' | 'md' | 'lg' | 'full' | 'none'",
    required: false,
    description: 'Button rounded corners style.'
  },
  {
    name: 'className',
    type: 'string',
    required: false,
    description: 'Additional CSS class name.'
  },
  {
    name: 'id',
    type: 'string',
    required: false,
    description: 'Unique identifier for the button element.'
  },
  {
    name: 'disabled',
    type: 'boolean',
    required: false,
    description: 'Whether the button is disabled.'
  },
  {
    name: 'onClick',
    type: '(e: React.MouseEvent<HTMLButtonElement>) => void',
    required: false,
    description: 'Additional onClick handler to be called after copying.'
  },
  {
    name: 'ref',
    type: 'React.Ref<HTMLButtonElement>',
    required: false,
    description: 'Reference to the button element.'
  }
];

const keyboardShortcuts = [
  {
    keys: 'Space',
    description: 'Activate the copy button and copy text to clipboard'
  },
  {
    keys: 'Enter',
    description: 'Activate the copy button and copy text to clipboard'
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

export function CopyButtonPage() {
  return (
    <ComponentPage
      title='Copy Button'
      description='A button component that copies text to the clipboard and shows visual feedback. Built on top of the Button component with integrated copy functionality using the Copy and Check symbols.'
      tableOfContents={tableOfContents}
      usageInstructions='The CopyButton component provides an easy way to copy text to the clipboard with visual feedback. It automatically shows a check icon and "Copied!" text after successfully copying, then reverts back to the copy icon after a configurable delay. Perfect for copying code snippets, API keys, URLs, and other text content.'
      importStatement="import { CopyButton } from '@moondreamsdev/dreamer-ui/components';"
      componentProps={copyButtonProps}
      keyboardShortcuts={keyboardShortcuts}
      examples={copyButtonExamples}
    />
  );
}
