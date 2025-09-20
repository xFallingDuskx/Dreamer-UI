import { useState } from 'react';
import { ComponentPage } from '../../components/layout/ComponentPage';
import { ExampleSection } from '../../components/ui/ExampleSection';
import { Time } from '../../../time';

const tableOfContents = [
  { id: 'basic-usage', title: 'Basic Usage', level: 1 },
  { id: 'time-formats', title: 'Time Formats', level: 1 },
  { id: 'increments', title: 'Time Increments', level: 1 },
  { id: 'time-ranges', title: 'Time Ranges', level: 1 },
  { id: 'variants', title: 'Variants', level: 1 },
  { id: 'controlled-uncontrolled', title: 'Controlled vs Uncontrolled', level: 1 },
  { id: 'device-behavior', title: 'Device-Specific Behavior', level: 1 },
  { id: 'props-reference', title: 'Props Reference', level: 1 },
];

export function TimePage() {
  const [controlledTime, setControlledTime] = useState('2:30 PM');

  return (
    <ComponentPage
      title='Time'
      description='A responsive time picker component that adapts to device type - showing a select dropdown on desktop and a clock modal on mobile devices.'
      tableOfContents={tableOfContents}
    >
      <ExampleSection
        title='Basic Usage'
        description='Simple time picker with default 15-minute increments and current time as default value.'
        id='basic-usage'
      >
        <div className='max-w-xs space-y-4'>
          <Time placeholder="Select time" />
          <Time defaultValue="9:00 AM" placeholder="With default value" />
        </div>
      </ExampleSection>

      <ExampleSection
        title='Time Formats'
        description='The component supports both 12-hour (AM/PM) and 24-hour time formats.'
        id='time-formats'
      >
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl'>
          <div>
            <h4 className='text-sm font-medium text-gray-300 mb-2'>12-Hour Format (Default)</h4>
            <Time placeholder="12-hour format" />
          </div>
          <div>
            <h4 className='text-sm font-medium text-gray-300 mb-2'>24-Hour Format</h4>
            <Time use24HourFormat={true} placeholder="24-hour format" />
          </div>
        </div>
      </ExampleSection>

      <ExampleSection
        title='Time Increments'
        description='Customize the time increment interval to control available time options.'
        id='increments'
      >
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl'>
          <div>
            <h4 className='text-sm font-medium text-gray-300 mb-2'>15 Minutes (Default)</h4>
            <Time increment={15} placeholder="15min intervals" />
          </div>
          <div>
            <h4 className='text-sm font-medium text-gray-300 mb-2'>30 Minutes</h4>
            <Time increment={30} placeholder="30min intervals" />
          </div>
          <div>
            <h4 className='text-sm font-medium text-gray-300 mb-2'>1 Hour</h4>
            <Time increment={60} placeholder="Hour intervals" />
          </div>
        </div>
      </ExampleSection>

      <ExampleSection
        title='Time Ranges'
        description='Limit selectable times to specific ranges using minValue and maxValue props.'
        id='time-ranges'
      >
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl'>
          <div>
            <h4 className='text-sm font-medium text-gray-300 mb-2'>Business Hours (9 AM - 5 PM)</h4>
            <Time 
              minValue="9:00 AM"
              maxValue="5:00 PM"
              increment={60}
              placeholder="Business hours"
            />
          </div>
          <div>
            <h4 className='text-sm font-medium text-gray-300 mb-2'>Evening Hours (6 PM - 11 PM)</h4>
            <Time 
              minValue="6:00 PM"
              maxValue="11:00 PM"
              increment={30}
              placeholder="Evening hours"
            />
          </div>
        </div>
      </ExampleSection>

      <ExampleSection
        title='Variants'
        description='Different visual styles to match your design needs.'
        id='variants'
      >
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl'>
          <div>
            <h4 className='text-sm font-medium text-gray-300 mb-2'>Default</h4>
            <Time placeholder="Default variant" />
          </div>
          <div>
            <h4 className='text-sm font-medium text-gray-300 mb-2'>Outline</h4>
            <Time variant="outline" placeholder="Outline variant" />
          </div>
          <div>
            <h4 className='text-sm font-medium text-gray-300 mb-2'>Underline</h4>
            <Time variant="underline" placeholder="Underline variant" />
          </div>
        </div>
      </ExampleSection>

      <ExampleSection
        title='Controlled vs Uncontrolled'
        description='Use the component in controlled or uncontrolled modes based on your state management needs.'
        id='controlled-uncontrolled'
      >
        <div className='space-y-6'>
          <div>
            <h4 className='text-lg font-medium text-white mb-2'>Uncontrolled</h4>
            <p className='text-sm text-gray-400 mb-3'>
              Component manages its own state. Use <code className='text-accent'>defaultValue</code> and <code className='text-accent'>onChange</code>.
            </p>
            <Time 
              defaultValue="10:30 AM"
              onChange={(time) => console.log('Uncontrolled time changed:', time)}
              placeholder="Uncontrolled time picker"
            />
          </div>
          
          <div>
            <h4 className='text-lg font-medium text-white mb-2'>Controlled</h4>
            <p className='text-sm text-gray-400 mb-3'>
              You manage the component state. Use <code className='text-accent'>value</code> and <code className='text-accent'>onChange</code>.
            </p>
            <div className='flex items-center gap-4'>
              <Time 
                value={controlledTime}
                onChange={setControlledTime}
                placeholder="Controlled time picker"
              />
              <div className='text-sm text-gray-400'>
                Current value: <span className='text-primary'>{controlledTime || 'None'}</span>
              </div>
            </div>
          </div>
        </div>
      </ExampleSection>

      <ExampleSection
        title='Device-Specific Behavior'
        description='The component automatically adapts its interface based on the device type for optimal user experience.'
        id='device-behavior'
      >
        <div className='space-y-4'>
          <div className='bg-gray-700 p-4 rounded-lg'>
            <h4 className='text-white font-semibold mb-2'>Desktop Experience</h4>
            <p className='text-gray-300 text-sm mb-3'>
              On desktop devices, clicking the time picker opens a dropdown select with scrollable time options.
              This provides quick access to all available times while maintaining keyboard navigation support.
            </p>
            <Time placeholder="Desktop behavior demo" />
          </div>
          
          <div className='bg-gray-700 p-4 rounded-lg'>
            <h4 className='text-white font-semibold mb-2'>Mobile Experience</h4>
            <p className='text-gray-300 text-sm mb-3'>
              On mobile devices, clicking opens a modal with an Android-style clock interface featuring:
            </p>
            <ul className='text-gray-300 text-sm ml-4 mb-3 space-y-1'>
              <li>• Large, touch-friendly time selectors for hours, minutes, and AM/PM</li>
              <li>• Visual time display showing the selected time</li>
              <li>• Switch to input mode for direct text entry</li>
              <li>• Respects the chosen time format (12-hour vs 24-hour)</li>
            </ul>
            <Time placeholder="Mobile behavior demo" />
            <p className='text-xs text-gray-400 mt-2'>
              Note: To test mobile behavior, resize your browser window to mobile width or use developer tools device simulation.
            </p>
          </div>
        </div>
      </ExampleSection>

      <ExampleSection
        title='Props Reference'
        description='Complete list of available props and their usage.'
        id='props-reference'
      >
        <div className='bg-gray-700 p-4 rounded-lg'>
          <h4 className='text-white font-semibold mb-2'>TimeProps Interface</h4>
          <pre className='text-sm text-gray-300 overflow-x-auto'>
{`interface TimeProps {
  // Time constraints
  minValue?: string;              // Minimum selectable time (e.g., "9:00 AM")
  maxValue?: string;              // Maximum selectable time (e.g., "5:00 PM")
  increment?: number;             // Time increment in minutes (default: 15)
  
  // Format and display
  use24HourFormat?: boolean;      // Use 24-hour format (default: false)
  placeholder?: string;           // Placeholder text
  
  // State management
  defaultValue?: string;          // Default time for uncontrolled mode
  value?: string;                 // Current time for controlled mode
  onChange?: (value: string) => void; // Called when time changes
  
  // Visual styling
  variant?: 'base' | 'default' | 'underline' | 'outline';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  className?: string;             // Additional CSS classes
  
  // HTML attributes
  id?: string;                    // Component ID
  ref?: React.Ref<HTMLDivElement>; // Ref to container element
  disabled?: boolean;             // Disabled state
  errorMessage?: string;          // Error message to display
}`}
          </pre>
        </div>
      </ExampleSection>
    </ComponentPage>
  );
}