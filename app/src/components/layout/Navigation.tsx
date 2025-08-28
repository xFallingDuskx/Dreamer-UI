import { Link, useLocation } from 'react-router-dom';

interface NavigationProps {
  className?: string;
}

const components = [
  { name: 'Button', path: '/components/button' },
  { name: 'Input', path: '/components/input' },
  { name: 'Textarea', path: '/components/textarea' },
  { name: 'Select', path: '/components/select' },
  { name: 'Checkbox', path: '/components/checkbox' },
  { name: 'Radio Group', path: '/components/radiogroup' },
  { name: 'Toggle', path: '/components/toggle' },
  { name: 'Slider', path: '/components/slider' },
  { name: 'Label', path: '/components/label' },
  { name: 'Separator', path: '/components/separator' },
  { name: 'Skeleton', path: '/components/skeleton' },
  { name: 'Accordion', path: '/components/accordion' },
  { name: 'Modal', path: '/components/modal' },
  { name: 'Action Modal', path: '/components/actionmodal' },
  { name: 'Panel', path: '/components/panel' },
  { name: 'Toast', path: '/components/toast' },
  { name: 'Tooltip', path: '/components/tooltip' },
  { name: 'Tabs', path: '/components/tabs' },
  { name: 'Pagination', path: '/components/pagination' },
  { name: 'Carousel', path: '/components/carousel' },
  { name: 'Scroll Area', path: '/components/scroll-area' },
  { name: 'Clickable', path: '/components/clickable' },
];

const hooks = [
  { name: 'useActionModal', path: '/hooks/useactionmodal' },
  { name: 'useToast', path: '/hooks/usetoast' },
];

const utils = [
  { name: 'join', path: '/utils/join' },
];

export const Navigation = ({ className = '' }: NavigationProps) => {
  const location = useLocation();

  return (
    <nav className={`bg-gray-900/80 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-50 ${className}`}>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo */}
          <Link to='/' className='flex items-center space-x-2'>
            <div className='w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center'>
              <span className='text-white font-bold text-sm'>D</span>
            </div>
            <span className='text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent'>
              Dreamer UI
            </span>
          </Link>

          {/* Main Navigation */}
          <div className='hidden md:block'>
            <div className='flex items-baseline space-x-8'>
              <Link
                to='/'
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  location.pathname === '/'
                    ? 'text-primary bg-primary/20'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
              >
                Home
              </Link>

              <Link
                to='/getting-started'
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  location.pathname === '/getting-started'
                    ? 'text-primary bg-primary/20'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
              >
                Getting Started
              </Link>
              
              {/* Components Dropdown */}
              <div className='relative group'>
                <button className='px-3 py-2 text-sm font-medium rounded-md text-gray-300 hover:text-white hover:bg-gray-800 transition-colors'>
                  Components
                </button>
                <div className='absolute left-0 mt-2 w-64 bg-gray-900/95 backdrop-blur-sm border border-gray-700 rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50'>
                  <div className='p-2 max-h-96 overflow-y-auto'>
                    <Link
                      to='/components'
                      className={`block px-3 py-2 text-sm rounded-md transition-colors mb-1 ${
                        location.pathname === '/components'
                          ? 'text-primary bg-primary/20'
                          : 'text-gray-300 hover:text-white hover:bg-gray-800'
                      }`}
                    >
                      All Components
                    </Link>
                    <div className='border-t border-gray-600 my-1'></div>
                    {components.map((component) => (
                      <Link
                        key={component.path}
                        to={component.path}
                        className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                          location.pathname === component.path
                            ? 'text-primary bg-primary/20'
                            : 'text-gray-300 hover:text-white hover:bg-gray-800'
                        }`}
                      >
                        {component.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Hooks Dropdown */}
              <div className='relative group'>
                <button className='px-3 py-2 text-sm font-medium rounded-md text-gray-300 hover:text-white hover:bg-gray-800 transition-colors'>
                  Hooks
                </button>
                <div className='absolute left-0 mt-2 w-56 bg-gray-900/95 backdrop-blur-sm border border-gray-700 rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50'>
                  <div className='p-2'>
                    <Link
                      to='/hooks'
                      className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                        location.pathname === '/hooks'
                          ? 'text-primary bg-primary/20'
                          : 'text-gray-300 hover:text-white hover:bg-gray-800'
                      }`}
                    >
                      All Hooks
                    </Link>
                    {hooks.map((hook) => (
                      <Link
                        key={hook.path}
                        to={hook.path}
                        className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                          location.pathname === hook.path
                            ? 'text-primary bg-primary/20'
                            : 'text-gray-300 hover:text-white hover:bg-gray-800'
                        }`}
                      >
                        {hook.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Utils Dropdown */}
              <div className='relative group'>
                <button className='px-3 py-2 text-sm font-medium rounded-md text-gray-300 hover:text-white hover:bg-gray-800 transition-colors'>
                  Utils
                </button>
                <div className='absolute left-0 mt-2 w-48 bg-gray-900/95 backdrop-blur-sm border border-gray-700 rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50'>
                  <div className='p-2'>
                    <Link
                      to='/utils'
                      className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                        location.pathname === '/utils'
                          ? 'text-primary bg-primary/20'
                          : 'text-gray-300 hover:text-white hover:bg-gray-800'
                      }`}
                    >
                      All Utils
                    </Link>
                    {utils.map((util) => (
                      <Link
                        key={util.path}
                        to={util.path}
                        className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                          location.pathname === util.path
                            ? 'text-primary bg-primary/20'
                            : 'text-gray-300 hover:text-white hover:bg-gray-800'
                        }`}
                      >
                        {util.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className='md:hidden'>
            <button className='text-gray-300 hover:text-white'>
              <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
