import { Label, Input, Textarea, Select, Checkbox } from '@moondreamsdev/dreamer-ui/components';
import { ComponentPage } from '../../components/layout/ComponentPage';

const tableOfContents = [
  { id: 'import', title: 'Import', level: 1 },
  { id: 'examples', title: 'Examples', level: 1 },
  { id: 'basic-usage', title: 'Basic Usage', level: 2 },
  { id: 'with-form-controls', title: 'With Form Controls', level: 2 },
  { id: 'required-labels', title: 'Required Labels', level: 2 },
  { id: 'with-help-messages', title: 'With Help Messages', level: 2 },
  { id: 'with-descriptions', title: 'With Descriptions', level: 2 },
  { id: 'display-options', title: 'Display Options', level: 2 },
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
  {
    id: 'with-help-messages',
    title: 'With Help Messages',
    description: 'Labels with help icons that display tooltips when hovered or focused.',
    code: `<div className='space-y-4 max-w-md'>
  <div>
    <Label htmlFor='username-help' helpMessage='This username will be visible to other users'>
      Username
    </Label>
    <Input id='username-help' placeholder='Enter your username' variant='outline' />
  </div>
  <div>
    <Label 
      htmlFor='password-help' 
      required 
      helpMessage='Password must be at least 8 characters with one uppercase letter and one number'
    >
      Password
    </Label>
    <Input id='password-help' type='password' placeholder='Enter your password' variant='outline' required />
  </div>
  <div>
    <Label 
      htmlFor='api-key-help'
      helpMessage='You can find your API key in your account settings under the Developer tab'
    >
      API Key
    </Label>
    <Input id='api-key-help' type='password' placeholder='Enter your API key' variant='outline' />
  </div>
</div>`,
    children: (
      <div className='space-y-4 max-w-md'>
        <div>
          <Label htmlFor='username-help' helpMessage='This username will be visible to other users'>
            Username
          </Label>
          <Input id='username-help' placeholder='Enter your username' variant='outline' />
        </div>
        <div>
          <Label 
            htmlFor='password-help' 
            required 
            helpMessage='Password must be at least 8 characters with one uppercase letter and one number'
          >
            Password
          </Label>
          <Input id='password-help' type='password' placeholder='Enter your password' variant='outline' required />
        </div>
        <div>
          <Label 
            htmlFor='api-key-help'
            helpMessage='You can find your API key in your account settings under the Developer tab'
          >
            API Key
          </Label>
          <Input id='api-key-help' type='password' placeholder='Enter your API key' variant='outline' />
        </div>
      </div>
    ),
  },
  {
    id: 'with-descriptions',
    title: 'With Descriptions',
    description: 'Labels with description text displayed below the label for additional context.',
    code: `<div className='space-y-4 max-w-md'>
  <div>
    <Label 
      htmlFor='bio-desc' 
      description='Tell others about yourself in a few sentences'
    >
      Bio
    </Label>
    <Textarea id='bio-desc' placeholder='Write your bio here...' variant='outline' rows={3} />
  </div>
  <div>
    <Label 
      htmlFor='website-desc'
      description='Include http:// or https:// for external links'
    >
      Website URL
    </Label>
    <Input id='website-desc' type='url' placeholder='https://example.com' variant='outline' />
  </div>
  <div>
    <Label 
      htmlFor='tags-desc'
      description='Separate multiple tags with commas'
      helpMessage='Tags help categorize your content and make it discoverable'
    >
      Tags
    </Label>
    <Input id='tags-desc' placeholder='react, typescript, ui' variant='outline' />
  </div>
</div>`,
    children: (
      <div className='space-y-4 max-w-md'>
        <div>
          <Label 
            htmlFor='bio-desc' 
            description='Tell others about yourself in a few sentences'
          >
            Bio
          </Label>
          <Textarea id='bio-desc' placeholder='Write your bio here...' variant='outline' rows={3} />
        </div>
        <div>
          <Label 
            htmlFor='website-desc'
            description='Include http:// or https:// for external links'
          >
            Website URL
          </Label>
          <Input id='website-desc' type='url' placeholder='https://example.com' variant='outline' />
        </div>
        <div>
          <Label 
            htmlFor='tags-desc'
            description='Separate multiple tags with commas'
            helpMessage='Tags help categorize your content and make it discoverable'
          >
            Tags
          </Label>
          <Input id='tags-desc' placeholder='react, typescript, ui' variant='outline' />
        </div>
      </div>
    ),
  },
  {
    id: 'display-options',
    title: 'Display Options',
    description: 'Different display modes and width configurations for labels.',
    code: `<div className='space-y-6'>
  <div>
    <h4 className='text-sm font-medium mb-3'>Block Display (Full Width)</h4>
    <div className='space-y-3'>
      <Label htmlFor='block-1' display='block' width='100%'>
        Full Width Label
      </Label>
      <Input id='block-1' placeholder='This label takes full width' variant='outline' />
    </div>
  </div>
  
  <div>
    <h4 className='text-sm font-medium mb-3'>Inline Display (Fit Content)</h4>
    <div className='flex items-center gap-4'>
      <Label htmlFor='inline-1' display='inline'>
        Compact Label:
      </Label>
      <Input id='inline-1' placeholder='Inline input' variant='outline' className='flex-1' />
    </div>
  </div>
  
  <div>
    <h4 className='text-sm font-medium mb-3'>Custom Width</h4>
    <div className='flex items-center gap-4'>
      <Label htmlFor='custom-width-1' width='150px'>
        Fixed Width (150px):
      </Label>
      <Input id='custom-width-1' placeholder='Custom width input' variant='outline' className='flex-1' />
    </div>
  </div>
</div>`,
    children: (
      <div className='space-y-6'>
        <div>
          <h4 className='text-sm font-medium mb-3'>Block Display (Full Width)</h4>
          <div className='space-y-3'>
            <Label htmlFor='block-1' display='block' width='100%'>
              Full Width Label
            </Label>
            <Input id='block-1' placeholder='This label takes full width' variant='outline' />
          </div>
        </div>
        
        <div>
          <h4 className='text-sm font-medium mb-3'>Inline Display (Fit Content)</h4>
          <div className='flex items-center gap-4'>
            <Label htmlFor='inline-1' display='inline'>
              Compact Label:
            </Label>
            <Input id='inline-1' placeholder='Inline input' variant='outline' className='flex-1' />
          </div>
        </div>
        
        <div>
          <h4 className='text-sm font-medium mb-3'>Custom Width</h4>
          <div className='flex items-center gap-4'>
            <Label htmlFor='custom-width-1' width='150px'>
              Fixed Width (150px):
            </Label>
            <Input id='custom-width-1' placeholder='Custom width input' variant='outline' className='flex-1' />
          </div>
        </div>
      </div>
    ),
  },
];

const labelProps = [
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'The label text content.',
    required: true,
  },
  {
    name: 'htmlFor',
    type: 'string',
    description: 'The ID of the form element this label is associated with.',
  },
  {
    name: 'display',
    type: "'block' | 'inline'",
    default: "'inline'",
    description: 'The display type of the label.',
  },
  {
    name: 'width',
    type: "React.CSSProperties['width']",
    default: "'fit-content'",
    description: 'The width of the label element.',
  },
  {
    name: 'required',
    type: 'boolean',
    default: 'false',
    description: 'Whether to show a required indicator (*) next to the label.',
  },
  {
    name: 'helpMessage',
    type: 'string',
    description: 'Help text to display in a tooltip next to the label using HelpIcon.',
  },
  {
    name: 'suffix',
    type: 'React.ReactNode',
    description: 'Additional content to display after the label text.',
  },
  {
    name: 'description',
    type: 'string',
    description: 'Description text to display below the label.',
  },
  {
    name: 'className',
    type: 'string',
    description: 'Additional CSS classes to apply to the label container.',
  },
];

export function LabelPage() {
  return (
    <ComponentPage
      title='Label'
      description='Form label component with support for required indicators, help tooltips, description text, and flexible display options.'
      tableOfContents={tableOfContents}
      usageInstructions='The Label component provides accessible labels for form elements with enhanced features. Always associate labels with their corresponding form controls using the htmlFor prop. Use the required prop to indicate mandatory fields, helpMessage for contextual help tooltips, and description for additional explanatory text below the label.'
      importStatement="import { Label } from '@moondreamsdev/dreamer-ui/components';"
      componentProps={labelProps}
      examples={labelExamples}
    />
  );
}