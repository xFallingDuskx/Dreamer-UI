import { Button } from '@moondreamsdev/dreamer-ui/components';
import { useToast } from '@moondreamsdev/dreamer-ui/hooks';
import { ComponentPage } from '../../components/layout/ComponentPage';
import { ExampleSection } from '../../components/ui/ExampleSection';

const tableOfContents = [
  { id: 'installation-setup', title: 'Installation & Setup', level: 1 },
  { id: 'basic-toast-types', title: 'Basic Toast Types', level: 1 },
  { id: 'advanced-features', title: 'Advanced Features', level: 1 },
  { id: 'provider-configuration', title: 'Provider Configuration', level: 1 },
  { id: 'api-reference', title: 'API Reference', level: 1 },
];

export function UseToastPage() {
  const { addToast } = useToast();

  const showInfoToast = () => {
    addToast({
      title: 'Information',
      description: 'This is an informational toast message.',
      type: 'info',
    });
  };

  const showSuccessToast = () => {
    addToast({
      title: 'Success',
      description: 'Your changes have been saved successfully!',
      type: 'info',
    });
  };

  const showWarningToast = () => {
    addToast({
      title: 'Warning',
      description: 'Please review your input before proceeding.',
      type: 'warning',
    });
  };

  const showErrorToast = () => {
    addToast({
      title: 'Error',
      description: 'Something went wrong. Please try again.',
      type: 'error',
    });
  };

  const showToastWithAction = () => {
    addToast({
      title: 'Action Required',
      description: 'Your session will expire soon.',
      type: 'info',
      action: {
        label: 'Extend',
        onClick: () => console.log('Session extended!'),
      },
    });
  };

  const showPersistentToast = () => {
    addToast({
      title: 'Persistent Toast',
      description: 'This toast will not auto-dismiss.',
      duration: 0, // 0 means it won't auto-dismiss
    });
  };

  return (
    <ComponentPage
      title='useToast'
      description='A React hook for displaying toast notifications with different types, actions, and customizable duration.'
      tableOfContents={tableOfContents}
    >
      <ExampleSection 
        title='Installation & Setup'
        description='Import the hook and set up the required provider.'
        id='installation-setup'
      >
        <div className='space-y-4'>
          <div className='bg-gray-700 p-4 rounded-lg'>
            <h4 className='text-white font-semibold mb-2'>Import</h4>
            <code className='text-primary text-sm'>
              import &#123; useToast &#125; from '@moondreamsdev/dreamer-ui/hooks';
            </code>
          </div>
          <div className='bg-gray-700 p-4 rounded-lg'>
            <h4 className='text-white font-semibold mb-2'>Provider Setup</h4>
            <pre className='text-sm text-gray-300 overflow-x-auto'>
{`import { ToastProvider } from '@moondreamsdev/dreamer-ui/providers';

function App() {
  return (
    <ToastProvider position='top-right'>
      <YourAppContent />
    </ToastProvider>
  );
}`}
            </pre>
          </div>
        </div>
      </ExampleSection>

      <ExampleSection 
        title='Basic Toast Types'
        description='Different types of toast notifications for various use cases.'
        id='basic-toast-types'
      >
        <div className='space-y-4'>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-2'>
            <Button onClick={showInfoToast} size='fitted'>
              Info Toast
            </Button>
            <Button onClick={showSuccessToast} size='fitted' variant='secondary'>
              Success Toast
            </Button>
            <Button onClick={showWarningToast} size='fitted' variant='tertiary'>
              Warning Toast
            </Button>
            <Button onClick={showErrorToast} size='fitted' variant='destructive'>
              Error Toast
            </Button>
          </div>
          <div className='bg-gray-700 p-4 rounded-lg'>
            <h4 className='text-white font-semibold mb-2'>Code Example</h4>
            <pre className='text-sm text-gray-300 overflow-x-auto'>
{`const { addToast } = useToast();

// Different toast types
addToast({
  title: 'Success',
  description: 'Operation completed successfully!',
  type: 'info' // or 'warning', 'error'
});`}
            </pre>
          </div>
        </div>
      </ExampleSection>

      <ExampleSection 
        title='Advanced Features'
        description='Toast notifications with actions and custom durations.'
        id='advanced-features'
      >
        <div className='space-y-4'>
          <div className='flex gap-4'>
            <Button onClick={showToastWithAction} variant='outline'>
              Toast with Action
            </Button>
            <Button onClick={showPersistentToast} variant='outline'>
              Persistent Toast
            </Button>
          </div>
          <div className='bg-gray-700 p-4 rounded-lg'>
            <h4 className='text-white font-semibold mb-2'>Toast with Action</h4>
            <pre className='text-sm text-gray-300 overflow-x-auto'>
{`addToast({
  title: 'File uploaded',
  description: 'Your file has been uploaded successfully.',
  action: {
    label: 'View',
    onClick: () => window.open('/files')
  }
});`}
            </pre>
          </div>
          <div className='bg-gray-700 p-4 rounded-lg'>
            <h4 className='text-white font-semibold mb-2'>Custom Duration</h4>
            <pre className='text-sm text-gray-300 overflow-x-auto'>
{`// Auto-dismiss after 10 seconds
addToast({
  title: 'Custom Duration',
  description: 'This toast lasts 10 seconds.',
  duration: 10000
});

// Persistent toast (no auto-dismiss)
addToast({
  title: 'Persistent',
  description: 'Manual dismiss only.',
  duration: 0
});`}
            </pre>
          </div>
        </div>
      </ExampleSection>

      <ExampleSection 
        title='Provider Configuration'
        description='Configure toast position and default behavior.'
        id='provider-configuration'
      >
        <div className='bg-gray-700 p-4 rounded-lg'>
          <h4 className='text-white font-semibold mb-2'>Provider Props</h4>
          <pre className='text-sm text-gray-300 overflow-x-auto'>
{`<ToastProvider
  position="top-right" // 'top-left', 'top-center', 'top-right', 
                       // 'bottom-left', 'bottom-center', 'bottom-right'
  maxToasts={5}        // Maximum number of toasts to show
  defaultDuration={5000} // Default auto-dismiss time
>
  <App />
</ToastProvider>`}
          </pre>
        </div>
      </ExampleSection>

      <ExampleSection 
        title='API Reference'
        description='Complete API documentation for the useToast hook.'
        id='api-reference'
      >
        <div className='space-y-4'>
          <div className='bg-gray-700 p-4 rounded-lg'>
            <h4 className='text-white font-semibold mb-2'>Hook Returns</h4>
            <pre className='text-sm text-gray-300 overflow-x-auto'>
{`interface UseToastReturn {
  addToast: (toast: ToastOptions) => void;
  removeToast: (id: string) => void;
  toasts: Toast[];
}`}
            </pre>
          </div>
          <div className='bg-gray-700 p-4 rounded-lg'>
            <h4 className='text-white font-semibold mb-2'>Toast Options</h4>
            <pre className='text-sm text-gray-300 overflow-x-auto'>
{`interface ToastOptions {
  title?: string;
  description: string;
  type?: 'info' | 'warning' | 'error';
  duration?: number; // milliseconds, 0 = no auto-dismiss
  action?: {
    label: string;
    onClick: () => void;
  };
}`}
            </pre>
          </div>
        </div>
      </ExampleSection>
    </ComponentPage>
  );
}
