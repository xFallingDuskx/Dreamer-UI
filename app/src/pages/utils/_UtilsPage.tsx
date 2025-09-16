import { Link } from 'react-router-dom';
import { ComponentPage } from '../../components/layout/ComponentPage';
import { ExampleSection } from '../../components/ui/ExampleSection';

const utils = [
  {
    name: 'debounce',
    path: '/utils/debounce',
    description: 'Delay function execution until after a specified delay has elapsed since the last call. Perfect for search inputs and API calls.',
  },
  {
    name: 'join',
    path: '/utils/join',
    description: 'Conditionally join CSS class names with proper handling of falsy values and arrays.',
  },
  {
    name: 'throttle',
    path: '/utils/throttle',
    description: 'Limit function execution to at most once per specified delay period. Ideal for scroll handlers and rate-limiting.',
  },
];

export const UtilsPage = () => {
  return (
    <ComponentPage
      title='Utils'
      description='Utility functions that help you build better applications with clean and maintainable code.'
    >
      <ExampleSection title='Available Utilities' description='Browse through our collection of utility functions.'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {utils.map((util) => (
            <Link
              key={util.path}
              to={util.path}
              className='block p-6 bg-gray-800/50 border border-gray-600 rounded-xl hover:border-primary/50 hover:bg-gray-800/70 transition-all duration-200 group'
            >
              <h3 className='text-xl font-semibold text-white group-hover:text-primary transition-colors mb-2'>
                {util.name}
              </h3>
              <p className='text-gray-400 text-sm'>{util.description}</p>
              <div className='mt-4 flex items-center text-primary text-sm'>View Details →</div>
            </Link>
          ))}
        </div>
      </ExampleSection>

      <ExampleSection title='Installation' description='Import utilities directly from the utils module.'>
        <div className='bg-gray-700 p-4 rounded-lg'>
          <h4 className='text-white font-semibold mb-2'>Import Example</h4>
          <pre className='text-sm text-gray-300 overflow-x-auto'>
            {`// Import individual utilities
import { join } from '@moondreamsdev/dreamer-ui/utils';

// Use in your components
const className = join(
  'base-class',
  condition && 'conditional-class',
  'always-present'
);`}
          </pre>
        </div>
      </ExampleSection>

      <ExampleSection title='Philosophy' description='Our approach to utility functions and why they matter.'>
        <div className='prose prose-invert max-w-none'>
          <p className='text-gray-300'>Our utility functions are designed with the following principles in mind:</p>
          <ul className='text-gray-300 space-y-2'>
            <li>
              <strong className='text-white'>Type Safety:</strong> All utilities are fully typed with TypeScript for
              better developer experience.
            </li>
            <li>
              <strong className='text-white'>Performance:</strong> Lightweight and optimized for minimal bundle impact.
            </li>
            <li>
              <strong className='text-white'>Simplicity:</strong> Easy to understand and use, with clear APIs and good
              documentation.
            </li>
            <li>
              <strong className='text-white'>Composability:</strong> Utilities work well together and with other
              libraries.
            </li>
          </ul>
        </div>
      </ExampleSection>
    </ComponentPage>
  );
};
