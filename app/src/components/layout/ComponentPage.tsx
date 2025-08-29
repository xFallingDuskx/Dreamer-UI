import { join } from '@moondreamsdev/dreamer-ui/utils';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

interface TableOfContentsItem {
  id: string;
  title: string;
  level: number;
}

interface ComponentPageProps {
  title: string;
  description: string;
  children: React.ReactNode;
  tableOfContents?: TableOfContentsItem[];
}

export function ComponentPage({ title, description, children, tableOfContents }: ComponentPageProps) {
  const [activeSection, setActiveSection] = useState<string>('');
  const [isTocOpen, setIsTocOpen] = useState<boolean>(false);
  const [mainContentTop, setMainContentTop] = useState<number | undefined>(); // Default to 3rem (48px)
  const mainContentRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (mainContentRef.current) {
      const rect = mainContentRef.current.getBoundingClientRect();
      setMainContentTop(rect.top + window.scrollY);
    }
  }, []);

  // Handle initial hash on page load and update active section
  useEffect(() => {
    if (!tableOfContents?.length) return;

    const hash = window.location.hash.slice(1); // Remove the '#'
    if (hash) {
      const element = document.getElementById(hash);
      if (element) {
        // Small delay to ensure the page has rendered
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          setActiveSection(hash);
        }, 100);
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const newActiveSection = entry.target.id;
            setActiveSection(newActiveSection);
          }
        });
      },
      {
        rootMargin: '-100px 0px -80% 0px',
      }
    );

    tableOfContents.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [tableOfContents]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsTocOpen(false); // Close mobile TOC after clicking

      // Update URL hash
      window.history.pushState(null, '', `#${id}`);
      setActiveSection(id);
    }
  };

  return (
    <div className='min-h-screen pb-24'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        {/* Header */}
        <div className='text-center mb-12'>
          <h1 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4'>
            {title}
          </h1>
          <p className='text-xl text-gray-300 max-w-2xl mx-auto'>{description}</p>
        </div>

        {/* Mobile TOC Toggle */}
        {tableOfContents?.length && (
          <div className='lg:hidden mb-6'>
            <button
              onClick={() => setIsTocOpen(!isTocOpen)}
              className='w-full bg-gray-800/50 border border-gray-600 rounded-xl p-4 text-left text-white hover:bg-gray-700/50 transition-colors'
            >
              <span className='font-semibold'>Table of Contents</span>
              <span className='float-right'>{isTocOpen ? '-' : '+'}</span>
            </button>
            {isTocOpen && (
              <div className='mt-2 bg-gray-800/50 border border-gray-600 rounded-xl p-4'>
                <nav className='space-y-2'>
                  {tableOfContents.map(({ id, title: tocTitle, level }) => (
                    <button
                      key={id}
                      onClick={() => scrollToSection(id)}
                      className={join(
                        'block w-full text-left py-1 px-2 rounded transition-colors',
                        activeSection === id
                          ? 'text-primary bg-primary/10'
                          : 'text-gray-300 hover:text-white hover:bg-gray-700/50',
                        level === 2 && 'pl-4',
                        level === 3 && 'pl-6'
                      )}
                    >
                      {tocTitle}
                    </button>
                  ))}
                </nav>
              </div>
            )}
          </div>
        )}

        {/* Main Content */}
        <div ref={mainContentRef} className={join(tableOfContents?.length ? 'lg:mr-48 2xl:mr-24' : '')}>
          <div className='bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-4 sm:p-6 lg:p-8'>
            {children}
          </div>
        </div>

        {/* Desktop TOC */}
        {tableOfContents?.length && mainContentTop !== undefined && (
          <div
            className='hidden lg:block w-64 flex-shrink-0'
            style={{
              position: 'fixed',
              top: `${mainContentTop}px`,
              right: '2rem',
              zIndex: 30,
            }}
          >
            <div className='bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6'>
              <h2 className='text-lg font-semibold text-white mb-4'>Table of Contents</h2>
              <nav className='space-y-2'>
                {tableOfContents.map(({ id, title: tocTitle, level }) => (
                  <button
                    key={id}
                    onClick={() => scrollToSection(id)}
                    className={join(
                      'block w-full text-left text-sm py-1 px-2 rounded transition-colors',
                      activeSection === id
                        ? 'text-primary bg-primary/10'
                        : 'text-gray-300 hover:text-white hover:bg-gray-700/50',
                      level === 2 && 'pl-4',
                      level === 3 && 'pl-6'
                    )}
                  >
                    {tocTitle}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
