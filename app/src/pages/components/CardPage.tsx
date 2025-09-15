import { ComponentPage } from '../../components/layout/ComponentPage';
import { ExampleSection } from '../../components/ui/ExampleSection';
import { Card } from '../../../card';

const tableOfContents = [
  { id: 'basic-usage', title: 'Basic Usage', level: 1 },
  { id: 'sizes', title: 'Sizes', level: 1 },
  { id: 'images', title: 'Images', level: 1 },
  { id: 'padding', title: 'Padding', level: 1 },
  { id: 'complex-content', title: 'Complex Content', level: 1 },
  { id: 'responsive-layout', title: 'Responsive Layout', level: 1 },
];

export function CardPage() {
  return (
    <ComponentPage
      title='Card'
      description='A flexible container component that supports images, different screen sizes, and customizable padding for displaying content in a structured format.'
      tableOfContents={tableOfContents}
    >
      <ExampleSection 
        title='Basic Usage'
        description='Simple cards with header, content, and footer sections.'
        id='basic-usage'
      >
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <Card 
            header="Welcome to Dreamer UI"
            footer="Getting started guide"
          >
            This is a basic card example showing how to structure content with header, body, and footer sections.
          </Card>
          
          <Card 
            header="Quick Start"
          >
            Cards can work without a footer section, providing flexible content organization for your needs.
          </Card>
        </div>
      </ExampleSection>

      <ExampleSection 
        title='Sizes'
        description='Different size variants for various use cases and content density.'
        id='sizes'
      >
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <Card 
            size="sm"
            header="Small Card"
            footer="Compact view"
          >
            Small cards are perfect for sidebar content or when you need to display many cards in a limited space.
          </Card>
          
          <Card 
            size="md"
            header="Medium Card"
            footer="Default size"
          >
            Medium is the default size, providing a balanced amount of space for most content scenarios.
          </Card>
          
          <Card 
            size="lg"
            header="Large Card"
            footer="Spacious layout"
          >
            Large cards give more breathing room and are ideal for featured content or detailed information.
          </Card>
        </div>
      </ExampleSection>

      <ExampleSection 
        title='Images'
        description='Cards can display images at the top, perfect for media-rich content.'
        id='images'
      >
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <Card 
            imageSrc="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop"
            imageAlt="Mountain landscape with blue sky"
            header="Mountain Adventure"
            footer="Photo by Nature Photographer"
          >
            Explore the breathtaking mountain landscapes and discover the beauty of untouched wilderness areas.
          </Card>
          
          <Card 
            imageSrc="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=250&fit=crop"
            imageAlt="Forest pathway with sunlight"
            header="Forest Trail"
            footer="Perfect for hiking"
          >
            Take a peaceful walk through ancient forest paths where sunlight filters through the canopy above.
          </Card>
        </div>
      </ExampleSection>

      <ExampleSection 
        title='Padding'
        description='Customize the internal spacing with the padding prop (specified in pixels).'
        id='padding'
      >
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <Card 
            padding={8}
            header="Tight (8px)"
            footer="Minimal spacing"
          >
            Compact layout with minimal internal spacing for dense information display.
          </Card>
          
          <Card 
            padding={16}
            header="Default (16px)"
            footer="Standard spacing"
          >
            The default padding provides comfortable spacing for most use cases.
          </Card>
          
          <Card 
            padding={32}
            header="Spacious (32px)"
            footer="Extra room"
          >
            Generous padding creates an airy, luxurious feel for premium content presentation.
          </Card>
        </div>
      </ExampleSection>

      <ExampleSection 
        title='Complex Content'
        description='Cards can contain rich content including multiple elements and interactive components.'
        id='complex-content'
      >
        <div className='max-w-2xl'>
          <Card 
            header={
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Project Status Dashboard</h3>
                <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-sm rounded-full">
                  ✓ On Track
                </span>
              </div>
            }
            footer={
              <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-gray-700">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Last updated: 2 hours ago
                </span>
                <div className="flex gap-2">
                  <button className="px-3 py-1 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded">
                    View Details
                  </button>
                  <button className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 rounded">
                    Edit
                  </button>
                </div>
              </div>
            }
            padding={24}
          >
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                This project is progressing well with all milestones on track. The team has completed 
                the initial development phase and is moving into testing.
              </p>
              
              <div className="grid grid-cols-2 gap-4 py-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">85%</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Completion</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">12/14</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Tasks Done</div>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Recent Updates</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li>• Authentication system completed</li>
                  <li>• Database migrations finalized</li>
                  <li>• UI components 90% complete</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </ExampleSection>

      <ExampleSection 
        title='Responsive Layout'
        description='Cards automatically adapt to different screen sizes and work well in grid layouts.'
        id='responsive-layout'
      >
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
          {Array.from({ length: 8 }, (_, i) => (
            <Card 
              key={i}
              size="sm"
              header={`Card ${i + 1}`}
              footer={`Item ${i + 1}`}
              padding={12}
            >
              This demonstrates how cards work in responsive grid layouts across different screen sizes.
            </Card>
          ))}
        </div>
      </ExampleSection>
    </ComponentPage>
  );
}