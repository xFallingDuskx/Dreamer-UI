interface AvatarIconProps {
	size: string;
}

// Astronaut Avatar
export function AstronautAvatar({ size }: AvatarIconProps) {
	return (
		<svg width={size} height={size} viewBox='0 0 100 100' fill='none'>
			{/* Helmet */}
			<circle cx='50' cy='40' r='32' fill='url(#astronautHelmet)' stroke='#4F46E5' strokeWidth='2' />
			{/* Face */}
			<circle cx='50' cy='40' r='24' fill='#FED7AA' />
			{/* Eyes */}
			<circle cx='43' cy='36' r='3' fill='#1F2937' />
			<circle cx='57' cy='36' r='3' fill='#1F2937' />
			{/* Mouth */}
			<path d='M46 46 Q50 50 54 46' stroke='#1F2937' strokeWidth='2' fill='none' />
			{/* Body */}
			<rect x='38' y='65' width='24' height='30' rx='12' fill='#E5E7EB' />
			{/* Chest panel */}
			<rect x='44' y='70' width='12' height='8' rx='2' fill='#6366F1' />
			<defs>
				<radialGradient id='astronautHelmet' cx='50%' cy='30%' r='70%'>
					<stop stopColor='#DBEAFE' />
					<stop offset='1' stopColor='#93C5FD' />
				</radialGradient>
			</defs>
		</svg>
	);
}

// Moon Avatar
export function MoonAvatar({ size }: AvatarIconProps) {
	return (
		<svg width={size} height={size} viewBox='0 0 100 100' fill='none'>
			{/* Moon body */}
			<circle cx='50' cy='50' r='40' fill='url(#moonGradient)' />
			{/* Craters */}
			<circle cx='38' cy='35' r='4' fill='#D1D5DB' />
			<circle cx='65' cy='42' r='3' fill='#D1D5DB' />
			<circle cx='42' cy='65' r='5' fill='#D1D5DB' />
			{/* Face */}
			<circle cx='45' cy='45' r='2.5' fill='#1F2937' />
			<circle cx='58' cy='45' r='2.5' fill='#1F2937' />
			<path d='M47 55 Q52 60 57 55' stroke='#1F2937' strokeWidth='2' fill='none' />
			<defs>
				<radialGradient id='moonGradient' cx='30%' cy='30%' r='80%'>
					<stop stopColor='#F9FAFB' />
					<stop offset='1' stopColor='#E5E7EB' />
				</radialGradient>
			</defs>
		</svg>
	);
}

// Star Avatar
export function StarAvatar({ size }: AvatarIconProps) {
	return (
		<svg width={size} height={size} viewBox='0 0 100 100' fill='none'>
			{/* Star shape */}
			<path d='M50 15 L58 38 L82 38 L64 52 L72 75 L50 61 L28 75 L36 52 L18 38 L42 38 Z' fill='url(#starGradient)' />
			{/* Face */}
			<circle cx='44' cy='42' r='2' fill='#1F2937' />
			<circle cx='56' cy='42' r='2' fill='#1F2937' />
			<path d='M46 50 Q50 54 54 50' stroke='#1F2937' strokeWidth='2' fill='none' />
			{/* Sparkles */}
			<circle cx='65' cy='25' r='1.5' fill='#FCD34D' />
			<circle cx='35' cy='30' r='1' fill='#FCD34D' />
			<defs>
				<radialGradient id='starGradient' cx='50%' cy='40%' r='60%'>
					<stop stopColor='#FEF3C7' />
					<stop offset='1' stopColor='#FCD34D' />
				</radialGradient>
			</defs>
		</svg>
	);
}

// Galaxy Avatar
export function GalaxyAvatar({ size }: AvatarIconProps) {
	return (
		<svg width={size} height={size} viewBox='0 0 100 100' fill='none'>
			{/* Galaxy spiral */}
			<circle cx='50' cy='50' r='38' fill='url(#galaxyGradient)' />
			{/* Spiral arms */}
			<path d='M20 50 Q35 30 50 50 Q65 70 80 50' stroke='#8B5CF6' strokeWidth='3' opacity='0.7' />
			<path d='M50 20 Q70 35 50 50 Q30 65 50 80' stroke='#A78BFA' strokeWidth='2' opacity='0.5' />
			{/* Center face */}
			<circle cx='50' cy='50' r='12' fill='#1E1B4B' />
			<circle cx='46' cy='47' r='1.5' fill='#E0E7FF' />
			<circle cx='54' cy='47' r='1.5' fill='#E0E7FF' />
			<path d='M47 53 Q50 56 53 53' stroke='#E0E7FF' strokeWidth='1.5' fill='none' />
			{/* Stars */}
			<circle cx='30' cy='25' r='1' fill='#FFF' />
			<circle cx='75' cy='70' r='1.5' fill='#FFF' />
			<circle cx='25' cy='75' r='1' fill='#FFF' />
			<defs>
				<radialGradient id='galaxyGradient' cx='50%' cy='50%' r='70%'>
					<stop stopColor='#4C1D95' />
					<stop offset='0.5' stopColor='#7C3AED' />
					<stop offset='1' stopColor='#1E1B4B' />
				</radialGradient>
			</defs>
		</svg>
	);
}

// Nebula Avatar
export function NebulaAvatar({ size }: AvatarIconProps) {
	return (
		<svg width={size} height={size} viewBox='0 0 100 100' fill='none'>
			{/* Nebula clouds */}
			<ellipse cx='50' cy='50' rx='35' ry='30' fill='url(#nebulaGradient)' opacity='0.8' />
			<ellipse cx='40' cy='45' rx='20' ry='25' fill='url(#nebulaPink)' opacity='0.6' />
			<ellipse cx='60' cy='55' rx='25' ry='20' fill='url(#nebulaBlue)' opacity='0.6' />
			{/* Face in the center */}
			<circle cx='50' cy='50' r='15' fill='#312E81' opacity='0.9' />
			<circle cx='46' cy='47' r='2' fill='#E0E7FF' />
			<circle cx='54' cy='47' r='2' fill='#E0E7FF' />
			<path d='M47 53 Q50 56 53 53' stroke='#E0E7FF' strokeWidth='1.5' fill='none' />
			{/* Twinkling stars */}
			<circle cx='25' cy='30' r='1' fill='#FFF' opacity='0.9' />
			<circle cx='75' cy='25' r='1.5' fill='#FFF' opacity='0.8' />
			<circle cx='30' cy='75' r='1' fill='#FFF' opacity='0.9' />
			<circle cx='70' cy='75' r='1.5' fill='#FFF' opacity='0.7' />
			<defs>
				<radialGradient id='nebulaGradient' cx='50%' cy='50%' r='70%'>
					<stop stopColor='#7C3AED' />
					<stop offset='1' stopColor='#312E81' />
				</radialGradient>
				<radialGradient id='nebulaPink' cx='50%' cy='50%' r='70%'>
					<stop stopColor='#F472B6' />
					<stop offset='1' stopColor='#BE185D' />
				</radialGradient>
				<radialGradient id='nebulaBlue' cx='50%' cy='50%' r='70%'>
					<stop stopColor='#3B82F6' />
					<stop offset='1' stopColor='#1E40AF' />
				</radialGradient>
			</defs>
		</svg>
	);
}

// Planet Avatar
export function PlanetAvatar({ size }: AvatarIconProps) {
	return (
		<svg width={size} height={size} viewBox='0 0 100 100' fill='none'>
			{/* Planet body */}
			<circle cx='50' cy='50' r='32' fill='url(#planetGradient)' />
			{/* Ring */}
			<ellipse cx='50' cy='50' rx='45' ry='8' fill='none' stroke='#A78BFA' strokeWidth='2' opacity='0.7' />
			{/* Surface details */}
			<circle cx='38' cy='40' r='5' fill='#065F46' opacity='0.6' />
			<circle cx='62' cy='45' r='4' fill='#065F46' opacity='0.6' />
			<circle cx='45' cy='62' r='3' fill='#065F46' opacity='0.6' />
			{/* Face */}
			<circle cx='46' cy='48' r='2.5' fill='#1F2937' />
			<circle cx='54' cy='48' r='2.5' fill='#1F2937' />
			<path d='M47 55 Q50 58 53 55' stroke='#1F2937' strokeWidth='2' fill='none' />
			<defs>
				<radialGradient id='planetGradient' cx='30%' cy='30%' r='80%'>
					<stop stopColor='#A7F3D0' />
					<stop offset='0.6' stopColor='#34D399' />
					<stop offset='1' stopColor='#059669' />
				</radialGradient>
			</defs>
		</svg>
	);
}

// Cosmic Cat Avatar
export function CosmicCatAvatar({ size }: AvatarIconProps) {
	return (
		<svg width={size} height={size} viewBox='0 0 100 100' fill='none'>
			{/* Cat head */}
			<circle cx='50' cy='55' r='28' fill='url(#catGradient)' />
			{/* Ears */}
			<path d='M28 40 L38 25 L42 45 Z' fill='#6366F1' />
			<path d='M58 45 L62 25 L72 40 Z' fill='#6366F1' />
			{/* Inner ears */}
			<path d='M32 38 L36 30 L38 40 Z' fill='#EC4899' />
			<path d='M62 40 L64 30 L68 38 Z' fill='#EC4899' />
			{/* Eyes */}
			<ellipse cx='43' cy='50' rx='4' ry='6' fill='#FCD34D' />
			<ellipse cx='57' cy='50' rx='4' ry='6' fill='#FCD34D' />
			<ellipse cx='43' cy='52' rx='1.5' ry='4' fill='#1F2937' />
			<ellipse cx='57' cy='52' rx='1.5' ry='4' fill='#1F2937' />
			{/* Nose */}
			<path d='M48 58 L50 60 L52 58 Z' fill='#EC4899' />
			{/* Mouth */}
			<path d='M50 60 Q46 64 42 62' stroke='#1F2937' strokeWidth='1.5' fill='none' />
			<path d='M50 60 Q54 64 58 62' stroke='#1F2937' strokeWidth='1.5' fill='none' />
			{/* Whiskers */}
			<line x1='25' y1='55' x2='35' y2='57' stroke='#1F2937' strokeWidth='1' />
			<line x1='65' y1='57' x2='75' y2='55' stroke='#1F2937' strokeWidth='1' />
			{/* Stars around */}
			<circle cx='20' cy='25' r='1.5' fill='#FCD34D' />
			<circle cx='80' cy='30' r='1' fill='#FCD34D' />
			<circle cx='15' cy='70' r='1' fill='#FCD34D' />
			<defs>
				<radialGradient id='catGradient' cx='50%' cy='40%' r='70%'>
					<stop stopColor='#A78BFA' />
					<stop offset='1' stopColor='#6366F1' />
				</radialGradient>
			</defs>
		</svg>
	);
}

// Dream Cloud Avatar
export function DreamCloudAvatar({ size }: AvatarIconProps) {
	return (
		<svg width={size} height={size} viewBox='0 0 100 100' fill='none'>
			{/* Cloud body */}
			<circle cx='35' cy='55' r='18' fill='url(#cloudGradient)' />
			<circle cx='55' cy='50' r='22' fill='url(#cloudGradient)' />
			<circle cx='45' cy='65' r='15' fill='url(#cloudGradient)' />
			<circle cx='65' cy='60' r='16' fill='url(#cloudGradient)' />
			{/* Face */}
			<circle cx='48' cy='52' r='2.5' fill='#6366F1' />
			<circle cx='56' cy='52' r='2.5' fill='#6366F1' />
			<path d='M49 58 Q52 62 55 58' stroke='#6366F1' strokeWidth='2' fill='none' />
			{/* Dream bubbles */}
			<circle cx='70' cy='35' r='3' fill='rgba(167, 139, 250, 0.3)' stroke='#A78BFA' />
			<circle cx='78' cy='28' r='2' fill='rgba(167, 139, 250, 0.3)' stroke='#A78BFA' />
			<circle cx='83' cy='20' r='1.5' fill='rgba(167, 139, 250, 0.3)' stroke='#A78BFA' />
			{/* Stars in bubbles */}
			<circle cx='70' cy='35' r='0.5' fill='#FCD34D' />
			<circle cx='78' cy='28' r='0.5' fill='#FCD34D' />
			<defs>
				<radialGradient id='cloudGradient' cx='50%' cy='40%' r='70%'>
					<stop stopColor='#F8FAFC' />
					<stop offset='1' stopColor='#E2E8F0' />
				</radialGradient>
			</defs>
		</svg>
	);
}

// Rocket Avatar
export function RocketAvatar({ size }: AvatarIconProps) {
	return (
		<svg width={size} height={size} viewBox='0 0 100 100' fill='none'>
			{/* Rocket body */}
			<ellipse cx='50' cy='45' rx='15' ry='30' fill='url(#rocketGradient)' />
			{/* Nose cone */}
			<path d='M35 20 L50 10 L65 20 L50 25 Z' fill='#EF4444' />
			{/* Window */}
			<circle cx='50' cy='35' r='8' fill='#DBEAFE' stroke='#2563EB' strokeWidth='2' />
			{/* Face inside window */}
			<circle cx='47' cy='33' r='1.5' fill='#1F2937' />
			<circle cx='53' cy='33' r='1.5' fill='#1F2937' />
			<path d='M48 37 Q50 39 52 37' stroke='#1F2937' strokeWidth='1' fill='none' />
			{/* Fins */}
			<path d='M35 60 L25 70 L35 75 Z' fill='#6B7280' />
			<path d='M65 60 L75 70 L65 75 Z' fill='#6B7280' />
			{/* Exhaust */}
			<ellipse cx='50' cy='80' rx='8' ry='12' fill='#F59E0B' />
			<ellipse cx='50' cy='82' rx='5' ry='8' fill='#EF4444' />
			{/* Stars */}
			<circle cx='25' cy='20' r='1' fill='#FCD34D' />
			<circle cx='75' cy='25' r='1.5' fill='#FCD34D' />
			<defs>
				<radialGradient id='rocketGradient' cx='30%' cy='30%' r='80%'>
					<stop stopColor='#E5E7EB' />
					<stop offset='1' stopColor='#9CA3AF' />
				</radialGradient>
			</defs>
		</svg>
	);
}

// Constellation Avatar
export function ConstellationAvatar({ size }: AvatarIconProps) {
	return (
		<svg width={size} height={size} viewBox='0 0 100 100' fill='none'>
			{/* Background circle */}
			<circle cx='50' cy='50' r='38' fill='url(#constellationBg)' opacity='0.8' />
			{/* Constellation stars */}
			<circle cx='35' cy='25' r='2' fill='#FCD34D' />
			<circle cx='50' cy='30' r='2.5' fill='#FCD34D' />
			<circle cx='65' cy='35' r='2' fill='#FCD34D' />
			<circle cx='30' cy='50' r='1.5' fill='#FCD34D' />
			<circle cx='70' cy='50' r='2' fill='#FCD34D' />
			<circle cx='40' cy='70' r='2.5' fill='#FCD34D' />
			<circle cx='60' cy='75' r='1.5' fill='#FCD34D' />
			{/* Connection lines */}
			<line x1='35' y1='25' x2='50' y2='30' stroke='#A78BFA' strokeWidth='1' opacity='0.7' />
			<line x1='50' y1='30' x2='65' y2='35' stroke='#A78BFA' strokeWidth='1' opacity='0.7' />
			<line x1='30' y1='50' x2='50' y2='30' stroke='#A78BFA' strokeWidth='1' opacity='0.7' />
			<line x1='50' y1='30' x2='70' y2='50' stroke='#A78BFA' strokeWidth='1' opacity='0.7' />
			<line x1='30' y1='50' x2='40' y2='70' stroke='#A78BFA' strokeWidth='1' opacity='0.7' />
			<line x1='70' y1='50' x2='60' y2='75' stroke='#A78BFA' strokeWidth='1' opacity='0.7' />
			{/* Face in center */}
			<circle cx='48' cy='48' r='2' fill='#E0E7FF' />
			<circle cx='52' cy='48' r='2' fill='#E0E7FF' />
			<path d='M48 54 Q50 56 52 54' stroke='#E0E7FF' strokeWidth='1.5' fill='none' />
			<defs>
				<radialGradient id='constellationBg' cx='50%' cy='50%' r='70%'>
					<stop stopColor='#1E1B4B' />
					<stop offset='1' stopColor='#0F0D2A' />
				</radialGradient>
			</defs>
		</svg>
	);
}

// Comet Avatar
export function CometAvatar({ size }: AvatarIconProps) {
	return (
		<svg width={size} height={size} viewBox='0 0 100 100' fill='none'>
			{/* Comet head */}
			<circle cx='35' cy='35' r='18' fill='url(#cometGradient)' />
			{/* Face */}
			<circle cx='31' cy='31' r='2' fill='#1F2937' />
			<circle cx='39' cy='31' r='2' fill='#1F2937' />
			<path d='M32 38 Q35 41 38 38' stroke='#1F2937' strokeWidth='1.5' fill='none' />
			{/* Tail */}
			<path d='M50 50 Q65 65 85 85' stroke='url(#tailGradient1)' strokeWidth='8' opacity='0.7' />
			<path d='M48 52 Q60 68 75 88' stroke='url(#tailGradient2)' strokeWidth='6' opacity='0.5' />
			<path d='M52 48 Q70 62 90 82' stroke='url(#tailGradient3)' strokeWidth='4' opacity='0.3' />
			{/* Sparkles */}
			<circle cx='60' cy='60' r='1.5' fill='#FCD34D' />
			<circle cx='70' cy='70' r='1' fill='#FCD34D' />
			<circle cx='80' cy='80' r='0.8' fill='#FCD34D' />
			<defs>
				<radialGradient id='cometGradient' cx='30%' cy='30%' r='80%'>
					<stop stopColor='#FEF3C7' />
					<stop offset='1' stopColor='#F59E0B' />
				</radialGradient>
				<linearGradient id='tailGradient1' x1='50%' y1='50%' x2='85%' y2='85%'>
					<stop stopColor='#FCD34D' />
					<stop offset='1' stopColor='transparent' />
				</linearGradient>
				<linearGradient id='tailGradient2' x1='48%' y1='52%' x2='75%' y2='88%'>
					<stop stopColor='#F472B6' />
					<stop offset='1' stopColor='transparent' />
				</linearGradient>
				<linearGradient id='tailGradient3' x1='52%' y1='48%' x2='90%' y2='82%'>
					<stop stopColor='#A78BFA' />
					<stop offset='1' stopColor='transparent' />
				</linearGradient>
			</defs>
		</svg>
	);
}

// Twilight Avatar
export function TwilightAvatar({ size }: AvatarIconProps) {
	return (
		<svg width={size} height={size} viewBox='0 0 100 100' fill='none'>
			{/* Sky background */}
			<circle cx='50' cy='50' r='40' fill='url(#twilightGradient)' />
			{/* Silhouette */}
			<ellipse cx='50' cy='65' rx='25' ry='15' fill='#1F2937' opacity='0.8' />
			{/* Stars */}
			<circle cx='30' cy='25' r='1.5' fill='#FFF' />
			<circle cx='70' cy='30' r='1' fill='#FFF' />
			<circle cx='40' cy='35' r='1.2' fill='#FFF' />
			<circle cx='60' cy='25' r='0.8' fill='#FFF' />
			{/* Moon crescent */}
			<path d='M20 40 Q15 35 20 30 Q25 35 20 40' fill='#FCD34D' />
			{/* Face in silhouette */}
			<circle cx='47' cy='62' r='1.5' fill='#E0E7FF' />
			<circle cx='53' cy='62' r='1.5' fill='#E0E7FF' />
			<path d='M48 67 Q50 69 52 67' stroke='#E0E7FF' strokeWidth='1' fill='none' />
			<defs>
				<radialGradient id='twilightGradient' cx='50%' cy='30%' r='80%'>
					<stop stopColor='#7C3AED' />
					<stop offset='0.7' stopColor='#3730A3' />
					<stop offset='1' stopColor='#1E1B4B' />
				</radialGradient>
			</defs>
		</svg>
	);
}

// Export preset mapping
export const AvatarPresets = {
	astronaut: AstronautAvatar,
	moon: MoonAvatar,
	star: StarAvatar,
	galaxy: GalaxyAvatar,
	nebula: NebulaAvatar,
	planet: PlanetAvatar,
	'cosmic-cat': CosmicCatAvatar,
	'dream-cloud': DreamCloudAvatar,
	rocket: RocketAvatar,
	constellation: ConstellationAvatar,
	comet: CometAvatar,
	twilight: TwilightAvatar,
};
