import { useState } from 'react';
import { ComponentPage } from '../../components/layout/ComponentPage';
import { AuthForm } from '../../auth-form';

const tableOfContents = [
  { id: 'import', title: 'Import', level: 1 },
  { id: 'examples', title: 'Examples', level: 1 },
  { id: 'email-only', title: 'Email Only', level: 2 },
  { id: 'oauth-providers', title: 'OAuth Providers', level: 2 },
  { id: 'login-signup-toggle', title: 'Login/Signup Toggle', level: 2 },
  { id: 'error-handling', title: 'Error Handling', level: 2 },
  { id: 'props', title: 'Props', level: 1 },
];

export function AuthFormPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [authError, setAuthError] = useState<string>('');

  const handleMethodClick = (method: string) => {
    console.log(`${method} authentication initiated`);
    alert(`${method.charAt(0).toUpperCase() + method.slice(1)} authentication would be triggered here`);
  };

  const handleSubmit = async (data: { email: string; password: string; confirmPassword?: string }) => {
    console.log('Form submitted:', data);
    
    // Simulate async authentication
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    // Demo: Show error for specific email
    if (data.email === 'error@test.com') {
      return { error: { message: 'Invalid credentials. Please try again.' } };
    }

    alert(`${isLogin ? 'Login' : 'Sign up'} successful!`);
    return {};
  };

  const handleSuccess = () => {
    console.log('Authentication successful');
  };

  const authFormExamples = [
    {
      id: 'email-only',
      title: 'Email Only',
      description: 'Basic authentication form with email and password fields.',
      code: `<AuthForm
  methods={['email']}
  isLogin={true}
  onSubmit={async (data) => {
    // Handle email/password authentication
    console.log('Login attempt:', data);
    const result = await login(data.email, data.password);
    if (result.error) {
      return { error: result.error };
    }
  }}
  onSuccess={() => {
    console.log('Login successful');
    navigate('/dashboard');
  }}
/>`,
      children: (
        <div className='max-w-md'>
          <AuthForm
            methods={['email']}
            isLogin={true}
            onSubmit={handleSubmit}
            onSuccess={handleSuccess}
          />
        </div>
      ),
    },
    {
      id: 'oauth-providers',
      title: 'OAuth Providers',
      description: 'Authentication form with multiple OAuth providers and email fallback.',
      code: `<AuthForm
  methods={['google', 'github', 'email']}
  isLogin={true}
  onMethodClick={(method) => {
    // Handle OAuth provider click
    if (method === 'google') {
      authWithGoogle();
    } else if (method === 'github') {
      authWithGithub();
    }
  }}
  onSubmit={async (data) => {
    // Handle email/password authentication
    return await login(data.email, data.password);
  }}
  onSuccess={() => navigate('/dashboard')}
/>`,
      children: (
        <div className='max-w-md'>
          <AuthForm
            methods={['google', 'github', 'email']}
            isLogin={true}
            onMethodClick={handleMethodClick}
            onSubmit={handleSubmit}
            onSuccess={handleSuccess}
          />
        </div>
      ),
    },
    {
      id: 'login-signup-toggle',
      title: 'Login/Signup Toggle',
      description: 'Toggle between login and signup modes with appropriate field validation.',
      code: `const [isLogin, setIsLogin] = useState(true);

<div>
  <AuthForm
    methods={['email']}
    isLogin={isLogin}
    onSubmit={async (data) => {
      if (isLogin) {
        return await login(data.email, data.password);
      } else {
        return await signup(data.email, data.password);
      }
    }}
    onSuccess={() => navigate('/dashboard')}
  />
  
  <button onClick={() => setIsLogin(!isLogin)}>
    {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Log In"}
  </button>
</div>`,
      children: (
        <div className='max-w-md'>
          <AuthForm
            methods={['email']}
            isLogin={isLogin}
            onSubmit={handleSubmit}
            onSuccess={handleSuccess}
          />
          <div className='mt-4 text-center'>
            <button
              type='button'
              className='text-sm text-blue-500 hover:underline'
              onClick={() => setIsLogin((v) => !v)}
            >
              {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Log In'}
            </button>
          </div>
        </div>
      ),
    },
    {
      id: 'error-handling',
      title: 'Error Handling',
      description: 'Display error messages from authentication failures.',
      code: `const [error, setError] = useState('');

<AuthForm
  methods={['email']}
  isLogin={true}
  onSubmit={async (data) => {
    const result = await login(data.email, data.password);
    if (result.error) {
      setError(result.error.message);
      return { error: result.error };
    }
    setError('');
  }}
  errorMessage={error}
  onSuccess={() => navigate('/dashboard')}
/>`,
      children: (
        <div className='max-w-md'>
          <div className='mb-4'>
            <p className='text-sm text-gray-400 mb-2'>Try email: error@test.com to see error handling</p>
          </div>
          <AuthForm
            methods={['email']}
            isLogin={true}
            onSubmit={handleSubmit}
            onSuccess={handleSuccess}
            errorMessage={authError}
          />
        </div>
      ),
    },
  ];

  const authFormProps = [
    {
      name: 'methods',
      type: "('email' | 'google' | 'github' | 'facebook' | 'apple')[]",
      required: false,
      default: "['email']",
      description: 'Array of authentication methods to display. Includes OAuth providers and email/password.',
    },
    {
      name: 'isLogin',
      type: 'boolean',
      required: false,
      default: 'true',
      description: 'Whether the form is in login mode (true) or signup mode (false). Affects password confirmation field visibility.',
    },
    {
      name: 'onMethodClick',
      type: "(method: 'google' | 'github' | 'facebook' | 'apple') => void",
      required: false,
      description: 'Callback function triggered when an OAuth provider button is clicked.',
    },
    {
      name: 'onSubmit',
      type: '(data: { email: string; password: string; confirmPassword?: string }) => Promise<{ error?: { message: string } }> | void',
      required: false,
      description: 'Callback function for handling email/password form submission. Should return an error object if authentication fails.',
    },
    {
      name: 'onSuccess',
      type: '() => void',
      required: false,
      description: 'Callback function triggered when authentication is successful.',
    },
    {
      name: 'errorMessage',
      type: 'string',
      required: false,
      description: 'Custom error message to display below the form.',
    },
    {
      name: 'className',
      type: 'string',
      required: false,
      description: 'Additional CSS classes to apply to the form container.',
    },
    {
      name: 'id',
      type: 'string',
      required: false,
      description: 'HTML id attribute for the form container.',
    },
    {
      name: 'ref',
      type: 'Ref<HTMLFormElement>',
      required: false,
      description: 'Reference to the form element.',
    },
  ];

  return (
    <ComponentPage
      title='AuthForm'
      description='A flexible authentication form component that supports multiple authentication methods including email/password and OAuth providers (Google, GitHub, Facebook, Apple). Handles both login and signup flows with built-in validation and error messaging.'
      tableOfContents={tableOfContents}
      usageInstructions='The AuthForm component provides a complete authentication interface with support for multiple providers. Use the methods prop to specify which authentication options to display. The component automatically handles form validation, error states, and provides callbacks for OAuth and email/password authentication flows.'
      importStatement="import { AuthForm } from '../auth-form';"
      componentProps={authFormProps}
      examples={authFormExamples}
    />
  );
}
