import { Skeleton } from '@moondreamsdev/dreamer-ui/components';
import { ComponentPage } from '../../components/layout/ComponentPage';
import { ExampleSection } from '../../components/ui/ExampleSection';

const tableOfContents = [
  { id: 'basic-shapes', title: 'Basic Shapes', level: 1 },
  { id: 'multiple-lines', title: 'Multiple Lines', level: 1 },
  { id: 'line-spacing-options', title: 'Line Spacing Options', level: 1 },
  { id: 'animation-control', title: 'Animation Control', level: 1 },
  { id: 'card-layout-example', title: 'Card Layout Example', level: 1 },
];

export function SkeletonPage() {
  return (
    <ComponentPage
      title='Skeleton'
      description='Loading placeholders that mimic the structure of your content while data is being fetched.'
      tableOfContents={tableOfContents}
    >
      <ExampleSection 
        title='Basic Shapes'
        description='Different skeleton shapes for various content types.'
        id='basic-shapes'
      >
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
      </ExampleSection>

      <ExampleSection 
        title='Multiple Lines'
        description='Text skeletons with different line configurations.'
        id='multiple-lines'
      >
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
      </ExampleSection>

      <ExampleSection 
        title='Line Spacing Options'
        description='Different spacing options between text lines.'
        id='line-spacing-options'
      >
        <div className='grid grid-cols-5 gap-4'>
          {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((spacing) => (
            <div key={spacing} className='space-y-2'>
              <h4 className='text-white text-xs mb-2'>{spacing.toUpperCase()}</h4>
              <Skeleton shape='text' lines={3} lineSpacing={spacing} />
            </div>
          ))}
        </div>
      </ExampleSection>

      <ExampleSection 
        title='Animation Control'
        description='Control the skeleton loading animation.'
        id='animation-control'
      >
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
      </ExampleSection>

            <ExampleSection 
        title='Card Layout Example'
        description='Real-world example of skeletons in a card layout.'
        id='card-layout-example'
      >
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
      </ExampleSection>
    </ComponentPage>
  );
}
