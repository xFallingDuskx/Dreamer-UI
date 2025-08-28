import { Skeleton } from '@moondreamsdev/dreamer-ui/components';
import { ComponentPage } from '../../components/layout/ComponentPage';
import { ExampleSection } from '../../components/ui/ExampleSection';

export const SkeletonPage = () => {
  return (
    <ComponentPage
      title='Skeleton'
      description='Loading placeholders that mimic the structure of your content while data is being fetched.'
    >
      <ExampleSection 
        title='Basic Shapes'
        description='Different skeleton shapes for various content types.'
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
        description='A realistic example showing how skeletons work in a card layout.'
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
};
