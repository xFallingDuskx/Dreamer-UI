import { SymbolProps } from './props';

export function Facebook({ size = 15, color = 'currentColor', className = 'inline', ...props }: SymbolProps) {
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
      <path d='M15 7.546c0-4.145-3.358-7.5-7.5-7.5s-7.5 3.355-7.5 7.5c0 3.744 2.744 6.847 6.328 7.409v-5.24H4.423v-2.169h1.905V5.894c0-1.879 1.121-2.918 2.833-2.918.82 0 1.679.147 1.679.147v1.846H9.893c-.932 0-1.222.578-1.222 1.171v1.406h2.08l-.333 2.169h-1.747v5.24C12.256 14.393 15 11.29 15 7.546z' />
    </svg>
  );
}