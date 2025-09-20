import { ComponentPage } from '../../components/layout/ComponentPage';

const tableOfContents = [
  { id: 'import', title: 'Import', level: 1 },
  { id: 'examples', title: 'Examples', level: 1 },
  { id: 'basic-usage', title: 'Basic Usage', level: 2 },
  { id: 'props', title: 'Props', level: 1 },
];

const actionModalProps = [
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
    description: 'The title of the action modal.',
  },
  {
    name: 'description',
    type: 'string',
    description: 'Description text for the modal.',
  },
  {
    name: 'primaryAction',
    type: '{ label: string; onClick: () => void; variant?: string }',
    description: 'Configuration for the primary action button.',
  },
  {
    name: 'secondaryAction',
    type: '{ label: string; onClick: () => void }',
    description: 'Configuration for the secondary action button.',
  },
  {
    name: 'className',
    type: 'string',
    description: 'Additional CSS classes to apply to the modal.',
  },
];

export function ActionModalPage() {
  return (
    <ComponentPage
      title='Action Modal'
      description='Modal component with built-in action buttons for confirmations and forms.'
      tableOfContents={tableOfContents}
      usageInstructions='The Action Modal component provides a pre-configured modal with action buttons, perfect for confirmations, alerts, and simple forms. It includes primary and secondary actions with customizable styling and behavior.'
      importStatement="import { ActionModal } from '@moondreamsdev/dreamer-ui/components';"
      componentProps={actionModalProps}
    />
  );
}