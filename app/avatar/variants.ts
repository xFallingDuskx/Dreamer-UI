export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type AvatarShape = 'circle' | 'square';
export type AvatarPreset = 
  | 'astronaut'
  | 'moon'
  | 'star'
  | 'galaxy' 
  | 'nebula'
  | 'planet'
  | 'cosmic-cat'
  | 'dream-cloud'
  | 'rocket'
  | 'constellation'
  | 'comet'
  | 'twilight';

export const AvatarSizes: Record<AvatarSize, { size: string; iconSize: string }> = {
  xs: { size: 'w-8 h-8', iconSize: '24' },
  sm: { size: 'w-10 h-10', iconSize: '32' },
  md: { size: 'w-12 h-12', iconSize: '40' },
  lg: { size: 'w-16 h-16', iconSize: '56' },
  xl: { size: 'w-20 h-20', iconSize: '72' },
  '2xl': { size: 'w-24 h-24', iconSize: '88' },
};

export const AvatarShapes: Record<AvatarShape, string> = {
  circle: 'rounded-full',
  square: 'rounded-lg',
};