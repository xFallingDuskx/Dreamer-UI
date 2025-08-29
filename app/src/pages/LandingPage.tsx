import { Link } from 'react-router-dom';

export const LandingPage = () => {
  return (
    <div className='flex-1 flex flex-col items-center justify-center p-4 relative overflow-hidden'>
      {/* Main Content Container */}
      <div className='text-center space-y-8 max-w-2xl mx-auto z-10'>
        {/* App Title */}
        <div className='space-y-4'>
          <h1 className='text-6xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent leading-tight'>
            Dreamer UI
          </h1>
          <div className='w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full shadow-lg shadow-primary/50'></div>
        </div>

        {/* Subtitle */}
        <p className='text-xl md:text-2xl text-gray-300 font-light max-w-md mx-auto leading-relaxed'>
          A beautiful React component library built with Tailwind CSS for modern web applications.
        </p>

        {/* Feature Highlights */}
        <div className='flex flex-wrap justify-center gap-4 mt-12'>
          <div className='px-4 py-2 bg-gray-800/80 backdrop-blur-sm rounded-full border border-gray-600 text-secondary text-sm font-medium shadow-lg hover:shadow-secondary/20 transition-all duration-200'>
            ⚡ Lightning Fast
          </div>
          <div className='px-4 py-2 bg-gray-800/80 backdrop-blur-sm rounded-full border border-gray-600 text-secondary text-sm font-medium shadow-lg hover:shadow-secondary/20 transition-all duration-200'>
            🔒 Type Safe
          </div>
          <div className='px-4 py-2 bg-gray-800/80 backdrop-blur-sm rounded-full border border-gray-600 text-secondary text-sm font-medium shadow-lg hover:shadow-secondary/20 transition-all duration-200'>
            🎨 Beautiful Design
          </div>
        </div>

        {/* Call to Action */}
        <div className='pt-8 space-y-4'>
          <Link
            to='/getting-started'
            className='inline-block px-8 py-4 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-xl shadow-lg shadow-secondary/25 hover:shadow-2xl hover:shadow-primary/40 transform hover:scale-105 transition-all duration-200 '
          >
            Get Started
          </Link>
          <p className='text-gray-400 text-sm'>
            Or browse our{' '}
            <Link to='/components' className='text-accent hover:text-accent/80 underline'>
              components
            </Link>
            ,{' '}
            <Link to='/hooks' className='text-accent hover:text-accent/80 underline'>
              hooks
            </Link>
            , and{' '}
            <Link to='/utils' className='text-accent hover:text-accent/80 underline'>
              utilities
            </Link>
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-8 text-center z-10'>
        <div className='text-gray-400'>
          <div className='text-2xl font-bold text-primary'>22+</div>
          <div className='text-sm'>Components</div>
        </div>
        <div className='text-gray-400'>
          <div className='text-2xl font-bold text-accent'>3+</div>
          <div className='text-sm'>Hooks</div>
        </div>
        <div className='text-gray-400'>
          <div className='text-2xl font-bold text-secondary'>100%</div>
          <div className='text-sm'>TypeScript</div>
        </div>
        <div className='text-gray-400'>
          <div className='text-2xl font-bold text-secondary'>0</div>
          <div className='text-sm'>Dependencies</div>
        </div>
      </div>
    </div>
  );
};
