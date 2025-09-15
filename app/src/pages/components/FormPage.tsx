import { useState } from 'react';
import { ComponentPage } from '../../components/layout/ComponentPage';
import { ExampleSection } from '../../components/ui/ExampleSection';
import { Form, FormFactories, FormData } from '../../../form';

const tableOfContents = [
  { id: 'form-types', title: 'Form Types', level: 1 },
  { id: 'field-layout', title: 'Field Layout', level: 1 },
  { id: 'field-types', title: 'Field Types', level: 1 },
  { id: 'validation', title: 'Validation', level: 1 },
  { id: 'factories', title: 'Field Factories', level: 1 },
  { id: 'usage-examples', title: 'Usage Examples', level: 1 },
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
      isValid: (value: string) => {
        if (value.length < 3) return 'Username must be at least 3 characters';
        if (!/^[a-zA-Z0-9_]+$/.test(value)) return 'Username can only contain letters, numbers, and underscores';
        return true;
      }
    }),
    input({
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'Valid email format',
      required: true,
      variant: 'outline',
      isValid: (value: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Please enter a valid email address';
        return true;
      }
    }),
    input({
      name: 'age',
      label: 'Age',
      type: 'number',
      placeholder: 'Between 13-120',
      variant: 'outline',
      isValid: (value: string) => {
        if (!value) return true; // Optional field
        const age = parseInt(value);
        if (age < 13 || age > 120) return 'Age must be between 13 and 120';
        return true;
      }
    })
  ];

  const variantsForm = [
    input({
      name: 'outline',
      label: 'Outline Variant',
      placeholder: 'Outline style',
      variant: 'outline'
    }),
    input({
      name: 'underline',
      label: 'Underline Variant',
      placeholder: 'Underline style',
      variant: 'underline'
    }),
    input({
      name: 'base',
      label: 'Base Variant',
      placeholder: 'Base style',
      variant: 'base'
    })
  ];

  // Layout examples
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
      maxWidth: 'xs'
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

  const constrainedWidthForm = [
    input({
      name: 'quantity',
      label: 'Quantity',
      type: 'number',
      placeholder: '1',
      variant: 'outline',
      maxWidth: 'xs'
    }),
    input({
      name: 'price',
      label: 'Price',
      type: 'number',
      placeholder: '0.00',
      variant: 'outline',
      maxWidth: 'sm'
    }),
    input({
      name: 'productName',
      label: 'Product Name',
      placeholder: 'Enter product name',
      variant: 'outline',
      minWidth: 'md'
    })
  ];

  return (
    <ComponentPage
      title='Form'
      description='A flexible form component that uses a factory pattern to create different field types with built-in validation and state management.'
      tableOfContents={tableOfContents}
    >
      <ExampleSection 
        title='Form Types'
        description='Different form layouts and spacing configurations.'
        id='form-types'
      >
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          <div>
            <h4 className='font-medium mb-4'>Normal Spacing</h4>
            <div className='bg-gray-900/50 p-6 rounded-lg'>
              <Form
                form={basicForm}
                data={basicFormData}
                onDataChange={setBasicFormData}
                spacing='normal'
                className='max-w-sm'
              />
            </div>
          </div>
          <div>
            <h4 className='font-medium mb-4'>Tight Spacing</h4>
            <div className='bg-gray-900/50 p-6 rounded-lg'>
              <Form
                form={basicForm.slice(0, 2)}
                spacing='tight'
                className='max-w-sm'
              />
            </div>
          </div>
        </div>
      </ExampleSection>

      <ExampleSection 
        title='Field Layout'
        description='Multi-column layouts and responsive field arrangements with width constraints.'
        id='field-layout'
      >
        <div className='space-y-8'>
          <div>
            <h4 className='font-medium mb-4'>Multi-Column Layout (2 columns)</h4>
            <div className='bg-gray-900/50 p-6 rounded-lg'>
              <Form
                form={multiColumnForm}
                data={layoutFormData}
                onDataChange={setLayoutFormData}
                columns={2}
                spacing='normal'
              />
            </div>
          </div>
          
          <div>
            <h4 className='font-medium mb-4'>Width Constraints</h4>
            <div className='bg-gray-900/50 p-6 rounded-lg'>
              <Form
                form={constrainedWidthForm}
                columns={3}
                spacing='normal'
              />
            </div>
          </div>

          <div>
            <h4 className='font-medium mb-4'>Three Column Layout</h4>
            <div className='bg-gray-900/50 p-6 rounded-lg'>
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
        </div>
      </ExampleSection>

      <ExampleSection 
        title='Field Types'
        description='All available form field types and their configurations.'
        id='field-types'
      >
        <div className='bg-gray-900/50 p-6 rounded-lg'>
          <Form
            form={fieldTypesForm}
            spacing='normal'
            className='max-w-md'
          />
        </div>
      </ExampleSection>

      <ExampleSection 
        title='Validation'
        description='Custom validation functions to ensure data integrity and provide user feedback.'
        id='validation'
      >
        <div className='bg-gray-900/50 p-6 rounded-lg'>
          <Form
            form={validationForm}
            data={validationFormData}
            onDataChange={setValidationFormData}
            onSubmit={(data) => {
              setSubmittedData(data);
              console.log('Form submitted:', data);
            }}
            spacing='normal'
            className='max-w-md'
          />
          <button 
            type='submit'
            className='mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700'
          >
            Validate & Submit
          </button>
          
          {submittedData && (
            <div className='mt-4 p-4 bg-green-900/20 border border-green-800 rounded-lg'>
              <h5 className='font-medium text-green-300 mb-2'>Form Submitted Successfully:</h5>
              <pre className='text-sm text-green-200 overflow-auto'>
                {JSON.stringify(submittedData, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </ExampleSection>

      <ExampleSection 
        title='Field Factories'
        description='Factory functions for creating different types of form fields.'
        id='factories'
      >
        <div className='bg-gray-900/50 p-4 rounded-lg'>
          <div className='space-y-4 text-sm'>
            <div>
              <h5 className='font-medium mb-2'>Input Field</h5>
              <pre className='bg-gray-800 p-3 rounded text-gray-300 overflow-x-auto'>
{`const { input } = FormFactories;

input({
  name: 'username',
  label: 'Username',
  type: 'text', // 'text', 'email', 'password', etc.
  placeholder: 'Enter username',
  required: true,
  variant: 'outline',
  isValid: (value) => value.length >= 3 || 'Too short'
})`}
              </pre>
            </div>
            
            <div>
              <h5 className='font-medium mb-2'>Select Field</h5>
              <pre className='bg-gray-800 p-3 rounded text-gray-300 overflow-x-auto'>
{`const { select } = FormFactories;

select({
  name: 'country',
  label: 'Country',
  placeholder: 'Select country',
  options: [
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' }
  ],
  searchable: true,
  required: true
})`}
              </pre>
            </div>

            <div>
              <h5 className='font-medium mb-2'>Checkbox Field</h5>
              <pre className='bg-gray-800 p-3 rounded text-gray-300 overflow-x-auto'>
{`const { checkbox } = FormFactories;

checkbox({
  name: 'terms',
  label: 'Terms',
  text: 'I agree to the terms and conditions',
  required: true
})`}
              </pre>
            </div>
          </div>
        </div>
      </ExampleSection>

      <ExampleSection 
        title='Usage Examples'
        description='Different field variants and styling options.'
        id='usage-examples'
      >
        <div className='space-y-8'>
          <div>
            <h4 className='font-medium mb-4'>Input Variants</h4>
            <div className='bg-gray-900/50 p-6 rounded-lg'>
              <Form
                form={variantsForm}
                spacing='normal'
                className='max-w-md'
              />
            </div>
          </div>

          <div>
            <h4 className='font-medium mb-4'>Character Limit Textarea</h4>
            <div className='bg-gray-900/50 p-6 rounded-lg'>
              <Form
                form={[
                  textarea({
                    name: 'limitedText',
                    label: 'Limited Text',
                    placeholder: 'Maximum 200 characters',
                    description: 'This field has a character limit',
                    variant: 'outline',
                    characterLimit: 200,
                    rows: 4
                  })
                ]}
                spacing='normal'
                className='max-w-md'
              />
            </div>
          </div>
        </div>
      </ExampleSection>
    </ComponentPage>
  );
}