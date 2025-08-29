import { ComponentPage } from '../../components/layout/ComponentPage';
import { Disclosure } from '../../disclosure';

const tableOfContents = [
  { id: 'showcase', title: 'Component Showcase', level: 1 },
  { id: 'default', title: 'Default Variant', level: 2 },
  { id: 'danger', title: 'Danger Area', level: 2 },
  { id: 'styled', title: 'Styled Button', level: 2 },
  { id: 'disabled', title: 'Disabled State', level: 2 },
  { id: 'toc', title: 'Table of Contents', level: 2 },
];

export const DisclosurePage = () => {
  return (
    <ComponentPage
      title='Disclosure'
      description='A simple, accessible hide/show component for toggling content visibility.'
      tableOfContents={tableOfContents}
    >
      <div className='space-y-8'>
        {/* Usage Notice */}
        <div className='bg-blue-900/20 border border-blue-700 rounded-lg p-4'>
          <div className='flex items-center space-x-2'>
            <svg className='w-5 h-5 text-blue-400' fill='currentColor' viewBox='0 0 20 20'>
              <path
                fillRule='evenodd'
                d='M18 10c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8zm-8 3a3 3 0 100-6 3 3 0 000 6z'
                clipRule='evenodd'
              />
            </svg>
            <h3 className='text-blue-400 font-medium'>Disclosure Component</h3>
          </div>
          <p className='text-blue-200 mt-2'>
            Use Disclosure to toggle visibility of content sections, such as FAQs, details, or advanced options.
          </p>
        </div>

        {/* Component Showcase */}
        <div id='showcase' className='bg-gray-900/50 border border-gray-700 rounded-lg p-8'>
          <h2 id='showcase' className='text-xl font-semibold text-white mb-4'>
            Component Showcase
          </h2>
          <p className='text-gray-300 mb-6'>
            Below are examples of the Disclosure component in various states and styles.
          </p>

          <div className='space-y-6'>
            {/* Default variant */}
            <div id='default' className='mb-6'>
              <h3 className='text-lg font-medium text-white mb-3'>Default Variant</h3>
              <Disclosure label='Show more (default)'>
                <div className='p-2 text-gray-800 dark:text-gray-200'>
                  This is the default disclosure content. You can put any React node here.
                </div>
              </Disclosure>
            </div>
            {/* Danger */}
            <div id='danger' className='mb-6'>
              <h3 className='text-lg font-medium text-white mb-3'>Danger Area</h3>
              <Disclosure label='Show more (danger)'>
                <div className='p-2 text-red-700 dark:text-red-300 bg-red-300 dark:bg-red-700'>
                  This is the danger disclosure content. Use for warnings or destructive actions.
                </div>
              </Disclosure>
            </div>
            {/* Styled Button */}
            <div id='styled' className='mb-6'>
              <h3 className='text-lg font-medium text-white mb-3'>Styled Button</h3>
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
            <div id='disabled' className='mb-6'>
              <h3 className='text-lg font-medium text-white mb-3'>Disabled State</h3>
              <Disclosure label='Disabled disclosure' disabled>
                <div className='p-2 text-gray-300 hover:text-white hover:bg-gray-700/50'>
                  This disclosure is disabled and cannot be opened.
                </div>
              </Disclosure>
            </div>

            {/* Table of contents */}
            <div id='toc' className='mb-6'>
              <h3 className='text-lg font-medium text-white mb-3'>Table of Contents</h3>
              <Disclosure
                label='Table of Contents'
                className='bg-gray-800/50 border border-accent-medium/50 rounded-xl text-white w-fit mx-auto'
                buttonClassName='p-4 text-left'
              >
                <nav className='p-2 pt-1 flex flex-col *:text-left *:p-1 *:hover:font-medium'>
                  <button className='text-gray-300 hover:text-white'>Introduction</button>
                  <button className='text-gray-300 hover:text-white'>Section 1</button>
                  <button className='text-gray-300/60 hover:text-white/60 ml-3'>Subsection A</button>
                  <button className='text-gray-300/60 hover:text-white/60 ml-3'>Subsection B</button>
                  <button className='text-gray-300 hover:text-white'>Section 2</button>
                  <button className='text-gray-300 hover:text-white'>Section 3</button>
                  <button className='text-gray-300 hover:text-white'>Section 4</button>
                </nav>
              </Disclosure>
            </div>
          </div>
        </div>
      </div>
    </ComponentPage>
  );
};
