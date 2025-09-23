import { useState } from 'react';
import { ActionModal, Button } from '@moondreamsdev/dreamer-ui/components';
import { useActionModal } from '@moondreamsdev/dreamer-ui/hooks';
import { ComponentPage } from '../../components/layout/ComponentPage';

const tableOfContents = [
	{ id: 'import', title: 'Import', level: 1 },
	{ id: 'examples', title: 'Examples', level: 1 },
  { id: 'alert-basic', title: 'Basic Alert', level: 2 },
  { id: 'confirm-basic', title: 'Basic Confirmation', level: 2 },
  { id: 'with-title', title: 'With Title', level: 2 },
	{ id: 'destructive-action', title: 'Destructive Action', level: 2 },
	{ id: 'custom-content', title: 'Custom Content', level: 2 },
	{ id: 'hook-usage', title: 'useActionModal Hook', level: 2 },
	{ id: 'props', title: 'Props', level: 1 },
	{ id: 'keyboard-shortcuts', title: 'Keyboard Shortcuts', level: 1 },
];

const componentProps = [
	{
		name: 'type',
		type: '"alert" | "confirm"',
		required: true,
		description: 'The type of action modal - alert shows only OK, confirm shows OK and Cancel',
	},
	{
		name: 'isOpen',
		type: 'boolean',
		required: true,
		description: 'Whether the modal is currently open',
	},
	{
		name: 'onClose',
		type: '() => void',
		required: true,
		description: 'Callback fired when the modal should close',
	},
	{
		name: 'message',
		type: 'string | React.ReactNode',
		required: true,
		description: 'The main content/message to display in the modal',
	},
	{
		name: 'onConfirm',
		type: '() => void',
		required: false,
		description: 'Callback fired when the confirm/OK button is clicked',
	},
	{
		name: 'title',
		type: 'string',
		required: false,
		description: 'Optional title for the modal header',
	},
	{
		name: 'confirmText',
		type: 'string',
		required: false,
		description: 'Custom text for the confirm/OK button',
		defaultValue: '"Confirm" for confirm type, "OK" for alert type',
	},
	{
		name: 'cancelText',
		type: 'string',
		required: false,
		description: 'Custom text for the cancel button (only for confirm type)',
		defaultValue: '"Cancel"',
	},
	{
		name: 'destructive',
		type: 'boolean',
		required: false,
		description: 'Whether to style the confirm button with destructive/danger styling',
		defaultValue: 'false',
	},
	{
		name: 'className',
		type: 'string',
		required: false,
		description: 'Additional CSS classes to apply to the modal',
	},
];

const actionModalExamples = [
	{
		id: 'alert-basic',
		title: 'Basic Alert',
		description: 'Simple alert modal with just an OK button using direct component usage.',
		code: `const [isOpen, setIsOpen] = useState(false);

return (
  <>
    <Button onClick={() => setIsOpen(true)}>Show Alert</Button>
    <ActionModal
      type="alert"
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      message="This is a simple alert message."
      onConfirm={() => console.log('Alert acknowledged')}
    />
  </>
);`,
		children: <BasicAlertExample />,
	},
	{
		id: 'confirm-basic',
		title: 'Basic Confirmation',
		description: 'Confirmation modal with OK and Cancel buttons.',
		code: `const [isOpen, setIsOpen] = useState(false);

return (
  <>
    <Button onClick={() => setIsOpen(true)}>Show Confirmation</Button>
    <ActionModal
      type="confirm"
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      message="Are you sure you want to continue with this action?"
      onConfirm={() => {
        console.log('Action confirmed');
        setIsOpen(false);
      }}
    />
  </>
);`,
		children: <BasicConfirmExample />,
	},
	{
		id: 'with-title',
		title: 'With Title',
		description: 'Action modal with a custom title.',
		code: `<ActionModal
  type="confirm"
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Save Changes"
  message="You have unsaved changes. Do you want to save them before leaving?"
  confirmText="Save"
  cancelText="Discard"
  onConfirm={() => {
    console.log('Changes saved');
    setIsOpen(false);
  }}
/>`,
		children: <WithTitleExample />,
	},
	{
		id: 'destructive-action',
		title: 'Destructive Action',
		description: 'Confirmation modal for destructive actions with warning styling.',
		code: `<ActionModal
  type="confirm"
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Delete Account"
  message="This will permanently delete your account and all associated data. This action cannot be undone."
  confirmText="Delete Account"
  cancelText="Keep Account"
  destructive={true}
  onConfirm={() => {
    console.log('Account deleted');
    setIsOpen(false);
  }}
/>`,
		children: <DestructiveActionExample />,
	},
	{
		id: 'custom-content',
		title: 'Custom Content',
		description: 'Action modal with rich content using React components.',
		code: `<ActionModal
  type="confirm"
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Update Subscription"
  message={
    <div className="space-y-3">
      <p>You're upgrading to the <strong>Pro Plan</strong>:</p>
      <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
        <li>Unlimited projects</li>
        <li>Priority support</li>
        <li>Advanced analytics</li>
      </ul>
      <p className="text-lg font-semibold">$29/month</p>
    </div>
  }
  confirmText="Upgrade Now"
  onConfirm={() => {
    console.log('Subscription upgraded');
    setIsOpen(false);
  }}
/>`,
		children: <CustomContentExample />,
	},
	{
		id: 'hook-usage',
		title: 'useActionModal Hook',
		description: 'The recommended way to use action modals with the useActionModal hook for simplified API.',
		code: `import { useActionModal } from '@moondreamsdev/dreamer-ui/hooks';

function HookExample() {
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
      message: 'Do you want to proceed with this action?',
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
    <div className="flex gap-4">
      <Button onClick={handleAlert}>Show Alert</Button>
      <Button onClick={handleConfirm}>Show Confirm</Button>
      <Button onClick={handleDestructiveConfirm} variant="destructive">
        Delete Item
      </Button>
    </div>
  );
}

function App() {
  return (
    <ActionModalProvider>
      <HookExample />
    </ActionModalProvider>
  );
}`,
		children: <HookUsageExample />,
	},
];

// Hook usage example component
function HookUsageExample() {
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
		<div className='flex gap-4'>
			<Button onClick={handleAlert}>Show Alert</Button>
			<Button onClick={handleConfirm}>Show Confirm</Button>
			<Button onClick={handleDestructiveConfirm} variant='destructive'>
				Delete Item
			</Button>
		</div>
	);
}

function BasicAlertExample() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<Button onClick={() => setIsOpen(true)}>Show Alert</Button>
			<ActionModal
				type='alert'
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
				message='This is a simple alert message. Click OK to dismiss.'
				onConfirm={() => console.log('Alert acknowledged')}
			/>
		</>
	);
}

function BasicConfirmExample() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<Button onClick={() => setIsOpen(true)}>Show Confirmation</Button>
			<ActionModal
				type='confirm'
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
				message='Are you sure you want to continue with this action?'
				onConfirm={() => {
					console.log('Action confirmed');
					setIsOpen(false);
				}}
			/>
		</>
	);
}

function WithTitleExample() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<Button onClick={() => setIsOpen(true)}>Save Changes</Button>
			<ActionModal
				type='confirm'
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
				title='Save Changes'
				message='You have unsaved changes. Do you want to save them before leaving?'
				confirmText='Save'
				cancelText='Discard'
				onConfirm={() => {
					console.log('Changes saved');
					setIsOpen(false);
				}}
			/>
		</>
	);
}

function DestructiveActionExample() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<Button onClick={() => setIsOpen(true)} variant='destructive'>
				Delete Account
			</Button>
			<ActionModal
				type='confirm'
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
				title='Delete Account'
				message='This will permanently delete your account and all associated data. This action cannot be undone.'
				confirmText='Delete Account'
				cancelText='Keep Account'
				destructive={true}
				onConfirm={() => {
					console.log('Account deleted');
					setIsOpen(false);
				}}
			/>
		</>
	);
}

function CustomContentExample() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<Button onClick={() => setIsOpen(true)}>Upgrade Subscription</Button>
			<ActionModal
				type='confirm'
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
				title='Update Subscription'
				message={
					<div className='space-y-3'>
						<p>
							You're upgrading to the <strong>Pro Plan</strong>:
						</p>
						<ul className='list-disc list-inside text-sm text-gray-600 dark:text-gray-300 space-y-1'>
							<li>Unlimited projects</li>
							<li>Priority support</li>
							<li>Advanced analytics</li>
						</ul>
						<p className='text-lg font-semibold'>$29/month</p>
					</div>
				}
				confirmText='Upgrade Now'
				onConfirm={() => {
					console.log('Subscription upgraded');
					setIsOpen(false);
				}}
			/>
		</>
	);
}

const keyboardShortcuts = [
	{
		keys: 'Enter',
		description: 'Activate the focused button (confirm or cancel)',
	},
	{
		keys: 'Escape',
		description: 'Close the modal (same as clicking cancel or close)',
	},
	{
		keys: 'Tab',
		description: 'Move focus between actionable elements',
	},
];

export function ActionModalPage() {
	return (
		<ComponentPage
			title='Action Modal'
			description='Pre-configured modal component with action buttons for alerts, confirmations, and simple user interactions. Can be used directly or with the useActionModal hook.'
			tableOfContents={tableOfContents}
			usageInstructions="Use ActionModal for simple user interactions that require confirmation or acknowledgment. It comes in two types: 'alert' for notifications with a single OK button, and 'confirm' for yes/no decisions with OK and Cancel buttons. The useActionModal hook provides a simplified API for common use cases."
			importStatement="import { ActionModal, useActionModal } from '@moondreamsdev/dreamer-ui';"
			componentProps={componentProps}
			examples={actionModalExamples}
			keyboardShortcuts={keyboardShortcuts}
		/>
	);
}
