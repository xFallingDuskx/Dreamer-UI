import { SymbolProps } from './props';

export function DeepRing({ size = 15, color = 'currentColor', className = 'inline', ...props }: SymbolProps) {
  return (
    <svg
      {...props}
      width={size}
      height={size}
      className={className}
      viewBox='0 0 15 15'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M14.25 7.5c0 3.728-3.022 6.75-6.75 6.75S0.75 11.228 0.75 7.5 3.772 0.75 7.5 0.75 14.25 3.772 14.25 7.5zM7.5 10a2.5 2.5 0 100-5 2.5 2.5 0 000 5z'
        fill={color}
        fillRule='evenodd'
        clipRule='evenodd'
      />
    </svg>
  );
}
