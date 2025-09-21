import { Checkbox } from '@moondreamsdev/dreamer-ui/components';
import { ComponentPage } from '../../components/layout/ComponentPage';

const tableOfContents = [
  { id: 'import', title: 'Import', level: 1 },
  { id: 'examples', title: 'Examples', level: 1 },
  { id: 'sizes', title: 'Sizes', level: 2 },
  { id: 'states', title: 'States', level: 2 },
  { id: 'props', title: 'Props', level: 1 },
  { id: 'keyboard-shortcuts', title: 'Keyboard Shortcuts', level: 1 },
];

const checkboxExamples = [
  {
    id: 'sizes',
    title: 'Sizes',
    description: 'Different checkbox sizes for various contexts.',
    code: `<div className='flex items-center gap-6'>
  <div className='flex items-center gap-2'>
    <Checkbox id='small' size={16} />
    <label htmlFor='small'>Small</label>
  </div>
  <div className='flex items-center gap-2'>
    <Checkbox id='medium' size={20} />
    <label htmlFor='medium'>Medium</label>
  </div>
  <div className='flex items-center gap-2'>
    <Checkbox id='large' size={24} />
    <label htmlFor='large'>Large</label>
  </div>
</div>`,
    children: (
      <div className='flex items-center gap-6'>
        <div className='flex items-center gap-2'>
          <Checkbox id='small' size={16} />
          <label htmlFor='small'>Small</label>
        </div>
        <div className='flex items-center gap-2'>
          <Checkbox id='medium' size={20} />
          <label htmlFor='medium'>Medium</label>
        </div>
        <div className='flex items-center gap-2'>
          <Checkbox id='large' size={24} />
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
    <Checkbox id='checked' checked />
    <label htmlFor='checked'>Checked</label>
  </div>
  <div className='flex items-center gap-2'>
    <Checkbox id='indeterminate' indeterminate />
    <label htmlFor='indeterminate'>Indeterminate</label>
  </div>
  <div className='flex items-center gap-2'>
    <Checkbox id='disabled' disabled />
    <label htmlFor='disabled' className='text-gray-500'>Disabled</label>
  </div>
  <div className='flex items-center gap-2'>
    <Checkbox id='disabled-checked' disabled checked />
    <label htmlFor='disabled-checked' className='text-gray-500'>Disabled Checked</label>
  </div>
  <div className='flex items-center gap-2'>
    <Checkbox id='filled' checked filled />
    <label htmlFor='filled'>Filled Style</label>
  </div>
</div>`,
    children: (
      <div className='space-y-4'>
        <div className='flex items-center gap-2'>
          <Checkbox id='unchecked' />
          <label htmlFor='unchecked'>Unchecked</label>
        </div>
        <div className='flex items-center gap-2'>
          <Checkbox id='checked' checked />
          <label htmlFor='checked'>Checked</label>
        </div>
        <div className='flex items-center gap-2'>
          <Checkbox id='indeterminate' indeterminate />
          <label htmlFor='indeterminate'>Indeterminate</label>
        </div>
        <div className='flex items-center gap-2'>
          <Checkbox id='disabled' disabled />
          <label htmlFor='disabled' className='text-gray-500'>Disabled</label>
        </div>
        <div className='flex items-center gap-2'>
          <Checkbox id='disabled-checked' disabled checked />
          <label htmlFor='disabled-checked' className='text-gray-500'>Disabled Checked</label>
        </div>
        <div className='flex items-center gap-2'>
          <Checkbox id='filled' checked filled />
          <label htmlFor='filled'>Filled Style</label>
        </div>
      </div>
    ),
  },
];

const checkboxProps = [
  {
    name: 'size',
    type: 'number',
    default: '20',
    description: 'The size of the checkbox in pixels.',
  },
  {
    name: 'color',
    type: 'string',
    description: 'CSS color value or Tailwind class for the checkbox color.',
  },
  {
    name: 'filled',
    type: 'boolean',
    default: 'false',
    description: 'Whether to fill the checkbox background when checked.',
  },
  {
    name: 'rounded',
    type: 'boolean',
    default: 'true',
    description: 'Whether the checkbox should have rounded corners.',
  },
  {
    name: 'checked',
    type: 'boolean',
    default: 'false',
    description: 'Whether the checkbox is checked (controlled).',
  },
  {
    name: 'indeterminate',
    type: 'boolean',
    default: 'false',
    description: 'Whether the checkbox is in an indeterminate state.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Whether the checkbox is disabled.',
  },
  {
    name: 'display',
    type: '"inline" | "block"',
    default: '"inline"',
    description: 'The display style of the checkbox.',
  },
  {
    name: 'onCheckedChange',
    type: '(checked: boolean) => void',
    description: 'Callback fired when the checkbox state changes.',
  },
  {
    name: 'id',
    type: 'string',
    description: 'The HTML id attribute for the checkbox.',
  },
  {
    name: 'className',
    type: 'string',
    description: 'Additional CSS classes to apply to the checkbox.',
  },
];

const keyboardShortcuts = [
  {
    keys: 'Space',
    description: 'Toggle the checkbox state'
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

export function CheckboxPage() {
  return (
    <ComponentPage
      title='Checkbox'
      description='Customizable checkbox with different sizes and colors for forms and selection.'
      tableOfContents={tableOfContents}
      usageInstructions='The Checkbox component allows users to select one or more options from a set. Use it for binary choices, multiple selections, or toggle functionality. Always provide proper labels for accessibility.'
      importStatement="import { Checkbox } from '@moondreamsdev/dreamer-ui/components';"
      componentProps={checkboxProps}
      keyboardShortcuts={keyboardShortcuts}
      examples={checkboxExamples}
    />
  );
}