import { useState } from 'react';
import { Input } from '@moondreamsdev/dreamer-ui/components';
import { ComponentPage } from '../../components/layout/ComponentPage';

const tableOfContents = [
  { id: 'import', title: 'Import', level: 1 },
  { id: 'examples', title: 'Examples', level: 1 },
  { id: 'variants', title: 'Variants', level: 2 },
  { id: 'types', title: 'Input Types', level: 2 },
  { id: 'validation', title: 'Validation States', level: 2 },
  { id: 'props', title: 'Props', level: 1 },
];

const inputExamples = [
  {
    id: 'variants',
    title: 'Variants',
    description: 'Different input styles for various design contexts.',
    code: `<div className='space-y-4'>
  <Input placeholder="Default input" />
  <Input variant="outline" placeholder="Outline variant" />
  <Input variant="filled" placeholder="Filled variant" />
</div>`,
    children: (
      <div className='space-y-4'>
        <Input placeholder="Default input" />
        <Input variant="outline" placeholder="Outline variant" />
        <Input variant="filled" placeholder="Filled variant" />
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
</div>`,
    children: (
      <div className='space-y-4'>
        <Input type="text" placeholder="Text input" />
        <Input type="email" placeholder="Email input" />
        <Input type="password" placeholder="Password input" />
        <Input type="number" placeholder="Number input" />
      </div>
    ),
  },
  {
    id: 'validation',
    title: 'Validation States',
    description: 'Input validation states for form feedback.',
    code: `<div className='space-y-4'>
  <Input placeholder="Valid input" state="valid" />
  <Input placeholder="Invalid input" state="invalid" />
  <Input placeholder="Warning input" state="warning" />
</div>`,
    children: (
      <div className='space-y-4'>
        <Input placeholder="Valid input" state="valid" />
        <Input placeholder="Invalid input" state="invalid" />
        <Input placeholder="Warning input" state="warning" />
      </div>
    ),
  },
];

const inputProps = [
  {
    name: 'type',
    type: '"text" | "email" | "password" | "number" | "tel" | "url" | "search"',
    default: '"text"',
    description: 'The type of input field.',
  },
  {
    name: 'variant',
    type: '"default" | "outline" | "filled"',
    default: '"default"',
    description: 'The visual style variant of the input.',
  },
  {
    name: 'state',
    type: '"default" | "valid" | "invalid" | "warning"',
    default: '"default"',
    description: 'The validation state of the input.',
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
