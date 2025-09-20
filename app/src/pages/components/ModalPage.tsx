import { useState } from 'react';
import { Button, Modal } from '@moondreamsdev/dreamer-ui/components';
import { ComponentPage } from '../../components/layout/ComponentPage';

const tableOfContents = [
  { id: 'import', title: 'Import', level: 1 },
  { id: 'examples', title: 'Examples', level: 1 },
  { id: 'basic-usage', title: 'Basic Usage', level: 2 },
  { id: 'with-title', title: 'With Title', level: 2 },
  { id: 'props', title: 'Props', level: 1 },
];

const modalExamples = [
  {
    id: 'basic-usage',
    title: 'Basic Usage',
    description: 'Simple modal examples with different configurations.',
    code: `const [isOpen, setIsOpen] = useState(false);

return (
  <>
    <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <p>This is a basic modal with some content.</p>
    </Modal>
  </>
);`,
    children: (
      <BasicModalExample />
    ),
  },
];

function BasicModalExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="p-4">
          <p>This is a basic modal with some content.</p>
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
    type: 'string',
    description: 'Optional title for the modal header.',
  },
  {
    name: 'size',
    type: '"sm" | "md" | "lg" | "xl"',
    default: '"md"',
    description: 'The size of the modal.',
  },
  {
    name: 'closeOnEscape',
    type: 'boolean',
    default: 'true',
    description: 'Whether the modal can be closed with the Escape key.',
  },
  {
    name: 'closeOnBackdrop',
    type: 'boolean',
    default: 'true',
    description: 'Whether clicking the backdrop closes the modal.',
  },
  {
    name: 'className',
    type: 'string',
    description: 'Additional CSS classes to apply to the modal.',
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'The content to display inside the modal.',
    required: true,
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
