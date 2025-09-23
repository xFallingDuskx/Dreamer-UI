import { Card } from '@moondreamsdev/dreamer-ui/components';
import { ComponentPage } from '../../components/layout/ComponentPage';

const tableOfContents = [
  { id: 'import', title: 'Import', level: 1 },
  { id: 'examples', title: 'Examples', level: 1 },
  { id: 'basic-usage', title: 'Basic Usage', level: 2 },
  { id: 'sizes', title: 'Sizes', level: 2 },
  { id: 'with-images', title: 'With Images', level: 2 },
  { id: 'props', title: 'Props', level: 1 },
];

const cardExamples = [
  {
    id: 'basic-usage',
    title: 'Basic Usage',
    description: 'Simple cards with header, content, and footer sections.',
    code: `<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
  <Card 
    header="Welcome to Dreamer UI"
    footer="Getting started guide"
  >
    This is a basic card example showing how to structure content.
  </Card>
  
  <Card header="Quick Start">
    Cards can work without a footer section for flexible layouts.
  </Card>
</div>`,
    children: (
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <Card 
          header="Welcome to Dreamer UI"
          footer="Getting started guide"
        >
          This is a basic card example showing how to structure content with header, body, and footer sections.
        </Card>
        
        <Card header="Quick Start">
          Cards can work without a footer section, providing flexible content organization for your needs.
        </Card>
      </div>
    ),
  },
  {
    id: 'sizes',
    title: 'Sizes',
    description: 'Different size variants for various use cases and content density.',
    code: `<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
  <Card size="sm" header="Small Card">
    Compact content for sidebars or tight spaces.
  </Card>
  
  <Card size="md" header="Medium Card">
    Standard size for most content layouts.
  </Card>
  
  <Card size="lg" header="Large Card">
    Spacious layout for detailed content.
  </Card>
</div>`,
    children: (
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <Card 
          size="sm"
          header="Small Card"
        >
          Compact content for sidebars or tight spaces.
        </Card>
        
        <Card 
          size="md"
          header="Medium Card"
        >
          Standard size for most content layouts.
        </Card>
        
        <Card 
          size="lg"
          header="Large Card"
        >
          Spacious layout for detailed content.
        </Card>
      </div>
    ),
  },
  {
    id: 'with-images',
    title: 'With Images',
    description: 'Cards featuring images in headers or content areas for visual appeal.',
    code: `<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
  <Card 
    header={
      <div>
        <img 
          src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=200&fit=crop" 
          alt="Card header image"
          className="w-full h-32 object-cover rounded-t-lg -m-4 mb-2"
        />
        <h3 className="font-semibold">Product Showcase</h3>
      </div>
    }
    footer="Learn more →"
  >
    This card features an image in the header section, perfect for product showcases or blog previews.
  </Card>
  
  <Card header="Content with Image">
    <div className="space-y-4">
      <img 
        src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=300&h=200&fit=crop" 
        alt="Content image"
        className="w-full h-40 object-cover rounded-lg"
      />
      <p>Images can also be embedded within the card content for flexible layouts and visual storytelling.</p>
    </div>
  </Card>
</div>`,
    children: (
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <Card 
          header={
            <div>
              <img 
                src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=200&fit=crop" 
                alt="Card header image"
                className="w-full h-32 object-cover rounded-t-lg -m-4 mb-2"
              />
              <h3 className="font-semibold">Product Showcase</h3>
            </div>
          }
          footer="Learn more →"
        >
          This card features an image in the header section, perfect for product showcases or blog previews.
        </Card>
        
        <Card header="Content with Image">
          <div className="space-y-4">
            <img 
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=300&h=200&fit=crop" 
              alt="Content image"
              className="w-full h-40 object-cover rounded-lg"
            />
            <p>Images can also be embedded within the card content for flexible layouts and visual storytelling.</p>
          </div>
        </Card>
      </div>
    ),
  },
];

const cardProps = [
  {
    name: 'header',
    type: 'React.ReactNode',
    description: 'Content to display in the card header.',
  },
  {
    name: 'footer',
    type: 'React.ReactNode',
    description: 'Content to display in the card footer.',
  },
  {
    name: 'size',
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: 'The size variant of the card.',
  },
  {
    name: 'padding',
    type: '"none" | "sm" | "md" | "lg"',
    default: '"md"',
    description: 'The amount of padding inside the card.',
  },
  {
    name: 'className',
    type: 'string',
    description: 'Additional CSS classes to apply to the card.',
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'The main content of the card.',
    required: true,
  },
];

export function CardPage() {
  return (
    <ComponentPage
      title='Card'
      description='A flexible container component that supports images, different screen sizes, and customizable padding for displaying content in a structured format.'
      tableOfContents={tableOfContents}
      usageInstructions='The Card component provides a flexible container for displaying content in a structured format. Use it for organizing information with optional headers and footers, perfect for dashboards, product listings, and content grids.'
      importStatement="import { Card } from '@moondreamsdev/dreamer-ui/components';"
      componentProps={cardProps}
      examples={cardExamples}
    />
  );
}