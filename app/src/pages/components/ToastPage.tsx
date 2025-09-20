import { Toast } from '@moondreamsdev/dreamer-ui/components';
import { ComponentPage } from '../../components/layout/ComponentPage';

const tableOfContents = [
  { id: 'import', title: 'Import', level: 1 },
  { id: 'examples', title: 'Examples', level: 1 },
  { id: 'variants', title: 'Variants', level: 2 },
  { id: 'with-actions', title: 'With Actions', level: 2 },
  { id: 'positions', title: 'Positions', level: 2 },
  { id: 'props', title: 'Props', level: 1 },
];

const toastExamples = [
  {
    id: 'variants',
    title: 'Variants',
    description: 'Different toast styles for various message types.',
    code: `<div className='space-y-4'>
  <Toast variant='success'>
    Your changes have been saved successfully!
  </Toast>
  <Toast variant='error'>
    An error occurred while processing your request.
  </Toast>
  <Toast variant='warning'>
    Please review your information before proceeding.
  </Toast>
  <Toast variant='info'>
    New updates are available for download.
  </Toast>
</div>`,
    children: (
      <div className='space-y-4'>
        <Toast variant='success'>
          Your changes have been saved successfully!
        </Toast>
        <Toast variant='error'>
          An error occurred while processing your request.
        </Toast>
        <Toast variant='warning'>
          Please review your information before proceeding.
        </Toast>
        <Toast variant='info'>
          New updates are available for download.
        </Toast>
      </div>
    ),
  },
  {
    id: 'with-actions',
    title: 'With Actions',
    description: 'Toasts with action buttons and dismiss functionality.',
    code: `<div className='space-y-4'>
  <Toast 
    variant='success' 
    action={{ label: 'View', onClick: () => console.log('View clicked') }}
    onDismiss={() => console.log('Dismissed')}
  >
    Message sent successfully!
  </Toast>
  <Toast 
    variant='error'
    action={{ label: 'Retry', onClick: () => console.log('Retry clicked') }}
    onDismiss={() => console.log('Dismissed')}
  >
    Failed to upload file.
  </Toast>
</div>`,
    children: (
      <div className='space-y-4'>
        <Toast 
          variant='success' 
          action={{ label: 'View', onClick: () => console.log('View clicked') }}
          onDismiss={() => console.log('Dismissed')}
        >
          Message sent successfully!
        </Toast>
        <Toast 
          variant='error'
          action={{ label: 'Retry', onClick: () => console.log('Retry clicked') }}
          onDismiss={() => console.log('Dismissed')}
        >
          Failed to upload file.
        </Toast>
      </div>
    ),
  },
];

const toastProps = [
  {
    name: 'variant',
    type: '"success" | "error" | "warning" | "info"',
    default: '"info"',
    description: 'The visual style variant of the toast.',
  },
  {
    name: 'title',
    type: 'string',
    description: 'Optional title for the toast message.',
  },
  {
    name: 'duration',
    type: 'number',
    default: '5000',
    description: 'Duration in milliseconds before auto-dismiss.',
  },
  {
    name: 'action',
    type: '{ label: string; onClick: () => void }',
    description: 'Optional action button configuration.',
  },
  {
    name: 'onDismiss',
    type: '() => void',
    description: 'Callback fired when the toast is dismissed.',
  },
  {
    name: 'className',
    type: 'string',
    description: 'Additional CSS classes to apply to the toast.',
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'The toast message content.',
    required: true,
  },
];

export function ToastPage() {
  return (
    <ComponentPage
      title='Toast'
      description='Notification component for displaying temporary messages to users.'
      tableOfContents={tableOfContents}
      usageInstructions='The Toast component provides feedback to users about the result of actions or system events. Use different variants to indicate the type of message: success for confirmations, error for failures, warning for cautions, and info for general notifications. Toasts automatically dismiss after a duration or can be manually closed.'
      importStatement="import { Toast } from '@moondreamsdev/dreamer-ui/components';"
      componentProps={toastProps}
      examples={toastExamples}
    />
  );
}