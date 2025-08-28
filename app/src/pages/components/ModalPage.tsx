import { useState } from 'react';
import { Button, Modal, Input } from '@moondreamsdev/dreamer-ui/components';
import { ComponentPage } from '../../components/layout/ComponentPage';
import { ExampleSection } from '../../components/ui/ExampleSection';

export const ModalPage = () => {
  const [modalsOpen, setModalsOpen] = useState<Record<string, boolean>>({
    basic: false,
    withTitle: false,
    contentOnly: false,
    withForm: false,
    withActions: false,
    noCloseButton: false,
  });

  const openModal = (modalId: string) => {
    setModalsOpen((prev) => ({ ...prev, [modalId]: true }));
  };

  const closeModal = (modalId: string) => {
    setModalsOpen((prev) => ({ ...prev, [modalId]: false }));
  };

  return (
    <ComponentPage
      title='Modal'
      description='A flexible modal component for overlaying content, forms, and interactive elements on top of your main interface.'
    >
      <ExampleSection 
        title='Basic Modals'
        description='Simple modal examples with different configurations.'
      >
        <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
          <Button onClick={() => openModal('basic')}>Basic Modal</Button>
          <Button onClick={() => openModal('withTitle')} variant='secondary'>With Title</Button>
          <Button onClick={() => openModal('contentOnly')} variant='tertiary'>Content Only</Button>
        </div>

        {/* Basic Modal */}
        <Modal
          isOpen={modalsOpen.basic}
          onClose={() => closeModal('basic')}
          className='bg-white dark:bg-gray-800 rounded-lg'
          overlayClassName='backdrop-blur-xs'
        >
          <div className='p-6'>
            <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
              Basic Modal
            </h3>
            <p className='text-gray-600 dark:text-gray-300 mb-6'>
              This is a simple modal with custom overlay blur effect. You can click outside or press Escape to close it.
            </p>
            <div className='flex justify-end'>
              <Button onClick={() => closeModal('basic')} variant='outline'>
                Close
              </Button>
            </div>
          </div>
        </Modal>

        {/* Modal with Title */}
        <Modal
          isOpen={modalsOpen.withTitle}
          onClose={() => closeModal('withTitle')}
          title='Modal with Built-in Title'
          className='bg-white dark:bg-gray-800 rounded-lg'
        >
          <div className='p-6'>
            <p className='text-gray-600 dark:text-gray-300 mb-6'>
              This modal uses the built-in title prop for consistent styling and layout.
            </p>
            <div className='flex justify-end'>
              <Button onClick={() => closeModal('withTitle')} variant='outline'>
                Close
              </Button>
            </div>
          </div>
        </Modal>

        {/* Content Only Modal */}
        <Modal isOpen={modalsOpen.contentOnly} onClose={() => closeModal('contentOnly')} contentOnly>
          <div className='bg-gradient-to-br from-primary to-accent rounded-xl p-8 text-white shadow-2xl max-w-md mx-auto'>
            <h3 className='text-2xl font-bold mb-4'>Content Only</h3>
            <p className='mb-6 opacity-90'>
              This modal removes all default styling, giving you complete control over the appearance.
            </p>
            <Button 
              onClick={() => closeModal('contentOnly')} 
              className='bg-white/20 hover:bg-white/30 border-white/30'
            >
              Close
            </Button>
          </div>
        </Modal>
      </ExampleSection>

      <ExampleSection 
        title='Interactive Modals'
        description='Modals with forms, actions, and complex interactions.'
      >
        <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
          <Button onClick={() => openModal('withForm')} variant='outline'>Modal with Form</Button>
          <Button onClick={() => openModal('withActions')} variant='outline'>With Actions</Button>
          <Button onClick={() => openModal('noCloseButton')} variant='outline'>No Close Button</Button>
        </div>

        {/* Modal with Form */}
        <Modal
          isOpen={modalsOpen.withForm}
          onClose={() => closeModal('withForm')}
          title='Create New Project'
          className='bg-white dark:bg-gray-800 rounded-lg p-6'
        >
          <div className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
                Project Name
              </label>
              <Input placeholder='Enter project name' />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
                Description
              </label>
              <Input placeholder='Project description (optional)' />
            </div>
            <div className='flex justify-end gap-2 mt-6'>
              <Button onClick={() => closeModal('withForm')} variant='outline'>
                Cancel
              </Button>
              <Button onClick={() => closeModal('withForm')}>
                Create Project
              </Button>
            </div>
          </div>
        </Modal>

        {/* Modal with Actions */}
        <Modal
          isOpen={modalsOpen.withActions}
          onClose={() => closeModal('withActions')}
          title='Save Changes?'
          actions={[
            {
              label: 'Publish',
              onClick: () => {
                alert('Published successfully!');
                closeModal('withActions');
              },
              variant: 'primary' as const,
            },
            {
              label: 'Save Draft',
              onClick: () => {
                alert('Saved as draft!');
                closeModal('withActions');
              },
              variant: 'outline' as const,
            },
            {
              label: 'Cancel',
              onClick: () => closeModal('withActions'),
              variant: 'outline' as const,
            },
          ]}
          className='bg-white dark:bg-gray-800 rounded-lg'
        >
          <p className='text-gray-600 dark:text-gray-300'>
            You have unsaved changes. Would you like to save them before leaving?
          </p>
          <div className='mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded'>
            <p className='text-sm text-gray-500 dark:text-gray-400'>
              💡 Tip: Use the actions prop to define modal buttons with consistent styling.
            </p>
          </div>
        </Modal>

        {/* Modal without Close Button */}
        <Modal
          isOpen={modalsOpen.noCloseButton}
          onClose={() => closeModal('noCloseButton')}
          title='Processing...'
          hideCloseButton={true}
          actions={[
            {
              label: 'Cancel',
              onClick: () => closeModal('noCloseButton'),
              variant: 'outline' as const,
            },
          ]}
          className='bg-white dark:bg-gray-800 rounded-lg'
          disableCloseOnOverlayClick={true}
        >
          <div className='text-center py-4'>
            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4'></div>
            <p className='text-gray-600 dark:text-gray-300'>
              Please wait while we process your request...
            </p>
          </div>
        </Modal>
      </ExampleSection>

      <ExampleSection 
        title='Props Reference'
        description='Available props and their usage.'
      >
        <div className='bg-gray-700 p-4 rounded-lg'>
          <pre className='text-sm text-gray-300 overflow-x-auto'>
{`interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string | React.ReactNode;
  children: React.ReactNode;
  contentOnly?: boolean;
  hideCloseButton?: boolean;
  disableCloseOnOverlayClick?: boolean;
  disableCloseOnEscape?: boolean;
  className?: string;
  overlayClassName?: string;
  actions?: Array<{
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary' | 'outline' | 'destructive';
    disabled?: boolean;
  }>;
}`}
          </pre>
        </div>
      </ExampleSection>

      <ExampleSection 
        title='Usage Tips'
        description='Best practices and common patterns.'
      >
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='bg-gray-700 p-4 rounded-lg'>
            <h4 className='text-white font-semibold mb-2'>✅ Good Practices</h4>
            <ul className='text-gray-300 text-sm space-y-1'>
              <li>• Use descriptive titles for clarity</li>
              <li>• Keep modal content focused and concise</li>
              <li>• Provide clear actions (Cancel/Save)</li>
              <li>• Use contentOnly for custom designs</li>
              <li>• Handle loading states appropriately</li>
            </ul>
          </div>
          <div className='bg-gray-700 p-4 rounded-lg'>
            <h4 className='text-white font-semibold mb-2'>⚠️ Avoid</h4>
            <ul className='text-gray-300 text-sm space-y-1'>
              <li>• Nested modals (use panels instead)</li>
              <li>• Too much content causing scroll</li>
              <li>• Unclear or missing actions</li>
              <li>• Blocking all close methods</li>
              <li>• Poor mobile responsiveness</li>
            </ul>
          </div>
        </div>
      </ExampleSection>
    </ComponentPage>
  );
};
