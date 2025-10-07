import { useState, Ref } from 'react';
import { Apple, Facebook, GitHub, Google } from '../../symbols';
import { Form, FormFactories } from '../form';
import { join } from '../../utils';
import { Button } from '../button';

export type AuthFormMethod = 'email' | 'google' | 'github' | 'facebook' | 'apple';
export type AuthFormAction = 'login' | 'sign up' | 'both';

export interface AuthFormProps {
	/** Array of authentication methods to display (e.g., ['email', 'google', 'github']) */
	methods?: AuthFormMethod[];
	/** Authentication action mode: 'login', 'sign up', or 'both' for togglable mode */
	action?: AuthFormAction;
	/** Callback when a method button is clicked (for OAuth providers) */
	onMethodClick?: (method: AuthFormMethod) => void;
	/** Callback when email/password form is submitted successfully */
	onEmailSubmit?: (params: {
		data: {
			email: string;
			password: string;
			confirmPassword?: string;
		};
		action: 'login' | 'sign up';
	}) => Promise<{ error?: { message: string } }> | void;
	/** Callback when authentication is successful */
	onSuccess?: (action: 'login' | 'sign up') => void;
	/** Custom error message to display */
	errorMessage?: string;
	/** Custom password validation function */
	validatePassword?: (password: string) => string | undefined;
	/** Additional CSS classes */
	className?: string;
	/** HTML id attribute */
	id?: string;
	/** Reference to the form element */
	ref?: Ref<HTMLFormElement>;
}

const providerConfig: Record<Exclude<AuthFormMethod, 'email'>, { label: string; icon: React.ReactNode }> = {
	google: {
		label: 'Continue with Google',
		icon: <Google size={15} />,
	},
	github: {
		label: 'Continue with GitHub',
		icon: <GitHub size={15} />,
	},
	facebook: {
		label: 'Continue with Facebook',
		icon: <Facebook size={15} />,
	},
	apple: {
		label: 'Continue with Apple',
		icon: <Apple size={15} />,
	},
};

export function AuthForm({
	methods = ['email'],
	action = 'login',
	onMethodClick,
	onEmailSubmit,
	onSuccess,
	errorMessage,
	validatePassword,
	className,
	id,
	ref,
}: AuthFormProps) {
	const [currentMode, setCurrentMode] = useState<'login' | 'sign up'>(
		action === 'both' ? 'login' : action
	);
	const [formError, setFormError] = useState<string>('');
	const { input } = FormFactories;

	const isLogin = currentMode === 'login';
	const showToggle = action === 'both';
	const showEmail = methods.includes('email');
	const otherMethods = methods.filter((m) => m !== 'email') as Exclude<AuthFormMethod, 'email'>[];

	const displayedError = formError || errorMessage;

	// Form fields configuration
	const emailFormFields = [
		input({
			name: 'email',
			label: 'Email',
			type: 'email',
			placeholder: 'you@email.com',
			required: true,
			variant: 'outline',
		}),
		input({
			name: 'password',
			label: 'Password',
			type: 'password',
			placeholder: 'Password',
			required: true,
			variant: 'outline',
			...(validatePassword && {
				isValid: (value: string) => {
					const error = validatePassword(value);
					return { valid: !error, message: error };
				},
			}),
		}),
		...(isLogin
			? []
			: [
					input({
						name: 'confirmPassword',
						label: 'Confirm Password',
						type: 'password',
						placeholder: 'Confirm Password',
						required: true,
						variant: 'outline',
					}),
			  ]),
	];

	const handleFormSubmit = async (formData: { email: string; password: string; confirmPassword?: string }) => {
		setFormError('');

		// Validate password confirmation for signup
		if (!isLogin && formData.confirmPassword !== formData.password) {
			setFormError('Passwords do not match.');
			return;
		}

		if (onEmailSubmit) {
			const result = await onEmailSubmit({
				data: {
					email: formData.email,
					password: formData.password,
					confirmPassword: formData.confirmPassword,
				},
				action: currentMode,
			});

			if (result?.error) {
				setFormError(result.error.message);
				return;
			}
		}

		onSuccess?.(currentMode);
	};

	const handleToggleMode = () => {
		setCurrentMode((prev) => (prev === 'login' ? 'sign up' : 'login'));
		setFormError('');
	};

	return (
		<div
			className={join('flex flex-col gap-3', className)}
			id={id}
			data-auth-mode={currentMode}
			data-action={action}
		>
			{/* OAuth Provider Buttons */}
			{otherMethods.map((method) => {
				const config = providerConfig[method];
				return (
					<Button
						key={method}
						variant='outline'
						onClick={() => onMethodClick?.(method)}
						className='flex items-center justify-center gap-2'
						data-auth-method={method}
					>
						{config.icon}
						{config.label}
					</Button>
				);
			})}

			{/* Divider if we have both OAuth and email */}
			{otherMethods.length > 0 && showEmail && (
				<div className='flex items-center gap-2 pt-2'>
					<div className='h-px flex-1 bg-gray-200 dark:bg-gray-700' />
					<span className='text-xs text-gray-400'>or</span>
					<div className='h-px flex-1 bg-gray-200 dark:bg-gray-700' />
				</div>
			)}

			{/* Email/Password Form */}
			{showEmail && (
				<>
					<Form
						form={emailFormFields}
						onSubmit={handleFormSubmit}
						submitButton={
							<Button type='submit' variant='primary' className='mt-2 w-full'>
								{isLogin ? 'Log In' : 'Sign Up'}
							</Button>
						}
						ref={ref}
						spacing='tight'
					/>

					{displayedError && (
						<small className='block text-center text-red-500 mt-2' role='alert'>
							{displayedError}
						</small>
					)}

					{/* Toggle between login/signup */}
					{showToggle && (
						<div className='text-center mt-3'>
							<button
								type='button'
								className='text-sm text-blue-500 hover:underline'
								onClick={handleToggleMode}
								data-toggle-mode
							>
								{isLogin
									? "Don't have an account? Sign Up"
									: 'Already have an account? Log In'}
							</button>
						</div>
					)}
				</>
			)}
		</div>
	);
}
