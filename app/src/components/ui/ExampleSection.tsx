interface ExampleSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function ExampleSection({ title, description, children, className = '', id }: ExampleSectionProps) {
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
        {children}
      </div>
    </section>
  );
}
