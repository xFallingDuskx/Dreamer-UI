import { useState } from 'react';
import { ComponentPage } from '../../components/layout/ComponentPage';
import { Form, FormFactories, FormData } from '@moondreamsdev/dreamer-ui/components'

const tableOfContents = [
  { id: 'import', title: 'Import', level: 1 },
  { id: 'examples', title: 'Examples', level: 1 },
  { id: 'basic-usage', title: 'Basic Usage', level: 2 },
  { id: 'field-types', title: 'Field Types', level: 2 },
  { id: 'field-layout', title: 'Field Layout', level: 2 },
  { id: 'validation', title: 'Validation', level: 2 },
  { id: 'form-variants', title: 'Form Variants', level: 2 },
  { id: 'props', title: 'Props', level: 1 },
];

export function FormPage() {
  const [basicFormData, setBasicFormData] = useState<FormData>({});
  const [validationFormData, setValidationFormData] = useState<FormData>({});
  const [layoutFormData, setLayoutFormData] = useState<FormData>({});
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);
  const { input, textarea, select, checkbox, radio } = FormFactories;

  const basicForm = [
    input({
      name: 'name',
      label: 'Full Name',
      placeholder: 'Enter your full name',
      required: true,
      variant: 'outline'
    }),
    input({
      name: 'email',
      label: 'Email Address',
      type: 'email',
      placeholder: 'Enter your email',
      required: true,
      variant: 'outline'
    }),
    textarea({
      name: 'bio',
      label: 'Bio',
      placeholder: 'Tell us about yourself',
      description: 'Brief description about yourself',
      variant: 'outline',
      rows: 3
    })
  ];

  const fieldTypesForm = [
    input({
      name: 'textInput',
      label: 'Text Input',
      placeholder: 'Regular text input',
      variant: 'outline'
    }),
    input({
      name: 'passwordInput',
      label: 'Password Input',
      type: 'password',
      placeholder: 'Enter password',
      variant: 'outline'
    }),
    input({
      name: 'numberInput',
      label: 'Number Input',
      type: 'number',
      placeholder: '123',
      variant: 'outline'
    }),
    textarea({
      name: 'textareaField',
      label: 'Textarea',
      placeholder: 'Multiple lines of text',
      variant: 'outline',
      rows: 4
    }),
    select({
      name: 'selectField',
      label: 'Select Dropdown',
      placeholder: 'Choose an option',
      options: [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' }
      ]
    }),
    checkbox({
      name: 'checkboxField',
      label: 'Checkbox',
      text: 'I agree to the terms and conditions'
    }),
    radio({
      name: 'radioField',
      label: 'Radio Group',
      options: [
        { value: 'small', label: 'Small' },
        { value: 'medium', label: 'Medium' },
        { value: 'large', label: 'Large' }
      ]
    })
  ];

  const validationForm = [
    input({
      name: 'username',
      label: 'Username',
      placeholder: 'At least 3 characters',
      required: true,
      variant: 'outline',
      isValid: (value: string | undefined) => {
        if (!value || value.length < 3) return { valid: false, message: 'Username must be at least 3 characters' };
        if (!/^[a-zA-Z0-9_]+$/.test(value)) return { valid: false, message: 'Username can only contain letters, numbers, and underscores' };
        return { valid: true };
      }
    }),
    input({
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'Valid email format',
      required: true,
      variant: 'outline',
      isValid: (value: string | undefined) => {
        if (!value) return { valid: false, message: 'Email is required' };
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return { valid: false, message: 'Please enter a valid email address' };
        return { valid: true };
      }
    }),
    input({
      name: 'age',
      label: 'Age',
      type: 'number',
      placeholder: 'Between 13-120',
      variant: 'outline',
      isValid: (value: string | undefined) => {
        if (!value) return { valid: true }; // Optional field
        const age = parseInt(value);
        if (age < 13 || age > 120) return { valid: false, message: 'Age must be between 13 and 120' };
        return { valid: true };
      }
    })
  ];

  const multiColumnForm = [
    input({
      name: 'firstName',
      label: 'First Name',
      placeholder: 'John',
      variant: 'outline',
      required: true
    }),
    input({
      name: 'lastName', 
      label: 'Last Name',
      placeholder: 'Doe',
      variant: 'outline',
      required: true
    }),
    input({
      name: 'email',
      label: 'Email Address',
      type: 'email',
      placeholder: 'john.doe@example.com',
      variant: 'outline',
      colSpan: 'full',
      required: true
    }),
    input({
      name: 'phone',
      label: 'Phone',
      type: 'tel',
      placeholder: '+1 (555) 123-4567',
      variant: 'outline'
    }),
    input({
      name: 'age',
      label: 'Age',
      type: 'number',
      placeholder: '25',
      variant: 'outline',
      className: 'max-w-[80px]'
    }),
    textarea({
      name: 'comments',
      label: 'Additional Comments',
      placeholder: 'Any additional information...',
      variant: 'outline',
      colSpan: 'full',
      rows: 3
    })
  ];

  const formExamples = [
    {
      id: 'basic-usage',
      title: 'Basic Usage',
      description: 'Simple form with different field types and built-in state management.',
      code: `<div className='max-w-md'>
  <Form
    form={[
      input({
        name: 'name',
        label: 'Full Name',
        placeholder: 'Enter your full name',
        required: true,
        variant: 'outline'
      }),
      input({
        name: 'email',
        label: 'Email Address',
        type: 'email',
        placeholder: 'Enter your email',
        required: true,
        variant: 'outline'
      }),
      textarea({
        name: 'bio',
        label: 'Bio',
        placeholder: 'Tell us about yourself',
        description: 'Brief description about yourself',
        variant: 'outline',
        rows: 3
      })
    ]}
    spacing='normal'
  />
</div>`,
      children: (
        <div className='max-w-md'>
          <Form
            form={basicForm}
            initialData={basicFormData}
            onDataChange={setBasicFormData}
            spacing='normal'
          />
        </div>
      ),
    },
    {
      id: 'field-types',
      title: 'Field Types',
      description: 'All available form field types created using FormFactories.',
      code: `const { input, textarea, select, checkbox, radio } = FormFactories;

<div className='max-w-md'>
  <Form
    form={[
      input({
        name: 'textInput',
        label: 'Text Input',
        placeholder: 'Regular text input',
        variant: 'outline'
      }),
      input({
        name: 'passwordInput',
        label: 'Password Input',
        type: 'password',
        placeholder: 'Enter password',
        variant: 'outline'
      }),
      textarea({
        name: 'textareaField',
        label: 'Textarea',
        placeholder: 'Multiple lines of text',
        variant: 'outline',
        rows: 4
      }),
      select({
        name: 'selectField',
        label: 'Select Dropdown',
        placeholder: 'Choose an option',
        options: [
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
          { value: 'option3', label: 'Option 3' }
        ]
      }),
      checkbox({
        name: 'checkboxField',
        label: 'Checkbox',
        text: 'I agree to the terms and conditions'
      }),
      radio({
        name: 'radioField',
        label: 'Radio Group',
        options: [
          { value: 'small', label: 'Small' },
          { value: 'medium', label: 'Medium' },
          { value: 'large', label: 'Large' }
        ]
      })
    ]}
    spacing='normal'
  />
</div>`,
      children: (
        <div className='max-w-md'>
          <Form
            form={fieldTypesForm}
            spacing='normal'
          />
        </div>
      ),
    },
    {
      id: 'field-layout',
      title: 'Field Layout',
      description: 'Multi-column layouts and responsive field arrangements with width constraints.',
      code: `<div className='space-y-8'>
  <div>
    <h4 className='text-lg font-semibold mb-4'>Multi-Column Layout (2 columns)</h4>
    <Form
      form={multiColumnForm}
      columns={2}
      spacing='normal'
    />
  </div>
  
  <div>
    <h4 className='text-lg font-semibold mb-4'>Three Column Layout</h4>
    <Form
      form={[
        input({ name: 'field1', label: 'Field 1', placeholder: 'First', variant: 'outline' }),
        input({ name: 'field2', label: 'Field 2', placeholder: 'Second', variant: 'outline' }),
        input({ name: 'field3', label: 'Field 3', placeholder: 'Third', variant: 'outline' }),
        input({ 
          name: 'fullWidth', 
          label: 'Full Width Field', 
          placeholder: 'This spans all columns', 
          variant: 'outline',
          colSpan: 'full'
        })
      ]}
      columns={3}
      spacing='normal'
    />
  </div>
</div>`,
      children: (
        <div className='space-y-8'>
          <div>
            <h4 className='text-lg font-semibold mb-4'>Multi-Column Layout (2 columns)</h4>
            <Form
              form={multiColumnForm}
              initialData={layoutFormData}
              onDataChange={setLayoutFormData}
              columns={2}
              spacing='normal'
            />
          </div>
          
          <div>
            <h4 className='text-lg font-semibold mb-4'>Three Column Layout</h4>
            <Form
              form={[
                input({ name: 'field1', label: 'Field 1', placeholder: 'First', variant: 'outline' }),
                input({ name: 'field2', label: 'Field 2', placeholder: 'Second', variant: 'outline' }),
                input({ name: 'field3', label: 'Field 3', placeholder: 'Third', variant: 'outline' }),
                input({ 
                  name: 'fullWidth', 
                  label: 'Full Width Field', 
                  placeholder: 'This spans all columns', 
                  variant: 'outline',
                  colSpan: 'full'
                })
              ]}
              columns={3}
              spacing='normal'
            />
          </div>
        </div>
      ),
    },
    {
      id: 'validation',
      title: 'Validation',
      description: 'Custom validation functions with real-time feedback and form submission handling.',
      code: `<div className='max-w-md'>
  <Form
    form={[
      input({
        name: 'username',
        label: 'Username',
        placeholder: 'At least 3 characters',
        required: true,
        variant: 'outline',
        isValid: (value: string | undefined) => {
          if (!value || value.length < 3) return { valid: false, message: 'Username must be at least 3 characters' };
          if (!/^[a-zA-Z0-9_]+$/.test(value)) return { valid: false, message: 'Username can only contain letters, numbers, and underscores' };
          return { valid: true };
        }
      }),
      input({
        name: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'Valid email format',
        required: true,
        variant: 'outline',
        isValid: (value: string | undefined) => {
          if (!value) return { valid: false, message: 'Email is required' };
          const emailRegex = new RegExp('^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$');
          if (!emailRegex.test(value)) return { valid: false, message: 'Please enter a valid email address' };
          return { valid: true };
        }
      })
    ]}
    onSubmit={(data) => {
      console.log('Form submitted:', data);
    }}
    spacing='normal'
    submitButton={
      <button type='submit' className='mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700'>
        Submit Form
      </button>
    }
  />
</div>`,
      children: (
        <div className='max-w-md'>
          <Form
            form={validationForm}
            initialData={validationFormData}
            onDataChange={setValidationFormData}
            onSubmit={(data) => {
              setSubmittedData(data);
              console.log('Form submitted:', data);
            }}
            spacing='normal'
            submitButton={
              <button 
                type='submit'
                className='mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700'
              >
                Validate & Submit
              </button>
            }
          />
          
          {submittedData && (
            <div className='mt-4 p-4 bg-green-900/20 border border-green-800 rounded-lg'>
              <h5 className='font-medium text-green-300 mb-2'>Form Submitted Successfully:</h5>
              <pre className='text-sm text-green-200 overflow-auto'>
                {JSON.stringify(submittedData, null, 2)}
              </pre>
            </div>
          )}
        </div>
      ),
    },
    {
      id: 'form-variants',
      title: 'Form Variants',
      description: 'Different spacing configurations and field variants.',
      code: `<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
  <div>
    <h4 className='font-medium mb-4'>Normal Spacing</h4>
    <Form
      form={basicForm}
      spacing='normal'
      className='max-w-sm'
    />
  </div>
  <div>
    <h4 className='font-medium mb-4'>Tight Spacing</h4>
    <Form
      form={basicForm.slice(0, 2)}
      spacing='tight'
      className='max-w-sm'
    />
  </div>
</div>`,
      children: (
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          <div>
            <h4 className='font-medium mb-4'>Normal Spacing</h4>
            <Form
              form={basicForm}
              spacing='normal'
              className='max-w-sm'
            />
          </div>
          <div>
            <h4 className='font-medium mb-4'>Tight Spacing</h4>
            <Form
              form={basicForm.slice(0, 2)}
              spacing='tight'
              className='max-w-sm'
            />
          </div>
        </div>
      ),
    },
  ];

  const formProps = [
    {
      name: 'form',
      type: 'FormField[]',
      description: 'Array of form fields created using FormFactories.',
      required: true,
    },
    {
      name: 'initialData',
      type: 'FormData',
      description: 'Initial data to populate the form fields.',
    },
    {
      name: 'onDataChange',
      type: '(data: FormData) => void',
      description: 'Callback fired when form data changes.',
    },
    {
      name: 'onSubmit',
      type: '(data: FormData) => void',
      description: 'Callback fired when form is submitted with valid data.',
    },
    {
      name: 'submitButton',
      type: 'React.ReactNode',
      description: 'Submit button element to render at the bottom of the form.',
    },
    {
      name: 'spacing',
      type: '"tight" | "normal" | "loose"',
      default: '"normal"',
      description: 'Spacing between form fields.',
    },
    {
      name: 'columns',
      type: '1 | 2 | 3 | 4',
      default: '1',
      description: 'Number of columns in the form grid layout.',
    },
    {
      name: 'responsive',
      type: 'boolean',
      default: 'true',
      description: 'Whether to collapse to single column on mobile devices.',
    },
    {
      name: 'className',
      type: 'string',
      description: 'Additional CSS classes to apply to the form element.',
    },
    {
      name: 'id',
      type: 'string',
      description: 'HTML id attribute for the form element.',
    },
  ];

  return (
    <ComponentPage
      title='Form'
      description='A flexible form component that uses a factory pattern to create different field types with built-in validation and state management. Supports multi-column layouts and responsive design.'
      tableOfContents={tableOfContents}
      usageInstructions='The Form component uses FormFactories to create structured forms with validation. Import FormFactories and destructure the field types you need (input, textarea, select, checkbox, radio). Each factory function returns a field configuration object that defines the field behavior and validation. The Form component handles state management, validation, and layout automatically.'
      importStatement="import { Form, FormFactories, FormData } from '@moondreamsdev/dreamer-ui/components';"
      componentProps={formProps}
      examples={formExamples}
    />
  );
}