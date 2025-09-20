import { CodeBlock, Tabs, TabsContent, TabsList, TabsTrigger } from '@moondreamsdev/dreamer-ui/components';
import { join } from '@moondreamsdev/dreamer-ui/utils';
import { useState } from 'react';

// SectionHeader component with hover link functionality
interface SectionHeaderProps {
  id: string;
  children: React.ReactNode;
  level?: 1 | 2 | 3;
  className?: string;
}

function SectionHeader({ id, children, level = 3, className }: SectionHeaderProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleCopyLink = () => {
    const url = new URL(window.location.href);
    url.hash = id;
    navigator.clipboard.writeText(url.toString());
  };

  const Tag = level === 1 ? 'h1' : level === 2 ? 'h2' : 'h3';
  const textSize = level === 1 ? 'text-2xl' : level === 2 ? 'text-xl' : 'text-2xl';

  return (
    <Tag
      className={join(
        'group relative flex items-center font-semibold text-white mb-2',
        textSize,
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        onClick={handleCopyLink}
        className={join(
          'absolute -left-6 w-6 h-6 flex items-center justify-center rounded text-accent transition-opacity',
          isHovered ? 'opacity-100' : 'opacity-0'
        )}
        title={`Copy link to ${children}`}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"/>
        </svg>
      </button>
      {children}
    </Tag>
  );
}

interface ExampleSectionProps {
	title: string;
	description?: string;
	children: React.ReactNode;
	className?: string;
	id?: string;
	code?: string;
}

export function ExampleSection({ title, description, children, className = '', id, code }: ExampleSectionProps) {
	const sectionId =
		id ||
		title
			.toLowerCase()
			.replace(/\s+/g, '-')
			.replace(/[^a-z0-9-]/g, '');

	return (
		<section className={`mb-12 ${className}`} id={sectionId}>
			<div className='mb-6'>
				<SectionHeader id={sectionId} level={3}>{title}</SectionHeader>
				{description && <p className='text-gray-400'>{description}</p>}
			</div>
			<div className='rounded-xl border border-gray-500/50 px-6 py-3'>
				{code ? (
					<Tabs defaultValue='preview' className='w-full'>
						<TabsList className='mb-4'>
							<TabsTrigger value='preview'>Preview</TabsTrigger>
							<TabsTrigger value='code'>Code</TabsTrigger>
						</TabsList>
						<TabsContent value='preview' className='border-0 py-2'>
							{children}
						</TabsContent>
						<TabsContent value='code' className='border-0 pt-1 pb-2'>
							<CodeBlock
								code={code}
								language='tsx'
								hideHeader={true}
								hideFiletype={true}
								allowCopy={true}
								allowFullscreen={false}
								allowDownload={false}
							/>
						</TabsContent>
					</Tabs>
				) : (
					children
				)}
			</div>
		</section>
	);
}
