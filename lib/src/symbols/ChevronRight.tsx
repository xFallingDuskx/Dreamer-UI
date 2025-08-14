import { SymbolProps } from '.';

export default function ChevronRight({
  size = 15,
  color = 'currentColor',
  className = 'inline',
  ...props
}: SymbolProps) {
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
        d='M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0331 6.1584 11.8442C5.95694 11.6554 5.96715 11.3389 6.15601 11.1375L9.58543 7.4999L6.15601 3.86234C5.96715 3.66089 5.95694 3.34447 6.1584 3.13508Z'
        fill={color}
        fillRule='evenodd'
        clipRule='evenodd'
      />
    </svg>
  );
}
