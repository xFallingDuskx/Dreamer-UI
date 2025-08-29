import { CodeBlock, type CodeBlockTokenClasses } from '@moondreamsdev/dreamer-ui/components';
import { ComponentPage } from '../../components/layout/ComponentPage';
import { ExampleSection } from '../../components/ui/ExampleSection';

export const CodeBlockPage = () => {
  // Example code snippets
  const basicTypeScript = `interface User {
  id: number;
  name: string;
  email: string;
}

function createUser(userData: Omit<User, 'id'>): User {
  return {
    id: Math.floor(Math.random() * 1000),
    ...userData
  };
}`;

  const reactExample = `import { useState, useCallback } from 'react';

interface CounterProps {
  initialCount?: number;
  onCountChange?: (count: number) => void;
}

export default function Counter({ 
  initialCount = 0, 
  onCountChange
}: CounterProps) {
  const [count, setCount] = useState<number>(initialCount);

  const increment = useCallback(() => {
    const newCount = count + 1;
    setCount(newCount);
    onCountChange?.(newCount);
  }, [count, onCountChange]);

  return (
    <div className="counter">
      <span>Count: {count}</span>
      <button onClick={increment}>+</button>
    </div>
  );
}`;

  const complexExample = `class UserService {
  private readonly apiUrl = 'https://api.example.com/users';
  private cache = new Map<string, User[]>();

  async fetchUsers(filter?: UserFilter): Promise<User[]> {
    try {
      const cacheKey = this.generateCacheKey(filter);
      
      if (this.cache.has(cacheKey)) {
        return this.cache.get(cacheKey)!;
      }

      const response = await fetch(\`\${this.apiUrl}?\${this.buildQuery(filter)}\`);
      
      if (!response.ok) {
        throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
      }

      const users = await response.json();
      this.cache.set(cacheKey, users);
      
      return users;
    } catch (error) {
      console.error('Failed to fetch users:', error);
      throw new Error('Unable to load users. Please try again later.');
    }
  }

  private generateCacheKey(filter?: UserFilter): string {
    return JSON.stringify(filter || {});
  }

  private buildQuery(filter?: UserFilter): string {
    if (!filter) return '';
    
    return Object.entries(filter)
      .filter(([_, value]) => value !== undefined)
      .map(([key, value]) => \`\${key}=\${encodeURIComponent(String(value))}\`)
      .join('&');
  }
}`;

  const customTokenClasses: CodeBlockTokenClasses = {
    keyword: 'text-purple-400 font-bold',
    function: 'text-blue-400 font-semibold',
    string: 'text-green-400',
    type: 'text-yellow-400 font-medium',
    comment: 'text-gray-500 italic',
  };

  return (
    <ComponentPage
      title='Code Block'
      description='A syntax-highlighted code display component with TypeScript/TSX support, copy functionality, download options, and fullscreen viewing.'
    >
      <ExampleSection title='Basic Usage' description='Simple code blocks with different configurations.'>
        <div className='space-y-6'>
          <div>
            <h4 className='text-md font-medium text-gray-300 mb-3'>Basic TypeScript Code</h4>
            <CodeBlock code={basicTypeScript} language='typescript' />
          </div>

          <div>
            <h4 className='text-md font-medium text-gray-300 mb-3'>With Filename</h4>
            <CodeBlock code={basicTypeScript} language='ts' filename='user.ts' />
          </div>

          <div>
            <h4 className='text-md font-medium text-gray-300 mb-3'>React TSX Component</h4>
            <CodeBlock code={reactExample} language='tsx' filename='Counter.tsx' />
          </div>
        </div>
      </ExampleSection>

      <ExampleSection title='Line Numbers' description='Display line numbers for easier code reference.'>
        <div className='space-y-6'>
          <div>
            <h4 className='text-md font-medium text-gray-300 mb-3'>With Line Numbers</h4>
            <CodeBlock code={reactExample} language='tsx' filename='Counter.tsx' showLineNumbers={true} />
          </div>
        </div>
      </ExampleSection>

      <ExampleSection title='Interactive Features' description='Copy, download, and fullscreen functionality.'>
        <div className='space-y-6'>
          <div>
            <h4 className='text-md font-medium text-gray-300 mb-3'>With Download & Fullscreen</h4>
            <CodeBlock
              code={complexExample}
              language='typescript'
              filename='UserService.ts'
              allowDownload={true}
              allowFullscreen={true}
              showLineNumbers={true}
            />
          </div>

          <div>
            <h4 className='text-md font-medium text-gray-300 mb-3'>Copy Only</h4>
            <CodeBlock code={`const message = "Hello, World!";\nconsole.log(message);`} language='ts' />
          </div>
        </div>
      </ExampleSection>

      <ExampleSection title='Styling Options' description='Different visual configurations and customizations.'>
        <div className='space-y-6'>
          <div>
            <h4 className='text-md font-medium text-gray-300 mb-3'>No Traffic Lights</h4>
            <CodeBlock
              code={`interface Config {\n  theme: 'light' | 'dark';\n  debug: boolean;\n}`}
              language='ts'
              filename='config.ts'
              showTrafficLights={false}
            />
          </div>

          <div>
            <h4 className='text-md font-medium text-gray-300 mb-3'>Hidden Header (Floating Buttons)</h4>
            <CodeBlock
              code={`// Clean minimal appearance\nconst greeting = "Hello from floating buttons!";\nconsole.log(greeting);`}
              language='ts'
              hideHeader={true}
              allowFullscreen={true}
            />
          </div>

          <div>
            <h4 className='text-md font-medium text-gray-300 mb-3'>Custom Token Colors</h4>
            <CodeBlock
              code={`// Custom syntax highlighting\nfunction greet(name: string): string {\n  return \`Hello, \${name}!\`;\n}\n\nconst result = greet('Developer');\nconsole.log(result);`}
              language='ts'
              filename='custom-colors.ts'
              tokenClasses={customTokenClasses}
              showLineNumbers={true}
            />
          </div>

          <div>
            <h4 className='text-md font-medium text-gray-300 mb-3'>With Max Height (Scrollable)</h4>
            <CodeBlock
              code={complexExample}
              language='typescript'
              filename='UserService.ts'
              maxHeight={200}
              showLineNumbers={true}
            />
          </div>
        </div>
      </ExampleSection>

      <ExampleSection title='Advanced Examples' description='Real-world usage patterns and complex configurations.'>
        <div className='space-y-6'>
          <div>
            <h4 className='text-md font-medium text-gray-300 mb-3'>Full-Featured Code Block</h4>
            <CodeBlock
              code={complexExample}
              language='typescript'
              filename='UserService.ts'
              showLineNumbers={true}
              allowDownload={true}
              allowFullscreen={true}
              maxHeight={300}
            />
          </div>

          <div>
            <h4 className='text-md font-medium text-gray-300 mb-3'>API Response Example</h4>
            <CodeBlock
              code={`// API Response Handler
interface ApiResponse<T> {
  data: T;
  status: 'success' | 'error';
  message?: string;
}

async function handleApiCall<T>(
  url: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers
      },
      ...options
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        data: data,
        status: 'error',
        message: data.message || 'An error occurred'
      };
    }

    return {
      data,
      status: 'success'
    };
  } catch (error) {
    return {
      data: {} as T,
      status: 'error',
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}`}
              language='typescript'
              filename='api-handler.ts'
              showLineNumbers={true}
              allowDownload={true}
              allowFullscreen={true}
            />
          </div>
        </div>
      </ExampleSection>

      <ExampleSection title='Accessibility & Usage' description='Keyboard shortcuts and accessibility features.'>
        <div className='space-y-4'>
          <div className='bg-slate-700 p-4 rounded-lg'>
            <h5 className='font-medium mb-2'>Keyboard Shortcuts</h5>
            <ul className='space-y-1 text-sm text-gray-300'>
              <li>
                <kbd className='bg-slate-600 px-2 py-0.5 rounded text-xs'>Cmd/Ctrl + C</kbd> - Copy code to clipboard
              </li>
              <li>
                <kbd className='bg-slate-600 px-2 py-0.5 rounded text-xs'>F</kbd> - Toggle fullscreen mode (when
                enabled)
              </li>
              <li>
                <kbd className='bg-slate-600 px-2 py-0.5 rounded text-xs'>Escape</kbd> - Exit fullscreen mode
              </li>
            </ul>
          </div>
          <div className='bg-slate-700 p-4 rounded-lg'>
            <h5 className='font-medium mb-2'>Accessibility Features</h5>
            <ul className='space-y-1 text-sm text-gray-300'>
              <li>• Screen reader compatible with proper ARIA labels</li>
              <li>• Keyboard navigation support</li>
              <li>• Live announcements for copy actions</li>
              <li>• Semantic HTML structure</li>
              <li>• Focus management in fullscreen mode</li>
            </ul>
          </div>
        </div>
      </ExampleSection>
    </ComponentPage>
  );
};
