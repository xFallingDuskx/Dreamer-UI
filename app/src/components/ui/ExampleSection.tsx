import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent, CodeBlock } from '@moondreamsdev/dreamer-ui/components';

interface ExampleSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  id?: string;
  code?: string;
}

export function ExampleSection({ title, description, children, className = '', id, code }: ExampleSectionProps) {
  const sectionId = id || title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

  return (
    <section className={`mb-12 ${className}`} id={sectionId}>
      <div className='mb-6'>
        <h3 className='text-2xl font-semibold text-white mb-2'>{title}</h3>
        {description && (
          <p className='text-gray-400'>{description}</p>
        )}
      </div>
      <div className='bg-gray-800/50 border border-gray-600 rounded-xl p-6'>
        {code ? (
          <Tabs defaultValue="preview" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
            <TabsContent value="preview">
              {children}
            </TabsContent>
            <TabsContent value="code">
              <CodeBlock
                code={code}
                language="tsx"
                hideHeader={true}
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
