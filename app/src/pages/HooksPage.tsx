import { ComponentPage } from '../components/layout/ComponentPage';
import { ExampleSection } from '../components/ui/ExampleSection';

export const HooksPage = () => {
  return (
    <ComponentPage
      title='Hooks'
      description='Custom React hooks that provide additional functionality and state management for your components.'
    >
      <ExampleSection 
        title='useActionModal'
        description='A hook for programmatically displaying alert and confirmation modals.'
      >
        <div className='space-y-4'>
          <div className='bg-gray-700 p-4 rounded-lg'>
            <h4 className='text-white font-semibold mb-2'>Import</h4>
            <code className='text-primary text-sm'>
              import &#123; useActionModal &#125; from '@moondreamsdev/dreamer-ui/hooks';
            </code>
          </div>
          <div className='bg-gray-700 p-4 rounded-lg'>
            <h4 className='text-white font-semibold mb-2'>Usage</h4>
            <pre className='text-sm text-gray-300 overflow-x-auto'>
{`const { alert, confirm } = useActionModal();

// Show an alert
await alert({
  title: 'Success!',
  message: 'Operation completed successfully.'
});

// Show a confirmation dialog
const result = await confirm({
  title: 'Delete Item',
  message: 'Are you sure you want to delete this item?',
  destructive: true
});`}
            </pre>
          </div>
        </div>
      </ExampleSection>

      <ExampleSection 
        title='useToast'
        description='A hook for displaying toast notifications to users.'
      >
        <div className='space-y-4'>
          <div className='bg-gray-700 p-4 rounded-lg'>
            <h4 className='text-white font-semibold mb-2'>Import</h4>
            <code className='text-primary text-sm'>
              import &#123; useToast &#125; from '@moondreamsdev/dreamer-ui/hooks';
            </code>
          </div>
          <div className='bg-gray-700 p-4 rounded-lg'>
            <h4 className='text-white font-semibold mb-2'>Usage</h4>
            <pre className='text-sm text-gray-300 overflow-x-auto'>
{`const { addToast } = useToast();

// Show different types of toasts
addToast({
  title: 'Success',
  description: 'Your changes have been saved.',
  type: 'info'
});

addToast({
  title: 'Error',
  description: 'Something went wrong.',
  type: 'error'
});`}
            </pre>
          </div>
        </div>
      </ExampleSection>

      <ExampleSection 
        title='Provider Requirements'
        description='These hooks require their respective providers to be set up in your app.'
      >
        <div className='bg-gray-700 p-4 rounded-lg'>
          <h4 className='text-white font-semibold mb-2'>Setup</h4>
          <pre className='text-sm text-gray-300 overflow-x-auto'>
{`import { ActionModalProvider, ToastProvider } from '@moondreamsdev/dreamer-ui/providers';

function App() {
  return (
    <ActionModalProvider>
      <ToastProvider>
        <YourAppContent />
      </ToastProvider>
    </ActionModalProvider>
  );
}`}
          </pre>
        </div>
      </ExampleSection>
    </ComponentPage>
  );
};
