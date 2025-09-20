import { Checkbox } from '@moondreamsdev/dreamer-ui/components';
import { ComponentPage } from '../../components/layout/ComponentPage';

const tableOfContents = [
  { id: 'import', title: 'Import', level: 1 },
  { id: 'examples', title: 'Examples', level: 1 },
  { id: 'sizes', title: 'Sizes', level: 2 },
  { id: 'states', title: 'States', level: 2 },
  { id: 'with-labels', title: 'With Labels', level: 2 },
  { id: 'props', title: 'Props', level: 1 },
];

const checkboxExamples = [
  {
    id: 'sizes',
    title: 'Sizes',
    description: 'Different checkbox sizes for various contexts.',
    code: `<div className='flex items-center gap-6'>
  <div className='flex items-center gap-2'>
    <Checkbox id='small' size='sm' />
    <label htmlFor='small'>Small</label>
  </div>
  <div className='flex items-center gap-2'>
    <Checkbox id='medium' size='md' />
    <label htmlFor='medium'>Medium</label>
  </div>
  <div className='flex items-center gap-2'>
    <Checkbox id='large' size='lg' />
    <label htmlFor='large'>Large</label>
  </div>
</div>`,
    children: (
      <div className='flex items-center gap-6'>
        <div className='flex items-center gap-2'>
          <Checkbox id='small' size='sm' />
          <label htmlFor='small'>Small</label>
        </div>
        <div className='flex items-center gap-2'>
          <Checkbox id='medium' size='md' />
          <label htmlFor='medium'>Medium</label>
        </div>
        <div className='flex items-center gap-2'>
          <Checkbox id='large' size='lg' />
          <label htmlFor='large'>Large</label>
        </div>
      </div>
    ),
  },
  {
    id: 'states',
    title: 'States',
    description: 'Different states and interaction patterns.',
    code: `<div className='space-y-4'>
  <div className='flex items-center gap-2'>
    <Checkbox id='unchecked' />
    <label htmlFor='unchecked'>Unchecked</label>
  </div>
  <div className='flex items-center gap-2'>
    <Checkbox id='checked' defaultChecked />
    <label htmlFor='checked'>Checked</label>
  </div>
  <div className='flex items-center gap-2'>
    <Checkbox id='disabled' disabled />
    <label htmlFor='disabled' className='text-gray-500'>Disabled</label>
  </div>
  <div className='flex items-center gap-2'>
    <Checkbox id='disabled-checked' disabled defaultChecked />
    <label htmlFor='disabled-checked' className='text-gray-500'>Disabled Checked</label>
  </div>
</div>`,
    children: (
      <div className='space-y-4'>
        <div className='flex items-center gap-2'>
          <Checkbox id='unchecked' />
          <label htmlFor='unchecked'>Unchecked</label>
        </div>
        <div className='flex items-center gap-2'>
          <Checkbox id='checked' defaultChecked />
          <label htmlFor='checked'>Checked</label>
        </div>
        <div className='flex items-center gap-2'>
          <Checkbox id='disabled' disabled />
          <label htmlFor='disabled' className='text-gray-500'>Disabled</label>
        </div>
        <div className='flex items-center gap-2'>
          <Checkbox id='disabled-checked' disabled defaultChecked />
          <label htmlFor='disabled-checked' className='text-gray-500'>Disabled Checked</label>
        </div>
      </div>
    ),
  },
];

const checkboxProps = [
  {
    name: 'size',
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: 'The size of the checkbox.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Whether the checkbox is disabled.',
  },
  {
    name: 'checked',
    type: 'boolean',
    description: 'Whether the checkbox is checked (controlled).',
  },
  {
    name: 'defaultChecked',
    type: 'boolean',
    description: 'Whether the checkbox is initially checked (uncontrolled).',
  },
  {
    name: 'onChange',
    type: '(checked: boolean) => void',
    description: 'Callback fired when the checkbox state changes.',
  },
  {
    name: 'className',
    type: 'string',
    description: 'Additional CSS classes to apply to the checkbox.',
  },
];

export function CheckboxPage() {
  return (
    <ComponentPage
      title='Checkbox'
      description='Customizable checkbox with different sizes and colors for forms and selection.'
      tableOfContents={tableOfContents}
      usageInstructions='The Checkbox component allows users to select one or more options from a set. Use it for binary choices, multiple selections, or toggle functionality. Always provide proper labels for accessibility.'
      importStatement="import { Checkbox } from '@moondreamsdev/dreamer-ui/components';"
      componentProps={checkboxProps}
      examples={checkboxExamples}
    />
  );
}