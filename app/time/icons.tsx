import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

export function ClockIcon({ size = 15, color = 'currentColor', className = 'inline', ...props }: IconProps) {
  return (
    <svg
      {...props}
      width={size}
      height={size}
      className={className}
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.5 1C3.91015 1 1 3.91015 1 7.5C1 11.0899 3.91015 14 7.5 14C11.0899 14 14 11.0899 14 7.5C14 3.91015 11.0899 1 7.5 1ZM0 7.5C0 3.35786 3.35786 0 7.5 0C11.6421 0 15 3.35786 15 7.5C15 11.6421 11.6421 15 7.5 15C3.35786 15 0 11.6421 0 7.5ZM7 3.5C7 3.22386 7.22386 3 7.5 3C7.77614 3 8 3.22386 8 3.5V7H10.5C10.7761 7 11 7.22386 11 7.5C11 7.77614 10.7761 8 10.5 8H7.5C7.22386 8 7 7.77614 7 7.5V3.5Z"
        fill={color}
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function KeyboardIcon({ size = 15, color = 'currentColor', className = 'inline', ...props }: IconProps) {
  return (
    <svg
      {...props}
      width={size}
      height={size}
      className={className}
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 4C1 3.44772 1.44772 3 2 3H13C13.5523 3 14 3.44772 14 4V11C14 11.5523 13.5523 12 13 12H2C1.44772 12 1 11.5523 1 11V4ZM2 4V11H13V4H2ZM3 5.5C3 5.22386 3.22386 5 3.5 5H4.5C4.77614 5 5 5.22386 5 5.5V6.5C5 6.77614 4.77614 7 4.5 7H3.5C3.22386 7 3 6.77614 3 6.5V5.5ZM6 5.5C6 5.22386 6.22386 5 6.5 5H7.5C7.77614 5 8 5.22386 8 5.5V6.5C8 6.77614 7.77614 7 7.5 7H6.5C6.22386 7 6 6.77614 6 6.5V5.5ZM9 5.5C9 5.22386 9.22386 5 9.5 5H10.5C10.77614 5 11 5.22386 11 5.5V6.5C11 6.77614 10.77614 7 10.5 7H9.5C9.22386 7 9 6.77614 9 6.5V5.5ZM3 8.5C3 8.22386 3.22386 8 3.5 8H11.5C11.7761 8 12 8.22386 12 8.5V9.5C12 9.77614 11.7761 10 11.5 10H3.5C3.22386 10 3 9.77614 3 9.5V8.5Z"
        fill={color}
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  );
}