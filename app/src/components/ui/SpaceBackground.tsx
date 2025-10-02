import React from 'react';
import './SpaceBackground.css';

interface SpaceBackgroundProps {
  children?: React.ReactNode;
  className?: string;
}

export const SpaceBackground = ({ children, className = '' }: SpaceBackgroundProps) => {
  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden ${className}`}>
      {/* Stars Background */}
      <div className='absolute inset-0'>
        {/* Bright main stars */}
        <div className='absolute top-20 left-20 size-1.5 bg-white rounded-full star-glow-intense star-delay-1'></div>
        <div className='absolute top-40 right-32 size-1.5 bg-primary rounded-full primary-star-glow star-delay-2'></div>
        <div className='absolute top-60 left-1/3 size-1.5 bg-white rounded-full star-twinkle-intense star-delay-3'></div>
        <div className='absolute bottom-40 right-20 size-1.5 bg-accent rounded-full accent-star-glow star-delay-4'></div>
        <div className='absolute bottom-20 left-40 size-1.5 bg-white rounded-full star-glow-intense star-delay-5'></div>
        <div className='absolute top-32 left-1/2 size-1.5 bg-secondary rounded-full secondary-star-glow star-delay-1'></div>
        <div className='absolute bottom-60 right-1/3 size-1.5 bg-white rounded-full star-twinkle-intense star-delay-2'></div>
        <div className='absolute top-1/4 left-16 size-1.5 bg-primary rounded-full primary-star-glow star-delay-3'></div>
        <div className='absolute top-3/4 right-24 size-1.5 bg-accent rounded-full accent-star-glow star-delay-4'></div>
        <div className='absolute bottom-32 left-1/2 size-1.5 bg-white rounded-full star-pulse-strong star-delay-5'></div>
        
        {/* Additional medium stars */}
        <div className='absolute top-16 right-1/4 size-1 bg-white rounded-full star-breathe-slow star-delay-2'></div>
        <div className='absolute top-1/3 right-16 size-1 bg-primary rounded-full primary-star-glow star-delay-4'></div>
        <div className='absolute bottom-1/4 left-1/4 size-1 bg-accent rounded-full accent-star-glow star-delay-1'></div>
        <div className='absolute top-2/3 left-32 size-1 bg-white rounded-full star-twinkle-intense star-delay-3'></div>
        <div className='absolute bottom-16 right-1/4 size-1 bg-secondary rounded-full secondary-star-glow star-delay-5'></div>
        <div className='absolute top-1/2 left-20 size-1 bg-white rounded-full star-pulse-strong star-delay-2'></div>
        <div className='absolute bottom-2/3 right-32 size-1 bg-primary rounded-full primary-star-glow star-delay-4'></div>
        
        {/* Small distant stars */}
        <div className='absolute top-12 left-1/3 w-0.5 h-0.5 bg-white rounded-full star-glow-intense star-delay-1'></div>
        <div className='absolute top-24 right-20 w-0.5 h-0.5 bg-white rounded-full star-twinkle-intense star-delay-3'></div>
        <div className='absolute top-48 left-12 w-0.5 h-0.5 bg-accent rounded-full accent-star-glow star-delay-2'></div>
        <div className='absolute top-72 right-40 w-0.5 h-0.5 bg-white rounded-full star-breathe-slow star-delay-4'></div>
        <div className='absolute bottom-12 left-24 w-0.5 h-0.5 bg-primary rounded-full primary-star-glow star-delay-5'></div>
        <div className='absolute bottom-24 right-12 w-0.5 h-0.5 bg-white rounded-full star-pulse-strong star-delay-1'></div>
        <div className='absolute bottom-48 left-1/3 w-0.5 h-0.5 bg-secondary rounded-full secondary-star-glow star-delay-3'></div>
        <div className='absolute bottom-72 right-1/3 w-0.5 h-0.5 bg-white rounded-full star-glow-intense star-delay-2'></div>
        
        {/* Scattered small stars */}
        <div className='absolute top-36 left-2/3 w-0.5 h-0.5 bg-white rounded-full star-twinkle-intense star-delay-4'></div>
        <div className='absolute top-56 right-1/3 w-0.5 h-0.5 bg-accent rounded-full accent-star-glow star-delay-1'></div>
        <div className='absolute top-80 left-1/4 w-0.5 h-0.5 bg-white rounded-full star-breathe-slow star-delay-5'></div>
        <div className='absolute bottom-36 right-2/3 w-0.5 h-0.5 bg-primary rounded-full primary-star-glow star-delay-2'></div>
        <div className='absolute bottom-56 left-2/3 w-0.5 h-0.5 bg-white rounded-full star-pulse-strong star-delay-3'></div>
        <div className='absolute bottom-80 right-1/4 w-0.5 h-0.5 bg-secondary rounded-full secondary-star-glow star-delay-4'></div>
        
        {/* Corner accent stars */}
        <div className='absolute top-8 left-8 w-0.5 h-0.5 bg-white rounded-full star-glow-intense star-delay-3'></div>
        <div className='absolute top-8 right-8 w-0.5 h-0.5 bg-primary rounded-full primary-star-glow star-delay-1'></div>
        <div className='absolute bottom-8 left-8 w-0.5 h-0.5 bg-accent rounded-full accent-star-glow star-delay-5'></div>
        <div className='absolute bottom-8 right-8 w-0.5 h-0.5 bg-white rounded-full star-twinkle-intense star-delay-2'></div>
      </div>

      {/* Floating Nebula-like Elements */}
      <div className='absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-xl nebula-drift nebula-delay-1'></div>
      <div className='absolute bottom-20 right-10 w-40 h-40 bg-accent/10 rounded-full blur-xl nebula-drift nebula-delay-2'></div>
      <div className='absolute top-1/2 right-20 w-24 h-24 bg-secondary/10 rounded-full blur-lg nebula-drift nebula-delay-3'></div>
      <div className='absolute top-1/3 left-1/4 w-28 h-28 bg-primary/8 rounded-full blur-xl nebula-drift nebula-delay-4'></div>
      <div className='absolute bottom-1/3 left-16 w-36 h-36 bg-accent/8 rounded-full blur-2xl nebula-drift nebula-delay-5'></div>
      <div className='absolute top-2/3 right-1/3 w-20 h-20 bg-success/10 rounded-full blur-lg nebula-drift nebula-delay-6'></div>

      {/* Content */}
      <div className='relative z-10 flex flex-col flex-1'>
        {children}
      </div>
    </div>
  );
};
