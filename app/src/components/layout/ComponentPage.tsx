interface ComponentPageProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export const ComponentPage = ({ title, description, children }: ComponentPageProps) => {
  return (
    <div className='min-h-screen pb-24'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        {/* Header */}
        <div className='text-center mb-12'>
          <h1 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4'>
            {title}
          </h1>
          <p className='text-xl text-gray-300 max-w-2xl mx-auto'>
            {description}
          </p>
        </div>

        {/* Content */}
        <div className='bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8'>
          {children}
        </div>
      </div>
    </div>
  );
};
