import { Toast, Button } from '@moondreamsdev/dreamer-ui/components';
import { useToast } from '@moondreamsdev/dreamer-ui/hooks';
import { ComponentPage } from '../../components/layout/ComponentPage';

const tableOfContents = [
	{ id: 'import', title: 'Import', level: 1 },
	{ id: 'examples', title: 'Examples', level: 1 },
	{ id: 'types', title: 'Toast Types', level: 2 },
	{ id: 'with-descriptions', title: 'With Descriptions', level: 2 },
	{ id: 'with-actions', title: 'With Actions', level: 2 },
	{ id: 'custom-types', title: 'Custom Types', level: 2 },
	{ id: 'hook-usage', title: 'useToast Hook', level: 2 },
	{ id: 'props', title: 'Props', level: 1 },
];

const toastExamples = [
	{
		id: 'types',
		title: 'Toast Types',
		description:
			'Different toast types for various message contexts. Note: duration is set to 0 in examples to keep toasts visible for demonstration.',
		code: `<div className='space-y-4'>
  <Toast
    id='info-toast'
    title='Information notification'
    type='info'
    duration={0}
  />
  <Toast
    id='warning-toast'
    title='Please review your information before proceeding'
    type='warning'
    duration={0}
  />
  <Toast
    id='error-toast'
    title='An error occurred while processing your request'
    type='error'
    duration={0}
  />
</div>`,
		children: (
			<div className='space-y-4'>
				<Toast id='info-toast' title='Information notification' type='info' duration={0} />
				<Toast
					id='warning-toast'
					title='Please review your information before proceeding'
					type='warning'
					duration={0}
				/>
				<Toast id='error-toast' title='An error occurred while processing your request' type='error' duration={0} />
			</div>
		),
	},
	{
		id: 'with-descriptions',
		title: 'With Descriptions',
		description: 'Toasts with additional description text to provide more context.',
		code: `<div className='space-y-4'>
  <Toast 
    id='info-description'
    title='Your changes have been saved'
    description='All modifications have been successfully stored and will be visible to other users.'
    type='info'
    duration={0}
  />
  <Toast 
    id='error-description'
    title='Upload failed'
    description='The file size exceeds the 10MB limit. Please choose a smaller file.'
    type='error'
    duration={0}
  />
</div>`,
		children: (
			<div className='space-y-4'>
				<Toast
					id='info-description'
					title='Your changes have been saved'
					description='All modifications have been successfully stored and will be visible to other users.'
					type='info'
					duration={0}
				/>
				<Toast
					id='error-description'
					title='Upload failed'
					description='The file size exceeds the 10MB limit. Please choose a smaller file.'
					type='error'
					duration={0}
				/>
			</div>
		),
	},
	{
		id: 'with-actions',
		title: 'With Actions',
		description: 'Toasts with action buttons that users can interact with.',
		code: `<div className='space-y-4'>
  <Toast 
    id='action-toast-1'
    title='Message sent successfully!'
    description='Your message has been delivered to the recipient.'
    type='info'
    action={{ label: 'View', onClick: () => console.log('View clicked') }}
    onRemove={(id) => console.log('Toast removed:', id)}
    duration={0}
  />
  <Toast 
    id='action-toast-2'
    title='Failed to upload file'
    description='The file could not be uploaded due to a network error.'
    type='error'
    action={{ label: 'Retry', onClick: () => console.log('Retry clicked') }}
    onRemove={(id) => console.log('Toast removed:', id)}
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
					onRemove={(id) => console.log('Toast removed:', id)}
					duration={0}
				/>
				<Toast
					id='action-toast-2'
					title='Failed to upload file'
					description='The file could not be uploaded due to a network error.'
					type='error'
					action={{ label: 'Retry', onClick: () => console.log('Retry clicked') }}
					onRemove={(id) => console.log('Toast removed:', id)}
					duration={0}
				/>
			</div>
		),
	},
	{
		id: 'custom-types',
		title: 'Custom Types',
		description: 'Toasts with custom styling using the customTypes prop and standard types.',
		code: `<div className='space-y-4'>
  <Toast
    id='custom-info-styled'
    title='Custom styled info toast'
    type='info'
    customTypes={{
      info: {
        className: 'bg-green-50 border-green-200 text-green-900 dark:bg-green-800 dark:border-green-950 dark:text-green-100',
        icon: '✅'
      }
    }}
    duration={0}
  />
  <Toast
    id='custom-warning-styled'
    title='Custom styled warning toast'
    description='Using custom purple styling for warning.'
    type='warning'
    customTypes={{
      warning: {
        className: 'bg-purple-50 border-purple-200 text-purple-900 dark:bg-purple-800 dark:border-purple-950 dark:text-purple-100',
        icon: '🎉'
      }
    }}
    duration={0}
  />
</div>`,
		children: (
			<div className='space-y-4'>
				<Toast
					id='custom-info-styled'
					title='Custom styled info toast'
					type='info'
					customTypes={{
						info: {
							className:
								'bg-green-50 border-green-200 text-green-900 dark:bg-green-800 dark:border-green-950 dark:text-green-100',
							icon: '✅',
						},
					}}
					duration={0}
				/>
				<Toast
					id='custom-warning-styled'
					title='Custom styled warning toast'
					description='Using custom purple styling for warning.'
					type='warning'
					customTypes={{
						warning: {
							className:
								'bg-purple-50 border-purple-200 text-purple-900 dark:bg-purple-800 dark:border-purple-950 dark:text-purple-100',
							icon: '🎉',
						},
					}}
					duration={0}
				/>
			</div>
		),
	},
	{
		id: 'hook-usage',
		title: 'useToast Hook',
		description: 'The recommended way to show toast notifications using the useToast hook for simplified API.',
		code: `import { useToast } from '@moondreamsdev/dreamer-ui/hooks';

function HookExample() {
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
      title: 'Update available',
      description: 'A new version of the app is available.',
      type: 'info',
      action: {
        label: 'Update',
        onClick: () => console.log('Update clicked')
      },
      duration: 10000,
    });
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Button onClick={showInfoToast}>Info Toast</Button>
      <Button onClick={showSuccessToast}>Success Toast</Button>
      <Button onClick={showWarningToast}>Warning Toast</Button>
      <Button onClick={showErrorToast}>Error Toast</Button>
      <Button onClick={showToastWithAction}>Toast with Action</Button>
    </div>
  );
}

function App() {
  return (
    <ToastProvider position='top-center'>
      <HookExample />
    </ToastProvider>
  );
}`,
		children: <HookUsageExample />,
	},
];

// Hook usage example component
function HookUsageExample() {
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
			title: 'Update available',
			description: 'A new version of the app is available.',
			type: 'info',
			action: {
				label: 'Update',
				onClick: () => console.log('Update clicked'),
			},
			duration: 10000,
		});
	};

	return (
		<div className='flex flex-wrap gap-2'>
			<Button onClick={showInfoToast}>Info Toast</Button>
			<Button onClick={showSuccessToast}>Success Toast</Button>
			<Button onClick={showWarningToast}>Warning Toast</Button>
			<Button onClick={showErrorToast}>Error Toast</Button>
			<Button onClick={showToastWithAction}>Toast with Action</Button>
		</div>
	);
}

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
		type: '"info" | "warning" | "error" | string',
		default: '"info"',
		description: 'The type of toast which determines styling and icon. Can be extended with customTypes.',
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
			description='Notification component for displaying temporary messages to users. Can be used directly or with the useToast hook.'
			tableOfContents={tableOfContents}
			usageInstructions='The Toast component provides feedback to users about the result of actions or system events. Use different variants to indicate the type of message: success for confirmations, error for failures, warning for cautions, and info for general notifications. The useToast hook provides a simplified API for showing toast notifications programmatically.'
			importStatement="import { Toast, useToast } from '@moondreamsdev/dreamer-ui';"
			componentProps={toastProps}
			examples={toastExamples}
		/>
	);
}
