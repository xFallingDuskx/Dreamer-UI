import { RadioGroup } from '@moondreamsdev/dreamer-ui/components';
import { ComponentPage } from '../../components/layout/ComponentPage';

const tableOfContents = [
  { id: 'import', title: 'Import', level: 1 },
  { id: 'examples', title: 'Examples', level: 1 },
  { id: 'basic-usage', title: 'Basic Usage', level: 2 },
  { id: 'with-descriptions', title: 'With Descriptions', level: 2 },
  { id: 'disabled-options', title: 'Disabled Options', level: 2 },
  { id: 'props', title: 'Props', level: 1 },
];

const radioGroupExamples = [
  {
    id: 'basic-usage',
    title: 'Basic Usage',
    description: 'Simple radio group for single selection.',
    code: `<RadioGroup defaultValue='comfortable' className='max-w-md'>
  <div className='flex items-center space-x-2'>
    <RadioGroup.Item value='default' id='r1' />
    <label htmlFor='r1'>Default</label>
  </div>
  <div className='flex items-center space-x-2'>
    <RadioGroup.Item value='comfortable' id='r2' />
    <label htmlFor='r2'>Comfortable</label>
  </div>
  <div className='flex items-center space-x-2'>
    <RadioGroup.Item value='compact' id='r3' />
    <label htmlFor='r3'>Compact</label>
  </div>
</RadioGroup>`,
    children: (
      <RadioGroup defaultValue='comfortable' className='max-w-md'>
        <div className='flex items-center space-x-2'>
          <RadioGroup.Item value='default' id='r1' />
          <label htmlFor='r1'>Default</label>
        </div>
        <div className='flex items-center space-x-2'>
          <RadioGroup.Item value='comfortable' id='r2' />
          <label htmlFor='r2'>Comfortable</label>
        </div>
        <div className='flex items-center space-x-2'>
          <RadioGroup.Item value='compact' id='r3' />
          <label htmlFor='r3'>Compact</label>
        </div>
      </RadioGroup>
    ),
  },
  {
    id: 'with-descriptions',
    title: 'With Descriptions',
    description: 'Radio group with descriptive text for each option.',
    code: `<RadioGroup defaultValue='card' className='max-w-md'>
  <div className='space-y-2'>
    <div className='flex items-center space-x-2'>
      <RadioGroup.Item value='card' id='payment-card' />
      <div>
        <label htmlFor='payment-card' className='font-medium'>Credit Card</label>
        <p className='text-sm text-gray-500'>Pay with your credit or debit card</p>
      </div>
    </div>
  </div>
  <div className='space-y-2'>
    <div className='flex items-center space-x-2'>
      <RadioGroup.Item value='paypal' id='payment-paypal' />
      <div>
        <label htmlFor='payment-paypal' className='font-medium'>PayPal</label>
        <p className='text-sm text-gray-500'>Pay securely with your PayPal account</p>
      </div>
    </div>
  </div>
  <div className='space-y-2'>
    <div className='flex items-center space-x-2'>
      <RadioGroup.Item value='apple' id='payment-apple' />
      <div>
        <label htmlFor='payment-apple' className='font-medium'>Apple Pay</label>
        <p className='text-sm text-gray-500'>Quick and secure payment with Apple Pay</p>
      </div>
    </div>
  </div>
</RadioGroup>`,
    children: (
      <RadioGroup defaultValue='card' className='max-w-md'>
        <div className='space-y-2'>
          <div className='flex items-center space-x-2'>
            <RadioGroup.Item value='card' id='payment-card' />
            <div>
              <label htmlFor='payment-card' className='font-medium'>Credit Card</label>
              <p className='text-sm text-gray-500'>Pay with your credit or debit card</p>
            </div>
          </div>
        </div>
        <div className='space-y-2'>
          <div className='flex items-center space-x-2'>
            <RadioGroup.Item value='paypal' id='payment-paypal' />
            <div>
              <label htmlFor='payment-paypal' className='font-medium'>PayPal</label>
              <p className='text-sm text-gray-500'>Pay securely with your PayPal account</p>
            </div>
          </div>
        </div>
        <div className='space-y-2'>
          <div className='flex items-center space-x-2'>
            <RadioGroup.Item value='apple' id='payment-apple' />
            <div>
              <label htmlFor='payment-apple' className='font-medium'>Apple Pay</label>
              <p className='text-sm text-gray-500'>Quick and secure payment with Apple Pay</p>
            </div>
          </div>
        </div>
      </RadioGroup>
    ),
  },
];

const radioGroupProps = [
  {
    name: 'value',
    type: 'string',
    description: 'The current selected value (controlled).',
  },
  {
    name: 'defaultValue',
    type: 'string',
    description: 'The initial selected value (uncontrolled).',
  },
  {
    name: 'onValueChange',
    type: '(value: string) => void',
    description: 'Callback fired when the selected value changes.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Whether the entire radio group is disabled.',
  },
  {
    name: 'className',
    type: 'string',
    description: 'Additional CSS classes to apply to the radio group.',
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'Radio items to display in the group.',
    required: true,
  },
];

export function RadioGroupPage() {
  return (
    <ComponentPage
      title='Radio Group'
      description='Group of radio buttons for single selection from multiple options with keyboard navigation.'
      tableOfContents={tableOfContents}
      usageInstructions='The RadioGroup component allows users to select exactly one option from a set of mutually exclusive choices. Use it when you need users to make a single selection from multiple options. Each radio item should have a clear label and meaningful value.'
      importStatement="import { RadioGroup } from '@moondreamsdev/dreamer-ui/components';"
      componentProps={radioGroupProps}
      examples={radioGroupExamples}
    />
  );
}