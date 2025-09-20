import { Callout } from '@moondreamsdev/dreamer-ui/components';
import { useState } from 'react';
import { ComponentPage } from '../../components/layout/ComponentPage';

const tableOfContents = [
	{ id: 'variants', title: 'Variants', level: 1 },
	{ id: 'icon', title: 'Icon', level: 1 },
	{ id: 'dismissible', title: 'Dismissible', level: 1 },
];

export const CalloutPage = () => {
	const [calloutDismissed, setCalloutDismissed] = useState(false);

	return (
		<ComponentPage
			title='Callout'
			description='A versatile component for displaying alerts, warnings, and informational messages.'
			tableOfContents={tableOfContents}
		>
			<div className='space-y-8'>
				<div id='variants'>
					<h2 className='text-2xl font-bold mb-4'>Variants</h2>
					<p className='text-gray-300 mb-4'>
						A set of built-in variants for the Callout component. Each variant is tailored for specific use cases and
						includes a default icon.
					</p>

					<div className='space-y-6'>
						<Callout
							variant='info'
							title='Upcoming Feature Update'
							description='We are excited to announce that a new dashboard will be available next month. This update will bring a host of new features designed to enhance your experience and improve productivity. Stay tuned for detailed information in the coming weeks.'
						/>

						<Callout
							variant='destructive'
							title='Account Deletion Warning'
							description={
								<div>
									<p>Please be aware that deleting your account is a permanent action.</p>
									<ul className='list-disc pl-5'>
										<li>All of your user data will be erased.</li>
										<li>Any ongoing subscriptions will be canceled.</li>
									</ul>
									<p className='mt-2 font-semibold'>
										Ensure you have saved any important information before proceeding.
									</p>
								</div>
							}
						/>

						<Callout
							variant='success'
							title='Profile Updated Successfully'
							description={
								<ul className='list-disc pl-5'>
									<li>Your profile information has been successfully saved to our system.</li>
									<li>You can now continue using the platform with your updated details.</li>
								</ul>
							}
						/>

						<Callout
							variant='warning'
							title='Subscription Expiry Notice'
							description='Your subscription is set to expire in three days. To ensure uninterrupted access to our services, we recommend renewing your subscription as soon as possible. Failure to do so may result in a temporary loss of access to premium features.'
						/>

						<Callout
							variant='base'
							title='System Maintenance Notification'
							description='We will be performing scheduled maintenance this Sunday at 2 AM. During this time, the platform will be temporarily unavailable. The maintenance is expected to last approximately two hours. We apologize for any inconvenience this may cause and appreciate your understanding.'
						/>
					</div>
				</div>

				<div id='icon' className='space-y-4'>
					<h2 className='text-2xl font-bold mb-4'>Icon</h2>

					<div>
						<h3 className='text-lg font-medium mb-1'>Hide icon</h3>
						<p className='text-gray-300 mb-4'>Icons can be hidden in the Callout component for a cleaner look.</p>
						<Callout icon={null} variant='info' title='Hidden Icon' description='This callout has no icon displayed.' />
					</div>

					<div>
						<h3 className='text-lg font-medium mb-1'>Custom icon</h3>
						<p className='text-gray-300 mb-4'>You can also use custom content, such as an emoji, as the icon.</p>
						<Callout
							icon='🚀'
							title='Custom Icon'
							description='This callout uses a custom emoji as its icon.'
							className='text-amber-600 bg-amber-700/10'
						/>
					</div>
				</div>

				<div id='dismissible'>
					<h2 className='text-2xl font-bold mb-4'>Dismissible</h2>
					<p className='text-gray-300 mb-4'>
						Allow users to dismiss the Callout component when it is no longer needed.
					</p>
					<Callout
						variant='warning'
						title='Dismissible Callout'
						description='This callout can be dismissed by the user.'
						dismissible={true}
						onDismiss={() => setCalloutDismissed(true)}
					/>
					{calloutDismissed && (
						<p className='text-center text-yellow-500 underline'>This callout has been dismissed!</p>
					)}
				</div>
			</div>
		</ComponentPage>
	);
};

export default CalloutPage;
