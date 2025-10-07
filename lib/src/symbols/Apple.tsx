import { SymbolProps } from './props';

export function Apple({ size = 15, color = 'currentColor', className = 'inline', ...props }: SymbolProps) {
  return (
    <svg
      {...props}
      width={size}
      height={size}
      className={className}
      fill={color}
      viewBox='0 0 15 15'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M10.658 12.675c-.613.594-1.281.5-1.925.219-.681-.288-1.306-.3-2.025 0-.9.388-1.375.275-1.913-.219C2.049 9.531 2.194 4.744 5.656 4.581c.844.044 1.431.463 1.925.5.738-.15 1.444-.581 2.231-.525.944.075 1.656.45 2.125 1.125-1.95 1.169-1.488 3.738.3 4.456-.356.938-.819 1.869-1.588 2.556l.006-.006zM7.519 4.531c-.094-1.394 1.038-2.544 2.338-2.656.181 1.613-1.463 2.813-2.338 2.656z' />
    </svg>
  );
}