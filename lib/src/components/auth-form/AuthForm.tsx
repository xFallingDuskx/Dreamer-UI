import { useState, Ref } from 'react';
import { Apple, Facebook, GitHub, Google } from '../../symbols';
import { Form, FormFactories } from '../form';
import { join } from '../../utils';
import { Button } from '../button';

export type AuthFormMethod = 'email' | 'google' | 'github' | 'facebook' | 'apple';
export type AuthFormAction = 'login' | 'sign up' | 'both';
export type AuthFormOnEmailSubmit = (params: {
	data: {
		email: string;
		password: string;
		confirmPassword?: string;
	};
	action: 'login' | 'sign up';
}) => Promise<{ error?: { message: string } }> | void;

export interface AuthFormProps {
	/** Array of authentication methods to display (e.g., ['email', 'google', 'github']) */
	methods?: AuthFormMethod[];
	/** Authentication action mode: 'login', 'sign up', or 'both' for toggleable mode */
	action?: AuthFormAction;
	/** Callback when a method button is clicked (for OAuth providers) */
	onMethodClick?: (method: AuthFormMethod) => void;
	/** Callback when email/password form is submitted successfully */
	onEmailSubmit?: AuthFormOnEmailSubmit
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

/**
 * A flexible authentication form component that supports multiple authentication methods
 * including email/password and OAuth providers (Google, GitHub, Facebook, Apple).
 * Features toggleable login/signup modes, custom password validation, and comprehensive
 * error handling using Form and FormFactories internally.
 * 
 * @example
 * ```tsx
 * // Basic email-only login form
 * <AuthForm
 *   methods={['email']}
 *   action="login"
 *   onEmailSubmit={async ({ data, action }) => {
 *     const result = await signIn(data.email, data.password);
 *     if (result.error) {
 *       return { error: { message: result.error.message } };
 *     }
 *   }}
 *   onSuccess={(action) => navigate('/dashboard')}
 * />
 * ```
 * 
 * @example
 * ```tsx
 * // Multi-provider authentication with OAuth
 * <AuthForm
 *   methods={['google', 'github', 'email']}
 *   action="login"
 *   onMethodClick={(method) => {
 *     if (method === 'google') signInWithGoogle();
 *     if (method === 'github') signInWithGitHub();
 *   }}
 *   onEmailSubmit={async ({ data, action }) => {
 *     return await authenticate(data.email, data.password);
 *   }}
 *   onSuccess={(action) => redirect('/app')}
 * />
 * ```
 * 
 * @example
 * ```tsx
 * // Toggleable login/signup with password validation
 * <AuthForm
 *   methods={['email']}
 *   action="both"
 *   validatePassword={(password) => {
 *     if (password.length < 8) return 'Password must be at least 8 characters';
 *     if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)/.test(password)) {
 *       return 'Password must contain uppercase, lowercase, and number';
 *     }
 *   }}
 *   onEmailSubmit={async ({ data, action }) => {
 *     if (action === 'login') {
 *       return await login(data.email, data.password);
 *     } else {
 *       return await register(data.email, data.password);
 *     }
 *   }}
 *   onSuccess={(action) => {
 *     toast.success(`${action === 'login' ? 'Welcome back!' : 'Account created!'}`);
 *     navigate('/dashboard');
 *   }}
 * />
 * ```
 * 
 * @example
 * ```tsx
 * // With error handling and custom styling
 * const [authError, setAuthError] = useState('');
 * 
 * <AuthForm
 *   methods={['google', 'email']}
 *   action="login"
 *   className="max-w-md mx-auto p-6 bg-card rounded-lg"
 *   errorMessage={authError}
 *   onMethodClick={async (method) => {
 *     try {
 *       await authenticateWithProvider(method);
 *     } catch (error) {
 *       setAuthError(error.message);
 *     }
 *   }}
 *   onEmailSubmit={async ({ data, action }) => {
 *     setAuthError('');
 *     try {
 *       await emailAuth(data.email, data.password, action);
 *     } catch (error) {
 *       return { error: { message: error.message } };
 *     }
 *   }}
 *   onSuccess={() => {
 *     setAuthError('');
 *     window.location.href = '/dashboard';
 *   }}
 * />
 * ```
 */
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
	const [currentMode, setCurrentMode] = useState<'login' | 'sign up'>(action === 'both' ? 'login' : action);
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
		<div className={join('flex flex-col gap-3', className)} id={id} data-auth-mode={currentMode} data-action={action}>
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
					<div className='h-px flex-1 bg-border' />
					<span className='text-xs text-border'>or</span>
					<div className='h-px flex-1 bg-border' />
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
						<small className='block text-center text-destructive mt-2' role='alert'>
							{displayedError}
						</small>
					)}

					{/* Toggle between login/signup */}
					{showToggle && (
						<div className='text-center mt-3'>
							<Button type='button' variant='link' className='text-sm' onClick={handleToggleMode} data-toggle-mode>
								{isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Log In'}
							</Button>
						</div>
					)}
				</>
			)}
		</div>
	);
}
