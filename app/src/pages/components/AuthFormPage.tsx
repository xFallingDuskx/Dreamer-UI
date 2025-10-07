import { useState } from 'react';
import { ComponentPage } from '../../components/layout/ComponentPage';
import { AuthForm } from '@moondreamsdev/dreamer-ui/components';

const tableOfContents = [
  { id: 'import', title: 'Import', level: 1 },
  { id: 'examples', title: 'Examples', level: 1 },
  { id: 'email-only', title: 'Email Only', level: 2 },
  { id: 'oauth-providers', title: 'OAuth Providers', level: 2 },
  { id: 'login-signup-toggle', title: 'Login/Signup Toggle', level: 2 },
  { id: 'error-handling', title: 'Error Handling', level: 2 },
  { id: 'password-validation', title: 'Custom Password Validation', level: 2 },
  { id: 'props', title: 'Props', level: 1 },
];

export function AuthFormPage() {
  const [authError] = useState<string>('');

  const handleMethodClick = (method: string) => {
    console.log(`${method} authentication initiated`);
    alert(`${method.charAt(0).toUpperCase() + method.slice(1)} authentication would be triggered here`);
  };

  const handleEmailSubmit = async ({ data, action }: { data: { email: string; password: string; confirmPassword?: string }; action: 'login' | 'sign up' }) => {
    console.log('Form submitted:', { data, action });
    
    // Simulate async authentication
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    // Demo: Show error for specific email
    if (data.email === 'error@test.com') {
      return { error: { message: 'Invalid credentials. Please try again.' } };
    }

    alert(`${action === 'login' ? 'Login' : 'Sign up'} successful!`);
    return {};
  };

  const handleSuccess = (action: 'login' | 'sign up') => {
    console.log('Authentication successful:', action);
  };

  const handleActionChange = (action: 'login' | 'sign up') => {
    console.log('Action changed to:', action);
  };

  const authFormExamples = [
    {
      id: 'email-only',
      title: 'Email Only',
      description: 'Basic authentication form with email and password fields.',
      code: `<AuthForm
  methods={['email']}
  action='login'
  onEmailSubmit={async ({ data, action }) => {
    // Handle email/password authentication
    console.log('Login attempt:', { data, action });
    const result = await login(data.email, data.password);
    if (result.error) {
      return { error: result.error };
    }
  }}
  onSuccess={(action) => {
    console.log(\`\${action} successful\`);
    navigate('/dashboard');
  }}
/>`,
      children: (
        <div className='max-w-md'>
          <AuthForm
            methods={['email']}
            action='login'
            onEmailSubmit={handleEmailSubmit}
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
  action='login'
  onMethodClick={(method) => {
    // Handle OAuth provider click
    if (method === 'google') {
      authWithGoogle();
    } else if (method === 'github') {
      authWithGithub();
    }
  }}
  onEmailSubmit={async ({ data, action }) => {
    // Handle email/password authentication
    return await login(data.email, data.password);
  }}
  onSuccess={(action) => navigate('/dashboard')}
/>`,
      children: (
        <div className='max-w-md'>
          <AuthForm
            methods={['google', 'github', 'email']}
            action='login'
            onMethodClick={handleMethodClick}
            onEmailSubmit={handleEmailSubmit}
            onSuccess={handleSuccess}
          />
        </div>
      ),
    },
    {
      id: 'login-signup-toggle',
      title: 'Login/Signup Toggle',
      description: 'Toggle between login and signup modes with appropriate field validation.',
      code: `<AuthForm
  methods={['email']}
  action='both'
  onActionChange={(action) => {
    console.log(\`User switched to \${action} mode\`);
    // Update parent state, analytics, conditional UI, etc.
  }}
  onEmailSubmit={async ({ data, action }) => {
    // The component automatically handles login/signup mode
    // You can determine the current mode from the action parameter
    if (action === 'login') {
      return await login(data.email, data.password);
    } else {
      return await signup(data.email, data.password);
    }
  }}
  onSuccess={(action) => navigate('/dashboard')}
/>`,
      children: (
        <div className='max-w-md'>
          <AuthForm
            methods={['email']}
            action='both'
            onActionChange={handleActionChange}
            onEmailSubmit={handleEmailSubmit}
            onSuccess={handleSuccess}
          />
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
  action='login'
  onEmailSubmit={async ({ data, action }) => {
    const result = await login(data.email, data.password);
    if (result.error) {
      setError(result.error.message);
      return { error: result.error };
    }
    setError('');
  }}
  errorMessage={error}
  onSuccess={(action) => navigate('/dashboard')}
/>`,
      children: (
        <div className='max-w-md'>
          <div className='mb-4'>
            <p className='text-sm text-gray-400 mb-2'>Try email: error@test.com to see error handling</p>
          </div>
          <AuthForm
            methods={['email']}
            action='login'
            onEmailSubmit={handleEmailSubmit}
            onSuccess={handleSuccess}
            errorMessage={authError}
          />
        </div>
      ),
    },
    {
      id: 'password-validation',
      title: 'Custom Password Validation',
      description: 'AuthForm with custom password validation function.',
      code: `const validatePassword = (password: string) => {
  if (password.length < 8) {
    return 'Password must be at least 8 characters long';
  }
  if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)/.test(password)) {
    return 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
  }
  return undefined; // Valid password
};

<AuthForm
  methods={['email']}
  action='sign up'
  validatePassword={validatePassword}
  onEmailSubmit={async ({ data, action }) => {
    return await signup(data.email, data.password);
  }}
  onSuccess={(action) => navigate('/dashboard')}
/>`,
      children: (
        <div className='max-w-md'>
          <AuthForm
            methods={['email']}
            action='sign up'
            validatePassword={(password: string) => {
              if (password.length < 8) {
                return 'Password must be at least 8 characters long';
              }
              if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
                return 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
              }
              return undefined;
            }}
            onEmailSubmit={handleEmailSubmit}
            onSuccess={handleSuccess}
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
      name: 'action',
      type: "'login' | 'sign up' | 'both'",
      required: false,
      default: "'login'",
      description: 'Authentication action mode. Use "both" to allow toggling between login and signup modes.',
    },
    {
      name: 'onMethodClick',
      type: "(method: 'google' | 'github' | 'facebook' | 'apple') => void",
      required: false,
      description: 'Callback function triggered when an OAuth provider button is clicked.',
    },
    {
      name: 'onEmailSubmit',
      type: '(params: { data: { email: string; password: string; confirmPassword?: string }; action: "login" | "sign up" }) => Promise<{ error?: { message: string } }> | void',
      required: false,
      description: 'Callback function for handling email/password form submission. Receives both form data and the current action mode. Should return an error object if authentication fails.',
    },
    {
      name: 'onSuccess',
      type: '(action: "login" | "sign up") => void',
      required: false,
      description: 'Callback function triggered when authentication is successful. Receives the current action mode.',
    },
    {
      name: 'onActionChange',
      type: '(action: "login" | "sign up") => void',
      required: false,
      description: 'Callback function triggered when the current action mode changes. Only applies when action prop is "both".',
    },
    {
      name: 'errorMessage',
      type: 'string',
      required: false,
      description: 'Custom error message to display below the form.',
    },
    {
      name: 'validatePassword',
      type: '(password: string) => string | undefined',
      required: false,
      description: 'Custom password validation function. Return an error message string if invalid, or undefined if valid.',
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
      description='A flexible authentication form component that supports multiple authentication methods including email/password and OAuth providers (Google, GitHub, Facebook, Apple). Features toggleable login/signup modes, custom password validation, and uses Form component with FormFactories for robust form handling.'
      tableOfContents={tableOfContents}
      usageInstructions='The AuthForm component provides a complete authentication interface with support for multiple providers. Use the action prop to control the authentication mode: "login", "sign up", or "both" for a toggleable interface. The component uses Form and FormFactories internally for robust form handling and validation.'
      importStatement="import { AuthForm } from '../auth-form';"
      componentProps={authFormProps}
      examples={authFormExamples}
    />
  );
}
