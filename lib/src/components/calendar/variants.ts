export const calendarSizeVariants = {
	small: {
		container: 'text-xs',
		cell: 'w-7 h-7 text-xs',
		header: 'text-sm px-2 py-1',
		navigation: 'p-1',
		weekdays: 'text-xs px-1 py-1',
	},
	medium: {
		container: 'text-sm',
		cell: 'w-9 h-9 text-sm',
		header: 'text-base px-3 py-2',
		navigation: 'p-2',
		weekdays: 'text-sm px-2 py-2',
	},
	large: {
		container: 'text-base',
		cell: 'w-12 h-12 text-base',
		header: 'text-lg px-4 py-3',
		navigation: 'p-3',
		weekdays: 'text-base px-3 py-2',
	},
	auto: {
		container: 'w-full h-full',
		cell: 'flex-1 min-h-[2rem] text-sm',
		header: 'text-base px-3 py-2',
		navigation: 'p-2',
		weekdays: 'text-sm px-2 py-2',
	},
} as const;

export type CalendarSize = keyof typeof calendarSizeVariants;

export const calendarViewVariants = {
	month: 'grid-cols-7',
	week: 'grid-cols-7',
	day: 'grid-cols-1',
} as const;

export type CalendarView = keyof typeof calendarViewVariants;

export const calendarDefaults = {
	size: 'medium' as CalendarSize,
	view: 'month' as CalendarView,
} as const;
