// Custom icons for List component
export function ChevronUp({ size = 16, color = 'currentColor', className = '', ...props }: { size?: number; color?: string; className?: string; [key: string]: any }) {
  return (
    <svg
      {...props}
      width={size}
      height={size}
      viewBox='0 0 15 15'
      fill='none'
      className={className}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M7.14645 3.14645C7.34171 2.95118 7.65829 2.95118 7.85355 3.14645L12.8536 8.14645C13.0488 8.34171 13.0488 8.65829 12.8536 8.85355C12.6583 9.04882 12.3417 9.04882 12.1464 8.85355L7.5 4.20711L2.85355 8.85355C2.65829 9.04882 2.34171 9.04882 2.14645 8.85355C1.95118 8.65829 1.95118 8.34171 2.14645 8.14645L7.14645 3.14645Z'
        fill={color}
        fillRule='evenodd'
        clipRule='evenodd'
      />
    </svg>
  );
}

export function ChevronDown({ size = 16, color = 'currentColor', className = '', ...props }: { size?: number; color?: string; className?: string; [key: string]: any }) {
  return (
    <svg
      {...props}
      width={size}
      height={size}
      viewBox='0 0 15 15'
      fill='none'
      className={className}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M7.85355 11.8536C7.65829 12.0488 7.34171 12.0488 7.14645 11.8536L2.14645 6.85355C1.95118 6.65829 1.95118 6.34171 2.14645 6.14645C2.34171 5.95118 2.65829 5.95118 2.85355 6.14645L7.5 10.7929L12.1464 6.14645C12.3417 5.95118 12.6583 5.95118 12.8536 6.14645C13.0488 6.34171 13.0488 6.65829 12.8536 6.85355L7.85355 11.8536Z'
        fill={color}
        fillRule='evenodd'
        clipRule='evenodd'
      />
    </svg>
  );
}

export function GripVertical({ size = 16, color = 'currentColor', className = '', ...props }: { size?: number; color?: string; className?: string; [key: string]: any }) {
  return (
    <svg
      {...props}
      width={size}
      height={size}
      viewBox='0 0 15 15'
      fill='none'
      className={className}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M5.5 4.625C5.5 4.27982 5.77982 4 6.125 4C6.47018 4 6.75 4.27982 6.75 4.625C6.75 4.97018 6.47018 5.25 6.125 5.25C5.77982 5.25 5.5 4.97018 5.5 4.625ZM8.25 4.625C8.25 4.27982 8.52982 4 8.875 4C9.22018 4 9.5 4.27982 9.5 4.625C9.5 4.97018 9.22018 5.25 8.875 5.25C8.52982 5.25 8.25 4.97018 8.25 4.625ZM6.125 7.5C5.77982 7.5 5.5 7.77982 5.5 8.125C5.5 8.47018 5.77982 8.75 6.125 8.75C6.47018 8.75 6.75 8.47018 6.75 8.125C6.75 7.77982 6.47018 7.5 6.125 7.5ZM8.25 8.125C8.25 7.77982 8.52982 7.5 8.875 7.5C9.22018 7.5 9.5 7.77982 9.5 8.125C9.5 8.47018 9.22018 8.75 8.875 8.75C8.52982 8.75 8.25 8.47018 8.25 8.125ZM6.125 11C5.77982 11 5.5 11.2798 5.5 11.625C5.5 11.9702 5.77982 12.25 6.125 12.25C6.47018 12.25 6.75 11.9702 6.75 11.625C6.75 11.2798 6.47018 11 6.125 11ZM8.25 11.625C8.25 11.2798 8.52982 11 8.875 11C9.22018 11 9.5 11.2798 9.5 11.625C9.5 11.9702 9.22018 12.25 8.875 12.25C8.52982 12.25 8.25 11.9702 8.25 11.625Z'
        fill={color}
        fillRule='evenodd'
        clipRule='evenodd'
      />
    </svg>
  );
}

export function Trash({ size = 16, color = 'currentColor', className = '', ...props }: { size?: number; color?: string; className?: string; [key: string]: any }) {
  return (
    <svg
      {...props}
      width={size}
      height={size}
      viewBox='0 0 15 15'
      fill='none'
      className={className}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4H3.5C3.22386 4 3 3.77614 3 3.5ZM5 4V12H10V4H5Z'
        fill={color}
        fillRule='evenodd'
        clipRule='evenodd'
      />
    </svg>
  );
}

export function Plus({ size = 16, color = 'currentColor', className = '', ...props }: { size?: number; color?: string; className?: string; [key: string]: any }) {
  return (
    <svg
      {...props}
      width={size}
      height={size}
      viewBox='0 0 15 15'
      fill='none'
      className={className}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M8 2.75C8 2.33579 7.66421 2 7.25 2C6.83579 2 6.5 2.33579 6.5 2.75V6.5H2.75C2.33579 6.5 2 6.83579 2 7.25C2 7.66421 2.33579 8 2.75 8H6.5V11.75C6.5 12.1642 6.83579 12.5 7.25 12.5C7.66421 12.5 8 12.1642 8 11.75V8H11.75C12.1642 8 12.5 7.66421 12.5 7.25C12.5 6.83579 12.1642 6.5 11.75 6.5H8V2.75Z'
        fill={color}
        fillRule='evenodd'
        clipRule='evenodd'
      />
    </svg>
  );
}