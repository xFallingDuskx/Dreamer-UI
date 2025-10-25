import { Input } from '@moondreamsdev/dreamer-ui/components';
import { ComponentPage } from '../../components/layout/ComponentPage';

const tableOfContents = [
  { id: 'import', title: 'Import', level: 1 },
  { id: 'examples', title: 'Examples', level: 1 },
  { id: 'variants', title: 'Variants', level: 2 },
  { id: 'types', title: 'Input Types', level: 2 },
  { id: 'validation', title: 'Validation States', level: 2 },
  { id: 'states', title: 'States & Styling', level: 2 },
  { id: 'advanced-usage', title: 'Advanced Usage', level: 2 },
  { id: 'props', title: 'Props', level: 1 },
];

const inputExamples = [
  {
    id: 'variants',
    title: 'Variants',
    description: 'Different input styles for various design contexts.',
    code: `<div className='space-y-4'>
  <Input placeholder="Default (outline) variant" />
  <Input variant="transparent" placeholder="Transparent variant" />
  <Input variant="solid" placeholder="Solid variant" />
  <Input variant="base" placeholder="Base variant" />
</div>`,
    children: (
      <div className='space-y-4'>
        <Input placeholder="Default (outline) variant" />
        <Input variant="transparent" placeholder="Transparent variant" />
        <Input variant="solid" placeholder="Solid variant" />
        <Input variant="base" placeholder="Base variant" />
      </div>
    ),
  },
  {
    id: 'types',
    title: 'Input Types',
    description: 'Different input types for various data collection needs.',
    code: `<div className='space-y-4'>
  <Input type="text" placeholder="Text input" />
  <Input type="email" placeholder="Email input" />
  <Input type="password" placeholder="Password input" />
  <Input type="number" placeholder="Number input" />
  <Input type="tel" placeholder="Phone input" />
  <Input type="url" placeholder="URL input" />
</div>`,
    children: (
      <div className='space-y-4'>
        <Input type="text" placeholder="Text input" />
        <Input type="email" placeholder="Email input" />
        <Input type="password" placeholder="Password input" />
        <Input type="number" placeholder="Number input" />
        <Input type="tel" placeholder="Phone input" />
        <Input type="url" placeholder="URL input" />
      </div>
    ),
  },
  {
    id: 'validation',
    title: 'Validation States',
    description: 'Input validation feedback using error and success messages.',
    code: `<div className='space-y-4'>
  <Input placeholder="Valid input" successMessage="Input is valid" />
  <Input placeholder="Invalid input" errorMessage="There was an error" />
  <Input placeholder="Normal input (no validation)" />
</div>`,
    children: (
      <div className='space-y-4'>
        <Input placeholder="Valid input" successMessage="Input is valid" />
        <Input placeholder="Invalid input" errorMessage="There was an error" />
        <Input placeholder="Normal input (no validation)" />
      </div>
    ),
  },
  {
    id: 'states',
    title: 'States & Styling',
    description: 'Different input states including disabled, rounded corners, and display-only mode.',
    code: `<div className='space-y-4'>
  <Input placeholder="Enabled input" />
  <Input placeholder="Disabled input" disabled />
  <Input placeholder="Rounded input" variant="outline" rounded="lg" />
  <Input placeholder="Display only mode" displayOnlyMode value="Read-only value" />
</div>`,
    children: (
      <div className='space-y-4'>
        <Input placeholder="Enabled input" />
        <Input placeholder="Disabled input" disabled />
        <Input placeholder="Rounded input" variant="outline" rounded="lg" />
        <Input placeholder="Display only mode" displayOnlyMode value="Read-only value" />
      </div>
    ),
  },
  {
    id: 'advanced-usage',
    title: 'Layout & Container Usage',
    description: 'Input components always use full width. Use containers for width constraints and layout control. Note: Basic inputs render without wrapper divs for optimal DOM structure.',
    code: `<div className='space-y-4'>
  {/* Full width (default) */}
  <Input placeholder="Full width input" />
  
  {/* Width constrained with container */}
  <div className="max-w-xs">
    <Input placeholder="Constrained width" />
  </div>
  
  {/* Flex layout with containers */}
  <div className="flex gap-4">
    <div className="flex-1">
      <Input placeholder="Flexible width" />
    </div>
    <div className="w-32">
      <Input type="number" placeholder="Fixed" />
    </div>
  </div>
  
  {/* File input and password */}
  <Input type="file" />
  <Input type="password" placeholder="Password with toggle" />
</div>`,
    children: (
      <div className='space-y-4'>
        {/* Full width (default) */}
        <Input placeholder="Full width input" />
        
        {/* Width constrained with container */}
        <div className="max-w-xs">
          <Input placeholder="Constrained width" />
        </div>
        
        {/* Flex layout with containers */}
        <div className="flex gap-4">
          <div className="flex-1">
            <Input placeholder="Flexible width" />
          </div>
          <div className="w-32">
            <Input type="number" placeholder="Fixed" />
          </div>
        </div>
        
        {/* File input and password */}
        <Input type="file" />
        <Input type="password" placeholder="Password with toggle" />
      </div>
    ),
  },
];

const inputProps = [
  {
    name: 'type',
    type: '"text" | "email" | "password" | "number" | "tel" | "url" | "search" | "file"',
    default: '"text"',
    description: 'The type of input field.',
  },
  {
    name: 'variant',
    type: '"base" | "transparent" | "underline" | "outline" | "solid"',
    default: '"outline"',
    description: 'The visual style variant of the input.',
  },
  {
    name: 'rounded',
    type: '"none" | "sm" | "md" | "lg" | "full"',
    default: '"none" (or "md" for outline variant)',
    description: 'The border radius of the input.',
  },
  {
    name: 'placeholder',
    type: 'string',
    description: 'Placeholder text to display when the input is empty.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Whether the input is disabled.',
  },
  {
    name: 'required',
    type: 'boolean',
    default: 'false',
    description: 'Whether the input is required.',
  },
  {
    name: 'errorMessage',
    type: 'string',
    description: 'Error message to display below the input when invalid.',
  },
  {
    name: 'successMessage',
    type: 'string',
    description: 'Success message to display below the input when valid.',
  },
  {
    name: 'displayOnlyMode',
    type: 'boolean',
    default: 'false',
    description: 'Whether the input is in read-only display mode.',
  },
  {
    name: 'value',
    type: 'string',
    description: 'The current value of the input (controlled).',
  },
  {
    name: 'defaultValue',
    type: 'string',
    description: 'The initial value of the input (uncontrolled).',
  },
  {
    name: 'onChange',
    type: '(event: React.ChangeEvent<HTMLInputElement>) => void',
    description: 'Callback fired when the input value changes.',
  },
  {
    name: 'className',
    type: 'string',
    description: 'Additional CSS classes to apply to the input. For width constraints, wrap the input in a container instead.',
  },
];

export function InputPage() {
  return (
    <ComponentPage
      title='Input'
      description='Flexible input component with validation states and different types for collecting user data. Always uses full available width with optimized DOM structure.'
      tableOfContents={tableOfContents}
      usageInstructions='The Input component provides a flexible way to collect user input with various types, validation states, and styling options. The input always uses full available width by default. For width constraints or layout changes, wrap the component in a container element with the desired width or flex properties. Note: The component automatically optimizes its DOM structure - wrapper divs are only rendered when needed (for validation messages, password toggles, etc.), resulting in cleaner markup for basic inputs.'
      importStatement="import { Input } from '@moondreamsdev/dreamer-ui/components';"
      componentProps={inputProps}
      examples={inputExamples}
    />
  );
}
