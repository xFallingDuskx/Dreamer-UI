import { Label } from '@moondreamsdev/dreamer-ui/components';
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
    description: 'Simple labels for form elements.',
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
    id: 'required-labels',
    title: 'Required Labels',
    description: 'Labels with required indicators.',
    code: `<div className='space-y-4'>
  <div>
    <Label htmlFor='required-name' required>Full Name</Label>
    <input id='required-name' type='text' className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md' />
  </div>
  <div>
    <Label htmlFor='optional-phone'>Phone Number</Label>
    <input id='optional-phone' type='tel' className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md' />
  </div>
</div>`,
    children: (
      <div className='space-y-4'>
        <div>
          <Label htmlFor='required-name' required>Full Name</Label>
          <input id='required-name' type='text' className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md' />
        </div>
        <div>
          <Label htmlFor='optional-phone'>Phone Number</Label>
          <input id='optional-phone' type='tel' className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md' />
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