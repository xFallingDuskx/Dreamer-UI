import { SymbolProps } from './props';

export function Dash({ size = 15, color = 'currentColor', className = 'inline', ...props }: SymbolProps) {
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
        d='M2.25 7.5C2.25 7.08579 2.58579 6.75 3 6.75H12C12.4142 6.75 12.75 7.08579 12.75 7.5C12.75 7.91421 12.4142 8.25 12 8.25H3C2.58579 8.25 2.25 7.91421 2.25 7.5Z'
        fill={color}
        fillRule='evenodd'
        clipRule='evenodd'
      />
    </svg>
  );
}
