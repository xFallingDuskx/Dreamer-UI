import { RadioGroup } from '@moondreamsdev/dreamer-ui/components';
import { ComponentPage } from '../../components/layout/ComponentPage';
import { useState } from 'react';

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
    code: `function BasicRadioGroup() {
  const [value, setValue] = useState('comfortable');
  
  return (
    <RadioGroup
      options={[
        { label: 'Default', value: 'default' },
        { label: 'Comfortable', value: 'comfortable' },
        { label: 'Compact', value: 'compact' }
      ]}
      value={value}
      onChange={setValue}
      className='max-w-md'
    />
  );
}`,
    children: (
      <BasicRadioGroup />
    ),
  },
  {
    id: 'with-descriptions',
    title: 'With Descriptions',
    description: 'Radio group with descriptive text for each option.',
    code: `function PaymentRadioGroup() {
  const [value, setValue] = useState('card');
  
  return (
    <RadioGroup
      options={[
        { 
          label: 'Credit Card', 
          value: 'card',
          description: 'Pay with your credit or debit card'
        },
        { 
          label: 'PayPal', 
          value: 'paypal',
          description: 'Pay securely with your PayPal account'
        },
        { 
          label: 'Apple Pay', 
          value: 'apple',
          description: 'Quick and secure payment with Apple Pay'
        }
      ]}
      value={value}
      onChange={setValue}
      className='max-w-md'
    />
  );
}`,
    children: (
      <PaymentRadioGroup />
    ),
  },
  {
    id: 'disabled-options',
    title: 'Disabled Options',
    description: 'Radio group with some options disabled.',
    code: `function DisabledRadioGroup() {
  const [value, setValue] = useState('enabled1');
  
  return (
    <RadioGroup
      options={[
        { label: 'Enabled Option 1', value: 'enabled1' },
        { label: 'Disabled Option', value: 'disabled1', disabled: true },
        { label: 'Enabled Option 2', value: 'enabled2' },
        { label: 'Another Disabled Option', value: 'disabled2', disabled: true }
      ]}
      value={value}
      onChange={setValue}
      className='max-w-md'
    />
  );
}`,
    children: (
      <DisabledRadioGroup />
    ),
  },
];

// Example components
function BasicRadioGroup() {
  const [value, setValue] = useState('comfortable');
  
  return (
    <RadioGroup
      options={[
        { label: 'Default', value: 'default' },
        { label: 'Comfortable', value: 'comfortable' },
        { label: 'Compact', value: 'compact' }
      ]}
      value={value}
      onChange={setValue}
      className='max-w-md'
    />
  );
}

function PaymentRadioGroup() {
  const [value, setValue] = useState('card');
  
  return (
    <RadioGroup
      options={[
        { 
          label: 'Credit Card', 
          value: 'card',
          description: 'Pay with your credit or debit card'
        },
        { 
          label: 'PayPal', 
          value: 'paypal',
          description: 'Pay securely with your PayPal account'
        },
        { 
          label: 'Apple Pay', 
          value: 'apple',
          description: 'Quick and secure payment with Apple Pay'
        }
      ]}
      value={value}
      onChange={setValue}
      className='max-w-md'
    />
  );
}

function DisabledRadioGroup() {
  const [value, setValue] = useState('enabled1');
  
  return (
    <RadioGroup
      options={[
        { label: 'Enabled Option 1', value: 'enabled1' },
        { label: 'Disabled Option', value: 'disabled1', disabled: true },
        { label: 'Enabled Option 2', value: 'enabled2' },
        { label: 'Another Disabled Option', value: 'disabled2', disabled: true }
      ]}
      value={value}
      onChange={setValue}
      className='max-w-md'
    />
  );
}

const radioGroupProps = [
  {
    name: 'options',
    type: 'Array<string | RadioOption>',
    description: 'Array of option objects or strings. RadioOption: { label: string, value: string, disabled?: boolean, description?: string }',
  },
  {
    name: 'value',
    type: 'string | undefined',
    description: 'The current selected value (controlled).',
    required: true,
  },
  {
    name: 'onChange',
    type: '(value: string) => void',
    description: 'Callback fired when the selected value changes.',
    required: true,
  },
  {
    name: 'id',
    type: 'string',
    description: 'The id for the radio group element.',
  },
  {
    name: 'className',
    type: 'string',
    description: 'Additional CSS classes to apply to the radio group.',
  },
  {
    name: 'childrenClassName',
    type: 'string',
    description: 'Additional CSS classes to apply to each radio item.',
  },
  {
    name: 'hideInputs',
    type: 'boolean',
    default: 'false',
    description: 'Whether to hide the radio input elements.',
  },
  {
    name: 'children',
    type: 'React.ReactElement<RadioGroupItemProps>[]',
    description: 'RadioGroupItem components as children (alternative to options prop).',
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