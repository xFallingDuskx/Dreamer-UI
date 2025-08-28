import React from 'react';

interface SpaceBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export const SpaceBackground = ({ children, className = '' }: SpaceBackgroundProps) => {
  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden ${className}`}>
      {/* Stars Background */}
      <div className='absolute inset-0'>
        <div className='absolute top-20 left-20 w-1 h-1 bg-white rounded-full opacity-80'></div>
        <div className='absolute top-40 right-32 w-1 h-1 bg-primary rounded-full opacity-60'></div>
        <div className='absolute top-60 left-1/3 w-1 h-1 bg-white rounded-full opacity-90'></div>
        <div className='absolute bottom-40 right-20 w-1 h-1 bg-accent rounded-full opacity-70'></div>
        <div className='absolute bottom-20 left-40 w-1 h-1 bg-white rounded-full opacity-85'></div>
        <div className='absolute top-32 left-1/2 w-1 h-1 bg-secondary rounded-full opacity-75'></div>
        <div className='absolute bottom-60 right-1/3 w-1 h-1 bg-white rounded-full opacity-65'></div>
        <div className='absolute top-1/4 left-16 w-1 h-1 bg-primary rounded-full opacity-80'></div>
        <div className='absolute top-3/4 right-24 w-1 h-1 bg-accent rounded-full opacity-70'></div>
        <div className='absolute bottom-32 left-1/2 w-1 h-1 bg-white rounded-full opacity-90'></div>
      </div>

      {/* Floating Nebula-like Elements */}
      <div className='absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-xl'></div>
      <div className='absolute bottom-20 right-10 w-40 h-40 bg-accent/10 rounded-full blur-xl'></div>
      <div className='absolute top-1/2 right-20 w-24 h-24 bg-secondary/10 rounded-full blur-lg'></div>
      <div className='absolute top-1/3 left-1/4 w-28 h-28 bg-primary/8 rounded-full blur-xl'></div>
      <div className='absolute bottom-1/3 left-16 w-36 h-36 bg-accent/8 rounded-full blur-2xl'></div>
      <div className='absolute top-2/3 right-1/3 w-20 h-20 bg-success/10 rounded-full blur-lg'></div>

      {/* Content */}
      <div className='relative z-10'>
        {children}
      </div>
    </div>
  );
};
