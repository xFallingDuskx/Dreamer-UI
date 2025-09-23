import { useState } from 'react';
import { ComponentPage } from '../../components/layout/ComponentPage';
import { Slider } from '@moondreamsdev/dreamer-ui/components';

const tableOfContents = [
  { id: 'import', title: 'Import', level: 1 },
  { id: 'examples', title: 'Examples', level: 1 },
  { id: 'basic-usage', title: 'Basic Usage', level: 2 },
  { id: 'custom-range', title: 'Custom Range & Step', level: 2 },
  { id: 'disabled-state', title: 'Disabled State', level: 2 },
  { id: 'controlled-slider', title: 'Controlled Slider', level: 2 },
  { id: 'volume-example', title: 'Volume Control', level: 2 },
  { id: 'props', title: 'Props', level: 1 },
];

const sliderProps = [
  {
    name: 'value',
    type: 'number',
    description: 'The controlled value of the slider.',
  },
  {
    name: 'defaultValue',
    type: 'number',
    default: '0',
    description: 'The initial value of the slider (uncontrolled).',
  },
  {
    name: 'min',
    type: 'number',
    default: '0',
    description: 'The minimum value of the slider.',
  },
  {
    name: 'max',
    type: 'number',
    default: '100',
    description: 'The maximum value of the slider.',
  },
  {
    name: 'step',
    type: 'number',
    default: '1',
    description: 'The step increment of the slider.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Whether the slider is disabled.',
  },
  {
    name: 'onValueChange',
    type: '(value: number) => void',
    description: 'Callback fired when the slider value changes.',
  },
  {
    name: 'className',
    type: 'string',
    description: 'Additional CSS classes to apply to the slider.',
  },
  {
    name: 'trackClassName',
    type: 'string',
    description: 'Additional CSS classes to apply to the track element.',
  },
  {
    name: 'rangeClassName',
    type: 'string',
    description: 'Additional CSS classes to apply to the filled range element.',
  },
  {
    name: 'thumbClassName',
    type: 'string',
    description: 'Additional CSS classes to apply to the thumb element.',
  },
];

// Example components
function BasicSlider() {
  return (
    <div className='w-full max-w-md space-y-4'>
      <Slider
        defaultValue={50}
        onValueChange={(value) => console.log('Basic slider value:', value)}
        aria-label='Basic slider'
      />
      <p className='text-sm text-muted-foreground'>
        A basic slider with default settings (0-100 range)
      </p>
    </div>
  );
}

function CustomRangeSlider() {
  return (
    <div className='w-full max-w-md space-y-4'>
      <Slider
        min={10}
        max={50}
        step={5}
        defaultValue={25}
        onValueChange={(value) => console.log('Custom range slider value:', value)}
        aria-label='Custom range slider'
      />
      <div className='flex justify-between text-sm text-muted-foreground'>
        <span>Range: 10-50</span>
        <span>Step: 5</span>
      </div>
    </div>
  );
}

function DisabledSlider() {
  return (
    <div className='w-full max-w-md space-y-4'>
      <Slider
        defaultValue={30}
        disabled
        aria-label='Disabled slider'
      />
      <p className='text-sm text-muted-foreground'>
        This slider is disabled and cannot be interacted with
      </p>
    </div>
  );
}

function ControlledSlider() {
  const [value, setValue] = useState(75);
  
  return (
    <div className='w-full max-w-md space-y-4'>
      <Slider
        value={value}
        onValueChange={setValue}
        aria-label='Controlled slider'
      />
      <div className='flex justify-between items-center'>
        <span className='text-sm text-muted-foreground'>
          Value: {value}
        </span>
        <button
          onClick={() => setValue(50)}
          className='px-3 py-1 text-sm bg-primary text-primary-foreground rounded hover:bg-primary/90'
        >
          Reset to 50
        </button>
      </div>
    </div>
  );
}

function VolumeSlider() {
  const [volume, setVolume] = useState(50);
  
  return (
    <div className='w-full max-w-md p-4 bg-card rounded-lg border'>
      <div className='flex items-center gap-4'>
        <span className='text-2xl'>{volume === 0 ? '🔇' : volume < 50 ? '🔉' : '🔊'}</span>
        <div className='flex-1'>
          <Slider
            min={0}
            max={100}
            value={volume}
            onValueChange={setVolume}
            aria-label='Volume control'
            rangeClassName='bg-blue-500'
            thumbClassName='bg-blue-500'
          />
        </div>
        <span className='text-sm text-muted-foreground w-12'>
          {volume}%
        </span>
      </div>
    </div>
  );
}

const examples = [
  {
    id: 'basic-usage',
    title: 'Basic Usage',
    description: 'A simple slider with default configuration.',
    code: `function BasicSlider() {
  return (
    <Slider
      defaultValue={50}
      onValueChange={(value) => console.log('Value:', value)}
      aria-label='Basic slider'
    />
  );
}`,
    children: (
      <BasicSlider />
    ),
  },
  {
    id: 'custom-range',
    title: 'Custom Range & Step',
    description: 'Slider with custom min/max values and step increment.',
    code: `function CustomRangeSlider() {
  return (
    <Slider
      min={10}
      max={50}
      step={5}
      defaultValue={25}
      onValueChange={(value) => console.log('Value:', value)}
      aria-label='Custom range slider'
    />
  );
}`,
    children: (
      <CustomRangeSlider />
    ),
  },
  {
    id: 'disabled-state',
    title: 'Disabled State',
    description: 'A slider in disabled state that cannot be interacted with.',
    code: `function DisabledSlider() {
  return (
    <Slider
      defaultValue={30}
      disabled
      aria-label='Disabled slider'
    />
  );
}`,
    children: (
      <DisabledSlider />
    ),
  },
  {
    id: 'controlled-slider',
    title: 'Controlled Slider',
    description: 'A controlled slider with external state management.',
    code: `function ControlledSlider() {
  const [value, setValue] = useState(75);
  
  return (
    <div className='space-y-4'>
      <Slider
        value={value}
        onValueChange={setValue}
        aria-label='Controlled slider'
      />
      <div className='flex justify-between items-center'>
        <span>Value: {value}</span>
        <button onClick={() => setValue(50)}>
          Reset to 50
        </button>
      </div>
    </div>
  );
}`,
    children: (
      <ControlledSlider />
    ),
  },
  {
    id: 'volume-example',
    title: 'Volume Control',
    description: 'A practical example of slider used for volume control with custom styling.',
    code: `function VolumeSlider() {
  const [volume, setVolume] = useState(50);
  
  return (
    <div className='p-4 bg-card rounded-lg border'>
      <div className='flex items-center gap-4'>
        <span className='text-2xl'>
          {volume === 0 ? '🔇' : volume < 50 ? '🔉' : '🔊'}
        </span>
        <div className='flex-1'>
          <Slider
            min={0}
            max={100}
            value={volume}
            onValueChange={setVolume}
            aria-label='Volume control'
            rangeClassName='bg-blue-500'
            thumbClassName='bg-blue-500'
          />
        </div>
        <span className='text-sm'>{volume}%</span>
      </div>
    </div>
  );
}`,
    children: (
      <VolumeSlider />
    ),
  },
];

export function SliderPage() {
  return (
    <ComponentPage
      title='Slider'
      description='Range input component for selecting numeric values with keyboard and mouse support.'
      tableOfContents={tableOfContents}
      usageInstructions='The Slider component allows users to select numeric values from a range. It supports keyboard navigation (arrow keys, home/end, page up/down) and mouse/touch input. Use it for settings like volume, brightness, price ranges, or any numeric input that benefits from a visual representation.'
      importStatement="import { Slider } from '@moondreamsdev/dreamer-ui/components';"
      componentProps={sliderProps}
      examples={examples}
    />
  );
}