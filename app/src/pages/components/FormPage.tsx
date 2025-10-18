import { useState } from 'react';
import { ComponentPage } from '../../components/layout/ComponentPage';
import { Form, FormFactories, FormData, FormCustomFieldProps, Select, Button, Input } from '@moondreamsdev/dreamer-ui/components'

const tableOfContents = [
  { id: 'import', title: 'Import', level: 1 },
  { id: 'examples', title: 'Examples', level: 1 },
  { id: 'basic-usage', title: 'Basic Usage', level: 2 },
  { id: 'field-types', title: 'Field Types', level: 2 },
  { id: 'custom-fields', title: 'Custom Fields', level: 2 },
  { id: 'field-layout', title: 'Field Layout', level: 2 },
  { id: 'validation', title: 'Validation', level: 2 },
  { id: 'form-variants', title: 'Form Variants', level: 2 },
  { id: 'checkbox-group-select-all', title: 'Checkbox Group with Select All', level: 2 },
  { id: 'props', title: 'Props', level: 1 },
];

export function FormPage() {
  const [basicFormData, setBasicFormData] = useState<FormData>({});
  const [validationFormData, setValidationFormData] = useState<FormData>({});
  const [layoutFormData, setLayoutFormData] = useState<FormData>({});
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);
  const { input, textarea, select, checkbox, radio, checkboxGroup, custom } = FormFactories;

  // Custom field component for date picker
  const DatePickerField = ({ value, onValueChange, disabled, error }: FormCustomFieldProps<string>) => (
    <div>
      <Input
        type="date"
        value={value || ''}
        onChange={(e) => onValueChange(e.target.value)}
        disabled={disabled}
        errorMessage={error}
        variant="outline"
      />
    </div>
  );

  // Custom field component for select with add functionality
  const SelectWithAddField = ({ value, onValueChange, disabled, error }: FormCustomFieldProps<string>) => {
    const [options, setOptions] = useState([
      { text: 'Frontend Developer', value: 'frontend' },
      { text: 'Backend Developer', value: 'backend' },
      { text: 'Full Stack Developer', value: 'fullstack' },
      { text: 'DevOps Engineer', value: 'devops' }
    ]);
    const [showAddInput, setShowAddInput] = useState(false);
    const [newOption, setNewOption] = useState('');

    const handleAddOption = () => {
      if (newOption.trim()) {
        const newValue = newOption.toLowerCase().replace(/\s+/g, '-');
        const newOptionObj = { text: newOption.trim(), value: newValue };
        setOptions(prev => [...prev, newOptionObj]);
        setNewOption('');
        setShowAddInput(false);
        // Optionally auto-select the new option
        onValueChange(newValue);
      }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleAddOption();
      } else if (e.key === 'Escape') {
        setShowAddInput(false);
        setNewOption('');
      }
    };

    return (
      <div>
        <div className="flex gap-2">
          <div className="flex-1">
            <Select
              options={options}
              value={value as string || ''}
              onChange={onValueChange}
              placeholder="Select a role..."
              disabled={disabled}
            />
          </div>
          {!showAddInput && (
            <Button
              onClick={() => setShowAddInput(true)}
              disabled={disabled}
              variant="primary"
            >
              Add
            </Button>
          )}
        </div>
        
        {showAddInput && (
          <div className="flex gap-2 mt-2">
            <Input
              type="text"
              value={newOption}
              onChange={(e) => setNewOption(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Enter new role..."
              variant="outline"
              className="flex-1 h-10"
            />
            <Button
              onClick={handleAddOption}
              disabled={!newOption.trim()}
              variant="primary"
            >
              Save
            </Button>
            <Button
              onClick={() => {
                setShowAddInput(false);
                setNewOption('');
              }}
              variant="secondary"
            >
              Cancel
            </Button>
          </div>
        )}
        
        {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
      </div>
    );
  };

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
    }),
    checkboxGroup({
      name: 'skills',
      label: 'Skills',
      description: 'Select all that apply',
      options: [
        { value: 'javascript', label: 'JavaScript' },
        { value: 'typescript', label: 'TypeScript' },
        { value: 'react', label: 'React' },
        { value: 'nodejs', label: 'Node.js' }
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
    checkboxGroup({
      name: 'interests',
      label: 'Areas of Interest',
      description: 'Select at least 2 interests',
      required: true,
      options: [
        { value: 'frontend', label: 'Frontend Development' },
        { value: 'backend', label: 'Backend Development' },
        { value: 'mobile', label: 'Mobile Development' },
        { value: 'design', label: 'UI/UX Design' },
        { value: 'devops', label: 'DevOps' }
      ],
      isValid: (value: string[] | undefined) => {
        if (!value || value.length < 2) return { valid: false, message: 'Please select at least 2 areas of interest' };
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

  const customFieldsForm = [
    input({
      name: 'eventName',
      label: 'Event Name',
      placeholder: 'Enter event name',
      variant: 'outline',
      required: true
    }),
    custom({
      name: 'eventDate',
      label: 'Event Date',
      description: 'Select the date for your event',
      required: true,
      renderComponent: DatePickerField as unknown as (props: FormCustomFieldProps) => React.ReactNode,
      isValid: (value: unknown) => {
        if (!value) return { valid: false, message: 'Event date is required' };
        const selectedDate = new Date(value as string);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selectedDate < today) return { valid: false, message: 'Event date cannot be in the past' };
        return { valid: true };
      }
    }),
    custom({
      name: 'role',
      label: 'Job Role',
      description: 'Select your job role or add a new one',
      renderComponent: SelectWithAddField as unknown as (props: FormCustomFieldProps) => React.ReactNode,
      isValid: (value: unknown) => {
        if (!value) return { valid: true }; // Optional field
        return { valid: true };
      }
    }),
    textarea({
      name: 'description',
      label: 'Event Description',
      placeholder: 'Describe your event...',
      variant: 'outline',
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
            onDataChange={(data) => {
              console.log('Basic form data changed:', data);
              setBasicFormData(data);
            }}
            spacing='normal'
          />
        </div>
      ),
    },
    {
      id: 'field-types',
      title: 'Field Types',
      description: 'All available form field types created using FormFactories.',
      code: `const { input, textarea, select, checkbox, radio, checkboxGroup } = FormFactories;

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
      }),
      checkboxGroup({
        name: 'skills',
        label: 'Skills',
        description: 'Select all that apply',
        options: [
          { value: 'javascript', label: 'JavaScript' },
          { value: 'typescript', label: 'TypeScript' },
          { value: 'react', label: 'React' },
          { value: 'nodejs', label: 'Node.js' }
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
            onDataChange={(data) => console.log('Field types form data changed:', data)}
            spacing='normal'
          />
        </div>
      ),
    },
    {
      id: 'custom-fields',
      title: 'Custom Fields',
      description: 'Create custom field components using the renderComponent function for specialized inputs like date pickers, dynamic select fields with add functionality, and more.',
      code: `const { input, textarea, custom } = FormFactories;

// Custom date picker component
const DatePickerField = ({ value, onValueChange, disabled, error }: FormCustomFieldProps<string>) => (
  <div>
    <Input
      type="date"
      value={value as string || ''}
      onChange={(e) => onValueChange(e.target.value)}
      disabled={disabled}
      errorMessage={error}
      variant="outline"
    />
  </div>
);

// Custom select with add functionality
const SelectWithAddField = ({ value, onValueChange, disabled, error }: FormCustomFieldProps<string>) => {
  const [options, setOptions] = useState([
    { text: 'Frontend Developer', value: 'frontend' },
    { text: 'Backend Developer', value: 'backend' },
    { text: 'Full Stack Developer', value: 'fullstack' },
    { text: 'DevOps Engineer', value: 'devops' }
  ]);
  const [showAddInput, setShowAddInput] = useState(false);
  const [newOption, setNewOption] = useState('');

  const handleAddOption = () => {
    if (newOption.trim()) {
      const newValue = newOption.toLowerCase().replace(/\\s+/g, '-');
      const newOptionObj = { text: newOption.trim(), value: newValue };
      setOptions(prev => [...prev, newOptionObj]);
      setNewOption('');
      setShowAddInput(false);
      onValueChange(newValue);
    }
  };

  return (
    <div>
      <div className="flex gap-2">
        <div className="flex-1">
          <Select
            options={options}
            value={value as string || ''}
            onChange={onValueChange}
            placeholder="Select a role..."
            disabled={disabled}
          />
        </div>
        {!showAddInput && (
          <Button onClick={() => setShowAddInput(true)} disabled={disabled} variant="primary">
            Add
          </Button>
        )}
      </div>
      
      {showAddInput && (
        <div className="flex gap-2 mt-2">
          <Input
            type="text"
            value={newOption}
            onChange={(e) => setNewOption(e.target.value)}
            placeholder="Enter new role..."
            variant="outline"
            className="flex-1"
          />
          <Button onClick={handleAddOption} disabled={!newOption.trim()} variant="primary">
            Save
          </Button>
          <Button onClick={() => { setShowAddInput(false); setNewOption(''); }} variant="secondary">
            Cancel
          </Button>
        </div>
      )}
      
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};

<div className='max-w-md'>
  <Form
    form={[
      input({
        name: 'eventName',
        label: 'Event Name',
        placeholder: 'Enter event name',
        variant: 'outline',
        required: true
      }),
      custom({
        name: 'eventDate',
        label: 'Event Date',
        description: 'Select the date for your event',
        required: true,
        renderComponent: DatePickerField,
        isValid: (value: unknown) => {
          if (!value) return { valid: false, message: 'Event date is required' };
          const selectedDate = new Date(value as string);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          if (selectedDate < today) return { valid: false, message: 'Event date cannot be in the past' };
          return { valid: true };
        }
      }),
      custom({
        name: 'role',
        label: 'Job Role',
        description: 'Select your job role or add a new one',
        renderComponent: SelectWithAddField
      })
    ]}
    spacing='normal'
  />
</div>`,
      children: (
        <div className='max-w-md'>
          <Form
            form={customFieldsForm}
            spacing='normal'
            onDataChange={(data) => console.log('Custom fields form data changed:', data)}
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
              onDataChange={(data) => {
                console.log('Multi-column form data changed:', data);
                setLayoutFormData(data);
              }}
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
              onDataChange={(data) => console.log('Three-column form data changed:', data)}
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
      }),
      checkboxGroup({
        name: 'interests',
        label: 'Areas of Interest',
        description: 'Select at least 2 interests',
        required: true,
        options: [
          { value: 'frontend', label: 'Frontend Development' },
          { value: 'backend', label: 'Backend Development' },
          { value: 'mobile', label: 'Mobile Development' },
          { value: 'design', label: 'UI/UX Design' },
          { value: 'devops', label: 'DevOps' }
        ],
        isValid: (value: string[] | undefined) => {
          if (!value || value.length < 2) return { valid: false, message: 'Please select at least 2 areas of interest' };
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
            onDataChange={(data) => {
              console.log('Validation form data changed:', data);
              setValidationFormData(data);
            }}
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
              onDataChange={(data) => console.log('Form variants (normal) data changed:', data)}
              spacing='normal'
              className='max-w-sm'
            />
          </div>
          <div>
            <h4 className='font-medium mb-4'>Tight Spacing</h4>
            <Form
              form={basicForm.slice(0, 2)}
              onDataChange={(data) => console.log('Form variants (tight) data changed:', data)}
              spacing='tight'
              className='max-w-sm'
            />
          </div>
        </div>
      ),
    },
    {
      id: 'checkbox-group-select-all',
      title: 'Checkbox Group with Select All',
      description: 'Checkbox group with select all functionality to quickly select or deselect all options.',
      code: `<div className='max-w-md'>
  <Form
    form={[
      checkboxGroup({
        name: 'features',
        label: 'Available Features',
        description: 'Choose the features you want to enable',
        selectAll: true,
        options: [
          { value: 'notifications', label: 'Push Notifications' },
          { value: 'analytics', label: 'Analytics Tracking' },
          { value: 'darkmode', label: 'Dark Mode' },
          { value: 'exports', label: 'Data Export' },
          { value: 'integrations', label: 'Third-party Integrations' }
        ]
      })
    ]}
    spacing='normal'
  />
</div>`,
      children: (
        <div className='max-w-md'>
          <Form
            form={[
              checkboxGroup({
                name: 'features',
                label: 'Available Features',
                description: 'Choose the features you want to enable',
                selectAll: true,
                options: [
                  { value: 'notifications', label: 'Push Notifications' },
                  { value: 'analytics', label: 'Analytics Tracking' },
                  { value: 'darkmode', label: 'Dark Mode' },
                  { value: 'exports', label: 'Data Export' },
                  { value: 'integrations', label: 'Third-party Integrations' }
                ]
              })
            ]}
            onDataChange={(data) => console.log('Checkbox group select all form data changed:', data)}
            spacing='normal'
          />
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
      usageInstructions='The Form component uses FormFactories to create structured forms with validation. Import FormFactories and destructure the field types you need (input, textarea, select, checkbox, radio, and even custom). Each factory function returns a field configuration object that defines the field behavior and validation. The Form component handles state management, validation, and layout automatically.'
      importStatement="import { Form, FormFactories, FormData } from '@moondreamsdev/dreamer-ui/components';"
      componentProps={formProps}
      examples={formExamples}
    />
  );
}