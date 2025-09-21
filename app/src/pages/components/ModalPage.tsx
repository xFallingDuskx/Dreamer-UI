import { useState } from 'react';
import { Button, Modal } from '@moondreamsdev/dreamer-ui/components';
import { ComponentPage } from '../../components/layout/ComponentPage';

const tableOfContents = [
  { id: 'import', title: 'Import', level: 1 },
  { id: 'examples', title: 'Examples', level: 1 },
  { id: 'basic-usage', title: 'Basic Usage', level: 2 },
  { id: 'with-title', title: 'With Title', level: 2 },
  { id: 'with-actions', title: 'With Actions', level: 2 },
  { id: 'backdrop-behavior', title: 'Backdrop Behavior', level: 2 },
  { id: 'content-only', title: 'Content Only Mode', level: 2 },
  { id: 'props', title: 'Props', level: 1 },
];

const modalExamples = [
  {
    id: 'basic-usage',
    title: 'Basic Usage',
    description: 'Simple modal with content and close functionality.',
    code: `function BasicModalExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="p-6">
          <p className="text-gray-300 mb-4">This is a basic modal with some content.</p>
          <Button onClick={() => setIsOpen(false)} variant="secondary">
            Close Modal
          </Button>
        </div>
      </Modal>
    </>
  );
}`,
    children: (
      <BasicModalExample />
    ),
  },
  {
    id: 'with-title',
    title: 'With Title',
    description: 'Modal with a title header and structured content.',
    code: `function TitledModalExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Titled Modal</Button>
      <Modal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        title="User Profile Settings"
      >
        <div className="p-6">
          <p className="text-gray-300 mb-4">
            Update your profile information and preferences.
          </p>
          <div className="flex gap-2">
            <Button variant="primary">Save Changes</Button>
            <Button onClick={() => setIsOpen(false)} variant="secondary">
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}`,
    children: (
      <TitledModalExample />
    ),
  },
  {
    id: 'with-actions',
    title: 'With Actions',
    description: 'Modal with action buttons defined in props.',
    code: `function ActionsModalExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal with Actions</Button>
      <Modal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        title="Confirm Action"
        actions={[
          {
            label: 'Cancel',
            variant: 'secondary',
            onClick: () => setIsOpen(false)
          },
          {
            label: 'Confirm',
            variant: 'primary',
            onClick: () => {
              console.log('Confirmed!');
              setIsOpen(false);
            }
          }
        ]}
      >
        <div>
          <p className="text-gray-300">
            Are you sure you want to proceed with this action?
          </p>
        </div>
      </Modal>
    </>
  );
}`,
    children: (
      <ActionsModalExample />
    ),
  },
  {
    id: 'backdrop-behavior',
    title: 'Backdrop Behavior',
    description: 'Control how modals respond to backdrop clicks.',
    code: `function BackdropModalExamples() {
  const [openModal, setOpenModal] = useState<string | null>(null);

  return (
    <div className="flex gap-4 flex-wrap">
      <Button onClick={() => setOpenModal('default')}>Default Behavior</Button>
      <Button onClick={() => setOpenModal('locked')}>Locked Modal</Button>
      
      <Modal 
        isOpen={openModal === 'default'} 
        onClose={() => setOpenModal(null)}
        title="Default Modal"
      >
        <div className="p-6">
          <p className="text-gray-300 mb-4">Click the backdrop or press Escape to close.</p>
          <Button onClick={() => setOpenModal(null)} variant="secondary">
            Close
          </Button>
        </div>
      </Modal>
      
      <Modal 
        isOpen={openModal === 'locked'} 
        onClose={() => setOpenModal(null)}
        disableCloseOnOverlayClick={true}
        title="Locked Modal"
      >
        <div className="p-6">
          <p className="text-gray-300 mb-4">This modal can't be closed by clicking the backdrop. Use the button or Escape key.</p>
          <Button onClick={() => setOpenModal(null)} variant="primary">
            Confirm & Close
          </Button>
        </div>
      </Modal>
    </div>
  );
}`,
    children: (
      <BackdropModalExamples />
    ),
  },
  {
    id: 'content-only',
    title: 'Content Only Mode',
    description: 'Modal with complete control over styling using contentOnly prop.',
    code: `function ContentOnlyModalExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Content-Only Modal</Button>
      <Modal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        contentOnly
      >
        <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl p-8 text-white shadow-2xl max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-4">Custom Styled Modal</h2>
          <p className="mb-6">
            This modal uses the contentOnly prop, giving you complete control over styling.
          </p>
          <Button 
            onClick={() => setIsOpen(false)}
            className="bg-white text-purple-600 hover:bg-gray-100"
          >
            Close
          </Button>
        </div>
      </Modal>
    </>
  );
}`,
    children: (
      <ContentOnlyModalExample />
    ),
  },
];

function BasicModalExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="p-6">
          <p className="text-gray-300 mb-4">This is a basic modal with some content.</p>
          <Button onClick={() => setIsOpen(false)} variant="secondary">
            Close Modal
          </Button>
        </div>
      </Modal>
    </>
  );
}

function TitledModalExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Titled Modal</Button>
      <Modal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        title="User Profile Settings"
      >
        <div className="p-6">
          <p className="text-gray-300 mb-4">
            Update your profile information and preferences.
          </p>
          <div className="flex gap-2">
            <Button variant="primary">Save Changes</Button>
            <Button onClick={() => setIsOpen(false)} variant="secondary">
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

function ActionsModalExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal with Actions</Button>
      <Modal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        title="Confirm Action"
        actions={[
          {
            label: 'Cancel',
            variant: 'secondary',
            onClick: () => setIsOpen(false)
          },
          {
            label: 'Confirm',
            variant: 'primary',
            onClick: () => {
              console.log('Confirmed!');
              setIsOpen(false);
            }
          }
        ]}
      >
        <div>
          <p className="text-gray-300">
            Are you sure you want to proceed with this action?
          </p>
        </div>
      </Modal>
    </>
  );
}

function BackdropModalExamples() {
  const [openModal, setOpenModal] = useState<string | null>(null);

  return (
    <div className="flex gap-4 flex-wrap">
      <Button onClick={() => setOpenModal('default')}>Default Behavior</Button>
      <Button onClick={() => setOpenModal('locked')}>Locked Modal</Button>
      
      <Modal 
        isOpen={openModal === 'default'} 
        onClose={() => setOpenModal(null)}
        title="Default Modal"
      >
        <div className="p-6">
          <p className="text-gray-300 mb-4">Click the backdrop or press Escape to close.</p>
          <Button onClick={() => setOpenModal(null)} variant="secondary">
            Close
          </Button>
        </div>
      </Modal>
      
      <Modal 
        isOpen={openModal === 'locked'} 
        onClose={() => setOpenModal(null)}
        disableCloseOnOverlayClick={true}
        title="Locked Modal"
      >
        <div className="p-6">
          <p className="text-gray-300 mb-4">This modal can't be closed by clicking the backdrop. Use the button or Escape key.</p>
          <Button onClick={() => setOpenModal(null)} variant="primary">
            Confirm & Close
          </Button>
        </div>
      </Modal>
    </div>
  );
}

function ContentOnlyModalExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Content-Only Modal</Button>
      <Modal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        contentOnly
      >
        <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl p-8 text-white shadow-2xl max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-4">Custom Styled Modal</h2>
          <p className="mb-6">
            This modal uses the contentOnly prop, giving you complete control over styling.
          </p>
          <Button 
            onClick={() => setIsOpen(false)}
            className="bg-white text-purple-600 hover:bg-gray-100"
          >
            Close
          </Button>
        </div>
      </Modal>
    </>
  );
}

const modalProps = [
  {
    name: 'isOpen',
    type: 'boolean',
    description: 'Whether the modal is open.',
    required: true,
  },
  {
    name: 'onClose',
    type: '() => void',
    description: 'Callback fired when the modal should close.',
    required: true,
  },
  {
    name: 'title',
    type: 'string | React.ReactNode',
    description: 'Optional title for the modal header.',
  },
  {
    name: 'contentOnly',
    type: 'boolean',
    default: 'false',
    description: 'When true, renders only the children with no default modal styling.',
  },
  {
    name: 'actions',
    type: 'ModalAction[]',
    description: 'Array of action buttons to display at the bottom of the modal.',
  },
  {
    name: 'hideCloseButton',
    type: 'boolean',
    default: 'false',
    description: 'Whether to hide the X close button in the top-right corner.',
  },
  {
    name: 'disableCloseOnOverlayClick',
    type: 'boolean',
    default: 'false',
    description: 'Whether clicking the backdrop/overlay closes the modal.',
  },
  {
    name: 'className',
    type: 'string',
    description: 'Additional CSS classes to apply to the modal content.',
  },
  {
    name: 'overlayClassName',
    type: 'string',
    description: 'Additional CSS classes to apply to the backdrop overlay.',
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'The content to display inside the modal.',
    required: true,
  },
  {
    name: 'id',
    type: 'string',
    description: 'Optional ID for the modal element.',
  },
  {
    name: 'ariaLabelledBy',
    type: 'string',
    description: 'ID of the element that labels the modal.',
  },
  {
    name: 'ariaDescribedBy',
    type: 'string',
    description: 'ID of the element that describes the modal.',
  },
];

export function ModalPage() {
  return (
    <ComponentPage
      title='Modal'
      description='A flexible modal component for overlaying content, forms, and interactive elements on top of your main interface.'
      tableOfContents={tableOfContents}
      usageInstructions='The Modal component creates an overlay that appears above your main content. Use it for forms, confirmations, detailed views, or any content that requires user attention. It includes backdrop handling, focus management, and keyboard navigation.'
      importStatement="import { Modal } from '@moondreamsdev/dreamer-ui/components';"
      componentProps={modalProps}
      examples={modalExamples}
    />
  );
}
