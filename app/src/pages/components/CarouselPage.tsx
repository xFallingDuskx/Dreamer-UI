import { Carousel } from '@moondreamsdev/dreamer-ui/components';
import { ComponentPage } from '../../components/layout/ComponentPage';

const componentProps = [
  {
    name: 'children',
    type: 'React.ReactNode',
    required: true,
    description: 'The slides/items to display in the carousel',
  },
  {
    name: 'autoScroll',
    type: 'boolean',
    required: false,
    description: 'Whether the carousel should automatically advance',
    defaultValue: 'false',
  },
  {
    name: 'scrollInterval',
    type: 'number',
    required: false,
    description: 'Time in milliseconds between automatic advances',
    defaultValue: '3000',
  },
  {
    name: 'pauseScrollOnHover',
    type: 'boolean',
    required: false,
    description: 'Whether to pause auto-scroll when hovering',
    defaultValue: 'true',
  },
  {
    name: 'itemsToShow',
    type: 'number | { xs?: number; sm?: number; md?: number; lg?: number; xl?: number }',
    required: false,
    description: 'Number of items to show at once, supports responsive breakpoints',
    defaultValue: '1',
  },
  {
    name: 'infinite',
    type: 'boolean',
    required: false,
    description: 'Whether the carousel should loop infinitely',
    defaultValue: 'true',
  },
  {
    name: 'gap',
    type: 'number',
    required: false,
    description: 'Gap between carousel items in pixels',
    defaultValue: '8',
  },
  {
    name: 'hidePrevNext',
    type: 'boolean',
    required: false,
    description: 'Whether to hide the previous/next navigation buttons',
    defaultValue: 'false',
  },
  {
    name: 'hideDots',
    type: 'boolean',
    required: false,
    description: 'Whether to hide the dot indicators',
    defaultValue: 'false',
  },
  {
    name: 'buttonSize',
    type: '"sm" | "md" | "lg"',
    required: false,
    description: 'Size of the navigation buttons',
    defaultValue: '"md"',
  },
  {
    name: 'buttonVariant',
    type: '"default" | "outline" | "ghost"',
    required: false,
    description: 'Style variant of the navigation buttons',
    defaultValue: '"default"',
  },
  {
    name: 'buttonPosition',
    type: '"exterior" | "aligned" | "interior"',
    required: false,
    description: 'Position of the navigation buttons relative to carousel',
    defaultValue: '"exterior"',
  },
  {
    name: 'className',
    type: 'string',
    required: false,
    description: 'Additional CSS classes to apply to the carousel wrapper',
  },
  {
    name: 'containerClassName',
    type: 'string',
    required: false,
    description: 'Additional CSS classes for the carousel container',
  },
  {
    name: 'itemsClassName',
    type: 'string',
    required: false,
    description: 'Additional CSS classes for carousel items',
  },
  {
    name: 'dotsClassName',
    type: 'string',
    required: false,
    description: 'Additional CSS classes for the dot indicators',
  },
];

const carouselExamples = [
  {
    id: 'basic-usage',
    title: 'Basic Usage',
    description: 'Simple carousel displaying one slide at a time with navigation controls.',
    code: `<Carousel className="w-full max-w-md mx-auto">
  <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-48 rounded-lg flex items-center justify-center text-white text-xl font-semibold">
    Slide 1
  </div>
  <div className="bg-gradient-to-r from-emerald-500 to-green-500 h-48 rounded-lg flex items-center justify-center text-white text-xl font-semibold">
    Slide 2
  </div>
  <div className="bg-gradient-to-r from-violet-500 to-purple-500 h-48 rounded-lg flex items-center justify-center text-white text-xl font-semibold">
    Slide 3
  </div>
</Carousel>`,
    children: (
      <Carousel className="w-full max-w-md mx-auto">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-48 rounded-lg flex items-center justify-center text-white text-xl font-semibold">
          Slide 1
        </div>
        <div className="bg-gradient-to-r from-emerald-500 to-green-500 h-48 rounded-lg flex items-center justify-center text-white text-xl font-semibold">
          Slide 2
        </div>
        <div className="bg-gradient-to-r from-violet-500 to-purple-500 h-48 rounded-lg flex items-center justify-center text-white text-xl font-semibold">
          Slide 3
        </div>
      </Carousel>
    ),
  },
  {
    id: 'multiple-items',
    title: 'Multiple Items',
    description: 'Display multiple items at once with different configurations.',
    code: `<div className="space-y-8">
  {/* Shows 2 items at once */}
  <Carousel className="w-full max-w-2xl mx-auto" itemsToShow={2} gap={16}>
    {Array.from({ length: 6 }, (_, i) => (
      <div key={i} className="bg-red-500 h-32 rounded-lg flex items-center justify-center text-white text-lg font-semibold">
        Item {i + 1}
      </div>
    ))}
  </Carousel>

  {/* Shows 3 items at once */}
  <Carousel className="w-full max-w-2xl mx-auto" itemsToShow={3} gap={12}>
    {Array.from({ length: 6 }, (_, i) => (
      <div key={i} className="bg-blue-500 h-24 rounded-lg flex items-center justify-center text-white font-semibold">
        {i + 1}
      </div>
    ))}
  </Carousel>
</div>`,
    children: (
      <div className="space-y-8">
        <div>
          <p className="text-sm text-gray-400 mb-3">Shows 2 items at once with 16px gap</p>
          <Carousel className="w-full max-w-2xl mx-auto" itemsToShow={2} gap={16}>
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className="bg-red-500 h-32 rounded-lg flex items-center justify-center text-white text-lg font-semibold">
                Item {i + 1}
              </div>
            ))}
          </Carousel>
        </div>
        <div>
          <p className="text-sm text-gray-400 mb-3">Shows 3 items at once with 12px gap</p>
          <Carousel className="w-full max-w-2xl mx-auto" itemsToShow={3} gap={12}>
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className="bg-blue-500 h-24 rounded-lg flex items-center justify-center text-white font-semibold">
                {i + 1}
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    ),
  },
  {
    id: 'auto-scroll',
    title: 'Auto Scroll',
    description: 'Carousel that automatically advances with customizable timing.',
    code: `<Carousel 
  className="w-full max-w-md mx-auto"
  autoScroll={true}
  scrollInterval={2000}
  pauseScrollOnHover={true}
>
  <div className="bg-gradient-to-br from-pink-500 to-rose-600 h-48 rounded-lg flex items-center justify-center text-white text-xl font-semibold">
    Auto 1
  </div>
  <div className="bg-gradient-to-br from-indigo-500 to-blue-600 h-48 rounded-lg flex items-center justify-center text-white text-xl font-semibold">
    Auto 2
  </div>
  <div className="bg-gradient-to-br from-yellow-500 to-orange-600 h-48 rounded-lg flex items-center justify-center text-white text-xl font-semibold">
    Auto 3
  </div>
</Carousel>`,
    children: (
      <div>
        <p className="text-sm text-gray-400 mb-3">Automatically advances every 2 seconds (hover to pause)</p>
        <Carousel 
          className="w-full max-w-md mx-auto"
          autoScroll={true}
          scrollInterval={2000}
          pauseScrollOnHover={true}
        >
          <div className="bg-gradient-to-br from-pink-500 to-rose-600 h-48 rounded-lg flex items-center justify-center text-white text-xl font-semibold">
            Auto 1
          </div>
          <div className="bg-gradient-to-br from-indigo-500 to-blue-600 h-48 rounded-lg flex items-center justify-center text-white text-xl font-semibold">
            Auto 2
          </div>
          <div className="bg-gradient-to-br from-yellow-500 to-orange-600 h-48 rounded-lg flex items-center justify-center text-white text-xl font-semibold">
            Auto 3
          </div>
        </Carousel>
      </div>
    ),
  },
  {
    id: 'responsive-breakpoints',
    title: 'Responsive Breakpoints',
    description: 'Carousel that adapts the number of visible items based on screen size.',
    code: `<Carousel 
  className="w-full max-w-6xl mx-auto"
  itemsToShow={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 6 }}
  autoScroll={true}
  scrollInterval={4000}
  gap={8}
>
  {Array.from({ length: 12 }, (_, i) => (
    <div key={i} className="bg-gradient-to-br from-gray-600 to-gray-800 h-24 rounded-md flex items-center justify-center text-white text-sm font-semibold border border-gray-500">
      Card {i + 1}
    </div>
  ))}
</Carousel>`,
    children: (
      <div>
        <p className="text-sm text-gray-400 mb-3">Responsive: 1 item on mobile, up to 6 items on extra-large screens</p>
        <Carousel 
          className="w-full max-w-6xl mx-auto"
          itemsToShow={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 6 }}
          autoScroll={true}
          scrollInterval={4000}
          gap={8}
        >
          {Array.from({ length: 12 }, (_, i) => (
            <div key={i} className="bg-gradient-to-br from-gray-600 to-gray-800 h-24 rounded-md flex items-center justify-center text-white text-sm font-semibold border border-gray-500">
              Card {i + 1}
            </div>
          ))}
        </Carousel>
      </div>
    ),
  },
  {
    id: 'button-positions',
    title: 'Button Positions',
    description: 'Different navigation button positioning options.',
    code: `<div className="space-y-8">
  {/* Exterior positioning */}
  <div className="px-16">
    <Carousel 
      className="w-full max-w-md mx-auto"
      buttonPosition="exterior"
      buttonVariant="outline"
      infinite={false}
    >
      <div className="bg-gradient-to-br from-cyan-500 to-blue-600 h-32 rounded-lg flex items-center justify-center text-white font-semibold">
        Exterior 1
      </div>
      <div className="bg-gradient-to-br from-emerald-500 to-green-600 h-32 rounded-lg flex items-center justify-center text-white font-semibold">
        Exterior 2
      </div>
    </Carousel>
  </div>

  {/* Interior positioning */}
  <Carousel 
    className="w-full max-w-md mx-auto"
    buttonPosition="interior"
    buttonVariant="ghost"
    buttonSize="lg"
  >
    <div className="bg-gradient-to-br from-purple-500 to-pink-600 h-32 rounded-lg flex items-center justify-center text-white font-semibold">
      Interior 1
    </div>
    <div className="bg-gradient-to-br from-orange-500 to-red-600 h-32 rounded-lg flex items-center justify-center text-white font-semibold">
      Interior 2
    </div>
  </Carousel>
</div>`,
    children: (
      <div className="space-y-8">
        <div>
          <p className="text-sm text-gray-400 mb-3">Exterior positioning - buttons outside the carousel</p>
          <div className="px-16">
            <Carousel 
              className="w-full max-w-md mx-auto"
              buttonPosition="exterior"
              buttonVariant="outline"
              infinite={false}
            >
              <div className="bg-gradient-to-br from-cyan-500 to-blue-600 h-32 rounded-lg flex items-center justify-center text-white font-semibold">
                Exterior 1
              </div>
              <div className="bg-gradient-to-br from-emerald-500 to-green-600 h-32 rounded-lg flex items-center justify-center text-white font-semibold">
                Exterior 2
              </div>
            </Carousel>
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-400 mb-3">Interior positioning - buttons inside the carousel</p>
          <Carousel 
            className="w-full max-w-md mx-auto"
            buttonPosition="interior"
            buttonVariant="ghost"
            buttonSize="lg"
          >
            <div className="bg-gradient-to-br from-purple-500 to-pink-600 h-32 rounded-lg flex items-center justify-center text-white font-semibold">
              Interior 1
            </div>
            <div className="bg-gradient-to-br from-orange-500 to-red-600 h-32 rounded-lg flex items-center justify-center text-white font-semibold">
              Interior 2
            </div>
          </Carousel>
        </div>
      </div>
    ),
  },
];

const keyboardShortcuts = [
  {
    keys: 'Arrow Left',
    description: 'Navigate to previous slide',
  },
  {
    keys: 'Arrow Right', 
    description: 'Navigate to next slide',
  },
  {
    keys: 'Tab',
    description: 'Focus navigation buttons and dots',
  },
  {
    keys: 'Space/Enter',
    description: 'Activate focused button or dot',
  },
];

export function CarouselPage() {
  return (
    <ComponentPage
      title="Carousel"
      description="Interactive slideshow component for displaying multiple items with navigation controls and responsive behavior."
      usageInstructions="Use Carousel to showcase multiple pieces of content in a space-efficient slideshow format. Perfect for image galleries, product showcases, testimonials, or any content that benefits from sequential presentation with user controls."
      importStatement="import { Carousel } from '@moondreamsdev/dreamer-ui';"
      componentProps={componentProps}
      examples={carouselExamples}
      keyboardShortcuts={keyboardShortcuts}
    />
  );
}