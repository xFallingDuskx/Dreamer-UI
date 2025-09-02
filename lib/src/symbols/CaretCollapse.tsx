import { SymbolProps } from './props';

export function CaretCollapse({ size = 15, color = 'currentColor', className = 'inline', ...props }: SymbolProps) {
  return (
    <svg
      {...props}
      width={size}
      height={size}
      className={className}
      viewBox='0 0 15 15'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M4.5 4 L7.5 7 L10.5 4 L9.8 3.3 L7.5 5.6 L5.2 3.3 Z' fill={color} fillRule='evenodd' clipRule='evenodd' />
      <path
        d='M4.5 11 L7.5 8 L10.5 11 L9.8 11.7 L7.5 9.4 L5.2 11.7 Z'
        fill={color}
        fillRule='evenodd'
        clipRule='evenodd'
      />
    </svg>
  );
}
