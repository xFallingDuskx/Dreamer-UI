import { Checkbox } from '@moondreamsdev/dreamer-ui/components';
import { ComponentPage } from '../../components/layout/ComponentPage';

const tableOfContents = [
  { id: 'import', title: 'Import', level: 1 },
  { id: 'examples', title: 'Examples', level: 1 },
  { id: 'sizes', title: 'Sizes', level: 2 },
  { id: 'states', title: 'States', level: 2 },
  { id: 'colors', title: 'Colors', level: 2 },
  { id: 'usage-examples', title: 'Usage Examples', level: 2 },
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
  {
    id: 'colors',
    title: 'Colors',
    description: 'Custom colors for different branding or categorization.',
    code: `<div className='space-y-4'>
  <div className='flex items-center gap-2'>
    <Checkbox id='default' checked />
    <label htmlFor='default'>Default</label>
  </div>
  <div className='flex items-center gap-2'>
    <Checkbox id='red' checked color='red-500' />
    <label htmlFor='red'>Red</label>
  </div>
  <div className='flex items-center gap-2'>
    <Checkbox id='green' checked color='green-500' />
    <label htmlFor='green'>Green</label>
  </div>
  <div className='flex items-center gap-2'>
    <Checkbox id='blue' checked color='blue-500' />
    <label htmlFor='blue'>Blue</label>
  </div>
  <div className='flex items-center gap-2'>
    <Checkbox id='purple' checked color='purple-500' />
    <label htmlFor='purple'>Purple</label>
  </div>
</div>`,
    children: (
      <div className='space-y-4'>
        <div className='flex items-center gap-2'>
          <Checkbox id='default' checked />
          <label htmlFor='default'>Default</label>
        </div>
        <div className='flex items-center gap-2'>
          <Checkbox id='red' checked color='red-500' />
          <label htmlFor='red'>Red</label>
        </div>
        <div className='flex items-center gap-2'>
          <Checkbox id='green' checked color='green-500' />
          <label htmlFor='green'>Green</label>
        </div>
        <div className='flex items-center gap-2'>
          <Checkbox id='blue' checked color='blue-500' />
          <label htmlFor='blue'>Blue</label>
        </div>
        <div className='flex items-center gap-2'>
          <Checkbox id='purple' checked color='purple-500' />
          <label htmlFor='purple'>Purple</label>
        </div>
      </div>
    ),
  },
  {
    id: 'usage-examples',
    title: 'Usage Examples',
    description: 'Common checkbox usage patterns in real applications.',
    code: `<div className='space-y-8'>
  {/* Settings Panel */}
  <div className='p-4 bg-gray-50 dark:bg-gray-800 rounded-lg'>
    <h4 className='font-semibold mb-3'>Notification Settings</h4>
    <div className='space-y-3'>
      <div className='flex items-center gap-2'>
        <Checkbox id='email-notifications' checked />
        <label htmlFor='email-notifications'>Email notifications</label>
      </div>
      <div className='flex items-center gap-2'>
        <Checkbox id='push-notifications' />
        <label htmlFor='push-notifications'>Push notifications</label>
      </div>
      <div className='flex items-center gap-2'>
        <Checkbox id='sms-notifications' disabled />
        <label htmlFor='sms-notifications' className='text-gray-500'>SMS notifications (Pro only)</label>
      </div>
    </div>
  </div>

  {/* Todo List */}
  <div className='p-4 bg-gray-50 dark:bg-gray-800 rounded-lg'>
    <h4 className='font-semibold mb-3'>Task List</h4>
    <div className='space-y-2'>
      <div className='flex items-center gap-2'>
        <Checkbox id='task1' checked size={18} />
        <label htmlFor='task1' className='line-through opacity-75'>Complete project documentation</label>
      </div>
      <div className='flex items-center gap-2'>
        <Checkbox id='task2' size={18} />
        <label htmlFor='task2'>Review pull requests</label>
      </div>
      <div className='flex items-center gap-2'>
        <Checkbox id='task3' size={18} />
        <label htmlFor='task3'>Update dependencies</label>
      </div>
    </div>
  </div>

  {/* Filter Options */}
  <div className='p-4 bg-gray-50 dark:bg-gray-800 rounded-lg'>
    <h4 className='font-semibold mb-3'>Filter Products</h4>
    <div className='grid grid-cols-2 gap-3'>
      <div className='flex items-center gap-2'>
        <Checkbox id='in-stock' checked color='green-500' />
        <label htmlFor='in-stock'>In Stock</label>
      </div>
      <div className='flex items-center gap-2'>
        <Checkbox id='on-sale' color='red-500' />
        <label htmlFor='on-sale'>On Sale</label>
      </div>
      <div className='flex items-center gap-2'>
        <Checkbox id='free-shipping' color='blue-500' />
        <label htmlFor='free-shipping'>Free Shipping</label>
      </div>
      <div className='flex items-center gap-2'>
        <Checkbox id='eco-friendly' color='green-600' />
        <label htmlFor='eco-friendly'>Eco Friendly</label>
      </div>
    </div>
  </div>
</div>`,
    children: (
      <div className='space-y-8'>
        {/* Settings Panel */}
        <div className='p-4 bg-gray-50 dark:bg-gray-800 rounded-lg'>
          <h4 className='font-semibold mb-3'>Notification Settings</h4>
          <div className='space-y-3'>
            <div className='flex items-center gap-2'>
              <Checkbox id='email-notifications' checked />
              <label htmlFor='email-notifications'>Email notifications</label>
            </div>
            <div className='flex items-center gap-2'>
              <Checkbox id='push-notifications' />
              <label htmlFor='push-notifications'>Push notifications</label>
            </div>
            <div className='flex items-center gap-2'>
              <Checkbox id='sms-notifications' disabled />
              <label htmlFor='sms-notifications' className='text-gray-500'>SMS notifications (Pro only)</label>
            </div>
          </div>
        </div>

        {/* Todo List */}
        <div className='p-4 bg-gray-50 dark:bg-gray-800 rounded-lg'>
          <h4 className='font-semibold mb-3'>Task List</h4>
          <div className='space-y-2'>
            <div className='flex items-center gap-2'>
              <Checkbox id='task1' checked size={18} />
              <label htmlFor='task1' className='line-through opacity-75'>Complete project documentation</label>
            </div>
            <div className='flex items-center gap-2'>
              <Checkbox id='task2' size={18} />
              <label htmlFor='task2'>Review pull requests</label>
            </div>
            <div className='flex items-center gap-2'>
              <Checkbox id='task3' size={18} />
              <label htmlFor='task3'>Update dependencies</label>
            </div>
          </div>
        </div>

        {/* Filter Options */}
        <div className='p-4 bg-gray-50 dark:bg-gray-800 rounded-lg'>
          <h4 className='font-semibold mb-3'>Filter Products</h4>
          <div className='grid grid-cols-2 gap-3'>
            <div className='flex items-center gap-2'>
              <Checkbox id='in-stock' checked color='green-500' />
              <label htmlFor='in-stock'>In Stock</label>
            </div>
            <div className='flex items-center gap-2'>
              <Checkbox id='on-sale' color='red-500' />
              <label htmlFor='on-sale'>On Sale</label>
            </div>
            <div className='flex items-center gap-2'>
              <Checkbox id='free-shipping' color='blue-500' />
              <label htmlFor='free-shipping'>Free Shipping</label>
            </div>
            <div className='flex items-center gap-2'>
              <Checkbox id='eco-friendly' color='green-600' />
              <label htmlFor='eco-friendly'>Eco Friendly</label>
            </div>
          </div>
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