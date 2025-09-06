import { Disclosure, Callout } from '@moondreamsdev/dreamer-ui/components';
import { ComponentPage } from '../components/layout/ComponentPage';
import { Code } from '../Code';

export const DraftPage = () => {
  return (
    <ComponentPage
      title='Draft'
      description='A testing ground for developing and prototyping new components. This page is only available in development.'
    >
      <div className='space-y-8'>
        <Callout
          variant='warning'
          icon='default'
          title='Development Mode'
          description='This page is only accessible on localhost and is intended for component development and testing.'
        />

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

            {/* Callout Component Testing */}
            <div>
              <h3 className='text-lg font-medium text-white mb-3'>Callout Component Testing</h3>
              <div className='space-y-4'>
                <Callout
                  variant='info'
                  icon='default'
                  title='Info Callout'
                  description='This is an informational alert.'
                />
                <Callout
                  variant='destructive'
                  icon='default'
                  title='Danger Callout'
                  description='This is a danger alert.'
                />
                <Callout
                  variant='success'
                  icon='default'
                  title='Success Callout'
                  description='This is a success alert.'
                />
                <Callout
                  variant='warning'
                  icon='default'
                  title='Warning Callout'
                  description='This is a warning alert.'
                />
                <Callout
                  variant='base'
                  icon='default'
                  title='Base Callout'
                  description='This is a base alert with custom styles.'
                  className='text-purple-500 bg-purple-700/10'
                />
                <Callout
                  variant='base'
                  icon='default'
                  description='This is a base alert with no specific color.'
                />
                <Callout
                  variant='info'
                  icon='default'
                  title='Dismissible Callout'
                  description='This callout can be dismissed.'
                  dismissible
                  onDismiss={() => alert('Callout dismissed!')}
                />
              </div>
            </div>

            {/* Code Component Testing */}
            <div className='mb-6'>
              <h3 className='text-lg font-medium text-white mb-3'>Code Component Testing</h3>
              <div className='space-y-4'>
                {/* Default Variant */}
                <div>
                  <h4 className='text-md font-medium text-gray-300 mb-2'>Default Variant</h4>
                  With text <Code variant='default' content='<SomeComponent />' /> around it.
                </div>

                {/* Accent Variant */}
                <div>
                  <h4 className='text-md font-medium text-gray-300 mb-2'>Accent Variant</h4>
                  <Code variant='accent' content='This is the accent variant of the Code component.' />
                </div>

                {/* Base Variant */}
                <div>
                  <h4 className='text-md font-medium text-gray-300 mb-2'>Base Variant</h4>
                  <Code variant='base' content='This is the base variant of the Code component.' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ComponentPage>
  );
};
