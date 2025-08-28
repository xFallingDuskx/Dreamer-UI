import { ComponentPage } from '../components/layout/ComponentPage';
import { ExampleSection } from '../components/ui/ExampleSection';

export const UtilsPage = () => {
  return (
    <ComponentPage
      title='Utils'
      description='Utility functions that help you build better applications with clean and maintainable code.'
    >
      <ExampleSection 
        title='join'
        description='A utility function for conditionally joining CSS class names.'
      >
        <div className='space-y-4'>
          <div className='bg-gray-700 p-4 rounded-lg'>
            <h4 className='text-white font-semibold mb-2'>Import</h4>
            <code className='text-primary text-sm'>
              import &#123; join &#125; from '@moondreamsdev/dreamer-ui/utils';
            </code>
          </div>
          <div className='bg-gray-700 p-4 rounded-lg'>
            <h4 className='text-white font-semibold mb-2'>Usage</h4>
            <pre className='text-sm text-gray-300 overflow-x-auto'>
{`// Basic usage
join('base-class', 'another-class') 
// → 'base-class another-class'

// Conditional classes
join('base-class', isActive && 'active', 'final-class')
// → 'base-class active final-class' (if isActive is true)
// → 'base-class final-class' (if isActive is false)

// With arrays
join(['class-1', 'class-2'], 'class-3')
// → 'class-1 class-2 class-3'

// Filtering out falsy values
join('base', null, undefined, false, 'valid')
// → 'base valid'`}
            </pre>
          </div>
        </div>
      </ExampleSection>

      <ExampleSection 
        title='Common Patterns'
        description='How to use the join utility in real-world scenarios.'
      >
        <div className='space-y-4'>
          <div className='bg-gray-700 p-4 rounded-lg'>
            <h4 className='text-white font-semibold mb-2'>Component Variants</h4>
            <pre className='text-sm text-gray-300 overflow-x-auto'>
{`const Button = ({ variant, size, className, ...props }) => {
  return (
    <button
      className={join(
        'base-button-styles',
        variant === 'primary' && 'primary-styles',
        variant === 'secondary' && 'secondary-styles',
        size === 'sm' && 'text-sm px-2 py-1',
        size === 'lg' && 'text-lg px-4 py-3',
        className
      )}
      {...props}
    />
  );
};`}
            </pre>
          </div>
          <div className='bg-gray-700 p-4 rounded-lg'>
            <h4 className='text-white font-semibold mb-2'>State-based Styling</h4>
            <pre className='text-sm text-gray-300 overflow-x-auto'>
{`const Card = ({ isSelected, isDisabled, className }) => {
  return (
    <div
      className={join(
        'card-base',
        isSelected && 'ring-2 ring-primary',
        isDisabled && 'opacity-50 cursor-not-allowed',
        !isDisabled && 'hover:shadow-lg',
        className
      )}
    >
      Content
    </div>
  );
};`}
            </pre>
          </div>
        </div>
      </ExampleSection>

      <ExampleSection 
        title='Why Use join?'
        description='Benefits of using this utility over template literals or other solutions.'
      >
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='bg-gray-700 p-4 rounded-lg'>
            <h4 className='font-semibold mb-2 text-destructive'>❌ Without join</h4>
            <pre className='text-sm text-gray-300 overflow-x-auto'>
{`// Can result in extra spaces
\`base \${condition ? 'active' : ''} final\`

// Hard to read with many conditions
\`base \${a ? 'a-class' : ''} \${b ? 'b-class' : ''}\``}
            </pre>
          </div>
          <div className='bg-gray-700 p-4 rounded-lg'>
            <h4 className='font-semibold mb-2 text-success'>✅ With join</h4>
            <pre className='text-sm text-gray-300 overflow-x-auto'>
{`// Clean output, no extra spaces
join('base', condition && 'active', 'final')

// Readable and maintainable
join('base', a && 'a-class', b && 'b-class')`}
            </pre>
          </div>
        </div>
      </ExampleSection>
    </ComponentPage>
  );
};
