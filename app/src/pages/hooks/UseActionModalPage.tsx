import { Button } from '@moondreamsdev/dreamer-ui/components';
import { useActionModal } from '@moondreamsdev/dreamer-ui/hooks';
import { ComponentPage } from '../../components/layout/ComponentPage';
import { ExampleSection } from '../../components/ui/ExampleSection';

export const UseActionModalPage = () => {
  const { alert, confirm } = useActionModal();

  const handleAlert = async () => {
    await alert({
      title: 'Success!',
      message: 'This is an example alert modal triggered by the useActionModal hook.',
    });
  };

  const handleConfirm = async () => {
    const result = await confirm({
      title: 'Confirm Action',
      message: 'Do you want to proceed with this action? This demonstrates the confirm functionality.',
    });
    if (result) {
      await alert({ message: 'You confirmed the action!' });
    }
  };

  const handleDestructiveConfirm = async () => {
    const result = await confirm({
      title: 'Delete Item',
      message: 'This will permanently delete the item. This action cannot be undone.',
      destructive: true,
      confirmText: 'Delete',
      cancelText: 'Keep',
    });
    if (result) {
      await alert({
        message: 'Item deleted successfully!',
        destructive: true,
      });
    }
  };

  return (
    <ComponentPage
      title='useActionModal'
      description='A React hook that provides programmatic access to alert and confirmation modals with async/await support.'
    >
      <ExampleSection 
        title='Installation & Setup'
        description='Import the hook and set up the required provider.'
      >
        <div className='space-y-4'>
          <div className='bg-gray-700 p-4 rounded-lg'>
            <h4 className='text-white font-semibold mb-2'>Import</h4>
            <code className='text-primary text-sm'>
              import &#123; useActionModal &#125; from '@moondreamsdev/dreamer-ui/hooks';
            </code>
          </div>
          <div className='bg-gray-700 p-4 rounded-lg'>
            <h4 className='text-white font-semibold mb-2'>Provider Setup</h4>
            <pre className='text-sm text-gray-300 overflow-x-auto'>
{`import { ActionModalProvider } from '@moondreamsdev/dreamer-ui/providers';

function App() {
  return (
    <ActionModalProvider>
      <YourAppContent />
    </ActionModalProvider>
  );
}`}
            </pre>
          </div>
        </div>
      </ExampleSection>

      <ExampleSection 
        title='Basic Usage'
        description='Simple alert and confirm examples.'
      >
        <div className='space-y-4'>
          <div className='flex gap-4'>
            <Button onClick={handleAlert}>
              Show Alert
            </Button>
            <Button onClick={handleConfirm} variant='secondary'>
              Show Confirm
            </Button>
          </div>
          <div className='bg-gray-700 p-4 rounded-lg'>
            <h4 className='text-white font-semibold mb-2'>Code Example</h4>
            <pre className='text-sm text-gray-300 overflow-x-auto'>
{`const { alert, confirm } = useActionModal();

// Show an alert
await alert({
  title: 'Success!',
  message: 'Operation completed successfully.'
});

// Show a confirmation dialog
const result = await confirm({
  title: 'Confirm Action',
  message: 'Are you sure you want to proceed?'
});

if (result) {
  // User clicked confirm
  console.log('User confirmed');
} else {
  // User clicked cancel or closed modal
  console.log('User cancelled');
}`}
            </pre>
          </div>
        </div>
      </ExampleSection>

      <ExampleSection 
        title='Advanced Options'
        description='Destructive actions and custom button text.'
      >
        <div className='space-y-4'>
          <div className='flex gap-4'>
            <Button onClick={handleDestructiveConfirm} variant='destructive'>
              Destructive Confirm
            </Button>
          </div>
          <div className='bg-gray-700 p-4 rounded-lg'>
            <h4 className='text-white font-semibold mb-2'>Destructive Actions</h4>
            <pre className='text-sm text-gray-300 overflow-x-auto'>
{`// Destructive confirmation with custom text
const result = await confirm({
  title: 'Delete Account',
  message: 'This action cannot be undone.',
  destructive: true,
  confirmText: 'Delete Account',
  cancelText: 'Keep Account'
});`}
            </pre>
          </div>
        </div>
      </ExampleSection>

      <ExampleSection 
        title='API Reference'
        description='Complete API documentation for the useActionModal hook.'
      >
        <div className='space-y-4'>
          <div className='bg-gray-700 p-4 rounded-lg'>
            <h4 className='text-white font-semibold mb-2'>Hook Returns</h4>
            <pre className='text-sm text-gray-300 overflow-x-auto'>
{`interface UseActionModalReturn {
  alert: (options: AlertOptions) => Promise<void>;
  confirm: (options: ConfirmOptions) => Promise<boolean>;
}`}
            </pre>
          </div>
          <div className='bg-gray-700 p-4 rounded-lg'>
            <h4 className='text-white font-semibold mb-2'>Options Interface</h4>
            <pre className='text-sm text-gray-300 overflow-x-auto'>
{`interface AlertOptions {
  title?: string;
  message: string | React.ReactNode;
  destructive?: boolean;
  confirmText?: string;
}

interface ConfirmOptions extends AlertOptions {
  cancelText?: string;
}`}
            </pre>
          </div>
        </div>
      </ExampleSection>
    </ComponentPage>
  );
};
