import { Select } from '@moondreamsdev/dreamer-ui/components';
import { ComponentPage } from '../../components/layout/ComponentPage';
import { useState } from 'react';

const tableOfContents = [
  { id: 'import', title: 'Import', level: 1 },
  { id: 'examples', title: 'Examples', level: 1 },
  { id: 'basic-usage', title: 'Basic Usage', level: 2 },
  { id: 'with-search', title: 'With Search', level: 2 },
  { id: 'disabled-state', title: 'Disabled State', level: 2 },
  { id: 'clearable', title: 'Clearable', level: 2 },
  { id: 'props', title: 'Props', level: 1 },
];

const selectExamples = [
  {
    id: 'basic-usage',
    title: 'Basic Usage',
    description: 'Simple select with options.',
    code: `function BasicSelect() {
  const [value, setValue] = useState('');
  
  return (
    <div className='max-w-xs'>
      <Select
        options={[
          { text: 'Apple', value: 'apple' },
          { text: 'Banana', value: 'banana' },
          { text: 'Orange', value: 'orange' },
          { text: 'Grape', value: 'grape' }
        ]}
        value={value}
        onChange={setValue}
        placeholder="Choose a fruit..."
      />
    </div>
  );
}`,
    children: (
      <BasicSelect />
    ),
  },
  {
    id: 'with-search',
    title: 'With Search',
    description: 'Searchable select with descriptions.',
    code: `function SearchableSelect() {
  const [value, setValue] = useState('');
  
  return (
    <div className='max-w-xs'>
      <Select
        searchable
        options={[
          { text: 'JavaScript', value: 'js', description: 'Dynamic programming language' },
          { text: 'TypeScript', value: 'ts', description: 'Typed superset of JavaScript' },
          { text: 'Python', value: 'py', description: 'High-level programming language' },
          { text: 'Java', value: 'java', description: 'Object-oriented programming language' },
          { text: 'Rust', value: 'rust', description: 'Memory-safe systems language' }
        ]}
        value={value}
        onChange={setValue}
        placeholder="Search programming languages..."
        searchPlaceholder="Type to search..."
      />
    </div>
  );
}`,
    children: (
      <SearchableSelect />
    ),
  },
  {
    id: 'disabled-state',
    title: 'Disabled State',
    description: 'Select with disabled options and disabled state.',
    code: `function DisabledSelect() {
  const [value, setValue] = useState('');
  
  return (
    <div className='space-y-4 max-w-xs'>
      <Select
        options={[
          { text: 'Available Option', value: 'available' },
          { text: 'Disabled Option', value: 'disabled', disabled: true },
          { text: 'Another Available', value: 'available2' }
        ]}
        value={value}
        onChange={setValue}
        placeholder="Some options disabled..."
      />
      
      <Select
        disabled
        options={[
          { text: 'Option 1', value: 'option1' },
          { text: 'Option 2', value: 'option2' }
        ]}
        placeholder="Entire select disabled"
      />
    </div>
  );
}`,
    children: (
      <DisabledSelect />
    ),
  },
  {
    id: 'clearable',
    title: 'Clearable',
    description: 'Select with clear button to reset selection.',
    code: `function ClearableSelect() {
  const [value, setValue] = useState('apple');
  
  return (
    <div className='max-w-xs'>
      <Select
        clearable
        options={[
          { text: 'Apple', value: 'apple' },
          { text: 'Banana', value: 'banana' },
          { text: 'Cherry', value: 'cherry' },
          { text: 'Date', value: 'date' }
        ]}
        value={value}
        onChange={setValue}
        placeholder="Select a fruit (clearable)..."
      />
      <div className='text-sm text-gray-500 mt-2'>
        Selected: {value || 'None'}
      </div>
    </div>
  );
}`,
    children: (
      <ClearableSelect />
    ),
  },
];

// Example components
function BasicSelect() {
  const [value, setValue] = useState('');
  
  return (
    <div className='max-w-xs'>
      <Select
        options={[
          { text: 'Apple', value: 'apple' },
          { text: 'Banana', value: 'banana' },
          { text: 'Orange', value: 'orange' },
          { text: 'Grape', value: 'grape' }
        ]}
        value={value}
        onChange={setValue}
        placeholder="Choose a fruit..."
      />
    </div>
  );
}

function SearchableSelect() {
  const [value, setValue] = useState('');
  
  return (
    <div className='max-w-xs'>
      <Select
        searchable
        options={[
          { text: 'JavaScript', value: 'js', description: 'Dynamic programming language' },
          { text: 'TypeScript', value: 'ts', description: 'Typed superset of JavaScript' },
          { text: 'Python', value: 'py', description: 'High-level programming language' },
          { text: 'Java', value: 'java', description: 'Object-oriented programming language' },
          { text: 'Rust', value: 'rust', description: 'Memory-safe systems language' }
        ]}
        value={value}
        onChange={setValue}
        placeholder="Search programming languages..."
        searchPlaceholder="Type to search..."
      />
    </div>
  );
}

function DisabledSelect() {
  const [value, setValue] = useState('');
  
  return (
    <div className='space-y-4 max-w-xs'>
      <Select
        options={[
          { text: 'Available Option', value: 'available' },
          { text: 'Disabled Option', value: 'disabled', disabled: true },
          { text: 'Another Available', value: 'available2' }
        ]}
        value={value}
        onChange={setValue}
        placeholder="Some options disabled..."
      />
      
      <Select
        disabled
        options={[
          { text: 'Option 1', value: 'option1' },
          { text: 'Option 2', value: 'option2' }
        ]}
        placeholder="Entire select disabled"
      />
    </div>
  );
}

function ClearableSelect() {
  const [value, setValue] = useState('apple');
  
  return (
    <div className='max-w-xs'>
      <Select
        clearable
        options={[
          { text: 'Apple', value: 'apple' },
          { text: 'Banana', value: 'banana' },
          { text: 'Cherry', value: 'cherry' },
          { text: 'Date', value: 'date' }
        ]}
        value={value}
        onChange={setValue}
        placeholder="Select a fruit (clearable)..."
      />
      <div className='text-sm text-gray-500 mt-2'>
        Selected: {value || 'None'}
      </div>
    </div>
  );
}

const selectProps = [
  {
    name: 'options',
    type: 'SelectOption[]',
    description: 'Array of option objects. SelectOption: { text: string, value: string, disabled?: boolean, description?: string }',
    required: true,
  },
  {
    name: 'value',
    type: 'string',
    description: 'The current value of the select (controlled).',
  },
  {
    name: 'placeholder',
    type: 'string',
    default: '"Select an option..."',
    description: 'Placeholder text to show when no option is selected.',
  },
  {
    name: 'searchable',
    type: 'boolean',
    default: 'false',
    description: 'Whether the select is searchable (combobox mode).',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Whether the entire select is disabled.',
  },
  {
    name: 'clearable',
    type: 'boolean',
    default: 'false',
    description: 'Whether to show a clear button to reset selection.',
  },
  {
    name: 'size',
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: 'The size variant of the select.',
  },
  {
    name: 'onChange',
    type: '(value: string) => void',
    description: 'Callback fired when the selection changes.',
  },
  {
    name: 'onSearch',
    type: '(searchTerm: string) => void',
    description: 'Callback fired when search input changes (searchable mode).',
  },
  {
    name: 'searchPlaceholder',
    type: 'string',
    default: '"Search options..."',
    description: 'Placeholder text for the search input.',
  },
  {
    name: 'className',
    type: 'string',
    description: 'Additional CSS classes to apply to the select container.',
  },
  {
    name: 'triggerClassName',
    type: 'string',
    description: 'Additional CSS classes to apply to the trigger button.',
  },
  {
    name: 'dropdownClassName',
    type: 'string',
    description: 'Additional CSS classes to apply to the dropdown content.',
  },
];

export function SelectPage() {
  return (
    <ComponentPage
      title='Select'
      description='Dropdown selection component with search and keyboard navigation.'
      tableOfContents={tableOfContents}
      usageInstructions='The Select component provides a dropdown interface for selecting a single option from a list. It supports keyboard navigation, search functionality, and various customization options. Use the options prop to define selectable items with text, value, and optional descriptions.'
      importStatement="import { Select } from '@moondreamsdev/dreamer-ui/components';"
      componentProps={selectProps}
      examples={selectExamples}
    />
  );
}