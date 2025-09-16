import { ComponentPage } from '../../components/layout/ComponentPage';
import { ExampleSection } from '../../components/ui/ExampleSection';

const tableOfContents = [
  { id: 'installation', title: 'Installation', level: 1 },
  { id: 'basic-usage', title: 'Basic Usage', level: 1 },
  { id: 'flush-method', title: 'Flush Method', level: 1 },
  { id: 'async-functions', title: 'Async Functions', level: 1 },
  { id: 'custom-delay', title: 'Custom Delay', level: 1 },
  { id: 'real-world-examples', title: 'Real-World Examples', level: 1 },
  { id: 'throttle-vs-debounce', title: 'Throttle vs Debounce', level: 1 },
  { id: 'api-reference', title: 'API Reference', level: 1 },
];

export function ThrottlePage() {
  return (
    <ComponentPage
      title='throttle'
      description='A utility function that limits the execution of a function to at most once per specified delay period. Includes a flush method for immediate execution of pending calls. Ideal for scroll handlers, resize events, and rate-limiting API calls.'
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
            import &#123; throttle &#125; from '@moondreamsdev/dreamer-ui/utils';
          </code>
        </div>
      </ExampleSection>

      <ExampleSection 
        title='Basic Usage'
        description='Simple function throttling with default delay.'
        id='basic-usage'
      >
        <div className='space-y-4'>
          <div className='bg-gray-700 p-4 rounded-lg'>
            <h4 className='text-white font-semibold mb-2'>Basic Example</h4>
            <pre className='text-sm text-gray-300 overflow-x-auto'>
{`// Create a throttled function with default 300ms delay
const throttledFunction = throttle(() => {
  console.log('This executes at most once every 300ms');
});

// Call it multiple times rapidly
throttledFunction(); // Executes immediately
throttledFunction(); // Queued for later execution
throttledFunction(); // Replaces previous queued call`}
            </pre>
          </div>
          <div className='bg-gray-700 p-4 rounded-lg'>
            <h4 className='text-white font-semibold mb-2'>With Parameters</h4>
            <pre className='text-sm text-gray-300 overflow-x-auto'>
{`const throttledLog = throttle((message: string) => {
  console.log(\`Throttled: \${message}\`);
}, 1000);

throttledLog('First');  // Executes immediately  
throttledLog('Second'); // Queued
throttledLog('Third');  // Replaces 'Second', will execute with 'Third'`}
            </pre>
          </div>
        </div>
      </ExampleSection>

      <ExampleSection 
        title='Flush Method'
        description='Immediately execute any pending throttled function calls.'
        id='flush-method'
      >
        <div className='space-y-4'>
          <div className='bg-gray-700 p-4 rounded-lg'>
            <h4 className='text-white font-semibold mb-2'>Using flush()</h4>
            <pre className='text-sm text-gray-300 overflow-x-auto'>
{`const throttledSave = throttle(async (data) => {
  await saveToServer(data);
  console.log('Data saved');
}, 2000);

// Regular throttled calls
throttledSave(userData); // Executes immediately
throttledSave(userData); // Queued for later

// Force immediate execution of pending call
throttledSave.flush(); // Executes the queued call right now

// Useful for cleanup or urgent execution
window.addEventListener('beforeunload', () => {
  throttledSave.flush(); // Ensure final save before page unload
});`}
            </pre>
          </div>
        </div>
      </ExampleSection>

      <ExampleSection 
        title='Async Functions'
        description='Throttling asynchronous functions like API calls.'
        id='async-functions'
      >
        <div className='space-y-4'>
          <div className='bg-gray-700 p-4 rounded-lg'>
            <h4 className='text-white font-semibold mb-2'>API Rate Limiting</h4>
            <pre className='text-sm text-gray-300 overflow-x-auto'>
{`const throttledApiCall = throttle(async (endpoint: string, data: any) => {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return response.json();
}, 1000); // Maximum 1 call per second

// Usage
const handleButtonClick = async () => {
  try {
    const result = await throttledApiCall('/api/action', { userId: 123 });
    console.log('API result:', result);
  } catch (error) {
    console.error('API call failed:', error);
  }
};`}
            </pre>
          </div>
        </div>
      </ExampleSection>

      <ExampleSection 
        title='Custom Delay'
        description='Configuring different throttle delays for various use cases.'
        id='custom-delay'
      >
        <div className='space-y-4'>
          <div className='bg-gray-700 p-4 rounded-lg'>
            <h4 className='text-white font-semibold mb-2'>Different Delay Times</h4>
            <pre className='text-sm text-gray-300 overflow-x-auto'>
{`// Fast throttling for smooth animations (16ms ≈ 60fps)
const throttledAnimation = throttle((progress: number) => {
  updateProgressBar(progress);
}, 16);

// Standard throttling for scroll handlers (100ms)
const throttledScroll = throttle(() => {
  updateScrollIndicator();
}, 100);

// Slow throttling for expensive operations (2000ms)
const throttledAnalytics = throttle((event: AnalyticsEvent) => {
  sendAnalytics(event);
}, 2000);`}
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
            <h4 className='text-white font-semibold mb-2'>Scroll Event Handler</h4>
            <pre className='text-sm text-gray-300 overflow-x-auto'>
{`import { useEffect, useMemo } from 'react';
import { throttle } from '@moondreamsdev/dreamer-ui/utils';

function ScrollIndicator() {
  const [scrollProgress, setScrollProgress] = useState(0);

  const throttledScrollHandler = useMemo(() =>
    throttle(() => {
      const scrolled = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const progress = (scrolled / maxScroll) * 100;
      setScrollProgress(Math.min(progress, 100));
    }, 16), // ~60fps for smooth animation
  []);

  useEffect(() => {
    window.addEventListener('scroll', throttledScrollHandler);
    return () => {
      window.removeEventListener('scroll', throttledScrollHandler);
      // Clean up any pending calls
      throttledScrollHandler.flush();
    };
  }, [throttledScrollHandler]);

  return (
    <div className="fixed top-0 w-full h-2 bg-gray-200">
      <div 
        className="h-full bg-blue-500 transition-all"
        style={{ width: \`\${scrollProgress}%\` }}
      />
    </div>
  );
}`}
            </pre>
          </div>
          <div className='bg-gray-700 p-4 rounded-lg'>
            <h4 className='text-white font-semibold mb-2'>Button Click Protection</h4>
            <pre className='text-sm text-gray-300 overflow-x-auto'>
{`import { useMemo } from 'react';
import { throttle } from '@moondreamsdev/dreamer-ui/utils';

function ActionButton({ onAction, children }) {
  const [isLoading, setIsLoading] = useState(false);

  const throttledAction = useMemo(() =>
    throttle(async () => {
      setIsLoading(true);
      try {
        await onAction();
      } finally {
        setIsLoading(false);
      }
    }, 1000), // Prevent rapid clicking
  [onAction]);

  return (
    <button
      onClick={() => throttledAction()}
      disabled={isLoading}
      className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
    >
      {isLoading ? 'Processing...' : children}
    </button>
  );
}`}
            </pre>
          </div>
          <div className='bg-gray-700 p-4 rounded-lg'>
            <h4 className='text-white font-semibold mb-2'>Window Resize Handler</h4>
            <pre className='text-sm text-gray-300 overflow-x-auto'>
{`function ResponsiveChart() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const throttledResize = useMemo(() =>
    throttle(() => {
      const container = document.getElementById('chart-container');
      if (container) {
        setDimensions({
          width: container.offsetWidth,
          height: container.offsetHeight
        });
      }
    }, 150), // Balance responsiveness with performance
  []);

  useEffect(() => {
    // Initial measurement
    throttledResize();
    
    window.addEventListener('resize', throttledResize);
    return () => {
      window.removeEventListener('resize', throttledResize);
      throttledResize.flush(); // Final resize on cleanup
    };
  }, [throttledResize]);

  return (
    <div id="chart-container" className="w-full h-full">
      <Chart width={dimensions.width} height={dimensions.height} />
    </div>
  );
}`}
            </pre>
          </div>
        </div>
      </ExampleSection>

      <ExampleSection 
        title='Throttle vs Debounce'
        description='Understanding when to use throttle versus debounce.'
        id='throttle-vs-debounce'
      >
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='bg-blue-900/20 border border-blue-800 p-4 rounded-lg'>
            <h4 className='font-semibold mb-2 text-blue-400'>🚀 Use Throttle When</h4>
            <ul className='text-sm text-gray-300 space-y-1'>
              <li>• <strong>Scroll handlers</strong> - Smooth scrolling effects</li>
              <li>• <strong>Resize events</strong> - Responsive layouts</li>
              <li>• <strong>Mouse movement</strong> - Drag and drop, hover effects</li>
              <li>• <strong>Animation frames</strong> - 60fps updates</li>
              <li>• <strong>Button clicks</strong> - Prevent rapid submissions</li>
              <li>• <strong>API rate limiting</strong> - Respect server limits</li>
            </ul>
            <p className='text-xs text-blue-300 mt-2'>
              Throttle ensures regular execution during continuous activity.
            </p>
          </div>
          <div className='bg-green-900/20 border border-green-800 p-4 rounded-lg'>
            <h4 className='font-semibold mb-2 text-green-400'>⏱️ Use Debounce When</h4>
            <ul className='text-sm text-gray-300 space-y-1'>
              <li>• <strong>Search inputs</strong> - Wait for typing to finish</li>
              <li>• <strong>Form validation</strong> - Validate after input pause</li>
              <li>• <strong>Auto-save</strong> - Save after editing stops</li>
              <li>• <strong>API suggestions</strong> - Fetch after typing pause</li>
              <li>• <strong>Window resize</strong> - React after resizing ends</li>
              <li>• <strong>Button spam protection</strong> - One action per burst</li>
            </ul>
            <p className='text-xs text-green-300 mt-2'>
              Debounce waits for activity to stop before executing.
            </p>
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
{`function throttle<TArgs extends unknown[], TReturn>(
  fn: (...args: TArgs) => TReturn | Promise<TReturn>,
  delay?: number
): ((...args: TArgs) => Promise<TReturn | undefined>) & { 
  flush: () => Promise<TReturn | undefined> 
}

// Parameters:
// - fn: The function to throttle (sync or async)
// - delay: Minimum time between executions (default: 300ms)
//
// Returns:
// - A throttled function that returns a Promise
// - Includes flush() method for immediate execution
//
// Behavior:
// - First call executes immediately
// - Subsequent calls are queued and executed after delay
// - Each new call replaces the previous queued call
// - flush() method executes pending call immediately
// - Automatically handles both sync and async functions
// - Preserves original function's parameters and return type`}
          </pre>
        </div>
      </ExampleSection>
    </ComponentPage>
  );
}