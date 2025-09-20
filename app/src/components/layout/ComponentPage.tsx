import { Button, CodeBlock, Table } from '@moondreamsdev/dreamer-ui/components';
import { Copy } from '@moondreamsdev/dreamer-ui/symbols';
import { join } from '@moondreamsdev/dreamer-ui/utils';
import { Disclosure } from '@moondreamsdev/dreamer-ui/components';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

interface TableOfContentsItem {
  id: string;
  title: string;
  level: number;
}

interface ComponentProp {
  name: string;
  type: string;
  default?: string;
  description: string;
  required?: boolean;
}

interface KeyboardShortcut {
  keys: string;
  description: string;
}

interface ComponentPageProps {
  title: string;
  description: string;
  children: React.ReactNode;
  tableOfContents?: TableOfContentsItem[];
  usageInstructions?: string;
  importStatement?: string;
  componentProps?: ComponentProp[];
  keyboardShortcuts?: KeyboardShortcut[];
}

export function ComponentPage({ 
  title, 
  description, 
  children, 
  tableOfContents, 
  usageInstructions,
  importStatement,
  componentProps,
  keyboardShortcuts
}: ComponentPageProps) {
  const [activeSection, setActiveSection] = useState<string>('');
  const [isTocOpen, setIsTocOpen] = useState<boolean>(false);
  const [mainContentTop, setMainContentTop] = useState<number | undefined>(); // Default to 3rem (48px)
  const [copied, setCopied] = useState<boolean>(false);
  const mainContentRef = useRef<HTMLDivElement | null>(null);

  const handleCopyMarkdown = async () => {
    // Generate markdown content
    let markdown = `# ${title}\n\n${description}\n\n`;
    
    if (usageInstructions) {
      markdown += `## Usage Instructions\n\n${usageInstructions}\n\n`;
    }
    
    if (importStatement) {
      markdown += `## Import\n\n\`\`\`typescript\n${importStatement}\n\`\`\`\n\n`;
    }
    
    if (componentProps && componentProps.length > 0) {
      markdown += `## Props\n\n`;
      markdown += `| Name | Type | Default | Required | Description |\n`;
      markdown += `|------|------|---------|----------|-------------|\n`;
      componentProps.forEach(prop => {
        markdown += `| \`${prop.name}\` | \`${prop.type}\` | ${prop.default || '-'} | ${prop.required ? 'Yes' : 'No'} | ${prop.description} |\n`;
      });
      markdown += '\n';
    }
    
    if (keyboardShortcuts && keyboardShortcuts.length > 0) {
      markdown += `## Keyboard Shortcuts\n\n`;
      markdown += `| Keys | Description |\n`;
      markdown += `|------|-------------|\n`;
      keyboardShortcuts.forEach(shortcut => {
        markdown += `| \`${shortcut.keys}\` | ${shortcut.description} |\n`;
      });
      markdown += '\n';
    }

    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

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

  const getButtonClass = (id: string, level: number) => {
    return join(
      'block w-full text-left text-sm py-1 px-2 transition-colors border-l',
      activeSection === id
        ? 'text-white bg-accent-medium/20 border-accent-medium'
        : 'text-gray-300 hover:text-white border-transparent opacity-60 hover:opacity-100',
      level === 2 && 'pl-4',
      level === 3 && 'pl-6'
    );
  };

  return (
    <div className='min-h-screen pb-24'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        {/* Header */}
        <div className='text-center mb-12'>
          <div className='flex justify-between items-start mb-4'>
            <div className='flex-1'>
              <h1 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4'>
                {title}
              </h1>
            </div>
            <Button
              variant='outline'
              size='fitted'
              onClick={handleCopyMarkdown}
              className='ml-4 mt-2'
              disabled={copied}
            >
              <Copy size={14} className='mr-2' />
              {copied ? 'Copied!' : 'Copy as Markdown'}
            </Button>
          </div>
          <p className='text-xl text-gray-300 max-w-2xl mx-auto'>{description}</p>
        </div>

        {/* Usage Instructions */}
        {usageInstructions && (
          <div className='mb-8'>
            <div className='bg-blue-500/10 border border-blue-500/50 rounded-xl p-6'>
              <h2 className='text-lg font-semibold text-white mb-3'>Usage Instructions</h2>
              <p className='text-gray-300'>{usageInstructions}</p>
            </div>
          </div>
        )}

        {/* Import Statement */}
        {importStatement && (
          <div className='mb-8'>
            <h2 className='text-lg font-semibold text-white mb-3'>Import</h2>
            <CodeBlock
              code={importStatement}
              language='typescript'
              hideHeader={true}
              allowCopy={true}
              allowFullscreen={false}
              allowDownload={false}
            />
          </div>
        )}

        {/* Mobile TOC Toggle using Disclosure */}
        {tableOfContents?.length && (
          <div className='lg:hidden mb-6'>
            <Disclosure
              isOpen={isTocOpen}
              label='Table of Contents'
              className='bg-accent-medium/10 border border-accent-medium/50 rounded-xl text-white'
              buttonClassName='p-4 text-left w-full'
              onToggle={setIsTocOpen}
            >
              <div className='mt-4'>
                <nav className='space-y-2'>
                  {tableOfContents.map(({ id, title: tocTitle, level }) => (
                    <button key={id} onClick={() => scrollToSection(id)} className={getButtonClass(id, level)}>
                      {tocTitle}
                    </button>
                  ))}
                </nav>
              </div>
            </Disclosure>
          </div>
        )}

        {/* Main Content */}
        <div ref={mainContentRef} className={join(tableOfContents?.length ? 'lg:mr-48 2xl:mr-24' : '')}>
          <div className='bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-4 sm:p-6 lg:p-8'>
            {children}
          </div>

          {/* Component Props */}
          {componentProps && componentProps.length > 0 && (
            <div className='mt-8'>
              <h2 className='text-2xl font-semibold text-white mb-4'>Props</h2>
              <div className='bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-4 sm:p-6 lg:p-8'>
                <Table
                  data={componentProps}
                  columns={[
                    { 
                      key: 'name', 
                      header: 'Name', 
                      cell: (prop) => <code className='text-primary text-sm px-2 py-1 bg-gray-800 rounded'>{prop.name}</code>
                    },
                    { 
                      key: 'type', 
                      header: 'Type', 
                      cell: (prop) => <code className='text-gray-300 text-sm'>{prop.type}</code>
                    },
                    { 
                      key: 'default', 
                      header: 'Default',
                      cell: (prop) => prop.default ? <code className='text-gray-400 text-sm'>{prop.default}</code> : <span className='text-gray-500'>-</span>
                    },
                    { 
                      key: 'required', 
                      header: 'Required', 
                      align: 'center',
                      cell: (prop) => prop.required ? 
                        <span className='text-red-400 font-medium'>Yes</span> : 
                        <span className='text-gray-500'>No</span>
                    },
                    { 
                      key: 'description', 
                      header: 'Description',
                      cell: (prop) => <span className='text-gray-300'>{prop.description}</span>
                    }
                  ]}
                  size='sm'
                  hoverable={true}
                  striped={true}
                />
              </div>
            </div>
          )}

          {/* Keyboard Shortcuts */}
          {keyboardShortcuts && keyboardShortcuts.length > 0 && (
            <div className='mt-8'>
              <h2 className='text-2xl font-semibold text-white mb-4'>Keyboard Shortcuts</h2>
              <div className='bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-4 sm:p-6 lg:p-8'>
                <Table
                  data={keyboardShortcuts}
                  columns={[
                    { 
                      key: 'keys', 
                      header: 'Keys', 
                      cell: (shortcut) => <code className='text-primary text-sm px-2 py-1 bg-gray-800 rounded'>{shortcut.keys}</code>
                    },
                    { 
                      key: 'description', 
                      header: 'Description',
                      cell: (shortcut) => <span className='text-gray-300'>{shortcut.description}</span>
                    }
                  ]}
                  size='sm'
                  hoverable={true}
                  striped={true}
                />
              </div>
            </div>
          )}
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
            <div className='bg-accent-medium/10 backdrop-blur-sm border border-accent-medium/50 rounded-2xl p-6'>
              <h2 className='text-lg font-semibold text-white mb-4'>Table of Contents</h2>
              <nav className='space-y-2'>
                {tableOfContents.map(({ id, title: tocTitle, level }) => (
                  <button key={id} onClick={() => scrollToSection(id)} className={getButtonClass(id, level)}>
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
