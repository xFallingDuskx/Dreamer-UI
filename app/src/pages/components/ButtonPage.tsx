import { Button } from '@moondreamsdev/dreamer-ui/components';
import { ComponentPage } from '../../components/layout/ComponentPage';
import { ExampleSection } from '../../components/ui/ExampleSection';

const tableOfContents = [
  { id: 'variants', title: 'Variants', level: 1 },
  { id: 'states', title: 'States', level: 1 },
  { id: 'links', title: 'Links', level: 1 },
  { id: 'usage-examples', title: 'Usage Examples', level: 1 },
];

export function ButtonPage() {
  return (
    <ComponentPage
      title='Button'
      description='A versatile button component with multiple variants, sizes, and states. Supports both regular buttons and link functionality.'
      tableOfContents={tableOfContents}
    >
      <ExampleSection 
        title='Variants'
        description='Different button styles to fit your design needs.'
        id='variants'
      >
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
          <Button>Primary</Button>
          <Button variant='secondary'>Secondary</Button>
          <Button variant='tertiary'>Tertiary</Button>
          <Button variant='destructive'>Destructive</Button>
          <Button variant='outline'>Outline</Button>
          <Button variant='link' size='md'>Link</Button>
          <Button variant='base'>Base</Button>
        </div>
      </ExampleSection>

      <ExampleSection 
        title='States'
        description='Loading and disabled states for different user interactions.'
        id='states'
      >
        <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
          <Button loading={true}>Loading</Button>
          <Button disabled={true}>Disabled</Button>
          <Button variant='base' size='fitted'>Fitted Size</Button>
        </div>
      </ExampleSection>

      <ExampleSection 
        title='Links'
        description='Buttons that function as links to external or internal destinations.'
        id='links'
      >
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <Button linkTo='https://google.com' linkProps={{ target: '_blank' }}>
            External Link
          </Button>
          <Button linkTo='https://google.com' disabled={true}>
            Disabled Link
          </Button>
        </div>
      </ExampleSection>

      <ExampleSection 
        title='Usage Examples'
        description='Common button usage patterns in real applications.'
        id='usage-examples'
      >
        <div className='space-y-4'>
          <div className='flex gap-2'>
            <Button>Save Changes</Button>
            <Button variant='outline'>Cancel</Button>
          </div>
          <div className='flex gap-2'>
            <Button variant='destructive'>Delete</Button>
            <Button variant='secondary'>Archive</Button>
          </div>
          <div className='text-center'>
            <Button size='fitted' variant='link'>
              Learn More →
            </Button>
          </div>
        </div>
      </ExampleSection>
    </ComponentPage>
  );
}
