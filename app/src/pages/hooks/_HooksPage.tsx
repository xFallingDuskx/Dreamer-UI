import { Link } from 'react-router-dom';
import { ComponentPage } from '../../components/layout/ComponentPage';
import { ExampleSection } from '../../components/ui/ExampleSection';

const hooks = [
  {
    name: 'useActionModal',
    path: '/hooks/useactionmodal',
    description: 'Programmatically display alert and confirmation modals with async/await support.',
  },
  {
    name: 'useToast',
    path: '/hooks/usetoast',
    description: 'Display toast notifications with different types, actions, and customizable duration.',
  },
];

export const HooksPage = () => {
  return (
    <ComponentPage
      title='Hooks'
      description='Custom React hooks that provide additional functionality and state management for your components.'
    >
      <ExampleSection title='Available Hooks' description='Browse through our collection of custom React hooks.'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {hooks.map((hook) => (
            <Link
              key={hook.path}
              to={hook.path}
              className='block p-6 bg-gray-800/50 border border-gray-600 rounded-xl hover:border-primary/50 hover:bg-gray-800/70 transition-all duration-200 group'
            >
              <h3 className='text-xl font-semibold text-white group-hover:text-primary transition-colors mb-2'>
                {hook.name}
              </h3>
              <p className='text-gray-400 text-sm'>{hook.description}</p>
              <div className='mt-4 flex items-center text-primary text-sm'>View Details →</div>
            </Link>
          ))}
        </div>
      </ExampleSection>

      <ExampleSection
        title='Provider Setup'
        description='Most hooks require their respective providers to be set up in your application.'
      >
        <div className='bg-gray-700 p-4 rounded-lg'>
          <h4 className='text-white font-semibold mb-2'>Complete Setup</h4>
          <pre className='text-sm text-gray-300 overflow-x-auto'>
            {`import { ActionModalProvider, ToastProvider } from '@moondreamsdev/dreamer-ui/providers';

function App() {
  return (
    <ActionModalProvider>
      <ToastProvider position='top-right'>
        <YourAppContent />
      </ToastProvider>
    </ActionModalProvider>
  );
}`}
          </pre>
        </div>
      </ExampleSection>
    </ComponentPage>
  );
};
