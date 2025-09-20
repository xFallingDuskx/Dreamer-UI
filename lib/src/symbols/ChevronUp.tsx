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
        d="M11.8648 8.84197C11.6759 9.04343 11.3595 9.05363 11.158 8.86477L7.5 5.43536L3.84197 8.86477C3.64052 9.05363 3.3241 9.04343 3.13523 8.84197C2.94637 8.64051 2.95657 8.32409 3.15803 8.13523L7.15803 4.38523C7.35036 4.20487 7.64964 4.20487 7.84197 4.38523L11.842 8.13523C12.0434 8.32409 12.0536 8.64051 11.8648 8.84197Z"
				fill={color}
				fillRule='evenodd'
				clipRule='evenodd'
			/>
		</svg>
	);
}
