import { useState } from 'react';
import { ComponentPage } from '../../components/layout/ComponentPage';
import { ExampleSection } from '../../components/ui/ExampleSection';
import { ErrorBoundary } from '@moondreamsdev/dreamer-ui/components';

const tableOfContents = [
  { id: 'variants', title: 'Variants', level: 1 },
  { id: 'features', title: 'Features', level: 1 },
  { id: 'error-simulation', title: 'Error Simulation', level: 1 },
  { id: 'usage-examples', title: 'Usage Examples', level: 1 },
];

// Component that can throw errors for testing
const BuggyComponent = ({ shouldThrow = false }: { shouldThrow?: boolean }) => {
  const [hasError, setHasError] = useState(shouldThrow);

  if (hasError) {
    // This will trigger the ErrorBoundary
    throw new Error('Demo component intentionally threw an error!');
  }

  return (
    <div className='p-4 bg-gray-800 rounded text-gray-300'>
      <p>This component works normally.</p>
      <button
        className='mt-2 px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700'
        onClick={() => setHasError(true)}
      >
        Click to Trigger Error
      </button>
    </div>
  );
};

export function ErrorBoundaryPage() {
  return (
    <ComponentPage
      title='ErrorBoundary'
      description='A React error boundary component that catches JavaScript errors in child components and displays fallback UI. Essential for building robust applications with graceful error handling.'
      tableOfContents={tableOfContents}
    >
      <ExampleSection 
        title='Variants'
        description='Different visual styles for error boundaries to match the severity and context of errors.'
        id='variants'
      >
        <div className='space-y-6'>
          <div>
            <h4 className='text-lg font-medium mb-2'>Danger (Default)</h4>
            <ErrorBoundary variant='danger' fallbackMessage='A critical error occurred in the application.'>
              <div className='p-4 bg-gray-100 dark:bg-gray-800 rounded text-center'>
                ✅ This content is working fine.
              </div>
            </ErrorBoundary>
          </div>

          <div>
            <h4 className='text-lg font-medium mb-2'>Warning</h4>
            <ErrorBoundary variant='warning' fallbackMessage='A warning-level error was encountered.'>
              <div className='p-4 bg-gray-100 dark:bg-gray-800 rounded text-center'>
                ✅ This content is also working fine.
              </div>
            </ErrorBoundary>
          </div>

          <div>
            <h4 className='text-lg font-medium mb-2'>Info</h4>
            <ErrorBoundary variant='info' fallbackMessage='An informational error occurred.'>
              <div className='p-4 bg-gray-100 dark:bg-gray-800 rounded text-center'>
                ✅ This content is working as expected.
              </div>
            </ErrorBoundary>
          </div>
        </div>
      </ExampleSection>

      <ExampleSection 
        title='Features'
        description='Advanced features including retry functionality and custom fallback UI.'
        id='features'
      >
        <div className='space-y-6'>
          <div>
            <h4 className='text-lg font-medium mb-2'>Without Retry Button</h4>
            <ErrorBoundary variant='info' showRetry={false} fallbackMessage='No retry option available.'>
              <div className='p-4 bg-gray-100 dark:bg-gray-800 rounded text-center'>
                ✅ Content with no retry functionality.
              </div>
            </ErrorBoundary>
          </div>

          <div>
            <h4 className='text-lg font-medium mb-2'>Custom Fallback UI</h4>
            <ErrorBoundary
              fallback={
                <div className='p-6 bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500 rounded-lg text-center'>
                  <div className='text-purple-400 text-2xl mb-2'>🚨</div>
                  <h3 className='text-purple-400 font-semibold mb-2'>Custom Error Interface</h3>
                  <p className='text-purple-300'>This is a completely custom fallback UI that replaces the default error display.</p>
                  <button 
                    onClick={() => window.location.reload()} 
                    className='mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700'
                  >
                    Reload Page
                  </button>
                </div>
              }
            >
              <div className='p-4 bg-gray-100 dark:bg-gray-800 rounded text-center'>
                ✅ Content with custom fallback UI.
              </div>
            </ErrorBoundary>
          </div>
        </div>
      </ExampleSection>

      <ExampleSection 
        title='Error Simulation'
        description='Interactive examples that demonstrate error boundary behavior when errors occur.'
        id='error-simulation'
      >
        <div className='space-y-6'>
          <div>
            <h4 className='text-lg font-medium mb-2'>Click to Trigger Error</h4>
            <ErrorBoundary
              variant='danger'
              fallbackMessage='The demo component encountered an error!'
              onError={(error, errorInfo) => {
                console.log('Error caught by ErrorBoundary:', error);
                console.log('Error info:', errorInfo);
              }}
            >
              <BuggyComponent />
            </ErrorBoundary>
          </div>

          <div>
            <h4 className='text-lg font-medium mb-2'>Pre-triggered Error (Warning)</h4>
            <ErrorBoundary
              variant='warning'
              fallbackMessage='This component failed to render properly.'
              onRetry={() => {
                console.log('Retry button was clicked');
              }}
            >
              <BuggyComponent shouldThrow={true} />
            </ErrorBoundary>
          </div>
        </div>
      </ExampleSection>

      <ExampleSection 
        title='Usage Examples'
        description='Common patterns for implementing error boundaries in real applications.'
        id='usage-examples'
      >
        <div className='space-y-6'>
          <div>
            <h4 className='text-lg font-medium mb-2'>Form Section Protection</h4>
            <ErrorBoundary 
              variant='warning' 
              fallbackMessage='The form could not be loaded. Please refresh the page.'
            >
              <div className='p-4 border border-gray-300 dark:border-gray-700 rounded-lg space-y-4'>
                <h5 className='font-semibold'>User Profile Form</h5>
                <div className='space-y-2'>
                  <input 
                    type='text' 
                    placeholder='Full Name' 
                    className='w-full p-2 border rounded' 
                    defaultValue='John Doe'
                  />
                  <input 
                    type='email' 
                    placeholder='Email' 
                    className='w-full p-2 border rounded' 
                    defaultValue='john@example.com'
                  />
                  <button className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'>
                    Save Profile
                  </button>
                </div>
              </div>
            </ErrorBoundary>
          </div>

          <div>
            <h4 className='text-lg font-medium mb-2'>Widget Container</h4>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <ErrorBoundary variant='info' fallbackMessage='Widget failed to load'>
                <div className='p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded'>
                  <h5 className='font-semibold text-blue-800 dark:text-blue-200'>Analytics Widget</h5>
                  <p className='text-blue-600 dark:text-blue-300'>📊 Data visualization working normally</p>
                </div>
              </ErrorBoundary>
              
              <ErrorBoundary variant='info' fallbackMessage='Widget failed to load'>
                <div className='p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded'>
                  <h5 className='font-semibold text-green-800 dark:text-green-200'>Status Widget</h5>
                  <p className='text-green-600 dark:text-green-300'>✅ All systems operational</p>
                </div>
              </ErrorBoundary>
            </div>
          </div>

          <div>
            <h4 className='text-lg font-medium mb-2'>Route Protection</h4>
            <ErrorBoundary 
              variant='danger' 
              fallbackMessage='This page failed to load. Please try navigating to a different page.'
            >
              <div className='p-6 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg'>
                <h5 className='font-semibold mb-2'>Dashboard Content</h5>
                <p className='text-gray-600 dark:text-gray-400'>
                  This represents a complex page component that might fail to render due to 
                  data loading errors, component bugs, or network issues.
                </p>
                <div className='mt-4 flex gap-2'>
                  <span className='px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200 rounded text-sm'>
                    ✅ Component loaded successfully
                  </span>
                </div>
              </div>
            </ErrorBoundary>
          </div>
        </div>
      </ExampleSection>
    </ComponentPage>
  );
}