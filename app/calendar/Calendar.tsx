import { Ref, ReactNode } from 'react';
import { join } from '@moondreamsdev/dreamer-ui/utils';
import { useCalendar, CalendarDateRange, UseCalendarOptions } from './hooks';
import { calendarSizeVariants, calendarViewVariants, calendarDefaults, CalendarSize } from './variants';
import { PrevIcon, NextIcon } from './icons';

export interface CalendarCustomStyles {
	containerClassName?: string;
	headerClassName?: string;
	navigationClassName?: string;
	prevButtonClassName?: string;
	nextButtonClassName?: string;
	titleClassName?: string;
	viewSelectorClassName?: string;
	monthYearSelectorsClassName?: string;
	todayButtonClassName?: string;
	weekdaysClassName?: string;
	weekdayClassName?: string;
	monthGridClassName?: string;
	weekGridClassName?: string;
	dayGridClassName?: string;
	cellClassName?: string;
	selectedCellClassName?: string;
	todayCellClassName?: string;
	disabledCellClassName?: string;
	rangeCellClassName?: string;
	rangeStartCellClassName?: string;
	rangeEndCellClassName?: string;
}

export interface CalendarProps extends Omit<UseCalendarOptions, 'onDateSelect' | 'onRangeSelect'> {
	id?: string;
	ref?: Ref<HTMLDivElement>;
	className?: string;
	size?: CalendarSize;
	customStyles?: CalendarCustomStyles;
	renderCell?: (date: Date, isSelected: boolean, isDisabled: boolean, isToday: boolean) => ReactNode;
	showViewSelector?: boolean;
	showNavigation?: boolean;
	navigationLayout?: 'adjacent' | 'around';
	useMonthYearSelector?: boolean;
	showTodayButton?: boolean;
	onDateSelect?: (date: Date) => void;
	onRangeSelect?: (range: CalendarDateRange) => void;
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];

const YEAR_RANGE = 100;

export function Calendar({
	id,
	ref,
	className,
	size = calendarDefaults.size,
	customStyles = {},
	view = calendarDefaults.view,
	mode = 'single',
	initialDate,
	minDate,
	maxDate,
	renderCell,
	showViewSelector = false,
	showNavigation = true,
	navigationLayout = 'around',
	useMonthYearSelector = false,
	showTodayButton = false,
	onDateSelect,
	onRangeSelect,
	...rest
}: CalendarProps) {
	const calendar = useCalendar({
		initialDate,
		mode,
		minDate,
		maxDate,
		view,
		onDateSelect,
		onRangeSelect,
	});

	const sizeStyles = calendarSizeVariants[size];
	const viewStyles = calendarViewVariants[calendar.view];

	const isToday = (date: Date) => {
		const today = new Date();
		return date.toDateString() === today.toDateString();
	};

	const isCurrentMonth = (date: Date) => {
		return (
			date.getMonth() === calendar.currentDate.getMonth() && date.getFullYear() === calendar.currentDate.getFullYear()
		);
	};

	const goToToday = () => {
		calendar.goToDate(new Date());
	};

	const formatTitle = () => {
		const { currentDate, view } = calendar;
		const month = MONTHS[currentDate.getMonth()];
		const year = currentDate.getFullYear();

		if (view === 'month') {
			return `${month} ${year}`;
		}

		if (view === 'week') {
			const startOfWeek = new Date(currentDate);
			startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
			const endOfWeek = new Date(startOfWeek);
			endOfWeek.setDate(endOfWeek.getDate() + 6);

			if (startOfWeek.getMonth() === endOfWeek.getMonth()) {
				return `${month} ${startOfWeek.getDate()}-${endOfWeek.getDate()}, ${year}`;
			}

			return `${MONTHS[startOfWeek.getMonth()]} ${startOfWeek.getDate()} - ${
				MONTHS[endOfWeek.getMonth()]
			} ${endOfWeek.getDate()}, ${year}`;
		}

		return `${month} ${currentDate.getDate()}, ${year}`;
	};

	const renderViewSelector = () => {
		if (!showViewSelector) return null;

		return (
			<div className={viewSelectorClasses}>
				{(['month', 'week', 'day'] as const).map((viewOption) => (
					<button
						key={viewOption}
						onClick={() => calendar.changeView(viewOption)}
						className={join(
							'px-2 py-1 rounded capitalize transition-colors',
							calendar.view === viewOption ? 'bg-accent text-accent-foreground' : 'hover:bg-accent/20'
						)}
					>
						{viewOption}
					</button>
				))}
			</div>
		);
	};

	const renderMonthYearSelector = () => {
		if (!useMonthYearSelector) return null;

		const currentMonth = calendar.currentDate.getMonth();
		const currentYear = calendar.currentDate.getFullYear();

		// Generate year options (current year ± YEAR_RANGE years)
		const startYear = currentYear - YEAR_RANGE;
		const endYear = currentYear + YEAR_RANGE;
		const yearOptions = [];
		for (let year = startYear; year <= endYear; year++) {
			yearOptions.push(year);
		}

		const monthYearSelectorsClasses = join(
			'border border-border rounded px-2 py-1 text-sm focus:outline-none focus:ring focus:ring-accent/50',
			customStyles.monthYearSelectorsClassName
		);
		return (
			<div className='flex items-center gap-2'>
				<select
					value={currentMonth}
					onChange={(e) => calendar.changeMonth(parseInt(e.target.value))}
					className={monthYearSelectorsClasses}
				>
					{MONTHS.map((month, index) => (
						<option key={month} value={index}>
							{month}
						</option>
					))}
				</select>
				<select
					value={currentYear}
					onChange={(e) => calendar.changeYear(parseInt(e.target.value))}
					className={monthYearSelectorsClasses}
				>
					{yearOptions.map((year) => (
						<option key={year} value={year}>
							{year}
						</option>
					))}
				</select>
			</div>
		);
	};

	const renderTodayButton = () => {
		if (!showTodayButton) return null;

		const todayButtonClasses = join(
			'px-3 py-1 text-xs rounded border border-border hover:bg-accent/20 transition-colors focus:outline-none focus:ring focus:ring-accent/50',
			customStyles.todayButtonClassName
		);

		return (
			<button onClick={goToToday} className={todayButtonClasses} aria-label='Go to today'>
				Today
			</button>
		);
	};

	const renderDateCell = (date: Date) => {
		const isSelected = calendar.isDateSelected(date);
		const isDisabled = calendar.isDateDisabled(date);
		const isTodayDate = isToday(date);
		const isInRange = calendar.isDateInRange(date);
		const isRangeStart = calendar.isDateRangeStart(date);
		const isRangeEnd = calendar.isDateRangeEnd(date);
		const isCurrentMonthDate = isCurrentMonth(date);

		const baseCellClasses = join(
			'w-full flex items-center justify-center transition-colors cursor-pointer',
			'focus:outline-none',
			sizeStyles.cell
		);

		const cellClasses = join(
			!isInRange && 'rounded-md',
			!isSelected && 'hover:bg-accent/20 focus:bg-accent/20',
			baseCellClasses,
			customStyles.cellClassName,
			// Selection states
			isSelected && join('bg-accent text-accent-foreground', customStyles.selectedCellClassName),
			// Range states
			isInRange && join('bg-accent/30', customStyles.rangeCellClassName),
			isRangeStart && join('bg-accent text-accent-foreground rounded-r-none', customStyles.rangeStartCellClassName),
			isRangeEnd && join('bg-accent text-accent-foreground rounded-l-none', customStyles.rangeEndCellClassName),
			// Today
			isTodayDate && !isSelected && join('border border-accent', customStyles.todayCellClassName),
			// Disabled
			isDisabled && join('opacity-50 cursor-not-allowed hover:bg-transparent', customStyles.disabledCellClassName),
			// Month view: dim dates from other months
			calendar.view === 'month' && !isCurrentMonthDate && 'text-muted-foreground/50'
		);

		const cellContent = renderCell ? renderCell(date, !!isSelected, isDisabled, isTodayDate) : date.getDate();

		return (
			<button
				key={date.toISOString()}
				onClick={() => calendar.selectDate(date)}
				disabled={isDisabled}
				className={cellClasses}
				data-date={date.toISOString().split('T')[0]}
				data-selected={!!isSelected}
				data-disabled={isDisabled}
				data-today={isTodayDate}
				aria-label={`${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`}
				aria-selected={!!isSelected}
				aria-disabled={isDisabled}
			>
				{cellContent}
			</button>
		);
	};

	const containerClasses = join(
		'bg-background border rounded-lg',
		sizeStyles.container,
		customStyles.containerClassName,
		className
	);

	const headerClasses = join(
		'flex items-center border-b px-4 py-2',
		navigationLayout === 'around' ? 'justify-between' : 'justify-between',
		sizeStyles.header,
		customStyles.headerClassName
	);

	const navigationClasses = join('flex items-center gap-1', customStyles.navigationClassName);

	const prevButtonClasses = join(
		'p-1 rounded hover:bg-accent/20 transition-colors',
		sizeStyles.navigation,
		customStyles.prevButtonClassName
	);

	const nextButtonClasses = join(
		'p-1 rounded hover:bg-accent/20 transition-colors',
		sizeStyles.navigation,
		customStyles.nextButtonClassName
	);

	const titleClasses = join('font-semibold text-foreground', customStyles.titleClassName);

	const viewSelectorClasses = join('flex gap-1 text-xs', customStyles.viewSelectorClassName);

	const weekdaysClasses = join(
		'grid grid-cols-7 border-b text-muted-foreground font-medium',
		sizeStyles.weekdays,
		customStyles.weekdaysClassName
	);

	const weekdayClasses = join('text-center', customStyles.weekdayClassName);

	const gridClasses = join(
		'grid gap-y-1 p-2',
		calendar.view === 'month' && viewStyles,
		calendar.view === 'week' && join(viewStyles, customStyles.weekGridClassName),
		calendar.view === 'day' && join(viewStyles, customStyles.dayGridClassName),
		calendar.view === 'month' && customStyles.monthGridClassName
	);

	return (
		<div
			id={id}
			ref={ref}
			className={containerClasses}
			data-size={size}
			data-view={calendar.view}
			data-mode={mode}
			role='application'
			aria-label='Calendar'
			{...rest}
		>
			{/* Header */}
			<div className={headerClasses}>
				{/* Adjacent layout: nav buttons on left, title on right */}
				{navigationLayout === 'adjacent' && (
					<>
						<div className='flex items-center gap-4'>
							{showNavigation && (
								<div className={navigationClasses}>
									<button onClick={() => calendar.navigate('prev')} className={prevButtonClasses} aria-label='Previous'>
										<PrevIcon className='w-4 h-4' />
									</button>
									<button onClick={() => calendar.navigate('next')} className={nextButtonClasses} aria-label='Next'>
										<NextIcon className='w-4 h-4' />
									</button>
								</div>
							)}
							<div className='flex items-center gap-3'>
								{!useMonthYearSelector && <h2 className={titleClasses}>{formatTitle()}</h2>}
								{renderMonthYearSelector()}
							</div>
						</div>

						<div className='flex items-center gap-2'>
							{renderViewSelector()}
							{renderTodayButton()}
						</div>
					</>
				)}
				{/* Around layout: nav buttons on sides, title in center */}
				{navigationLayout === 'around' && (
					<>
						{showNavigation && (
							<button onClick={() => calendar.navigate('prev')} className={prevButtonClasses} aria-label='Previous'>
								<PrevIcon className='w-4 h-4' />
							</button>
						)}

						<div className='flex flex-col items-center gap-2'>
							<div className='flex items-center gap-3'>
								{!useMonthYearSelector && <h2 className={titleClasses}>{formatTitle()}</h2>}
								{renderMonthYearSelector()}
							</div>

							<div className='flex items-center gap-2'>
								{renderViewSelector()}
								{renderTodayButton()}
							</div>
						</div>

						{showNavigation && (
							<button onClick={() => calendar.navigate('next')} className={nextButtonClasses} aria-label='Next'>
								<NextIcon className='w-4 h-4' />
							</button>
						)}
					</>
				)}
			</div>

			{/* Weekdays header for month and week views */}
			{(calendar.view === 'month' || calendar.view === 'week') && (
				<div className={weekdaysClasses}>
					{WEEKDAYS.map((day) => (
						<div key={day} className={weekdayClasses}>
							{day}
						</div>
					))}
				</div>
			)}

			{/* Calendar grid */}
			{/* Key forces React to re-render the entire grid when month/year/view changes,
					preventing flickering of previous month's dates with incorrect opacity during navigation */}
			<div
				key={`${calendar.currentDate.getFullYear()}-${calendar.currentDate.getMonth()}-${calendar.view}`}
				className={gridClasses}
			>
				{calendar.daysInView.map((date) => renderDateCell(date))}
			</div>
		</div>
	);
}
