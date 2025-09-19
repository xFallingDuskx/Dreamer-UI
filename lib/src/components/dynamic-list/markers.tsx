export function DiscMarker({ size = 8, className = '' }: { size?: number; className?: string }) {
	return (
		<div
			className={`rounded-full flex-shrink-0 bg-current ${className}`}
			style={{
				width: size,
				height: size,
			}}
		/>
	);
}

export function DashMarker({ size = 12, className = '' }: { size?: number; className?: string }) {
	return (
		<div
			className={`flex-shrink-0 bg-current ${className}`}
			style={{
				width: size,
				height: 2,
			}}
		/>
	);
}
