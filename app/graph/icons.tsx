import React from 'react';

interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

export function GraphIcon({ size = 15, color = 'currentColor', className = 'inline' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      className={className}
      viewBox='0 0 15 15'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M1 12.5V2.5C1 2.22386 1.22386 2 1.5 2C1.77614 2 2 2.22386 2 2.5V11.5H13.5C13.7761 11.5 14 11.7239 14 12C14 12.2761 13.7761 12.5 13.5 12.5H1.5C1.22386 12.5 1 12.2761 1 12.5Z'
        fill={color}
        fillRule='evenodd'
        clipRule='evenodd'
      />
      <path
        d='M3 9L6 6L8.5 8.5L12 4'
        stroke={color}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
        fill='none'
      />
      <circle cx='3' cy='9' r='1.5' fill={color} />
      <circle cx='6' cy='6' r='1.5' fill={color} />
      <circle cx='8.5' cy='8.5' r='1.5' fill={color} />
      <circle cx='12' cy='4' r='1.5' fill={color} />
    </svg>
  );
}

export function DataPointIcon({ size = 8, color = 'currentColor', className = '', ...props }: IconProps & React.SVGProps<SVGCircleElement>) {
  return (
    <circle
      r={size / 2}
      fill={color}
      className={className}
      stroke='white'
      strokeWidth='1'
      {...props}
    />
  );
}