import { ComponentPage } from '../../components/layout/ComponentPage';
import { ExampleSection } from '../../components/ui/ExampleSection';

const tableOfContents = [
  { id: 'installation', title: 'Installation', level: 1 },
  { id: 'basic-usage', title: 'Basic Usage', level: 1 },
  { id: 'async-functions', title: 'Async Functions', level: 1 },
  { id: 'custom-delay', title: 'Custom Delay', level: 1 },
  { id: 'real-world-examples', title: 'Real-World Examples', level: 1 },
  { id: 'api-reference', title: 'API Reference', level: 1 },
];

export function DebouncePage() {
  return (
    <ComponentPage
      title='debounce'
      description='A utility function that delays invoking a function until after a specified delay has elapsed since the last time it was called. Perfect for search inputs, API calls, and other scenarios where you want to limit function execution frequency.'
      tableOfContents={tableOfContents}
    >
      <ExampleSection 
        title='Installation'
        description='Import the utility function.'
        id='installation'
      >
        <div className='bg-gray-700 p-4 rounded-lg'>
          <h4 className='text-white font-semibold mb-2'>Import</h4>
          <code className='text-primary text-sm'>
            import &#123; debounce &#125; from '@moondreamsdev/dreamer-ui/utils';
          </code>
        </div>
      </ExampleSection>

      <ExampleSection 
        title='Basic Usage'
        description='Simple function debouncing with default delay.'
        id='basic-usage'
      >
        <div className='space-y-4'>
          <div className='bg-gray-700 p-4 rounded-lg'>
            <h4 className='text-white font-semibold mb-2'>Basic Example</h4>
            <pre className='text-sm text-gray-300 overflow-x-auto'>
{`// Create a debounced function with default 300ms delay
const debouncedFunction = debounce(() => {
  console.log('This will run after 300ms of inactivity');
});

// Call it multiple times rapidly
debouncedFunction(); // Cancelled
debouncedFunction(); // Cancelled  
debouncedFunction(); // This one will execute after 300ms`}
            </pre>
          </div>
          <div className='bg-gray-700 p-4 rounded-lg'>
            <h4 className='text-white font-semibold mb-2'>With Parameters</h4>
            <pre className='text-sm text-gray-300 overflow-x-auto'>
{`const debouncedGreeting = debounce((name: string) => {
  console.log(\`Hello, \${name}!\`);
});

debouncedGreeting('Alice'); // Cancelled
debouncedGreeting('Bob');   // This will execute with 'Bob'`}
            </pre>
          </div>
        </div>
      </ExampleSection>

      <ExampleSection 
        title='Async Functions'
        description='Debouncing asynchronous functions like API calls.'
        id='async-functions'
      >
        <div className='space-y-4'>
          <div className='bg-gray-700 p-4 rounded-lg'>
            <h4 className='text-white font-semibold mb-2'>API Call Example</h4>
            <pre className='text-sm text-gray-300 overflow-x-auto'>
{`const debouncedSearch = debounce(async (query: string) => {
  const response = await fetch(\`/api/search?q=\${query}\`);
  const results = await response.json();
  return results;
}, 500);

// Usage in React component
const handleInputChange = async (e) => {
  const query = e.target.value;
  try {
    const results = await debouncedSearch(query);
    setSearchResults(results);
  } catch (error) {
    console.error('Search failed:', error);
  }
};`}
            </pre>
          </div>
        </div>
      </ExampleSection>

      <ExampleSection 
        title='Custom Delay'
        description='Configuring custom debounce delays for different use cases.'
        id='custom-delay'
      >
        <div className='space-y-4'>
          <div className='bg-gray-700 p-4 rounded-lg'>
            <h4 className='text-white font-semibold mb-2'>Different Delay Times</h4>
            <pre className='text-sm text-gray-300 overflow-x-auto'>
{`// Quick debounce for input validation (150ms)
const debouncedValidation = debounce((value: string) => {
  validateInput(value);
}, 150);

// Standard debounce for search (500ms)
const debouncedSearch = debounce((query: string) => {
  performSearch(query);
}, 500);

// Long debounce for expensive operations (1000ms)
const debouncedAnalytics = debounce((event: AnalyticsEvent) => {
  trackEvent(event);
}, 1000);`}
            </pre>
          </div>
        </div>
      </ExampleSection>

      <ExampleSection 
        title='Real-World Examples'
        description='Practical usage patterns in real applications.'
        id='real-world-examples'
      >
        <div className='space-y-4'>
          <div className='bg-gray-700 p-4 rounded-lg'>
            <h4 className='text-white font-semibold mb-2'>Search Input Component</h4>
            <pre className='text-sm text-gray-300 overflow-x-auto'>
{`import { useState, useMemo } from 'react';
import { debounce } from '@moondreamsdev/dreamer-ui/utils';

function SearchInput({ onSearch }) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  // Create debounced search function
  const debouncedSearch = useMemo(() => 
    debounce(async (searchQuery: string) => {
      if (!searchQuery.trim()) return;
      
      setLoading(true);
      try {
        const results = await fetch(\`/api/search?q=\${searchQuery}\`);
        const data = await results.json();
        onSearch(data);
      } finally {
        setLoading(false);
      }
    }, 500), [onSearch]
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search..."
        className="w-full p-2 border rounded"
      />
      {loading && <span>Searching...</span>}
    </div>
  );
}`}
            </pre>
          </div>
          <div className='bg-gray-700 p-4 rounded-lg'>
            <h4 className='text-white font-semibold mb-2'>Auto-Save Feature</h4>
            <pre className='text-sm text-gray-300 overflow-x-auto'>
{`import { useEffect, useMemo } from 'react';
import { debounce } from '@moondreamsdev/dreamer-ui/utils';

function DocumentEditor({ document, onSave }) {
  const [content, setContent] = useState(document.content);
  const [saveStatus, setSaveStatus] = useState('saved');

  // Create debounced save function
  const debouncedSave = useMemo(() =>
    debounce(async (newContent: string) => {
      setSaveStatus('saving');
      try {
        await onSave({ ...document, content: newContent });
        setSaveStatus('saved');
      } catch (error) {
        setSaveStatus('error');
      }
    }, 2000), [document, onSave]
  );

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    setSaveStatus('pending');
    debouncedSave(newContent);
  };

  return (
    <div>
      <textarea
        value={content}
        onChange={(e) => handleContentChange(e.target.value)}
        className="w-full h-64 p-4 border rounded"
      />
      <div className="mt-2 text-sm">
        Status: <span className={getStatusColor(saveStatus)}>{saveStatus}</span>
      </div>
    </div>
  );
}`}
            </pre>
          </div>
        </div>
      </ExampleSection>

      <ExampleSection 
        title='API Reference'
        description='Function signature and behavior details.'
        id='api-reference'
      >
        <div className='bg-gray-700 p-4 rounded-lg'>
          <h4 className='text-white font-semibold mb-2'>Function Signature</h4>
          <pre className='text-sm text-gray-300 overflow-x-auto'>
{`function debounce<TArgs extends unknown[], TReturn>(
  fn: (...args: TArgs) => TReturn | Promise<TReturn>,
  delay?: number
): (...args: TArgs) => Promise<TReturn>

// Parameters:
// - fn: The function to debounce (sync or async)
// - delay: Delay in milliseconds (default: 300ms)
//
// Returns:
// - A debounced version that returns a Promise
//
// Behavior:
// - Cancels previous executions when called again before delay
// - Automatically handles both sync and async functions
// - Returns a Promise for consistent async interface
// - Preserves original function's parameters and return type`}
          </pre>
        </div>
      </ExampleSection>
    </ComponentPage>
  );
}