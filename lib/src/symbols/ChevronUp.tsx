import { SymbolProps } from './props';

export function ChevronUp({ size = 15, color = 'currentColor', className = 'inline', ...props }: SymbolProps) {
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
				d='M7.14645 3.14645C7.34171 2.95118 7.65829 2.95118 7.85355 3.14645L12.8536 8.14645C13.0488 8.34171 13.0488 8.65829 12.8536 8.85355C12.6583 9.04882 12.3417 9.04882 12.1464 8.85355L7.5 4.20711L2.85355 8.85355C2.65829 9.04882 2.34171 9.04882 2.14645 8.85355C1.95118 8.65829 1.95118 8.34171 2.14645 8.14645L7.14645 3.14645Z'
				fill={color}
				fillRule='evenodd'
				clipRule='evenodd'
			/>
		</svg>
	);
}
