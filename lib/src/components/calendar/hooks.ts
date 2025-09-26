import { useCallback, useMemo, useState } from 'react';

export interface CalendarDateRange {
	/** The start date of the range, or null if not selected. */
	start: Date | null;
	/** The end date of the range, or null if not selected. */
	end: Date | null;
}

interface CalendarState {
	currentDate: Date;
	selectedDate: Date | null;
	selectedRange: CalendarDateRange | null;
	view: 'month' | 'week' | 'day';
}

export interface UseCalendarOptions {
	/** The initial date to display and optionally select. */
	initialDate?: Date;
	/** The selection mode - single date or date range selection. */
	mode?: 'single' | 'range';
	/** The minimum selectable date (dates before this will be disabled). */
	minDate?: Date;
	/** The maximum selectable date (dates after this will be disabled). */
	maxDate?: Date;
	/** The calendar view to display. */
	view?: 'month' | 'week' | 'day';
	/** Callback fired when a date is selected in single mode. */
	onDateSelect?: (date: Date) => void;
	/** Callback fired when a date range is selected in range mode. */
	onRangeSelect?: (range: CalendarDateRange) => void;
}

export function useCalendar(options: UseCalendarOptions = {}) {
	const {
		initialDate = new Date(),
		mode = 'single',
		minDate,
		maxDate,
		view = 'month',
		onDateSelect,
		onRangeSelect,
	} = options;

	const [state, setState] = useState<CalendarState>({
		currentDate: initialDate,
		selectedDate: mode === 'single' ? initialDate : null,
		selectedRange: mode === 'range' ? null : null,
		view,
	});

	const isDateDisabled = useCallback(
		(date: Date) => {
			if (minDate && date < minDate) return true;
			if (maxDate && date > maxDate) return true;
			return false;
		},
		[minDate, maxDate]
	);

	const selectDate = useCallback(
		(date: Date) => {
			if (isDateDisabled(date)) return;

			if (mode === 'single') {
				setState((prev) => ({ ...prev, selectedDate: date }));
				onDateSelect?.(date);
			} else if (mode === 'range') {
				setState((prev) => {
					const { selectedRange } = prev;

					if (!selectedRange?.start || (selectedRange.start && selectedRange.end)) {
						// Start new range
						const newRange = { start: date, end: null };
						onRangeSelect?.(newRange);
						return { ...prev, selectedRange: newRange };
					} else {
						// Complete range
						const start = selectedRange.start;
						const end = date;
						const newRange = {
							start: start < end ? start : end,
							end: start < end ? end : start,
						};
						onRangeSelect?.(newRange);
						return { ...prev, selectedRange: newRange };
					}
				});
			}
		},
		[mode, isDateDisabled, onDateSelect, onRangeSelect]
	);

	const navigateMonth = useCallback((direction: 'prev' | 'next') => {
		setState((prev) => {
			const newDate = new Date(prev.currentDate);
			if (direction === 'prev') {
				newDate.setMonth(newDate.getMonth() - 1);
			} else {
				newDate.setMonth(newDate.getMonth() + 1);
			}
			return { ...prev, currentDate: newDate };
		});
	}, []);

	const navigateWeek = useCallback((direction: 'prev' | 'next') => {
		setState((prev) => {
			const newDate = new Date(prev.currentDate);
			const days = direction === 'prev' ? -7 : 7;
			newDate.setDate(newDate.getDate() + days);
			return { ...prev, currentDate: newDate };
		});
	}, []);

	const navigateDay = useCallback((direction: 'prev' | 'next') => {
		setState((prev) => {
			const newDate = new Date(prev.currentDate);
			const days = direction === 'prev' ? -1 : 1;
			newDate.setDate(newDate.getDate() + days);
			return { ...prev, currentDate: newDate };
		});
	}, []);

	const navigate = useCallback(
		(direction: 'prev' | 'next') => {
			if (state.view === 'month') {
				navigateMonth(direction);
			} else if (state.view === 'week') {
				navigateWeek(direction);
			} else {
				navigateDay(direction);
			}
		},
		[state.view, navigateMonth, navigateWeek, navigateDay]
	);

	const changeView = useCallback((newView: 'month' | 'week' | 'day') => {
		setState((prev) => ({ ...prev, view: newView }));
	}, []);

	const goToDate = useCallback((date: Date) => {
		setState((prev) => ({ ...prev, currentDate: date }));
	}, []);

	const changeMonth = useCallback((month: number) => {
		setState((prev) => {
			const newDate = new Date(prev.currentDate);
			newDate.setMonth(month);
			return { ...prev, currentDate: newDate };
		});
	}, []);

	const changeYear = useCallback((year: number) => {
		setState((prev) => {
			const newDate = new Date(prev.currentDate);
			newDate.setFullYear(year);
			return { ...prev, currentDate: newDate };
		});
	}, []);

	const getDaysInView = useMemo(() => {
		const { currentDate, view } = state;
		const days: Date[] = [];

		if (view === 'month') {
			// Get first day of month
			const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

			// Get first Sunday of calendar view
			const startDate = new Date(firstDay);
			startDate.setDate(startDate.getDate() - firstDay.getDay());

			// Generate 42 days (6 weeks)
			for (let i = 0; i < 42; i++) {
				const day = new Date(startDate);
				day.setDate(day.getDate() + i);
				days.push(day);
			}
		} else if (view === 'week') {
			// Get start of week (Sunday)
			const startOfWeek = new Date(currentDate);
			startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

			// Generate 7 days
			for (let i = 0; i < 7; i++) {
				const day = new Date(startOfWeek);
				day.setDate(day.getDate() + i);
				days.push(day);
			}
		} else {
			// Day view - just current date
			days.push(new Date(currentDate));
		}

		return days;
	}, [state]);

	const isDateSelected = useCallback(
		(date: Date) => {
			if (mode === 'single') {
				return state.selectedDate && date.toDateString() === state.selectedDate.toDateString();
			} else if (mode === 'range' && state.selectedRange) {
				const { start, end } = state.selectedRange;
				if (start && end) {
					return date >= start && date <= end;
				} else if (start) {
					return date.toDateString() === start.toDateString();
				}
			}
			return false;
		},
		[mode, state.selectedDate, state.selectedRange]
	);

	const isDateInRange = useCallback(
		(date: Date) => {
			if (mode === 'range' && state.selectedRange?.start && state.selectedRange?.end) {
				const { start, end } = state.selectedRange;
				return date > start && date < end;
			}
			return false;
		},
		[mode, state.selectedRange]
	);

	const isDateRangeStart = useCallback(
		(date: Date) => {
			if (mode === 'range' && state.selectedRange?.start) {
				return date.toDateString() === state.selectedRange.start.toDateString();
			}
			return false;
		},
		[mode, state.selectedRange]
	);

	const isDateRangeEnd = useCallback(
		(date: Date) => {
			if (mode === 'range' && state.selectedRange?.end) {
				return date.toDateString() === state.selectedRange.end.toDateString();
			}
			return false;
		},
		[mode, state.selectedRange]
	);

	return {
		// State
		currentDate: state.currentDate,
		selectedDate: state.selectedDate,
		selectedRange: state.selectedRange,
		view: state.view,

		// Data
		daysInView: getDaysInView,

		// Actions
		selectDate,
		navigate,
		changeView,
		goToDate,
		changeMonth,
		changeYear,

		// Checkers
		isDateSelected,
		isDateDisabled,
		isDateInRange,
		isDateRangeStart,
		isDateRangeEnd,
	};
}
