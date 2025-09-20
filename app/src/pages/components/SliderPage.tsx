import { ComponentPage } from '../../components/layout/ComponentPage';

const tableOfContents = [
  { id: 'import', title: 'Import', level: 1 },
  { id: 'examples', title: 'Examples', level: 1 },
  { id: 'basic-usage', title: 'Basic Usage', level: 2 },
  { id: 'props', title: 'Props', level: 1 },
];

const sliderProps = [
  {
    name: 'value',
    type: 'number | number[]',
    description: 'The controlled value of the slider.',
  },
  {
    name: 'defaultValue',
    type: 'number | number[]',
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
    type: '(value: number | number[]) => void',
    description: 'Callback fired when the slider value changes.',
  },
  {
    name: 'className',
    type: 'string',
    description: 'Additional CSS classes to apply to the slider.',
  },
];

export function SliderPage() {
  return (
    <ComponentPage
      title='Slider'
      description='Range input component for selecting numeric values with keyboard and mouse support.'
      tableOfContents={tableOfContents}
      usageInstructions='The Slider component allows users to select numeric values from a range. It supports both single values and ranges (with two thumbs). Use it for settings like volume, brightness, price ranges, or any numeric input that benefits from a visual representation.'
      importStatement="import { Slider } from '@moondreamsdev/dreamer-ui/components';"
      componentProps={sliderProps}
    />
  );
}