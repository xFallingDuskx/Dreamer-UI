import { useState } from 'react';
import { Input } from '@moondreamsdev/dreamer-ui/components';
import { ComponentPage } from '../../components/layout/ComponentPage';
import { ExampleSection } from '../../components/ui/ExampleSection';

const tableOfContents = [
  { id: 'input-variants', title: 'Input Variants', level: 1 },
  { id: 'input-types', title: 'Input Types', level: 1 },
  { id: 'validation-states', title: 'Validation States', level: 1 },
  { id: 'special-states', title: 'Special States', level: 1 },
  { id: 'usage-examples', title: 'Usage Examples', level: 1 },
  { id: 'props-reference', title: 'Props Reference', level: 1 },
];

export function InputPage() {
  const [values, setValues] = useState({
    basic: '',
    password: '',
    number: '',
    email: '',
    file: '',
  });

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues(prev => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <ComponentPage
      title='Input'
      description='A flexible input component with multiple variants, validation states, and built-in support for different input types.'
      tableOfContents={tableOfContents}
    >
      <ExampleSection 
        title='Input Variants'
        description='Different styling variants for various design needs.'
        id='input-variants'
      >
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <Input 
            placeholder='Default input' 
            value={values.basic}
            onChange={handleChange('basic')}
          />
          <Input 
            variant='underline' 
            placeholder='Underline variant'
            value={values.basic}
            onChange={handleChange('basic')}
          />
          <Input 
            variant='outline' 
            placeholder='Outline variant'
            value={values.basic}
            onChange={handleChange('basic')}
          />
          <Input 
            rounded='lg' 
            placeholder='Large rounded corners'
            value={values.basic}
            onChange={handleChange('basic')}
          />
        </div>
      </ExampleSection>

      <ExampleSection 
        title='Input Types'
        description='Different input types for various data collection needs.'
        id='input-types'
      >
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <Input 
            type='password' 
            placeholder='Enter password'
            value={values.password}
            onChange={handleChange('password')}
          />
          <Input 
            type='email' 
            placeholder='Enter email address'
            value={values.email}
            onChange={handleChange('email')}
          />
          <Input 
            type='number' 
            placeholder='Enter number'
            value={values.number}
            onChange={handleChange('number')}
            width={48}
          />
          <Input 
            type='file' 
            value={values.file}
            onChange={handleChange('file')}
          />
        </div>
      </ExampleSection>

      <ExampleSection 
        title='Validation States'
        description='Visual feedback for different input states.'
        id='validation-states'
      >
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <Input 
            variant='outline'
            placeholder='Valid input'
            successMessage='Looks good!'
            value='Valid data'
            onChange={handleChange('basic')}
          />
          <Input 
            variant='underline'
            placeholder='Invalid input'
            errorMessage='This field is required'
            value=''
            onChange={handleChange('basic')}
          />
        </div>
      </ExampleSection>

      <ExampleSection 
        title='Special States'
        description='Disabled and display-only modes for different use cases.'
        id='special-states'
      >
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <Input 
            disabled={true} 
            placeholder='Disabled input'
            value='Cannot edit this'
            onChange={handleChange('basic')}
          />
          <Input
            displayOnlyMode={true}
            value='Display only mode'
            onChange={handleChange('basic')}
            className='text-2xl text-primary'
          />
          <Input 
            displayOnlyMode={true} 
            placeholder='Display only placeholder'
            value=''
            onChange={handleChange('basic')}
          />
        </div>
      </ExampleSection>

      <ExampleSection 
        title='Usage Examples'
        description='Common input usage patterns in forms and applications.'
        id='usage-examples'
      >
        <div className='space-y-6'>
          <div className='bg-gray-700 p-6 rounded-lg'>
            <h4 className='text-white font-semibold mb-4'>Login Form</h4>
            <div className='space-y-4'>
              <Input 
                type='email'
                placeholder='Email address'
                variant='outline'
              />
              <Input 
                type='password'
                placeholder='Password'
                variant='outline'
              />
            </div>
          </div>
          
          <div className='bg-gray-700 p-6 rounded-lg'>
            <h4 className='text-white font-semibold mb-4'>Profile Form</h4>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <Input 
                placeholder='First name'
                variant='underline'
              />
              <Input 
                placeholder='Last name'
                variant='underline'
              />
              <Input 
                type='email'
                placeholder='Email'
                variant='underline'
              />
              <Input 
                type='tel'
                placeholder='Phone number'
                variant='underline'
              />
            </div>
          </div>
        </div>
      </ExampleSection>

      <ExampleSection 
        title='Props Reference'
        description='Available props and their usage.'
        id='props-reference'
      >
        <div className='bg-gray-700 p-4 rounded-lg'>
          <pre className='text-sm text-gray-300 overflow-x-auto'>
{`interface InputProps {
  variant?: 'base' | 'underline' | 'outline';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  errorMessage?: string;
  successMessage?: string;
  displayOnlyMode?: boolean;
  width?: number; // Custom width in rem units
  type?: 'text' | 'password' | 'email' | 'number' | 'file' | ...;
  disabled?: boolean;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  // ... and all standard HTML input props
}`}
          </pre>
        </div>
      </ExampleSection>
    </ComponentPage>
  );
}
