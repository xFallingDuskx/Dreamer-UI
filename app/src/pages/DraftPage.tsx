import { ComponentPage } from '../components/layout/ComponentPage';
import { CodeBlock, type TokenClasses } from '../code-block';

export const DraftPage = () => {
  const tsCode = `interface User {
  id: number;
  name: string;
  email: string;
  isActive?: boolean;
  createdAt: Date;
}

class UserService {
  private users: User[] = [];
  private readonly apiUrl = 'https://api.example.com/users';

  async createUser(userData: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    try {
      const newUser: User = {
        id: Math.floor(Math.random() * 1000),
        createdAt: new Date(),
        ...userData
      };
      
      this.users.push(newUser);
      return newUser;
    } catch (error) {
      throw new Error(\`Failed to create user: \${error.message}\`);
    }
  }
}`;

  const tsxCode = `import { useState, useCallback } from 'react';

interface CounterProps {
  initialCount?: number;
  step?: number;
  maxCount?: number;
  onCountChange?: (count: number) => void;
}

export default function Counter({ 
  initialCount = 0, 
  step = 1,
  maxCount = 100,
  onCountChange
}: CounterProps) {
  const [count, setCount] = useState<number>(initialCount);

  const handleIncrement = useCallback((): void => {
    if (count >= maxCount) return;
    
    const newCount = Math.min(count + step, maxCount);
    setCount(newCount);
    onCountChange?.(newCount);
  }, [count, step, maxCount, onCountChange]);

  return (
    <div className="counter p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-center space-x-4">
        <button 
          onClick={() => setCount(Math.max(count - step, 0))}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          -
        </button>
        <span className="text-2xl font-bold text-blue-600">{count}</span>
        <button 
          onClick={handleIncrement}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          +
        </button>
      </div>
    </div>
  );
}`;

  const customTokenClasses: TokenClasses = {
    keyword: 'text-red-400 font-bold',
    function: 'text-green-600 font-semibold',
    string: 'text-green-400',
    type: 'text-orange-400 font-medium',
    comment: 'text-gray-400 italic'
  };
  return (
    <ComponentPage
      title='Draft'
      description='A testing ground for developing and prototyping new components. This page is only available in development.'
    >
      <div className='space-y-8'>
        {/* Development Notice */}
        <div className='bg-yellow-900/20 border border-yellow-700 rounded-lg p-4'>
          <div className='flex items-center space-x-2'>
            <svg className='w-5 h-5 text-yellow-400' fill='currentColor' viewBox='0 0 20 20'>
              <path
                fillRule='evenodd'
                d='M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z'
                clipRule='evenodd'
              />
            </svg>
            <h3 className='text-yellow-400 font-medium'>Development Mode</h3>
          </div>
          <p className='text-yellow-200 mt-2'>
            This page is only accessible on localhost and is intended for component development and testing.
          </p>
        </div>

        {/* Placeholder Content */}
        <div className='bg-gray-900/50 border border-gray-700 rounded-lg p-8'>
          <h2 className='text-xl font-semibold text-white mb-4'>Component Testing Area</h2>
          <p className='text-gray-300 mb-6'>
            Use this space to test and develop new components before adding them to the official documentation.
          </p>

          {/* Example testing section */}
          <div className='space-y-6'>
            <div>
              <h3 className='text-lg font-medium text-white mb-3'>CodeBlock Component Testing</h3>
              
              {/* TypeScript Example */}
              <div className='mb-6'>
                <h4 className='text-md font-medium text-gray-300 mb-3'>TypeScript Interface & Class</h4>
                <CodeBlock 
                  code={tsCode}
                  language="typescript"
                  filename="UserService.ts"
                  showLineNumbers={true}
                  maxHeight={300}
                  allowDownload={true}
                  allowFullscreen={true}
                />
              </div>

              {/* TSX Example */}
              <div className='mb-6'>
                <h4 className='text-md font-medium text-gray-300 mb-3'>React TSX Component</h4>
                <CodeBlock 
                  code={tsxCode}
                  language="tsx"
                  filename="Counter.tsx"
                  showTrafficLights={false}
                  showLineNumbers={true}
                  allowDownload={true}
                />
              </div>

              {/* Basic TypeScript Example */}
              <div className='mb-6'>
                <h4 className='text-md font-medium text-gray-300 mb-3'>Basic Example (No Line Numbers)</h4>
                <CodeBlock 
                  code={`const message: string = 'Hello, TypeScript!';\nconsole.log(message);`}
                  language="ts"
                />
              </div>

              {/* Custom Token Classes Example */}
              <div className='mb-6'>
                <h4 className='text-md font-medium text-gray-300 mb-3'>Custom Token Colors Example</h4>
                <CodeBlock 
                  code={`// Custom color scheme example\nconst greet = (name: string): string => {\n  return \`Hello, \${name}!\`;\n};\n\nconsole.log(greet('World'));`}
                  language="ts"
                  filename="custom-colors.ts"
                  tokenClasses={customTokenClasses}
                />
              </div>

              {/* Hidden Header Example */}
              <div className='mb-6'>
                <h4 className='text-md font-medium text-gray-300 mb-3'>Hidden Header Example</h4>
                <CodeBlock 
                  code={`// No header bar - buttons float in corner\nconst example = "Clean minimal look";\nconsole.log(example);`}
                  language="ts"
                  hideHeader={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ComponentPage>
  );
};
