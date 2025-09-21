import { Badge } from '@moondreamsdev/dreamer-ui/components';
import { ComponentPage } from '../../components/layout/ComponentPage';

const tableOfContents = [
  { id: 'import', title: 'Import', level: 1 },
  { id: 'examples', title: 'Examples', level: 1 },
  { id: 'variants', title: 'Variants', level: 2 },
  { id: 'practical-usage', title: 'Practical Usage', level: 2 },
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
    id: 'practical-usage',
    title: 'Practical Usage',
    description: 'Real-world examples showing badges in common UI patterns.',
    code: `<div className='space-y-6'>
  {/* Status indicators */}
  <div className='flex items-center gap-2'>
    <span>Server Status:</span>
    <Badge variant='default'>Online</Badge>
  </div>
  
  {/* Category tags */}
  <div className='flex items-center gap-2'>
    <span>Categories:</span>
    <Badge variant='secondary'>React</Badge>
    <Badge variant='secondary'>TypeScript</Badge>
    <Badge variant='outline'>UI Library</Badge>
  </div>
  
  {/* Notification counts */}
  <div className='flex items-center gap-4'>
    <div className='flex items-center gap-2'>
      <span>Messages</span>
      <Badge size='sm'>3</Badge>
    </div>
    <div className='flex items-center gap-2'>
      <span>Alerts</span>
      <Badge variant='destructive' size='sm'>12</Badge>
    </div>
  </div>
  
  {/* Feature flags */}
  <div className='space-y-2'>
    <div className='flex items-center gap-2'>
      <span>Dark Mode</span>
      <Badge variant='outline' size='sm'>Beta</Badge>
    </div>
    <div className='flex items-center gap-2'>
      <span>New Dashboard</span>
      <Badge size='sm'>New</Badge>
    </div>
  </div>
</div>`,
    children: (
      <div className='space-y-6'>
        {/* Status indicators */}
        <div className='flex items-center gap-2'>
          <span>Server Status:</span>
          <Badge variant='default'>Online</Badge>
        </div>
        
        {/* Category tags */}
        <div className='flex items-center gap-2'>
          <span>Categories:</span>
          <Badge variant='secondary'>React</Badge>
          <Badge variant='secondary'>TypeScript</Badge>
          <Badge variant='outline'>UI Library</Badge>
        </div>
        
        {/* Notification counts */}
        <div className='flex items-center gap-4'>
          <div className='flex items-center gap-2'>
            <span>Messages</span>
            <Badge size='sm'>3</Badge>
          </div>
          <div className='flex items-center gap-2'>
            <span>Alerts</span>
            <Badge variant='destructive' size='sm'>12</Badge>
          </div>
        </div>
        
        {/* Feature flags */}
        <div className='space-y-2'>
          <div className='flex items-center gap-2'>
            <span>Dark Mode</span>
            <Badge variant='outline' size='sm'>Beta</Badge>
          </div>
          <div className='flex items-center gap-2'>
            <span>New Dashboard</span>
            <Badge size='sm'>New</Badge>
          </div>
        </div>
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