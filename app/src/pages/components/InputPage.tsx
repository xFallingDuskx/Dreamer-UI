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
  <Input placeholder="Default variant" />
  <Input variant="outline" placeholder="Outline variant" />
  <Input variant="underline" placeholder="Underline variant" />
  <Input variant="solid" placeholder="Solid variant" />
  <Input variant="base" placeholder="Base variant" />
</div>`,
    children: (
      <div className='space-y-4'>
        <Input placeholder="Default variant" />
        <Input variant="outline" placeholder="Outline variant" />
        <Input variant="underline" placeholder="Underline variant" />
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
    title: 'Advanced Usage',
    description: 'Advanced input configurations including file inputs and custom styling.',
    code: `<div className='space-y-4'>
  <Input type="file" />
  <Input type="password" placeholder="Password with toggle visibility" />
  <div className="flex gap-4">
    <Input type="number" placeholder="Width constrained" className="max-w-[100px]" />
    <Input placeholder="Flexible width input" />
  </div>
</div>`,
    children: (
      <div className='space-y-4'>
        <Input type="file" />
        <Input type="password" placeholder="Password with toggle visibility" />
        <div className="flex gap-4">
          <Input type="number" placeholder="Width constrained" className="max-w-[100px]" />
          <Input placeholder="Flexible width input" />
        </div>
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
    type: '"base" | "default" | "underline" | "outline" | "solid"',
    default: '"default"',
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
    description: 'Additional CSS classes to apply to the input.',
  },
];

export function InputPage() {
  return (
    <ComponentPage
      title='Input'
      description='Flexible input component with validation states and different types for collecting user data.'
      tableOfContents={tableOfContents}
      usageInstructions='The Input component provides a flexible way to collect user input with various types, validation states, and styling options. Use it for forms, search fields, and any text-based data entry.'
      importStatement="import { Input } from '@moondreamsdev/dreamer-ui/components';"
      componentProps={inputProps}
      examples={inputExamples}
    />
  );
}
