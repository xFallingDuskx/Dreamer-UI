import { Select } from '@moondreamsdev/dreamer-ui/components';
import { ComponentPage } from '../../components/layout/ComponentPage';

const tableOfContents = [
  { id: 'import', title: 'Import', level: 1 },
  { id: 'examples', title: 'Examples', level: 1 },
  { id: 'basic-usage', title: 'Basic Usage', level: 2 },
  { id: 'with-placeholder', title: 'With Placeholder', level: 2 },
  { id: 'disabled', title: 'Disabled State', level: 2 },
  { id: 'props', title: 'Props', level: 1 },
];

const selectExamples = [
  {
    id: 'basic-usage',
    title: 'Basic Usage',
    description: 'Simple select with options.',
    code: `<div className='max-w-xs'>
  <Select>
    <option value='apple'>Apple</option>
    <option value='banana'>Banana</option>
    <option value='orange'>Orange</option>
    <option value='grape'>Grape</option>
  </Select>
</div>`,
    children: (
      <div className='max-w-xs'>
        <Select>
          <option value='apple'>Apple</option>
          <option value='banana'>Banana</option>
          <option value='orange'>Orange</option>
          <option value='grape'>Grape</option>
        </Select>
      </div>
    ),
  },
  {
    id: 'with-placeholder',
    title: 'With Placeholder',
    description: 'Select with placeholder text.',
    code: `<div className='max-w-xs'>
  <Select placeholder='Choose a country'>
    <option value='us'>United States</option>
    <option value='ca'>Canada</option>
    <option value='uk'>United Kingdom</option>
    <option value='de'>Germany</option>
    <option value='fr'>France</option>
  </Select>
</div>`,
    children: (
      <div className='max-w-xs'>
        <Select placeholder='Choose a country'>
          <option value='us'>United States</option>
          <option value='ca'>Canada</option>
          <option value='uk'>United Kingdom</option>
          <option value='de'>Germany</option>
          <option value='fr'>France</option>
        </Select>
      </div>
    ),
  },
  {
    id: 'disabled',
    title: 'Disabled State',
    description: 'Disabled select components.',
    code: `<div className='space-y-4 max-w-xs'>
  <Select disabled>
    <option value='option1'>Option 1</option>
    <option value='option2'>Option 2</option>
  </Select>
  <Select disabled placeholder='Disabled with placeholder'>
    <option value='option1'>Option 1</option>
    <option value='option2'>Option 2</option>
  </Select>
</div>`,
    children: (
      <div className='space-y-4 max-w-xs'>
        <Select disabled>
          <option value='option1'>Option 1</option>
          <option value='option2'>Option 2</option>
        </Select>
        <Select disabled placeholder='Disabled with placeholder'>
          <option value='option1'>Option 1</option>
          <option value='option2'>Option 2</option>
        </Select>
      </div>
    ),
  },
];

const selectProps = [
  {
    name: 'placeholder',
    type: 'string',
    description: 'Placeholder text to show when no option is selected.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Whether the select is disabled.',
  },
  {
    name: 'value',
    type: 'string',
    description: 'The current value of the select (controlled).',
  },
  {
    name: 'defaultValue',
    type: 'string',
    description: 'The initial value of the select (uncontrolled).',
  },
  {
    name: 'onChange',
    type: '(value: string) => void',
    description: 'Callback fired when the selection changes.',
  },
  {
    name: 'className',
    type: 'string',
    description: 'Additional CSS classes to apply to the select.',
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'The option elements to display in the select.',
    required: true,
  },
];

export function SelectPage() {
  return (
    <ComponentPage
      title='Select'
      description='Dropdown selection component with search and keyboard navigation.'
      tableOfContents={tableOfContents}
      usageInstructions='The Select component provides a dropdown interface for selecting a single option from a list. It supports keyboard navigation, placeholders, and disabled states. Always provide meaningful option values and text.'
      importStatement="import { Select } from '@moondreamsdev/dreamer-ui/components';"
      componentProps={selectProps}
      examples={selectExamples}
    />
  );
}