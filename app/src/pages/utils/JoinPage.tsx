import { ComponentPage } from '../../components/layout/ComponentPage';
import { ExampleSection } from '../../components/ui/ExampleSection';

export const JoinPage = () => {
  return (
    <ComponentPage
      title='join'
      description='A utility function for conditionally joining CSS class names with proper handling of falsy values and arrays.'
    >
      <ExampleSection 
        title='Installation'
        description='Import the utility function.'
      >
        <div className='bg-gray-700 p-4 rounded-lg'>
          <h4 className='text-white font-semibold mb-2'>Import</h4>
          <code className='text-primary text-sm'>
            import &#123; join &#125; from '@moondreamsdev/dreamer-ui/utils';
          </code>
        </div>
      </ExampleSection>

      <ExampleSection 
        title='Basic Usage'
        description='Simple class name joining and conditional classes.'
      >
        <div className='space-y-4'>
          <div className='bg-gray-700 p-4 rounded-lg'>
            <h4 className='text-white font-semibold mb-2'>String Concatenation</h4>
            <pre className='text-sm text-gray-300 overflow-x-auto'>
{`join('base-class', 'another-class', 'final-class')
// Result: 'base-class another-class final-class'`}
            </pre>
          </div>
          <div className='bg-gray-700 p-4 rounded-lg'>
            <h4 className='text-white font-semibold mb-2'>Conditional Classes</h4>
            <pre className='text-sm text-gray-300 overflow-x-auto'>
{`const isActive = true;
const isDisabled = false;

join(
  'base-class',
  isActive && 'active-class',
  isDisabled && 'disabled-class',
  'always-present'
)
// Result: 'base-class active-class always-present'`}
            </pre>
          </div>
        </div>
      </ExampleSection>

      <ExampleSection 
        title='Advanced Features'
        description='Working with arrays and filtering falsy values.'
      >
        <div className='space-y-4'>
          <div className='bg-gray-700 p-4 rounded-lg'>
            <h4 className='text-white font-semibold mb-2'>Array Support</h4>
            <pre className='text-sm text-gray-300 overflow-x-auto'>
{`join(['class-1', 'class-2'], 'class-3', ['class-4'])
// Result: 'class-1 class-2 class-3 class-4'`}
            </pre>
          </div>
          <div className='bg-gray-700 p-4 rounded-lg'>
            <h4 className='text-white font-semibold mb-2'>Falsy Value Filtering</h4>
            <pre className='text-sm text-gray-300 overflow-x-auto'>
{`join(
  'base',
  null,
  undefined,
  false,
  '',
  0,
  'valid-class'
)
// Result: 'base valid-class'
// All falsy values are automatically filtered out`}
            </pre>
          </div>
        </div>
      </ExampleSection>

      <ExampleSection 
        title='Real-World Examples'
        description='Practical usage patterns in React components.'
      >
        <div className='space-y-4'>
          <div className='bg-gray-700 p-4 rounded-lg'>
            <h4 className='text-white font-semibold mb-2'>Component Variants</h4>
            <pre className='text-sm text-gray-300 overflow-x-auto'>
{`const Button = ({ variant, size, disabled, className, ...props }) => {
  const buttonClass = join(
    // Base styles
    'inline-flex items-center justify-center rounded-md font-medium',
    'focus:outline-none focus:ring-2',
    
    // Variant styles
    variant === 'primary' && 'bg-primary text-primary-foreground',
    variant === 'secondary' && 'bg-secondary text-secondary-foreground',
    variant === 'outline' && 'border border-gray-300 bg-transparent',
    
    // Size styles
    size === 'sm' && 'px-3 py-1.5 text-sm',
    size === 'md' && 'px-4 py-2',
    size === 'lg' && 'px-6 py-3 text-lg',
    
    // State styles
    disabled && 'opacity-50 cursor-not-allowed',
    !disabled && 'hover:opacity-90',
    
    // Custom className
    className
  );

  return <button className={buttonClass} disabled={disabled} {...props} />;
};`}
            </pre>
          </div>
          <div className='bg-gray-700 p-4 rounded-lg'>
            <h4 className='text-white font-semibold mb-2'>Dynamic State Classes</h4>
            <pre className='text-sm text-gray-300 overflow-x-auto'>
{`const Card = ({ 
  isSelected, 
  isLoading, 
  hasError, 
  variant = 'default',
  className 
}) => {
  return (
    <div
      className={join(
        // Base card styles
        'rounded-lg border p-6 shadow-sm',
        
        // Variant styles
        variant === 'default' && 'bg-white border-gray-200',
        variant === 'dark' && 'bg-gray-800 border-gray-700',
        
        // State-based styles
        isSelected && 'ring-2 ring-primary border-primary',
        isLoading && 'opacity-60 pointer-events-none',
        hasError && 'border-destructive bg-destructive/5',
        
        // Interactive styles (only when not loading)
        !isLoading && 'hover:shadow-md transition-shadow',
        
        // Custom className
        className
      )}
    >
      {/* Card content */}
    </div>
  );
};`}
            </pre>
          </div>
        </div>
      </ExampleSection>

      <ExampleSection 
        title='Comparison with Alternatives'
        description='Why use join over template literals or other solutions.'
      >
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='bg-red-900/20 border border-red-800 p-4 rounded-lg'>
            <h4 className='font-semibold mb-2 text-red-400'>❌ Template Literals</h4>
            <pre className='text-sm text-gray-300 overflow-x-auto'>
{`// Problems with template literals:
// - Extra spaces when conditions are false
// - Hard to read with many conditions
// - No automatic falsy value filtering

\`base \${condition ? 'active' : ''} final\`
// Result: 'base  final' (extra space!)

\`\${baseClass} \${a ? 'a' : ''} \${b ? 'b' : ''} \${c ? 'c' : ''}\`
// Hard to read and maintain`}
            </pre>
          </div>
          <div className='bg-green-900/20 border border-green-800 p-4 rounded-lg'>
            <h4 className='font-semibold mb-2 text-green-400'>✅ join Function</h4>
            <pre className='text-sm text-gray-300 overflow-x-auto'>
{`// Benefits of join:
// - Clean output, no extra spaces
// - Readable and maintainable
// - Automatic falsy value filtering
// - Array support

join('base', condition && 'active', 'final')
// Result: 'base active final' OR 'base final'

join(baseClass, a && 'a', b && 'b', c && 'c')
// Clean and easy to understand`}
            </pre>
          </div>
        </div>
      </ExampleSection>

      <ExampleSection 
        title='API Reference'
        description='Function signature and behavior.'
      >
        <div className='bg-gray-700 p-4 rounded-lg'>
          <h4 className='text-white font-semibold mb-2'>Function Signature</h4>
          <pre className='text-sm text-gray-300 overflow-x-auto'>
{`function join(...classes: Array<string | string[] | false | null | undefined>): string

// Parameters:
// - ...classes: Any number of arguments that can be:
//   - string: Added to the result
//   - string[]: Array of strings, each added to result
//   - false | null | undefined: Ignored (filtered out)
//
// Returns:
// - string: Space-separated class names with duplicates preserved`}
          </pre>
        </div>
      </ExampleSection>
    </ComponentPage>
  );
};
