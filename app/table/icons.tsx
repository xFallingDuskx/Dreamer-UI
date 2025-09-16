import { SymbolProps } from '@moondreamsdev/dreamer-ui/symbols';

export function ChevronUp({ size = 15, color = 'currentColor', className = 'inline', ...props }: SymbolProps) {
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
        d='M3.13523 8.84197C3.3241 9.04343 3.64052 9.05363 3.84197 8.86477L7.5 5.43536L11.158 8.86477C11.3595 9.05363 11.6759 9.04343 11.8648 8.84197C12.0536 8.64051 12.0434 8.32409 11.842 8.13523L7.84197 4.63523C7.65132 4.45668 7.34868 4.45668 7.15803 4.63523L3.15803 8.13523C2.95657 8.32409 2.94637 8.64051 3.13523 8.84197Z'
        fill={color}
        fillRule='evenodd'
        clipRule='evenodd'
      />
    </svg>
  );
}

export function SortIcon({ size = 15, color = 'currentColor', className = 'inline', ...props }: SymbolProps) {
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
        d='M4.93179 5.43179C4.75583 5.60775 4.75583 5.89225 4.93179 6.06821L7.43179 8.56821C7.60775 8.74417 7.89225 8.74417 8.06821 8.56821L10.5682 6.06821C10.7442 5.89225 10.7442 5.60775 10.5682 5.43179C10.3923 5.25583 10.1077 5.25583 9.93179 5.43179L7.75 7.61358L5.56821 5.43179C5.39225 5.25583 5.10775 5.25583 4.93179 5.43179Z'
        fill={color}
        fillRule='evenodd'
        clipRule='evenodd'
      />
      <path
        d='M10.5682 9.56821C10.7442 9.39225 10.7442 9.10775 10.5682 8.93179C10.3923 8.75583 10.1077 8.75583 9.93179 8.93179L7.75 11.1136L5.56821 8.93179C5.39225 8.75583 5.10775 8.75583 4.93179 8.93179C4.75583 9.10775 4.75583 9.39225 4.93179 9.56821L7.43179 12.0682C7.60775 12.2442 7.89225 12.2442 8.06821 12.0682L10.5682 9.56821Z'
        fill={color}
        fillRule='evenodd'
        clipRule='evenodd'
      />
    </svg>
  );
}