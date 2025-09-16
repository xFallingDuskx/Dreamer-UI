import { Avatar } from '../../../avatar';
import { ComponentPage } from '../../components/layout/ComponentPage';
import { ExampleSection } from '../../components/ui/ExampleSection';

const tableOfContents = [
  { id: 'presets', title: 'Presets', level: 1 },
  { id: 'sizes', title: 'Sizes', level: 1 },
  { id: 'shapes', title: 'Shapes', level: 1 },
  { id: 'custom-content', title: 'Custom Content', level: 1 },
  { id: 'usage-examples', title: 'Usage Examples', level: 1 },
];

export function AvatarPage() {
  return (
    <ComponentPage
      title='Avatar'
      description='Display user profile pictures with 12 pre-defined cartoon-like avatars inspired by Moon Dreams Dev. Supports custom images, initials, and fallback states.'
      tableOfContents={tableOfContents}
    >
      <ExampleSection 
        title='Presets'
        description='12 unique cartoon-like avatars with space and dream themes created specifically for Moon Dreams Dev.'
        id='presets'
      >
        <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6'>
          <div className='flex flex-col items-center gap-2'>
            <Avatar preset='astronaut' size='xl' alt='Astronaut avatar' />
            <span className='text-sm text-gray-400'>Astronaut</span>
          </div>
          <div className='flex flex-col items-center gap-2'>
            <Avatar preset='moon' size='xl' alt='Moon avatar' />
            <span className='text-sm text-gray-400'>Moon</span>
          </div>
          <div className='flex flex-col items-center gap-2'>
            <Avatar preset='star' size='xl' alt='Star avatar' />
            <span className='text-sm text-gray-400'>Star</span>
          </div>
          <div className='flex flex-col items-center gap-2'>
            <Avatar preset='galaxy' size='xl' alt='Galaxy avatar' />
            <span className='text-sm text-gray-400'>Galaxy</span>
          </div>
          <div className='flex flex-col items-center gap-2'>
            <Avatar preset='nebula' size='xl' alt='Nebula avatar' />
            <span className='text-sm text-gray-400'>Nebula</span>
          </div>
          <div className='flex flex-col items-center gap-2'>
            <Avatar preset='planet' size='xl' alt='Planet avatar' />
            <span className='text-sm text-gray-400'>Planet</span>
          </div>
          <div className='flex flex-col items-center gap-2'>
            <Avatar preset='cosmic-cat' size='xl' alt='Cosmic cat avatar' />
            <span className='text-sm text-gray-400'>Cosmic Cat</span>
          </div>
          <div className='flex flex-col items-center gap-2'>
            <Avatar preset='dream-cloud' size='xl' alt='Dream cloud avatar' />
            <span className='text-sm text-gray-400'>Dream Cloud</span>
          </div>
          <div className='flex flex-col items-center gap-2'>
            <Avatar preset='rocket' size='xl' alt='Rocket avatar' />
            <span className='text-sm text-gray-400'>Rocket</span>
          </div>
          <div className='flex flex-col items-center gap-2'>
            <Avatar preset='constellation' size='xl' alt='Constellation avatar' />
            <span className='text-sm text-gray-400'>Constellation</span>
          </div>
          <div className='flex flex-col items-center gap-2'>
            <Avatar preset='comet' size='xl' alt='Comet avatar' />
            <span className='text-sm text-gray-400'>Comet</span>
          </div>
          <div className='flex flex-col items-center gap-2'>
            <Avatar preset='twilight' size='xl' alt='Twilight avatar' />
            <span className='text-sm text-gray-400'>Twilight</span>
          </div>
        </div>
      </ExampleSection>

      <ExampleSection 
        title='Sizes'
        description='Six different sizes available to fit various use cases.'
        id='sizes'
      >
        <div className='flex items-end gap-4'>
          <div className='flex flex-col items-center gap-2'>
            <Avatar preset='astronaut' size='xs' alt='Extra small avatar' />
            <span className='text-xs text-gray-400'>xs</span>
          </div>
          <div className='flex flex-col items-center gap-2'>
            <Avatar preset='moon' size='sm' alt='Small avatar' />
            <span className='text-xs text-gray-400'>sm</span>
          </div>
          <div className='flex flex-col items-center gap-2'>
            <Avatar preset='star' size='md' alt='Medium avatar' />
            <span className='text-xs text-gray-400'>md</span>
          </div>
          <div className='flex flex-col items-center gap-2'>
            <Avatar preset='galaxy' size='lg' alt='Large avatar' />
            <span className='text-xs text-gray-400'>lg</span>
          </div>
          <div className='flex flex-col items-center gap-2'>
            <Avatar preset='nebula' size='xl' alt='Extra large avatar' />
            <span className='text-xs text-gray-400'>xl</span>
          </div>
          <div className='flex flex-col items-center gap-2'>
            <Avatar preset='planet' size='2xl' alt='2XL avatar' />
            <span className='text-xs text-gray-400'>2xl</span>
          </div>
        </div>
      </ExampleSection>

      <ExampleSection 
        title='Shapes'
        description='Choose between circular or square shapes for different design contexts.'
        id='shapes'
      >
        <div className='flex items-center gap-8'>
          <div className='flex flex-col items-center gap-2'>
            <Avatar preset='cosmic-cat' size='2xl' shape='circle' alt='Circle avatar' />
            <span className='text-sm text-gray-400'>Circle</span>
          </div>
          <div className='flex flex-col items-center gap-2'>
            <Avatar preset='rocket' size='2xl' shape='square' alt='Square avatar' />
            <span className='text-sm text-gray-400'>Square</span>
          </div>
        </div>
      </ExampleSection>

      <ExampleSection 
        title='Custom Content'
        description='Display custom images, initials, or fallback to default state when no content is provided.'
        id='custom-content'
      >
        <div className='flex items-center gap-6'>
          <div className='flex flex-col items-center gap-2'>
            <Avatar initials='MD' size='xl' alt='Initials avatar' />
            <span className='text-sm text-gray-400'>Initials</span>
          </div>
          <div className='flex flex-col items-center gap-2'>
            <Avatar size='xl' alt='Fallback avatar' />
            <span className='text-sm text-gray-400'>Fallback</span>
          </div>
        </div>
      </ExampleSection>

      <ExampleSection 
        title='Usage Examples'
        description='Common avatar usage patterns in user interfaces.'
        id='usage-examples'
      >
        <div className='space-y-8'>
          {/* User list example */}
          <div>
            <h4 className='text-lg font-medium text-white mb-4'>User List</h4>
            <div className='space-y-3'>
              {[
                { preset: 'astronaut', name: 'Alex Chen', role: 'Frontend Developer' },
                { preset: 'cosmic-cat', name: 'Maya Patel', role: 'UI Designer' },
                { preset: 'rocket', name: 'Sam Wilson', role: 'Backend Developer' },
              ].map((user, index) => (
                <div key={index} className='flex items-center gap-3 p-3 bg-gray-800/30 rounded-lg'>
                  <Avatar preset={user.preset as any} size='md' alt={`${user.name} avatar`} />
                  <div>
                    <div className='text-white font-medium'>{user.name}</div>
                    <div className='text-gray-400 text-sm'>{user.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Profile header example */}
          <div>
            <h4 className='text-lg font-medium text-white mb-4'>Profile Header</h4>
            <div className='flex items-center gap-4 p-6 bg-gray-800/30 rounded-lg'>
              <Avatar preset='galaxy' size='2xl' alt='User profile avatar' />
              <div>
                <h3 className='text-xl font-semibold text-white'>Luna Sterling</h3>
                <p className='text-gray-400'>Creative Director at Moon Dreams Dev</p>
                <p className='text-sm text-gray-500 mt-1'>Exploring the cosmos through design</p>
              </div>
            </div>
          </div>

          {/* Team avatars example */}
          <div>
            <h4 className='text-lg font-medium text-white mb-4'>Team Stack</h4>
            <div className='flex -space-x-2'>
              {['astronaut', 'moon', 'star', 'galaxy', 'nebula', 'planet'].map((preset, index) => (
                <Avatar
                  key={preset}
                  preset={preset as any}
                  size='lg'
                  alt={`Team member ${index + 1}`}
                  className='border-2 border-gray-900'
                />
              ))}
              <div className='flex items-center justify-center w-16 h-16 bg-gray-700 border-2 border-gray-900 rounded-full text-gray-300 text-sm font-medium'>
                +3
              </div>
            </div>
          </div>
        </div>
      </ExampleSection>
    </ComponentPage>
  );
}