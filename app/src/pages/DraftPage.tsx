import { Disclosure } from '@moondreamsdev/dreamer-ui/components';
import { Alert } from '../alert';
import { ComponentPage } from '../components/layout/ComponentPage';

export const DraftPage = () => {
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
            {/* Disclosure Component Testing */}
            <div className='mb-6'>
              <h3 className='text-lg font-medium text-white mb-3'>Disclosure Component Testing</h3>
              <div className='space-y-4'>
                {/* Default variant */}
                <div>
                  <h4 className='text-md font-medium text-gray-300 mb-2'>Default Variant</h4>
                  <Disclosure label='Show more (default)'>
                    <div className='p-2 text-gray-800 dark:text-gray-200'>
                      This is the default disclosure content. You can put any React node here.
                    </div>
                  </Disclosure>
                </div>
                {/* Danger */}
                <div>
                  <h4 className='text-md font-medium text-gray-300 mb-2'>Danger Area</h4>
                  <Disclosure label='Show more (danger)'>
                    <div className='p-2 text-red-700 dark:text-red-300 bg-red-300 dark:bg-red-700'>
                      This is the danger disclosure content. Use for warnings or destructive actions.
                    </div>
                  </Disclosure>
                </div>
                {/* Styled Button */}
                <div>
                  <h4 className='text-md font-medium text-gray-300 mb-2'>Styled Button</h4>
                  <Disclosure
                    label='Show more (styled button)'
                    buttonClassName='rounded-full border border-accent-medium light:text-indigo-700 dark:text-indigo-300 bg-accent-medium/10'
                    className='md:w-1/2 mx-auto'
                  >
                    <div className='p-2 text-gray-800 dark:text-gray-200 text-center'>
                      This is the styled button disclosure content. You can put any React node here.
                    </div>
                  </Disclosure>
                </div>

                {/* Disabled state */}
                <div>
                  <h4 className='text-md font-medium text-gray-300 mb-2'>Disabled State</h4>
                  <Disclosure label='Disabled disclosure' disabled>
                    <div className='p-2 text-gray-400'>This disclosure is disabled and cannot be opened.</div>
                  </Disclosure>
                </div>
              </div>
            </div>

            {/* Alert Component Testing */}
            <div>
              <h3 className='text-lg font-medium text-white mb-3'>Alert Component Testing</h3>
              <div className='space-y-4'>
                <Alert
                  id='info-alert'
                  variant='info'
                  icon='default'
                  title='Info Alert'
                  description='This is an informational alert.'
                />
                <Alert
                  id='danger-alert'
                  variant='destructive'
                  icon='default'
                  title='Danger Alert'
                  description='This is a danger alert.'
                />
                <Alert
                  id='success-alert'
                  variant='success'
                  icon='default'
                  title='Success Alert'
                  description='This is a success alert.'
                />
                <Alert
                  id='warning-alert'
                  variant='warning'
                  icon='default'
                  title='Warning Alert'
                  description='This is a warning alert.'
                />
                <Alert
                  id='base-alert'
                  variant='base'
                  icon='default'
                  title='Base Alert'
                  description='This is a base alert with no specific color, using whatever custom styles are set.'
                  className='text-purple-500 bg-purple-700/10'
                />
                <Alert
                  id='accent-alert'
                  variant='accent'
                  title='Accent Alert'
                  description='This is an accent alert with custom purple styles.'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ComponentPage>
  );
};
