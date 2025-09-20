import { Badge } from '@moondreamsdev/dreamer-ui/components';
import { ComponentPage } from '../../components/layout/ComponentPage';

const tableOfContents = [
  { id: 'import', title: 'Import', level: 1 },
  { id: 'examples', title: 'Examples', level: 1 },
  { id: 'variants', title: 'Variants', level: 2 },
  { id: 'sizes', title: 'Sizes', level: 2 },
  { id: 'props', title: 'Props', level: 1 },
];

const badgeExamples = [
  {
    id: 'variants',
    title: 'Variants',
    description: 'Different badge styles for various use cases.',
    code: `<div className='flex flex-wrap gap-4'>
  <Badge>Default</Badge>
  <Badge variant='secondary'>Secondary</Badge>
  <Badge variant='outline'>Outline</Badge>
  <Badge variant='destructive'>Destructive</Badge>
</div>`,
    children: (
      <div className='flex flex-wrap gap-4'>
        <Badge>Default</Badge>
        <Badge variant='secondary'>Secondary</Badge>
        <Badge variant='outline'>Outline</Badge>
        <Badge variant='destructive'>Destructive</Badge>
      </div>
    ),
  },
  {
    id: 'sizes',
    title: 'Sizes',
    description: 'Available badge sizes for different contexts.',
    code: `<div className='flex flex-wrap items-center gap-4'>
  <Badge size='sm'>Small</Badge>
  <Badge size='md'>Medium</Badge>
  <Badge size='lg'>Large</Badge>
</div>`,
    children: (
      <div className='flex flex-wrap items-center gap-4'>
        <Badge size='sm'>Small</Badge>
        <Badge size='md'>Medium</Badge>
        <Badge size='lg'>Large</Badge>
      </div>
    ),
  },
];

const badgeProps = [
  {
    name: 'variant',
    type: '"default" | "secondary" | "outline" | "destructive"',
    default: '"default"',
    description: 'The visual style variant of the badge.',
  },
  {
    name: 'size',
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: 'The size of the badge.',
  },
  {
    name: 'className',
    type: 'string',
    description: 'Additional CSS classes to apply to the badge.',
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'The content to display inside the badge.',
    required: true,
  },
];

export function BadgePage() {
  return (
    <ComponentPage
      title='Badge'
      description='Small status indicators and labels for highlighting information.'
      tableOfContents={tableOfContents}
      usageInstructions='The Badge component is perfect for displaying status, categories, counts, or any small piece of information that needs to stand out. It comes in various styles and sizes to fit different contexts.'
      importStatement="import { Badge } from '@moondreamsdev/dreamer-ui/components';"
      componentProps={badgeProps}
      examples={badgeExamples}
    />
  );
}