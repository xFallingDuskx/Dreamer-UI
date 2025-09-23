import { Skeleton } from '@moondreamsdev/dreamer-ui/components';
import { ComponentPage } from '../../components/layout/ComponentPage';

const tableOfContents = [
  { id: 'import', title: 'Import', level: 1 },
  { id: 'examples', title: 'Examples', level: 1 },
  { id: 'basic-shapes', title: 'Basic Shapes', level: 2 },
  { id: 'multiple-lines', title: 'Multiple Lines', level: 2 },
  { id: 'line-spacing-options', title: 'Line Spacing Options', level: 2 },
  { id: 'animation-control', title: 'Animation Control', level: 2 },
  { id: 'card-layout-example', title: 'Card Layout Example', level: 2 },
  { id: 'props', title: 'Props', level: 1 },
];

const skeletonExamples = [
  {
    id: 'basic-shapes',
    title: 'Basic Shapes',
    description: 'Different skeleton shapes for various content types.',
    code: `<div className='grid grid-cols-3 gap-6'>
  <div className='space-y-2'>
    <h4 className='text-white text-sm mb-2'>Rectangle</h4>
    <Skeleton shape='rectangle' className='h-6' />
  </div>
  <div className='space-y-2'>
    <h4 className='text-white text-sm mb-2'>Circle</h4>
    <Skeleton shape='circle' className='size-16' />
  </div>
  <div className='space-y-2'>
    <h4 className='text-white text-sm mb-2'>Text</h4>
    <Skeleton shape='text' />
  </div>
</div>`,
    children: (
      <div className='grid grid-cols-3 gap-6'>
        <div className='space-y-2'>
          <h4 className='text-white text-sm mb-2'>Rectangle</h4>
          <Skeleton shape='rectangle' className='h-6' />
        </div>
        <div className='space-y-2'>
          <h4 className='text-white text-sm mb-2'>Circle</h4>
          <Skeleton shape='circle' className='size-16' />
        </div>
        <div className='space-y-2'>
          <h4 className='text-white text-sm mb-2'>Text</h4>
          <Skeleton shape='text' />
        </div>
      </div>
    ),
  },
  {
    id: 'multiple-lines',
    title: 'Multiple Lines',
    description: 'Text skeletons with different line configurations.',
    code: `<div className='grid grid-cols-2 gap-6'>
  <div className='space-y-2'>
    <h4 className='text-white text-sm mb-2'>3 Lines - Small Spacing</h4>
    <Skeleton shape='text' lines={3} lineSpacing='sm' />
  </div>
  <div className='space-y-2'>
    <h4 className='text-white text-sm mb-2'>4 Lines - Large Spacing</h4>
    <Skeleton shape='text' lines={4} lineSpacing='lg' />
  </div>
</div>`,
    children: (
      <div className='grid grid-cols-2 gap-6'>
        <div className='space-y-2'>
          <h4 className='text-white text-sm mb-2'>3 Lines - Small Spacing</h4>
          <Skeleton shape='text' lines={3} lineSpacing='sm' />
        </div>
        <div className='space-y-2'>
          <h4 className='text-white text-sm mb-2'>4 Lines - Large Spacing</h4>
          <Skeleton shape='text' lines={4} lineSpacing='lg' />
        </div>
      </div>
    ),
  },
  {
    id: 'line-spacing-options',
    title: 'Line Spacing Options',
    description: 'Different spacing options between text lines.',
    code: `<div className='grid grid-cols-5 gap-4'>
  {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((spacing) => (
    <div key={spacing} className='space-y-2'>
      <h4 className='text-white text-xs mb-2'>{spacing.toUpperCase()}</h4>
      <Skeleton shape='text' lines={3} lineSpacing={spacing} />
    </div>
  ))}
</div>`,
    children: (
      <div className='grid grid-cols-5 gap-4'>
        {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((spacing) => (
          <div key={spacing} className='space-y-2'>
            <h4 className='text-white text-xs mb-2'>{spacing.toUpperCase()}</h4>
            <Skeleton shape='text' lines={3} lineSpacing={spacing} />
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'animation-control',
    title: 'Animation Control',
    description: 'Control the skeleton loading animation.',
    code: `<div className='grid grid-cols-2 gap-6'>
  <div className='space-y-2'>
    <h4 className='text-white text-sm mb-2'>Animated (Default)</h4>
    <Skeleton shape='rectangle' animate={true} className='h-6' />
  </div>
  <div className='space-y-2'>
    <h4 className='text-white text-sm mb-2'>Static</h4>
    <Skeleton shape='rectangle' animate={false} className='h-6' />
  </div>
</div>`,
    children: (
      <div className='grid grid-cols-2 gap-6'>
        <div className='space-y-2'>
          <h4 className='text-white text-sm mb-2'>Animated (Default)</h4>
          <Skeleton shape='rectangle' animate={true} className='h-6' />
        </div>
        <div className='space-y-2'>
          <h4 className='text-white text-sm mb-2'>Static</h4>
          <Skeleton shape='rectangle' animate={false} className='h-6' />
        </div>
      </div>
    ),
  },
  {
    id: 'card-layout-example',
    title: 'Card Layout Example',
    description: 'Real-world example of skeletons in a card layout.',
    code: `<div className='bg-gray-800 p-6 rounded-lg max-w-md mx-auto'>
  <div className='flex items-center gap-4 mb-4'>
    <Skeleton shape='circle' className='size-16' />
    <div className='flex-1'>
      <Skeleton shape='text' lines={2} lineSpacing='sm' />
    </div>
  </div>
  <Skeleton shape='rectangle' className='mb-3 h-32' />
  <Skeleton shape='text' lines={3} lineSpacing='sm' />
</div>`,
    children: (
      <div className='bg-gray-800 p-6 rounded-lg max-w-md mx-auto'>
        <div className='flex items-center gap-4 mb-4'>
          <Skeleton shape='circle' className='size-16' />
          <div className='flex-1'>
            <Skeleton shape='text' lines={2} lineSpacing='sm' />
          </div>
        </div>
        <Skeleton shape='rectangle' className='mb-3 h-32' />
        <Skeleton shape='text' lines={3} lineSpacing='sm' />
      </div>
    ),
  },
];

const skeletonProps = [
  {
    name: 'shape',
    type: '"rectangle" | "circle" | "text"',
    default: '"rectangle"',
    description: 'The shape of the skeleton element.',
  },
  {
    name: 'lines',
    type: 'number',
    default: '1',
    description: 'Number of skeleton lines to render (for text-like skeletons).',
  },
  {
    name: 'lineSpacing',
    type: '"xs" | "sm" | "md" | "lg" | "xl"',
    default: '"sm"',
    description: 'Spacing between skeleton lines when multiple lines are used.',
  },
  {
    name: 'animate',
    type: 'boolean',
    default: 'true',
    description: 'Whether the skeleton should animate with a pulse effect.',
  },
  {
    name: 'className',
    type: 'string',
    description: 'Additional CSS classes to apply to the skeleton.',
  },
];

export function SkeletonPage() {
  return (
    <ComponentPage
      title='Skeleton'
      description='Loading placeholders that mimic the structure of your content while data is being fetched.'
      tableOfContents={tableOfContents}
      usageInstructions='The Skeleton component provides visual placeholders while content loads. Use different shapes to match your content structure - rectangles for images, circles for avatars, and text lines for paragraphs. Multiple lines with customizable spacing help create realistic loading states.'
      importStatement="import { Skeleton } from '@moondreamsdev/dreamer-ui/components';"
      componentProps={skeletonProps}
      examples={skeletonExamples}
    />
  );
}
