import { ComponentPage } from '../../components/layout/ComponentPage';

const tableOfContents = [
  { id: 'import', title: 'Import', level: 1 },
  { id: 'examples', title: 'Examples', level: 1 },
  { id: 'basic-usage', title: 'Basic Usage', level: 2 },
  { id: 'props', title: 'Props', level: 1 },
];

const carouselProps = [
  {
    name: 'items',
    type: 'React.ReactNode[]',
    description: 'Array of items to display in the carousel.',
    required: true,
  },
  {
    name: 'autoPlay',
    type: 'boolean',
    default: 'false',
    description: 'Whether the carousel should automatically advance.',
  },
  {
    name: 'interval',
    type: 'number',
    default: '5000',
    description: 'Time in milliseconds between automatic advances.',
  },
  {
    name: 'showDots',
    type: 'boolean',
    default: 'true',
    description: 'Whether to show navigation dots.',
  },
  {
    name: 'showArrows',
    type: 'boolean',
    default: 'true',
    description: 'Whether to show navigation arrows.',
  },
  {
    name: 'className',
    type: 'string',
    description: 'Additional CSS classes to apply to the carousel.',
  },
];

export function CarouselPage() {
  return (
    <ComponentPage
      title='Carousel'
      description='Interactive slideshow component for displaying multiple items with navigation controls.'
      tableOfContents={tableOfContents}
      usageInstructions='The Carousel component allows you to display multiple items in a slideshow format. Users can navigate through items using navigation arrows or dots. It supports automatic advancement and keyboard navigation.'
      importStatement="import { Carousel } from '@moondreamsdev/dreamer-ui/components';"
      componentProps={carouselProps}
    />
  );
}