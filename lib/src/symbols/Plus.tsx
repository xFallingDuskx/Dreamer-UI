import { SymbolProps } from './props';

export function Plus({ size = 15, color = 'currentColor', className = 'inline', ...props }: SymbolProps) {
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
        d='M8 2.75C8 2.33579 7.66421 2 7.25 2C6.83579 2 6.5 2.33579 6.5 2.75V6.5H2.75C2.33579 6.5 2 6.83579 2 7.25C2 7.66421 2.33579 8 2.75 8H6.5V11.75C6.5 12.1642 6.83579 12.5 7.25 12.5C7.66421 12.5 8 12.1642 8 11.75V8H11.75C12.1642 8 12.5 7.66421 12.5 7.25C12.5 6.83579 12.1642 6.5 11.75 6.5H8V2.75Z'
				fill={color}
				fillRule='evenodd'
				clipRule='evenodd'
			/>
		</svg>
	);
}
