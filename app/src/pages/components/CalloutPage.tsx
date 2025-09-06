import { Callout } from '@moondreamsdev/dreamer-ui/components';
import { useState } from 'react';
import { ComponentPage } from '../../components/layout/ComponentPage';

const tableOfContents = [
  { id: 'variants', title: 'Variants', level: 1 },
  { id: 'icon-hidden', title: 'Icon (Hidden)', level: 1 },
  { id: 'dismissible', title: 'Dismissible', level: 1 },
];

export const CalloutPage = () => {
  const [calloutDismissed, setCalloutDismissed] = useState(false);

  return (
    <ComponentPage
      title='Callout'
      description='A versatile component for displaying alerts, warnings, and informational messages.'
      tableOfContents={tableOfContents}
    >
      <div className='space-y-8'>
        {/* Variants Section */}
        <div id='variants'>
          <h2 className='text-2xl font-bold mb-4'>Variants</h2>
          <p className='text-gray-300 mb-4'>
            A set of built-in variants for the Callout component. All use their "default" icon.
          </p>

          <div className='space-y-6'>
            <Callout variant='info' icon='default' title='Info Callout' description='This is an informational alert.' />

            <Callout
              variant='destructive'
              icon='default'
              title='Danger Callout'
              description='This is a danger alert.'
            />

            <Callout variant='success' icon='default' title='Success Callout' description='This is a success alert.' />
            <Callout variant='warning' icon='default' title='Warning Callout' description='This is a warning alert.' />

            <Callout
              variant='base'
              icon='default'
              title='Base Callout'
              description='This is a base alert with custom styles.'
              className='text-purple-500 bg-purple-700/10'
            />
          </div>
        </div>

        {/* Icon (Hidden) Section */}
        <div id='icon-hidden'>
          <h2 className='text-2xl font-bold mb-4'>Icon (Hidden)</h2>
          <p className='text-gray-300 mb-4'>Icons can be hidden in the Callout component for a cleaner look.</p>
          <Callout variant='info' icon={false} title='Hidden Icon' description='This callout has no icon displayed.' />
        </div>

        {/* Dismissible Section */}
        <div id='dismissible'>
          <h2 className='text-2xl font-bold mb-4'>Dismissible</h2>
          <p className='text-gray-300 mb-4'>
            Allow users to dismiss the Callout component when it is no longer needed.
          </p>
          <Callout
            variant='warning'
            dismissible={true}
            title='Dismissible Callout'
            description='This callout can be dismissed by the user.'
            onDismiss={() => setCalloutDismissed(true)}
          />
          {calloutDismissed && <p className='text-center text-yellow-500 underline'>This callout has been dismissed!</p>}
        </div>
      </div>
    </ComponentPage>
  );
};

export default CalloutPage;
