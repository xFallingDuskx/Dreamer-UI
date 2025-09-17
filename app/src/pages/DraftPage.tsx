import {
	Avatar,
	Callout,
	Card,
	Code,
	Disclosure,
	Drawer,
	Popover,
	DropdownMenuItem,
	DropdownMenuFactories,
	DropdownMenu,
  Badge,
  Button,
} from '@moondreamsdev/dreamer-ui/components';
import { useState } from 'react';
import { ComponentPage } from '../components/layout/ComponentPage';
import { ChevronDoubleLeft, ChevronDown } from '@moondreamsdev/dreamer-ui/symbols';
import { Form, FormFactories, FormData } from '../../form';

const DropdownDemo = () => {
	const [selectedValue, setSelectedValue] = useState<string>('');
	const { option, group, separator, custom } = DropdownMenuFactories;

	const exampleItems: DropdownMenuItem[] = [
		group(
			[
				option({
					label: 'New File',
					value: 'new-file',
					icon: <div className='w-4 h-4 bg-blue-500 rounded' />,
					description: 'Create a new file',
					keyboardShortcut: '⌘N',
					onClick: () => console.log('New File clicked!'),
				}),
				option({
					label: 'Open',
					value: 'open',
					icon: <div className='w-4 h-4 bg-green-500 rounded' />,
					href: '/components',
				}),
				separator(),
				option({
					label: 'Export',
					value: 'export',
					icon: <div className='w-4 h-4 bg-orange-500 rounded' />,
					keyboardShortcut: '⌘E',
					subItems: [
						option({ label: 'Export as PDF', value: 'export-pdf' }),
						option({ label: 'Export as CSV', value: 'export-csv' }),
						option({ label: 'Export as JSON', value: 'export-json' }),
						separator(),
						option({
							label: 'Advanced Export',
							value: 'advanced-export',
							subItems: [
								option({ label: 'Custom Format', value: 'custom-format' }),
								option({ label: 'Batch Export', value: 'batch-export' }),
							],
						}),
					],
				}),
				option({
					label: 'Import',
					value: 'import',
					icon: <div className='w-4 h-4 bg-purple-500 rounded' />,
					subItems: [
						option({ label: 'Import CSV', value: 'import-csv' }),
						option({ label: 'Import JSON', value: 'import-json' }),
						option({ label: 'Import XML', value: 'import-xml' }),
					],
				}),
			],
			'File system'
		),

		group(
			[
				option({
					label: 'Settings',
					value: 'settings',
					icon: <div className='w-4 h-4 bg-gray-500 rounded' />,
				}),
				option({
					label: 'Help',
					value: 'help',
					icon: <div className='w-4 h-4 bg-yellow-500 rounded' />,
					disabled: true,
				}),
			],
			'Other'
		),

		separator(),

		custom(() => (
			<div className='px-3 py-2 text-center'>
				<button className='text-xs text-blue-600 hover:text-blue-800'>View All Options</button>
			</div>
		)),
	];

	return (
		<div className='p-8 space-y-4'>
			<h1 className='text-2xl font-bold mb-6'>Dropdown Menu with Sub-menus</h1>

			<div className='space-y-4'>
				<div>
					<p className='text-sm text-gray-600 mb-2'>Basic dropdown with sub-menus:</p>
					<DropdownMenu
						items={exampleItems}
						onItemSelect={(value) => {
							setSelectedValue(value);
							console.log('Selected:', value);
						}}
						trigger={
							<button className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2'>
								Menu <ChevronDown className='w-4 h-4' />
							</button>
						}
					/>
				</div>

				<div>
					<p className='text-sm text-gray-600 mb-2'>Right-aligned dropdown:</p>
					<DropdownMenu
						items={exampleItems.slice(0, 2)}
						onItemSelect={setSelectedValue}
						trigger={
							<button className='px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-2'>
								Actions <ChevronDown className='w-4 h-4' />
							</button>
						}
						alignment='end'
					/>
				</div>
			</div>

			{selectedValue && (
				<p className='text-sm'>
					<strong>Selected:</strong> {selectedValue}
				</p>
			)}
		</div>
	);
};

const FormDemo = () => {
	const [formData, setFormData] = useState<FormData>({});
	const [submittedData, setSubmittedData] = useState<FormData | null>(null);
	const { input, textarea, select, checkbox, radio } = FormFactories;

	// Basic contact form
	const contactForm = [
		input({
			name: 'firstName',
			label: 'First Name',
			placeholder: 'Enter your first name',
			required: true,
			variant: 'outline',
			isValid: (value: string) => {
				if (!value || value.length < 2) return { valid: false, message: 'First name must be at least 2 characters' };
				return { valid: true };
			}
		}),
		input({
			name: 'lastName',
			label: 'Last Name',
			placeholder: 'Enter your last name',
			required: true,
			variant: 'outline'
		}),
		input({
			name: 'email',
			label: 'Email',
			type: 'email',
			placeholder: 'Enter your email address',
			required: true,
			variant: 'outline',
			isValid: (value: string) => {
				if (!value) return { valid: false, message: 'Email is required' };
				const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
				if (!emailRegex.test(value)) return { valid: false, message: 'Please enter a valid email address' };
				return { valid: true, message: 'Email format is valid' };
			}
		}),
		select({
			name: 'country',
			label: 'Country',
			placeholder: 'Select your country',
			required: true,
			options: [
				{ value: 'us', label: 'United States' },
				{ value: 'ca', label: 'Canada' },
				{ value: 'uk', label: 'United Kingdom' },
				{ value: 'de', label: 'Germany' },
				{ value: 'fr', label: 'France' },
				{ value: 'jp', label: 'Japan' },
				{ value: 'au', label: 'Australia' }
			],
			searchable: true,
			clearable: true
		}),
		textarea({
			name: 'message',
			label: 'Message',
			placeholder: 'Enter your message',
			description: 'Tell us about your inquiry',
			variant: 'outline',
			rows: 4,
			characterLimit: 500
		}),
		checkbox({
			name: 'subscribe',
			label: 'Email Notifications',
			text: 'I would like to receive email updates and newsletters'
		}),
		radio({
			name: 'contactMethod',
			label: 'Preferred Contact Method',
			required: true,
			options: [
				{ value: 'email', label: 'Email' },
				{ value: 'phone', label: 'Phone' },
				{ value: 'mail', label: 'Postal Mail' }
			]
		})
	];

	// Settings form with different variants
	const settingsForm = [
		input({
			name: 'username',
			label: 'Username',
			placeholder: 'Enter username',
			variant: 'underline',
			isValid: (value: string) => {
				if (!value || value.length < 3) return { valid: false, message: 'Username must be at least 3 characters' };
				if (!/^[a-zA-Z0-9_]+$/.test(value)) return { valid: false, message: 'Username can only contain letters, numbers, and underscores' };
				return { valid: true };
			}
		}),
		input({
			name: 'currentPassword',
			label: 'Current Password',
			type: 'password',
			placeholder: 'Enter current password',
			variant: 'underline'
		}),
		input({
			name: 'newPassword',
			label: 'New Password',
			type: 'password',
			placeholder: 'Enter new password',
			variant: 'underline',
			isValid: (value: string) => {
				if (!value || value.length < 8) return { valid: false, message: 'Password must be at least 8 characters' };
				if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
					return { valid: false, message: 'Password must contain at least one lowercase letter, one uppercase letter, and one number' };
				}
				return { valid: true };
			}
		}),
		select({
			name: 'theme',
			label: 'Theme',
			options: [
				{ value: 'light', label: 'Light' },
				{ value: 'dark', label: 'Dark' },
				{ value: 'system', label: 'System' }
			]
		}),
		checkbox({
			name: 'twoFactorAuth',
			label: 'Two-Factor Authentication',
			text: 'Enable two-factor authentication for enhanced security'
		})
	];

	const handleSubmit = (data: FormData, formType: string) => {
		console.log(`${formType} submitted:`, data);
		setSubmittedData({ ...data, _formType: formType });
	};

	return (
		<div>
			<h3 className='text-lg font-medium text-white mb-3'>Form Component Testing</h3>
			<div className='space-y-8'>
				{/* Contact Form with integrated submit button */}
				<div>
					<h4 className='text-md font-medium text-gray-300 mb-4'>Contact Form with Submit Button</h4>
					<div className='bg-gray-800/50 p-6 rounded-lg'>
						<Form
							form={contactForm}
							initialData={formData}
							onDataChange={setFormData}
							onSubmit={(data) => handleSubmit(data, 'Contact Form')}
							spacing='normal'
							className='max-w-md'
							submitButton={
								<Button variant='primary' type='submit' className='mt-4 w-fit ml-auto'>
									Submit Contact Form
								</Button>
							}
						/>
					</div>
				</div>

				{/* Settings Form with integrated submit button */}
				<div>
					<h4 className='text-md font-medium text-gray-300 mb-4'>Settings Form with Submit Button</h4>
					<div className='bg-gray-800/50 p-6 rounded-lg'>
						<Form
							form={settingsForm}
							onSubmit={(data) => handleSubmit(data, 'Settings Form')}
							spacing='tight'
							className='max-w-sm'
							submitButton={
								<Button variant='secondary' type='submit' className='mt-4'>
									Save Settings
								</Button>
							}
						/>
					</div>
				</div>

				{/* Simple validation demo with submit button */}
				<div>
					<h4 className='text-md font-medium text-gray-300 mb-4'>Validation Demo with Auto-disabled Submit</h4>
					<div className='bg-gray-800/50 p-6 rounded-lg'>
						<Form
							form={[
								input({
									name: 'requiredField',
									label: 'Required Field',
									placeholder: 'This field is required',
									required: true,
									variant: 'outline'
								}),
								input({
									name: 'emailField',
									label: 'Email Validation',
									type: 'email',
									placeholder: 'Must be valid email',
									variant: 'outline',
									isValid: (value: string) => {
										if (!value) return { valid: true }; // Optional field
										const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
										if (!emailRegex.test(value)) return { valid: false, message: 'Invalid email format' };
										return { valid: true };
									}
								}),
								input({
									name: 'numberField',
									label: 'Number (1-100)',
									type: 'number',
									placeholder: 'Enter number between 1-100',
									variant: 'outline',
									isValid: (value: string) => {
										if (!value) return { valid: true };
										const num = parseInt(value);
										if (num < 1 || num > 100) return { valid: false, message: 'Number must be between 1 and 100' };
										return { valid: true, message: 'Valid number' };
									}
								})
							]}
							onSubmit={(data) => handleSubmit(data, 'Validation Demo')}
							spacing='normal'
							className='max-w-md'
							submitButton={
								<Button variant='secondary' type='submit' className='mt-4'>
									Test Validation
								</Button>
							}
						/>
					</div>
				</div>

				{/* Layout Examples */}
				<div>
					<h4 className='text-md font-medium text-gray-300 mb-4'>Multi-Column Layout</h4>
					<div className='bg-gray-800/50 p-6 rounded-lg'>
						<Form
							form={[
								input({
									name: 'firstName',
									label: 'First Name',
									placeholder: 'John',
									variant: 'outline',
									required: true
								}),
								input({
									name: 'lastName',
									label: 'Last Name', 
									placeholder: 'Doe',
									variant: 'outline',
									required: true
								}),
								input({
									name: 'email',
									label: 'Email (Full Width)',
									type: 'email',
									placeholder: 'john.doe@example.com',
									variant: 'outline',
									colSpan: 'full'
								}),
								input({
									name: 'age',
									label: 'Age',
									type: 'number',
									placeholder: '25',
									variant: 'outline',
									className: 'max-w-[80px]'
								}),
								input({
									name: 'phone',
									label: 'Phone',
									type: 'tel',
									placeholder: '+1 (555) 123-4567',
									variant: 'outline'
								})
							]}
							columns={2}
							spacing='normal'
							onSubmit={(data) => handleSubmit(data, 'Layout Demo')}
						/>
					</div>
				</div>

				{/* Display submitted data */}
				{submittedData && (
					<div className='bg-green-900/20 border border-green-800 p-4 rounded-lg'>
						<h4 className='text-md font-medium text-green-300 mb-2'>Submitted Data:</h4>
						<pre className='text-sm text-green-200 overflow-auto'>
							{JSON.stringify(submittedData, null, 2)}
						</pre>
					</div>
				)}
			</div>
		</div>
	);
};

export const DraftPage = () => {
	const [drawerState, setDrawerState] = useState({
		basic: false,
		withFooter: false,
		fullscreen: false,
		nonDraggable: false,
	});

	return (
		<ComponentPage
			title='Draft'
			description='A testing ground for developing and prototyping new components. This page is only available in development.'
		>
			<div className='space-y-8'>
				<Callout
					variant='warning'
					icon='default'
					title='Development Mode'
					description='This page is only accessible on localhost and is intended for component development and testing.'
				/>

				{/* Placeholder Content */}
				<div className='bg-gray-900/50 border border-gray-700 rounded-lg p-8'>
					<h2 className='text-xl font-semibold text-white mb-4'>Component Testing Area</h2>
					<p className='text-gray-300 mb-6'>
						Use this space to test and develop new components before adding them to the official documentation.
					</p>

					{/* Example testing section */}
					<div className='space-y-6'>
						{/* Disclosure Component Testing */}
						<div className='mb-6'>
							<h3 className='text-lg font-medium text-white mb-3'>Disclosure Component Testing</h3>
							<div className='space-y-4'>
								{/* Default variant */}
								<div>
									<h4 className='text-md font-medium text-gray-300 mb-2'>Default Variant</h4>
									<Disclosure label='Show more (default)'>
										<div className='p-2 text-gray-800 dark:text-gray-200'>
											This is the default disclosure content. You can put any React node here.
										</div>
									</Disclosure>
								</div>
								{/* Danger */}
								<div>
									<h4 className='text-md font-medium text-gray-300 mb-2'>Danger Area</h4>
									<Disclosure label='Show more (danger)'>
										<div className='p-2 text-red-700 dark:text-red-300 bg-red-300 dark:bg-red-700'>
											This is the danger disclosure content. Use for warnings or destructive actions.
										</div>
									</Disclosure>
								</div>
								{/* Styled Button */}
								<div>
									<h4 className='text-md font-medium text-gray-300 mb-2'>Styled Button</h4>
									<Disclosure
										label='Show more (styled button)'
										buttonClassName='rounded-full border border-accent-medium light:text-indigo-700 dark:text-indigo-300 bg-accent-medium/10'
										className='md:w-1/2 mx-auto'
									>
										<div className='p-2 text-gray-800 dark:text-gray-200 text-center'>
											This is the styled button disclosure content. You can put any React node here.
										</div>
									</Disclosure>
								</div>

								{/* Disabled state */}
								<div>
									<h4 className='text-md font-medium text-gray-300 mb-2'>Disabled State</h4>
									<Disclosure label='Disabled disclosure' disabled>
										<div className='p-2 text-gray-400'>This disclosure is disabled and cannot be opened.</div>
									</Disclosure>
								</div>
							</div>
						</div>

						{/* Callout Component Testing */}
						<div>
							<h3 className='text-lg font-medium text-white mb-3'>Callout Component Testing</h3>
							<div className='space-y-4'>
								<Callout
									variant='info'
									icon='default'
									title='Info Callout'
									description='This is an informational alert.'
								/>
								<Callout
									variant='destructive'
									icon='default'
									title='Danger Callout'
									description='This is a danger alert.'
								/>
								<Callout
									variant='success'
									icon='default'
									title='Success Callout'
									description='This is a success alert.'
								/>
								<Callout
									variant='warning'
									icon='default'
									title='Warning Callout'
									description='This is a warning alert.'
								/>
								<Callout
									variant='base'
									icon='default'
									title='Base Callout'
									description='This is a base alert with custom styles.'
									className='text-purple-500 bg-purple-700/10'
								/>
								<Callout variant='base' icon='default' description='This is a base alert with no specific color.' />
								<Callout
									variant='info'
									icon='default'
									title='Dismissible Callout'
									description='This callout can be dismissed.'
									dismissible
									onDismiss={() => alert('Callout dismissed!')}
								/>
							</div>
						</div>

						{/* Code Component Testing */}
						<div className='mb-6'>
							<h3 className='text-lg font-medium text-white mb-3'>Code Component Testing</h3>
							<div className='space-y-4'>
								{/* Modest Variant */}
								<div>
									<h4 className='text-md font-medium text-gray-300 mb-2'>Modest Variant</h4>
									With text <Code variant='modest' content='<SomeComponent />' /> around it.
								</div>

								{/* Accent Variant */}
								<div>
									<h4 className='text-md font-medium text-gray-300 mb-2'>Accent Variant</h4>
									<Code variant='accent' content='This is the accent variant of the Code component.' />
								</div>

								{/* Base Variant */}
								<div>
									<h4 className='text-md font-medium text-gray-300 mb-2'>Base Variant</h4>
									<Code variant='base' content='This is the base variant of the Code component.' />
								</div>
								{/* Current Variant */}
								<div>
									<h4 className='text-md font-medium text-gray-300 mb-2'>Current Variant</h4>
									<Code
										variant='current'
										content='This is the current variant of the Code component.'
										className='text-orange-500'
									/>
								</div>

								{/* Adjust to text size */}
								<div>
									<h4 className='text-md font-medium text-gray-300 mb-2'>Adjust to Text Size</h4>
									<p className='md:text-2xl lg:text-4xl'>
										The <Code variant='accent' content='Code' /> component should adjust its font size and line height
										based on the surrounding text.
									</p>
								</div>
							</div>
						</div>

						{/* Popover Component Testing */}
						<div>
							<h3 className='text-lg font-medium text-white mb-3'>Popover Component Testing</h3>
							<div className='space-y-4'>
								{/* Uncontrolled Popover */}
								<div>
									<h4 className='text-lg font-semibold text-gray-300 mb-2'>Uncontrolled Popover</h4>
									<Popover
										className='p-2 whitespace-nowrap w-fit'
										trigger={<button className='font-light'>Open Uncontrolled Popover</button>}
									>
										This is an uncontrolled Popover.
									</Popover>
								</div>

								{/* Controlled Popover */}
								<div>
									<h4 className='text-lg font-semibold text-gray-300 mb-2'>Controlled Popover</h4>
									<Popover
										isOpen={true}
										className='p-2 w-80'
										trigger={<button className='font-light'>Open Controlled Popover</button>}
									>
										This is a controlled Popover.
									</Popover>
								</div>

								{/* Start Aligned Popover */}
								<div>
									<h4 className='text-lg font-semibold text-gray-300 mb-2'>Start Aligned Popover</h4>
									<Popover
										className='p-2'
										alignment='start'
										trigger={<button className='font-light'>Open Start Aligned Popover</button>}
										closeOnOverlayClick={false}
									>
										To the right.
									</Popover>
								</div>

								{/* End Aligned Popover */}
								<div>
									<h4 className='text-lg font-semibold text-gray-300 mb-2'>End Aligned Popover</h4>
									<Popover
										className='p-2'
										alignment='end'
										trigger={<button className='font-light'>Open End Aligned Popover</button>}
										closeOnTriggerClick={false}
									>
										To the left.
									</Popover>
								</div>

								{/* Top Placement */}
								<div>
									<h4 className='text-lg font-semibold text-gray-300 mb-2'>Top Placement</h4>
									<Popover
										placement='top'
										alignment='center'
										trigger={<button className='font-light'>Open Top Popover</button>}
									>
										This is a Popover with top placement.
									</Popover>
								</div>

								{/* Left Placement */}
								<div>
									<h4 className='text-lg font-semibold text-gray-300 mb-2'>Left Placement</h4>
									<Popover
										placement='left'
										alignment='start'
										trigger={<button className='font-light'>Open Left Popover</button>}
									>
										This is a Popover with left placement.
									</Popover>
								</div>

								{/* Right Placement */}
								<div>
									<h4 className='text-lg font-semibold text-gray-300 mb-2'>Right Placement</h4>
									<Popover
										placement='right'
										alignment='start'
										trigger={<button className='font-light'>Open Right Popover</button>}
									>
										This is a Popover with right placement.
									</Popover>
								</div>
							</div>
						</div>

						{/* Drawer Component Testing */}
						<div>
							<h3 className='text-lg font-medium text-white mb-3'>Drawer Component Testing</h3>
							<div className='space-y-4'>
								{/* Example 1: Basic Drawer */}
								<div>
									<button onClick={() => setDrawerState({ ...drawerState, basic: true })}>Open Basic Drawer</button>
									<Drawer
										isOpen={drawerState.basic}
										onClose={() => setDrawerState({ ...drawerState, basic: false })}
										title='Basic Drawer'
									>
										<div className='p-4 min-h-screen'>This is a basic drawer with medium size.</div>
									</Drawer>
								</div>

								{/* Example 2: Drawer with Footer */}
								<div>
									<button onClick={() => setDrawerState({ ...drawerState, withFooter: true })}>
										Open Drawer with Footer
									</button>
									<Drawer
										isOpen={drawerState.withFooter}
										onClose={() => setDrawerState({ ...drawerState, withFooter: false })}
										title='Drawer with Footer'
										footer={<div className='text-center'>Footer Content</div>}
									>
										<div className='p-4'>This drawer includes a footer.</div>
									</Drawer>
								</div>

								{/* Example 3: Fullscreen Drawer */}
								<div>
									<button onClick={() => setDrawerState({ ...drawerState, fullscreen: true })}>
										Open Fullscreen Drawer
									</button>
									<Drawer
										isOpen={drawerState.fullscreen}
										onClose={() => setDrawerState({ ...drawerState, fullscreen: false })}
										title='Fullscreen Drawer'
										showCloseButton={true}
									>
										<div className='p-4'>This is a fullscreen drawer with a close button.</div>
									</Drawer>
								</div>

								{/* Example 4: Drawer with Drag Gestures Disabled */}
								<div>
									<button onClick={() => setDrawerState({ ...drawerState, nonDraggable: true })}>
										Open Non-Draggable Drawer
									</button>
									<Drawer
										isOpen={drawerState.nonDraggable}
										onClose={() => setDrawerState({ ...drawerState, nonDraggable: false })}
										title='Non-Draggable Drawer'
										enableDragGestures={false}
										showCloseButton={true}
									>
										<div className='p-4'>This drawer has drag gestures disabled.</div>
									</Drawer>
								</div>
							</div>
						</div>

						{/* Dropdown Menu Testing */}
						<DropdownDemo />

						{/* Form Component Testing */}
						<FormDemo />

						{/* Avatar Component Testing */}
						<div>
							<h3 className='text-lg font-medium text-white mb-3'>Avatar Component Testing</h3>
							<div className='space-y-6'>
								{/* All presets */}
								<div>
									<h4 className='text-md font-medium text-gray-300 mb-3'>All Preset Avatars</h4>
									<div className='grid grid-cols-6 gap-4'>
										<Avatar preset='astronaut' size='lg' alt='Astronaut avatar' />
										<Avatar preset='moon' size='lg' alt='Moon avatar' />
										<Avatar preset='star' size='lg' alt='Star avatar' />
										<Avatar preset='galaxy' size='lg' alt='Galaxy avatar' />
										<Avatar preset='nebula' size='lg' alt='Nebula avatar' />
										<Avatar preset='planet' size='lg' alt='Planet avatar' />
										<Avatar preset='cosmic-cat' size='lg' alt='Cosmic cat avatar' />
										<Avatar preset='dream-cloud' size='lg' alt='Dream cloud avatar' />
										<Avatar preset='rocket' size='lg' alt='Rocket avatar' />
										<Avatar preset='constellation' size='lg' alt='Constellation avatar' />
										<Avatar preset='comet' size='lg' alt='Comet avatar' />
										<Avatar preset='twilight' size='lg' alt='Twilight avatar' />
									</div>
								</div>

								{/* Different sizes */}
								<div>
									<h4 className='text-md font-medium text-gray-300 mb-3'>Different Sizes</h4>
									<div className='flex items-end gap-4'>
										<Avatar preset='astronaut' size='xs' alt='Extra small avatar' />
										<Avatar preset='moon' size='sm' alt='Small avatar' />
										<Avatar preset='star' size='md' alt='Medium avatar' />
										<Avatar preset='galaxy' size='lg' alt='Large avatar' />
										<Avatar preset='nebula' size='xl' alt='Extra large avatar' />
										<Avatar preset='planet' size='2xl' alt='2XL avatar' />
									</div>
								</div>

								{/* Different shapes */}
								<div>
									<h4 className='text-md font-medium text-gray-300 mb-3'>Different Shapes</h4>
									<div className='flex gap-4'>
										<Avatar preset='cosmic-cat' size='xl' shape='circle' alt='Circle avatar' />
										<Avatar preset='rocket' size='xl' shape='square' alt='Square avatar' />
									</div>
								</div>

								{/* Custom content */}
								<div>
									<h4 className='text-md font-medium text-gray-300 mb-3'>Custom Content</h4>
									<div className='flex gap-4'>
										<Avatar initials='MD' size='lg' alt='Initials avatar' />
										<Avatar
											size='lg'
											alt='Fallback avatar'
											src='https://media.easy-peasy.ai/27feb2bb-aeb4-4a83-9fb6-8f3f2a15885e/cd053ed5-47cb-438b-bf2f-a49c7dcbab29.png'
											className='border-orange-900'
										/>
									</div>
								</div>
							</div>
						</div>

						{/* Badge Component Testing */}
						<div>
							<h3 className='text-lg font-medium text-white mb-3'>Badge Component Testing</h3>
							<div className='space-x-2'>
								<Badge variant='primary'>Primary</Badge>
								<Badge variant='secondary'>Secondary</Badge>
								<Badge variant='accent'>Accent</Badge>
								<Badge variant='destructive'>Destructive</Badge>
								<Badge variant='destructive'>99+</Badge>
								<Badge variant='success' outline>
									SUCCESS
								</Badge>
								<Badge variant='muted'>Muted</Badge>
								<Badge variant='primary' outline>
									Primary Outline
								</Badge>
								<Badge variant='secondary' outline>
									Secondary Outline
								</Badge>
								<Badge variant='accent' aspect='square' size='md' />
								<Badge outline aspect='square'>
									<ChevronDoubleLeft />
								</Badge>
							</div>
						</div>

						{/* Card Component Testing */}
						<div>
							<h3 className='text-lg font-medium text-white mb-3'>Card Component Testing</h3>
							<div className='space-y-6'>
								{/* Basic Card */}
								<div>
									<h4 className='text-md font-medium text-gray-300 mb-2'>Basic Card</h4>
									<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
										<Card header='Card Title' footer='Card footer text'>
											This is the basic card content. It demonstrates how the card component works with different screen
											sizes.
										</Card>
										<Card size='sm' header='Small Card'>
											This is a small card with minimal content.
										</Card>
										<Card size='lg' header='Large Card' footer='Large card footer'>
											This is a large card with more spacing and larger text.
										</Card>
									</div>
								</div>

								{/* Cards with Images */}
								<div>
									<h4 className='text-md font-medium text-gray-300 mb-2'>Cards with Images</h4>
									<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
										<Card
											imageSrc='https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=200&fit=crop'
											imageAlt='Mountain landscape'
											header='Mountain Adventure'
											footer='Photo by John Doe'
											imageToEdge={false}
										>
											Discover the beauty of mountain landscapes with this stunning view.
										</Card>
										<div>
											<Card
												imageSrc='https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=200&fit=crop'
												imageAlt='Forest path'
												header='Forest Walk'
												className='max-h-fit'
											>
												Take a peaceful walk through the forest trails.
											</Card>
											<small className='text-xs text-gray-500 mt-1 text-center'>
												Image extends to card edges with max height set to "fit"
											</small>
										</div>
									</div>
								</div>

								{/* Custom Padding */}
								<div>
									<h4 className='text-md font-medium text-gray-300 mb-2'>Custom Padding</h4>
									<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
										<Card padding={8} header='Tight Padding (8px)'>
											This card has minimal padding.
										</Card>
										<Card padding={16} header='Default Padding (16px)'>
											This card uses the default padding.
										</Card>
										<Card padding={24} header='Spacious Padding (24px)'>
											This card has extra spacious padding.
										</Card>
									</div>
								</div>

								{/* Complex Content */}
								<div>
									<h4 className='text-md font-medium text-gray-300 mb-2'>Complex Content</h4>
									<Card
										header={
											<div className='flex items-center justify-between'>
												<h3 className='text-xl font-bold'>Project Dashboard</h3>
												<Badge variant='success'>Active</Badge>
											</div>
										}
										footer={
											<div className='flex justify-between items-center'>
												<span className='text-gray-500'>Last updated: 2 hours ago</span>
												<button className='text-blue-500 hover:text-blue-700'>View Details</button>
											</div>
										}
										padding={20}
									>
										<div className='space-y-3'>
											<p>This card demonstrates complex header and footer content with multiple elements.</p>
											<div className='grid grid-cols-2 gap-4 text-sm'>
												<div>
													<strong>Tasks:</strong> 12/15 completed
												</div>
												<div>
													<strong>Progress:</strong> 80%
												</div>
											</div>
										</div>
									</Card>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</ComponentPage>
	);
};
