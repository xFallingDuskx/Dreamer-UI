import { Label, Input, Textarea, Select, Checkbox } from '@moondreamsdev/dreamer-ui/components';
import { ComponentPage } from '../../components/layout/ComponentPage';

const tableOfContents = [
  { id: 'import', title: 'Import', level: 1 },
  { id: 'examples', title: 'Examples', level: 1 },
  { id: 'basic-usage', title: 'Basic Usage', level: 2 },
  { id: 'with-form-controls', title: 'With Form Controls', level: 2 },
  { id: 'required-labels', title: 'Required Labels', level: 2 },
  { id: 'props', title: 'Props', level: 1 },
];

const labelExamples = [
  {
    id: 'basic-usage',
    title: 'Basic Usage',
    description: 'Simple labels for form elements using native HTML inputs.',
    code: `<div className='space-y-4'>
  <div>
    <Label htmlFor='name'>Full Name</Label>
    <input id='name' type='text' className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md' />
  </div>
  <div>
    <Label htmlFor='email'>Email Address</Label>
    <input id='email' type='email' className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md' />
  </div>
</div>`,
    children: (
      <div className='space-y-4'>
        <div>
          <Label htmlFor='name'>Full Name</Label>
          <input id='name' type='text' className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md' />
        </div>
        <div>
          <Label htmlFor='email'>Email Address</Label>
          <input id='email' type='email' className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md' />
        </div>
      </div>
    ),
  },
  {
    id: 'with-form-controls',
    title: 'With Form Controls',
    description: 'Labels used with Dreamer-UI form components for consistent styling.',
    code: `<div className='space-y-4 max-w-md'>
  <div>
    <Label htmlFor='input-1'>Input Field</Label>
    <Input id='input-1' placeholder='Enter text here' variant='outline' />
  </div>
  <div>
    <Label htmlFor='textarea-1'>Message</Label>
    <Textarea id='textarea-1' placeholder='Enter your message' variant='outline' rows={3} />
  </div>
  <div>
    <Label htmlFor='select-1'>Choose Option</Label>
    <Select 
      id='select-1'
      placeholder="Select an option"
      options={[
        { text: 'Option 1', value: 'option1' },
        { text: 'Option 2', value: 'option2' },
        { text: 'Option 3', value: 'option3' }
      ]}
    />
  </div>
  <div className='flex items-center gap-2'>
    <Checkbox id='checkbox-1' />
    <Label htmlFor='checkbox-1'>I agree to the terms</Label>
  </div>
</div>`,
    children: (
      <div className='space-y-4 max-w-md'>
        <div>
          <Label htmlFor='input-1'>Input Field</Label>
          <Input id='input-1' placeholder='Enter text here' variant='outline' />
        </div>
        <div>
          <Label htmlFor='textarea-1'>Message</Label>
          <Textarea id='textarea-1' placeholder='Enter your message' variant='outline' rows={3} />
        </div>
        <div>
          <Label htmlFor='select-1'>Choose Option</Label>
          <Select 
            id='select-1'
            placeholder="Select an option"
            options={[
              { text: 'Option 1', value: 'option1' },
              { text: 'Option 2', value: 'option2' },
              { text: 'Option 3', value: 'option3' }
            ]}
          />
        </div>
        <div className='flex items-center gap-2'>
          <Checkbox id='checkbox-1' />
          <Label htmlFor='checkbox-1'>I agree to the terms</Label>
        </div>
      </div>
    ),
  },
  {
    id: 'required-labels',
    title: 'Required Labels',
    description: 'Labels with required indicators for mandatory form fields.',
    code: `<div className='space-y-4 max-w-md'>
  <div>
    <Label htmlFor='required-name' required>Full Name</Label>
    <Input id='required-name' placeholder='Enter your full name' variant='outline' required />
  </div>
  <div>
    <Label htmlFor='required-email' required>Email Address</Label>
    <Input id='required-email' type='email' placeholder='Enter your email' variant='outline' required />
  </div>
  <div>
    <Label htmlFor='optional-phone'>Phone Number (Optional)</Label>
    <Input id='optional-phone' type='tel' placeholder='Enter your phone number' variant='outline' />
  </div>
</div>`,
    children: (
      <div className='space-y-4 max-w-md'>
        <div>
          <Label htmlFor='required-name' required>Full Name</Label>
          <Input id='required-name' placeholder='Enter your full name' variant='outline' required />
        </div>
        <div>
          <Label htmlFor='required-email' required>Email Address</Label>
          <Input id='required-email' type='email' placeholder='Enter your email' variant='outline' required />
        </div>
        <div>
          <Label htmlFor='optional-phone'>Phone Number (Optional)</Label>
          <Input id='optional-phone' type='tel' placeholder='Enter your phone number' variant='outline' />
        </div>
      </div>
    ),
  },
];

const labelProps = [
  {
    name: 'htmlFor',
    type: 'string',
    description: 'The ID of the form element this label is associated with.',
  },
  {
    name: 'required',
    type: 'boolean',
    default: 'false',
    description: 'Whether to show a required indicator (*) next to the label.',
  },
  {
    name: 'className',
    type: 'string',
    description: 'Additional CSS classes to apply to the label.',
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'The label text content.',
    required: true,
  },
];

export function LabelPage() {
  return (
    <ComponentPage
      title='Label'
      description='Form label component with proper accessibility attributes and required indicators.'
      tableOfContents={tableOfContents}
      usageInstructions='The Label component provides accessible labels for form elements. Always associate labels with their corresponding form controls using the htmlFor prop. Use the required prop to indicate mandatory fields.'
      importStatement="import { Label } from '@moondreamsdev/dreamer-ui/components';"
      componentProps={labelProps}
      examples={labelExamples}
    />
  );
}