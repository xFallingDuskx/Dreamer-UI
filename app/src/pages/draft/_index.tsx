import { ComponentPage } from '../../components/layout/ComponentPage';

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
            <div>
              <h3 className='text-lg font-medium text-white mb-3'>Example Testing Section</h3>
              <div className='bg-gray-800/50 border border-gray-600 rounded p-4'>
                <p className='text-gray-400 text-sm mb-2'>Add your component tests here:</p>
                <div className='bg-gray-700/30 rounded p-4 border-2 border-dashed border-gray-600'>
                  <p className='text-gray-500 text-center italic'>Component testing area</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ComponentPage>
  );
};
