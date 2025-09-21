import { Toast } from '@moondreamsdev/dreamer-ui/components';
import { ComponentPage } from '../../components/layout/ComponentPage';

const tableOfContents = [
  { id: 'import', title: 'Import', level: 1 },
  { id: 'examples', title: 'Examples', level: 1 },
  { id: 'types', title: 'Toast Types', level: 2 },
  { id: 'with-actions', title: 'With Actions and Descriptions', level: 2 },
  { id: 'props', title: 'Props', level: 1 },
];

const toastExamples = [
  {
    id: 'types',
    title: 'Toast Types',
    description: 'Different toast types for various message contexts. Note: duration is set to 0 in examples to keep toasts visible for demonstration.',
    code: `<div className='space-y-4'>
  <Toast
    id='success-toast'
    title='Your changes have been saved successfully!'
    type='info'
    duration={0}
  />
  <Toast
    id='error-toast'
    title='An error occurred while processing your request'
    type='error'
    duration={0}
  />
  <Toast
    id='warning-toast'
    title='Please review your information before proceeding'
    type='warning'
    duration={0}
  />
</div>`,
    children: (
      <div className='space-y-4'>
        <Toast
          id='success-toast'
          title='Your changes have been saved successfully!'
          type='info'
          duration={0}
        />
        <Toast
          id='error-toast'
          title='An error occurred while processing your request'
          type='error'
          duration={0}
        />
        <Toast
          id='warning-toast'
          title='Please review your information before proceeding'
          type='warning'
          duration={0}
        />
      </div>
    ),
  },
  {
    id: 'with-actions',
    title: 'With Actions and Descriptions',
    description: 'Toasts with action buttons, descriptions and dismiss functionality. Note: duration is set to 0 in examples to keep toasts visible for demonstration.',
    code: `<div className='space-y-4'>
  <Toast 
    id='action-toast-1'
    title='Message sent successfully!'
    description='Your message has been delivered to the recipient.'
    type='info'
    action={{ label: 'View', onClick: () => console.log('View clicked') }}
    onRemove={() => console.log('Removed')}
    duration={0}
  />
  <Toast 
    id='action-toast-2'
    title='Failed to upload file'
    description='The file could not be uploaded due to a network error.'
    type='error'
    action={{ label: 'Retry', onClick: () => console.log('Retry clicked') }}
    onRemove={() => console.log('Removed')}
    duration={0}
  />
</div>`,
    children: (
      <div className='space-y-4'>
        <Toast 
          id='action-toast-1'
          title='Message sent successfully!'
          description='Your message has been delivered to the recipient.'
          type='info'
          action={{ label: 'View', onClick: () => console.log('View clicked') }}
          onRemove={() => console.log('Removed')}
          duration={0}
        />
        <Toast 
          id='action-toast-2'
          title='Failed to upload file'
          description='The file could not be uploaded due to a network error.'
          type='error'
          action={{ label: 'Retry', onClick: () => console.log('Retry clicked') }}
          onRemove={() => console.log('Removed')}
          duration={0}
        />
      </div>
    ),
  },
];

const toastProps = [
  {
    name: 'id',
    type: 'string',
    required: true,
    description: 'Unique identifier for the toast.',
  },
  {
    name: 'title',
    type: 'string',
    required: true,
    description: 'The main message text for the toast.',
  },
  {
    name: 'description',
    type: 'string',
    description: 'Optional secondary message text.',
  },
  {
    name: 'type',
    type: '"info" | "warning" | "error"',
    default: '"info"',
    description: 'The type of toast which determines styling and icon.',
  },
  {
    name: 'action',
    type: '{ label: string; onClick: () => void }',
    description: 'Optional action button configuration.',
  },
  {
    name: 'duration',
    type: 'number',
    default: '5000',
    description: 'Duration in milliseconds before auto-dismiss. Set to 0 to disable auto-dismiss.',
  },
  {
    name: 'onRemove',
    type: '(id: string) => void',
    description: 'Callback fired when the toast is removed.',
  },
  {
    name: 'customTypes',
    type: 'Record<string, { className: string; icon?: ReactNode }>',
    description: 'Custom type definitions with styling and icons.',
  },
  {
    name: 'customComponent',
    type: 'React.ComponentType<ToastData>',
    description: 'Custom component to render instead of the default toast.',
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