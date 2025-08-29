import { join } from '@moondreamsdev/dreamer-ui/utils';
import { useEffect, useState } from 'react';

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
  const [tocOffset, setTocOffset] = useState<number>(0);

  useEffect(() => {
    if (!tableOfContents?.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
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

  useEffect(() => {
    if (!tableOfContents?.length) return;

    let tocElement: HTMLElement | null = null;
    let initialTop = 0;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (!tocElement) {
            tocElement = document.querySelector('[data-toc-container]');
            if (tocElement) {
              const rect = tocElement.getBoundingClientRect();
              initialTop = window.scrollY + rect.top;
            }
          }

          if (tocElement && initialTop > 0) {
            const scrollY = window.scrollY;
            const shouldOffset = scrollY > initialTop - 32; // 32px is top-8 in Tailwind

            if (shouldOffset) {
              const newOffset = scrollY - initialTop + 32;
              setTocOffset(Math.max(0, newOffset));
            } else {
              setTocOffset(0);
            }
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [tableOfContents]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsTocOpen(false); // Close mobile TOC after clicking
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
              <span className='float-right'>{isTocOpen ? '−' : '+'}</span>
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

        {/* Main Layout */}
        <div className='relative flex gap-8'>
          {/* Content */}
          <div className={join('flex-1', tableOfContents?.length ? 'lg:pr-8' : '')}>
            <div className='bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-4 sm:p-6 lg:p-8'>
              {children}
            </div>
          </div>

          {/* Desktop TOC */}
          {tableOfContents?.length && (
            <div className='hidden lg:block w-64 flex-shrink-0'>
              <div data-toc-container className='sticky top-8' style={{ transform: `translateY(${tocOffset}px)` }}>
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
