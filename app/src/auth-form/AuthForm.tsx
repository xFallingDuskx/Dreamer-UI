import { useEffect, useState, Ref } from 'react';
import { Button, Form, FormFactories } from '@moondreamsdev/dreamer-ui/components';
import { join } from '@moondreamsdev/dreamer-ui/utils';

type AuthMethod = 'email' | 'google' | 'github' | 'facebook' | 'apple';

export interface AuthFormProps {
  /** Array of authentication methods to display (e.g., ['email', 'google', 'github']) */
  methods?: AuthMethod[];
  /** Whether the form is in login mode (true) or sign up mode (false) */
  isLogin?: boolean;
  /** Callback when a method button is clicked (for OAuth providers) */
  onMethodClick?: (method: AuthMethod) => void;
  /** Callback when email/password form is submitted successfully */
  onSubmit?: (data: { email: string; password: string; confirmPassword?: string }) => Promise<{ error?: { message: string } }> | void;
  /** Callback when authentication is successful */
  onSuccess?: () => void;
  /** Custom error message to display */
  errorMessage?: string;
  /** Additional CSS classes */
  className?: string;
  /** HTML id attribute */
  id?: string;
  /** Reference to the form element */
  ref?: Ref<HTMLFormElement>;
}

interface AuthFormState {
  email: string;
  password: string;
  confirmPassword?: string;
  errorMessage?: string;
}

const providerConfig: Record<Exclude<AuthMethod, 'email'>, { label: string; icon: JSX.Element }> = {
  google: {
    label: 'Continue with Google',
    icon: (
      <svg className='h-5 w-5' viewBox='0 0 48 48'>
        <g>
          <path
            fill='#4285F4'
            d='M24 9.5c3.54 0 6.7 1.22 9.19 3.23l6.85-6.85C35.64 2.36 30.13 0 24 0 14.82 0 6.73 5.48 2.69 13.44l7.98 6.2C12.36 13.13 17.74 9.5 24 9.5z'
          />
          <path
            fill='#34A853'
            d='M46.1 24.55c0-1.64-.15-3.22-.42-4.74H24v9.01h12.42c-.54 2.9-2.18 5.36-4.65 7.01l7.2 5.6C43.98 37.13 46.1 31.36 46.1 24.55z'
          />
          <path
            fill='#FBBC05'
            d='M10.67 28.65A14.5 14.5 0 0 1 9.5 24c0-1.62.28-3.19.77-4.65l-7.98-6.2A23.97 23.97 0 0 0 0 24c0 3.87.92 7.54 2.54 10.85l8.13-6.2z'
          />
          <path
            fill='#EA4335'
            d='M24 48c6.13 0 11.27-2.03 15.03-5.53l-7.2-5.6c-2.01 1.35-4.59 2.15-7.83 2.15-6.26 0-11.64-3.63-13.33-8.85l-8.13 6.2C6.73 42.52 14.82 48 24 48z'
          />
          <path fill='none' d='M0 0h48v48H0z' />
        </g>
      </svg>
    ),
  },
  github: {
    label: 'Continue with GitHub',
    icon: (
      <svg className='h-5 w-5' fill='currentColor' viewBox='0 0 24 24'>
        <path
          fillRule='evenodd'
          d='M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z'
          clipRule='evenodd'
        />
      </svg>
    ),
  },
  facebook: {
    label: 'Continue with Facebook',
    icon: (
      <svg className='h-5 w-5' fill='currentColor' viewBox='0 0 24 24'>
        <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
      </svg>
    ),
  },
  apple: {
    label: 'Continue with Apple',
    icon: (
      <svg className='h-5 w-5' fill='currentColor' viewBox='0 0 24 24'>
        <path d='M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z' />
      </svg>
    ),
  },
};

export function AuthForm({
  methods = ['email'],
  isLogin = true,
  onMethodClick,
  onSubmit,
  onSuccess,
  errorMessage: externalErrorMessage,
  className,
  id,
  ref,
}: AuthFormProps) {
  const [formState, setFormState] = useState<AuthFormState>({
    email: '',
    password: '',
    confirmPassword: '',
    errorMessage: '',
  });

  const resetFormState = () => {
    setFormState({
      email: '',
      password: '',
      confirmPassword: '',
      errorMessage: '',
    });
  };

  useEffect(() => {
    resetFormState();
  }, [isLogin]);

  useEffect(() => {
    if (externalErrorMessage) {
      setFormState((prev) => ({
        ...prev,
        errorMessage: externalErrorMessage,
      }));
    }
  }, [externalErrorMessage]);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { email, password, confirmPassword } = formState;

    if (!email || !password || (!isLogin && !confirmPassword)) {
      setFormState((prev) => ({
        ...prev,
        errorMessage: 'Please fill in all fields.',
      }));
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      setFormState((prev) => ({
        ...prev,
        errorMessage: 'Passwords do not match.',
      }));
      return;
    }

    if (onSubmit) {
      const result = await onSubmit({ email, password, confirmPassword });
      if (result && result.error) {
        setFormState((prev) => ({
          ...prev,
          errorMessage: result.error!.message,
        }));
        return;
      }
    }

    resetFormState();
    onSuccess?.();
  };

  const showEmail = methods.includes('email');
  const otherMethods = methods.filter((m) => m !== 'email') as Exclude<AuthMethod, 'email'>[];

  const displayedError = formState.errorMessage || externalErrorMessage;

  return (
    <div className={join('flex flex-col gap-3', className)} id={id} data-auth-mode={isLogin ? 'login' : 'signup'}>
      {/* OAuth Provider Buttons */}
      {otherMethods.map((method) => {
        const config = providerConfig[method];
        return (
          <Button
            key={method}
            variant='tertiary'
            onClick={() => onMethodClick?.(method)}
            type='button'
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
        <form className='flex flex-col gap-3' onSubmit={handleEmailSubmit} ref={ref}>
          <div>
            <label className='mb-1 block text-sm font-medium'>Email</label>
            <input
              type='email'
              className='dark:bg-surface-dark dark:text-surface-light w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none dark:border-gray-700'
              placeholder='you@email.com'
              required
              value={formState.email}
              onChange={(e) => setFormState((prev) => ({ ...prev, email: e.target.value }))}
              data-field='email'
            />
          </div>
          <div>
            <label className='mb-1 block text-sm font-medium'>Password</label>
            <input
              type='password'
              className='dark:bg-surface-dark dark:text-surface-light w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none dark:border-gray-700'
              placeholder='Password'
              required
              value={formState.password}
              onChange={(e) => setFormState((prev) => ({ ...prev, password: e.target.value }))}
              data-field='password'
            />
          </div>
          {!isLogin && (
            <div>
              <label className='mb-1 block text-sm font-medium'>Confirm Password</label>
              <input
                type='password'
                className='dark:bg-surface-dark dark:text-surface-light w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none dark:border-gray-700'
                placeholder='Confirm Password'
                required
                value={formState.confirmPassword}
                onChange={(e) => setFormState((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                data-field='confirmPassword'
              />
            </div>
          )}

          {displayedError && (
            <small className='block text-center text-red-500' role='alert'>
              {displayedError}
            </small>
          )}

          <Button type='submit' variant='primary' className='mt-2 w-full'>
            {isLogin ? 'Log In' : 'Sign Up'}
          </Button>
        </form>
      )}
    </div>
  );
}
