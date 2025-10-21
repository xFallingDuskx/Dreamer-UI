import { useState } from 'react';
import { Textarea, Label } from '@moondreamsdev/dreamer-ui/components';
import { ComponentPage } from '../../components/layout/ComponentPage';

const tableOfContents = [
  { id: 'import', title: 'Import', level: 1 },
  { id: 'examples', title: 'Examples', level: 1 },
  { id: 'basic-usage', title: 'Basic Usage', level: 2 },
  { id: 'variants', title: 'Variants', level: 2 },
  { id: 'layout-usage', title: 'Layout & Container Usage', level: 2 },
  { id: 'auto-expand', title: 'Auto Expand', level: 2 },
  { id: 'character-limit', title: 'Character Limit', level: 2 },
  { id: 'validation-states', title: 'Validation States', level: 2 },
  { id: 'display-mode', title: 'Display Only Mode', level: 2 },
  { id: 'controlled-textarea', title: 'Controlled Textarea', level: 2 },
  { id: 'props', title: 'Props', level: 1 },
];

// Example components
function BasicTextarea() {
  return (
    <div className='space-y-4 max-w-md'>
      <div>
        <Label htmlFor='basic'>Basic Textarea</Label>
        <Textarea 
          id='basic'
          placeholder='Enter your message here...' 
          rows={4}
        />
      </div>
    </div>
  );
}

function VariantTextareas() {
  return (
    <div className='space-y-6 max-w-md'>
      <div>
        <Label htmlFor='outline'>Outline (default)</Label>
        <Textarea 
          id='outline'
          variant='outline' 
          placeholder='Outline variant...' 
          rows={3}
        />
      </div>
      <div>
        <Label htmlFor='leftline'>Left Line</Label>
        <Textarea 
          id='leftline'
          variant='left-line' 
          placeholder='Left line variant...' 
          rows={3}
        />
      </div>
      <div>
        <Label htmlFor='solid'>Solid</Label>
        <Textarea 
          id='solid'
          variant='solid' 
          placeholder='Solid variant...' 
          rows={3}
        />
      </div>
      <div>
        <Label htmlFor='base'>Base</Label>
        <Textarea 
          id='base'
          variant='base' 
          placeholder='Base variant (no border)...' 
          rows={3}
        />
      </div>
    </div>
  );
}

function AutoExpandTextarea() {
  return (
    <div className='space-y-4 max-w-md'>
      <div>
        <Label htmlFor='autoexpand'>Auto Expand Textarea</Label>
        <Textarea 
          id='autoexpand'
          autoExpand 
          placeholder='This textarea will automatically grow as you type more content. Try typing multiple lines to see the expansion in action.' 
          rows={2}
        />
        <p className='text-sm text-muted-foreground mt-1'>
          The textarea will expand automatically based on content
        </p>
      </div>
    </div>
  );
}

function CharacterLimitTextarea() {
  return (
    <div className='space-y-4 max-w-md'>
      <div>
        <Label htmlFor='charlimit'>Character Limit (150 chars)</Label>
        <Textarea 
          id='charlimit'
          placeholder='Type your message...' 
          characterLimit={150}
          rows={4}
        />
      </div>
    </div>
  );
}

function ValidationStatesTextarea() {
  return (
    <div className='space-y-6 max-w-md'>
      <div>
        <Label htmlFor='error'>Error State</Label>
        <Textarea 
          id='error'
          placeholder='Enter your message...' 
          errorMessage='This field is required'
          rows={3}
        />
      </div>
      <div>
        <Label htmlFor='success'>Success State</Label>
        <Textarea 
          id='success'
          placeholder='Enter your message...' 
          successMessage='Looks good!'
          defaultValue='This is a valid message'
          rows={3}
        />
      </div>
      <div>
        <Label htmlFor='disabled'>Disabled State</Label>
        <Textarea 
          id='disabled'
          placeholder='Cannot enter text...' 
          disabled
          rows={3}
        />
      </div>
    </div>
  );
}

function DisplayModeTextarea() {
  return (
    <div className='space-y-4 max-w-md'>
      <div>
        <Label htmlFor='display'>Display Only Mode</Label>
        <Textarea 
          id='display'
          displayOnlyMode 
          defaultValue='This is read-only text that cannot be edited. It automatically expands to fit the content and removes interaction styling.'
          rows={4}
        />
        <p className='text-sm text-muted-foreground mt-1'>
          Perfect for displaying formatted text content
        </p>
      </div>
    </div>
  );
}

function LayoutUsageTextarea() {
  return (
    <div className='space-y-6'>
      {/* Full width (default) */}
      <div>
        <Label htmlFor='full-width'>Full Width (default)</Label>
        <Textarea 
          id='full-width'
          placeholder='This textarea uses full available width by default'
          rows={3}
        />
      </div>
      
      {/* Width constrained with container */}
      <div>
        <Label htmlFor='constrained'>Width Constrained with Container</Label>
        <div className="max-w-md">
          <Textarea 
            id='constrained'
            placeholder='This textarea is constrained by its container'
            rows={3}
          />
        </div>
      </div>
      
      {/* Flex layout */}
      <div>
        <Label>Flex Layout with Containers</Label>
        <div className="flex gap-4">
          <div className="flex-1">
            <Textarea 
              placeholder='Flexible width textarea'
              rows={3}
            />
          </div>
          <div className="w-64">
            <Textarea 
              placeholder='Fixed width textarea'
              rows={3}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ControlledTextarea() {
  const [value, setValue] = useState('This is controlled text content.');
  
  return (
    <div className='space-y-4 max-w-md'>
      <div>
        <Label htmlFor='controlled'>Controlled Textarea</Label>
        <Textarea 
          id='controlled'
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder='Type your message...'
          rows={4}
        />
      </div>
      <div className='flex gap-2'>
        <button
          onClick={() => setValue('Sample text content')}
          className='px-3 py-1 text-sm bg-primary text-primary-foreground rounded hover:bg-primary/90'
        >
          Set Sample Text
        </button>
        <button
          onClick={() => setValue('')}
          className='px-3 py-1 text-sm bg-secondary text-secondary-foreground rounded hover:bg-secondary/80'
        >
          Clear
        </button>
      </div>
      <div className='text-sm text-muted-foreground'>
        Characters: {value.length}
      </div>
    </div>
  );
}

const textareaExamples = [
  {
    id: 'basic-usage',
    title: 'Basic Usage',
    description: 'Simple textarea with default styling and placeholder text.',
    code: `<div>
  <Label htmlFor='basic'>Basic Textarea</Label>
  <Textarea 
    id='basic'
    placeholder='Enter your message here...' 
    rows={4}
  />
</div>`,
    children: (
      <BasicTextarea />
    ),
  },
  {
    id: 'variants',
    title: 'Variants',
    description: 'Different visual styles: outline (default), left-line, solid, and base.',
    code: `// Outline variant (default)
<Textarea 
  variant='outline' 
  placeholder='Outline variant...' 
  rows={3}
/>

// Left line variant
<Textarea 
  variant='left-line' 
  placeholder='Left line variant...' 
  rows={3}
/>

// Solid variant
<Textarea 
  variant='solid' 
  placeholder='Solid variant...' 
  rows={3}
/>

// Base variant (no border)
<Textarea 
  variant='base' 
  placeholder='Base variant...' 
  rows={3}
/>`,
    children: (
      <VariantTextareas />
    ),
  },
  {
    id: 'layout-usage',
    title: 'Layout & Container Usage',
    description: 'Textarea components always use full width. Use containers for width constraints and layout control.',
    code: `// Full width (default)
<Textarea 
  placeholder='This textarea uses full available width by default'
  rows={3}
/>

// Width constrained with container
<div className="max-w-md">
  <Textarea 
    placeholder='This textarea is constrained by its container'
    rows={3}
  />
</div>

// Flex layout with containers
<div className="flex gap-4">
  <div className="flex-1">
    <Textarea placeholder='Flexible width' rows={3} />
  </div>
  <div className="w-64">
    <Textarea placeholder='Fixed width' rows={3} />
  </div>
</div>`,
    children: (
      <LayoutUsageTextarea />
    ),
  },
  {
    id: 'auto-expand',
    title: 'Auto Expand',
    description: 'Textarea that automatically grows with content.',
    code: `<Textarea 
  autoExpand 
  placeholder='This textarea will automatically grow as you type...' 
  rows={2}
/>`,
    children: (
      <AutoExpandTextarea />
    ),
  },
  {
    id: 'character-limit',
    title: 'Character Limit',
    description: 'Textarea with character counting and limit validation.',
    code: `<Textarea 
  placeholder='Type your message...' 
  characterLimit={150}
  rows={4}
/>`,
    children: (
      <CharacterLimitTextarea />
    ),
  },
  {
    id: 'validation-states',
    title: 'Validation States',
    description: 'Error, success, and disabled states with appropriate messages.',
    code: `// Error state
<Textarea 
  placeholder='Enter your message...' 
  errorMessage='This field is required'
  rows={3}
/>

// Success state
<Textarea 
  placeholder='Enter your message...' 
  successMessage='Looks good!'
  defaultValue='This is a valid message'
  rows={3}
/>

// Disabled state
<Textarea 
  placeholder='Cannot enter text...' 
  disabled
  rows={3}
/>`,
    children: (
      <ValidationStatesTextarea />
    ),
  },
  {
    id: 'display-mode',
    title: 'Display Only Mode',
    description: 'Read-only mode for displaying formatted text content.',
    code: `<Textarea 
  displayOnlyMode 
  defaultValue='This is read-only text that cannot be edited. It automatically expands to fit the content.'
  rows={4}
/>`,
    children: (
      <DisplayModeTextarea />
    ),
  },
  {
    id: 'controlled-textarea',
    title: 'Controlled Textarea',
    description: 'Controlled textarea with external state management.',
    code: `function ControlledTextarea() {
  const [value, setValue] = useState('This is controlled text content.');
  
  return (
    <div className='space-y-4'>
      <Textarea 
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder='Type your message...'
        rows={4}
      />
      <div className='flex gap-2'>
        <button onClick={() => setValue('Sample text')}>
          Set Sample Text
        </button>
        <button onClick={() => setValue('')}>
          Clear
        </button>
      </div>
    </div>
  );
}`,
    children: (
      <ControlledTextarea />
    ),
  },
];

const textareaProps = [
  {
    name: 'variant',
    type: '"base" | "left-line" | "outline" | "solid"',
    default: '"outline"',
    description: 'Visual style variant of the textarea.',
  },
  {
    name: 'rounded',
    type: '"none" | "sm" | "md" | "lg" | "full"',
    description: 'Border radius of the textarea. Defaults to "md" for outline variant.',
  },
  {
    name: 'displayOnlyMode',
    type: 'boolean',
    default: 'false',
    description: 'Read-only mode for displaying text content without interaction styling.',
  },
  {
    name: 'errorMessage',
    type: 'string',
    description: 'Error message to display below the textarea.',
  },
  {
    name: 'successMessage',
    type: 'string',
    description: 'Success message to display below the textarea.',
  },
  {
    name: 'showResizeHandle',
    type: 'boolean',
    default: 'false',
    description: 'Whether to show the resize handle (Webkit browsers only).',
  },
  {
    name: 'autoExpand',
    type: 'boolean',
    default: 'false',
    description: 'Whether the textarea should automatically expand based on content.',
  },
  {
    name: 'characterLimit',
    type: 'number',
    default: '0',
    description: 'Maximum number of characters allowed. Shows character count when > 0.',
  },
  {
    name: 'placeholder',
    type: 'string',
    description: 'Placeholder text to display when empty.',
  },
  {
    name: 'rows',
    type: 'number',
    description: 'Initial number of rows for the textarea.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Whether the textarea is disabled.',
  },
  {
    name: 'value',
    type: 'string',
    description: 'The current value of the textarea (controlled).',
  },
  {
    name: 'defaultValue',
    type: 'string',
    description: 'The initial value of the textarea (uncontrolled).',
  },
  {
    name: 'onChange',
    type: '(event: React.ChangeEvent<HTMLTextAreaElement>) => void',
    description: 'Callback fired when the textarea value changes.',
  },
  {
    name: 'className',
    type: 'string',
    description: 'Additional CSS classes to apply to the textarea. For width constraints, wrap the textarea in a container instead.',
  },
];

export function TextareaPage() {
  return (
    <ComponentPage
      title='Textarea'
      description='Multi-line text input component with auto-expand, character limits, and validation states. Always uses full available width.'
      tableOfContents={tableOfContents}
      usageInstructions='The Textarea component is perfect for collecting longer text input from users. It supports multiple variants, auto-expand functionality, character limits with counters, validation states, and display-only mode. The textarea always uses full available width by default. For width constraints or layout changes, wrap the component in a container element with the desired width or flex properties.'
      importStatement="import { Textarea } from '@moondreamsdev/dreamer-ui/components';"
      componentProps={textareaProps}
      examples={textareaExamples}
    />
  );
}