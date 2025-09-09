import { Callout, Code, Disclosure, Drawer, Popover } from '@moondreamsdev/dreamer-ui/components';
import { useState } from 'react';
import { ComponentPage } from '../components/layout/ComponentPage';

export const DraftPage = () => {
  const [drawerState, setDrawerState] = useState({
    basic: false,
    withFooter: false,
    fullscreen: false,
    nonDraggable: false,
  });

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
                <Callout variant='base' icon='default' description='This is a base alert with no specific color.' />
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
                {/* Modest Variant */}
                <div>
                  <h4 className='text-md font-medium text-gray-300 mb-2'>Modest Variant</h4>
                  With text <Code variant='modest' content='<SomeComponent />' /> around it.
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
                {/* Current Variant */}
                <div>
                  <h4 className='text-md font-medium text-gray-300 mb-2'>Current Variant</h4>
                  <Code
                    variant='current'
                    content='This is the current variant of the Code component.'
                    className='text-orange-500'
                  />
                </div>

                {/* Adjust to text size */}
                <div>
                  <h4 className='text-md font-medium text-gray-300 mb-2'>Adjust to Text Size</h4>
                  <p className='md:text-2xl lg:text-4xl'>
                    The <Code variant='accent' content='Code' /> component should adjust its font size and line height
                    based on the surrounding text.
                  </p>
                </div>
              </div>
            </div>

            {/* Popover Component Testing */}
            <div>
              <h3 className='text-xl font-bold text-white mb-3'>Popover Component Testing</h3>
              <div className='space-y-4'>
                {/* Uncontrolled Popover */}
                <div>
                  <h4 className='text-lg font-semibold text-gray-300 mb-2'>Uncontrolled Popover</h4>
                  <Popover
                    className='p-2 whitespace-nowrap w-fit'
                    trigger={<button className='font-light'>Open Uncontrolled Popover</button>}
                  >
                    This is an uncontrolled Popover.
                  </Popover>
                </div>

                {/* Controlled Popover */}
                <div>
                  <h4 className='text-lg font-semibold text-gray-300 mb-2'>Controlled Popover</h4>
                  <Popover
                    isOpen={true}
                    className='p-2 w-80'
                    trigger={<button className='font-light'>Open Controlled Popover</button>}
                  >
                    This is a controlled Popover.
                  </Popover>
                </div>

                {/* Right Aligned Popover */}
                <div>
                  <h4 className='text-lg font-semibold text-gray-300 mb-2'>Right Aligned Popover</h4>
                  <Popover
                    className='p-2'
                    alignment='right'
                    trigger={<button className='font-light'>Open Right Aligned Popover</button>}
                    closeOnOverlayClick={false}
                  >
                    To the right.
                  </Popover>
                </div>

                {/* Left Aligned Popover */}
                <div>
                  <h4 className='text-lg font-semibold text-gray-300 mb-2'>Left Aligned Popover</h4>
                  <Popover
                    className='p-2'
                    alignment='left'
                    trigger={<button className='font-light'>Open Left Aligned Popover</button>}
                    closeOnTriggerClick={false}
                  >
                    To the left.
                  </Popover>
                </div>
              </div>
            </div>

            {/* Drawer Component Testing */}
            <div>
              <h3 className='text-lg font-medium text-white mb-3'>Drawer Component Testing</h3>
              <div className='space-y-4'>
                {/* Example 1: Basic Drawer */}
                <div>
                  <button onClick={() => setDrawerState({ ...drawerState, basic: true })}>Open Basic Drawer</button>
                  <Drawer
                    isOpen={drawerState.basic}
                    onClose={() => setDrawerState({ ...drawerState, basic: false })}
                    title='Basic Drawer'
                  >
                    <div className='p-4 min-h-screen'>This is a basic drawer with medium size.</div>
                  </Drawer>
                </div>

                {/* Example 2: Drawer with Footer */}
                <div>
                  <button onClick={() => setDrawerState({ ...drawerState, withFooter: true })}>
                    Open Drawer with Footer
                  </button>
                  <Drawer
                    isOpen={drawerState.withFooter}
                    onClose={() => setDrawerState({ ...drawerState, withFooter: false })}
                    title='Drawer with Footer'
                    footer={<div className='text-center'>Footer Content</div>}
                  >
                    <div className='p-4'>This drawer includes a footer.</div>
                  </Drawer>
                </div>

                {/* Example 3: Fullscreen Drawer */}
                <div>
                  <button onClick={() => setDrawerState({ ...drawerState, fullscreen: true })}>
                    Open Fullscreen Drawer
                  </button>
                  <Drawer
                    isOpen={drawerState.fullscreen}
                    onClose={() => setDrawerState({ ...drawerState, fullscreen: false })}
                    title='Fullscreen Drawer'
                    showCloseButton={true}
                  >
                    <div className='p-4'>This is a fullscreen drawer with a close button.</div>
                  </Drawer>
                </div>

                {/* Example 4: Drawer with Drag Gestures Disabled */}
                <div>
                  <button onClick={() => setDrawerState({ ...drawerState, nonDraggable: true })}>
                    Open Non-Draggable Drawer
                  </button>
                  <Drawer
                    isOpen={drawerState.nonDraggable}
                    onClose={() => setDrawerState({ ...drawerState, nonDraggable: false })}
                    title='Non-Draggable Drawer'
                    enableDragGestures={false}
                    showCloseButton={true}
                  >
                    <div className='p-4'>This drawer has drag gestures disabled.</div>
                  </Drawer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ComponentPage>
  );
};
