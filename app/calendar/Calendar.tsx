import { Ref, ReactNode } from 'react';
import { join } from '@moondreamsdev/dreamer-ui/utils';
import { useCalendar, DateRange, UseCalendarOptions } from './hooks';
import { calendarSizeVariants, calendarViewVariants, calendarDefaults, CalendarSize } from './variants';
import { PrevIcon, NextIcon } from './icons';

export interface CustomStyles {
  containerClassName?: string;
  headerClassName?: string;
  navigationClassName?: string;
  prevButtonClassName?: string;
  nextButtonClassName?: string;
  titleClassName?: string;
  viewSelectorClassName?: string;
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
  customStyles?: CustomStyles;
  renderCell?: (date: Date, isSelected: boolean, isDisabled: boolean, isToday: boolean) => ReactNode;
  showViewSelector?: boolean;
  showNavigation?: boolean;
  onDateSelect?: (date: Date) => void;
  onRangeSelect?: (range: DateRange) => void;
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

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
    return date.getMonth() === calendar.currentDate.getMonth() && 
           date.getFullYear() === calendar.currentDate.getFullYear();
  };

  const formatTitle = () => {
    const { currentDate, view } = calendar;
    const month = MONTHS[currentDate.getMonth()];
    const year = currentDate.getFullYear();
    
    if (view === 'month') {
      return `${month} ${year}`;
    } else if (view === 'week') {
      const startOfWeek = new Date(currentDate);
      startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(endOfWeek.getDate() + 6);
      
      if (startOfWeek.getMonth() === endOfWeek.getMonth()) {
        return `${month} ${startOfWeek.getDate()}-${endOfWeek.getDate()}, ${year}`;
      } else {
        return `${MONTHS[startOfWeek.getMonth()]} ${startOfWeek.getDate()} - ${MONTHS[endOfWeek.getMonth()]} ${endOfWeek.getDate()}, ${year}`;
      }
    } else {
      return `${month} ${currentDate.getDate()}, ${year}`;
    }
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
      'flex items-center justify-center rounded-md transition-colors cursor-pointer',
      'hover:bg-accent/20 focus:bg-accent/20 focus:outline-none',
      sizeStyles.cell
    );

    const cellClasses = join(
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
      calendar.view === 'month' && !isCurrentMonthDate && 'text-muted-foreground/50',
    );

    const cellContent = renderCell ? 
      renderCell(date, !!isSelected, isDisabled, isTodayDate) : 
      date.getDate();

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
    'flex items-center justify-between border-b px-4 py-2',
    sizeStyles.header,
    customStyles.headerClassName
  );

  const navigationClasses = join(
    'flex items-center gap-1',
    customStyles.navigationClassName
  );

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

  const titleClasses = join(
    'font-semibold text-foreground',
    customStyles.titleClassName
  );

  const viewSelectorClasses = join(
    'flex gap-1 text-xs',
    customStyles.viewSelectorClassName
  );

  const weekdaysClasses = join(
    'grid grid-cols-7 border-b text-muted-foreground font-medium',
    sizeStyles.weekdays,
    customStyles.weekdaysClassName
  );

  const weekdayClasses = join(
    'text-center',
    customStyles.weekdayClassName
  );

  const gridClasses = join(
    'grid gap-1 p-2',
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
      role="application"
      aria-label="Calendar"
      {...rest}
    >
      {/* Header */}
      <div className={headerClasses}>
        <div className="flex items-center gap-4">
          {showNavigation && (
            <div className={navigationClasses}>
              <button
                onClick={() => calendar.navigate('prev')}
                className={prevButtonClasses}
                aria-label="Previous"
              >
                <PrevIcon className="w-4 h-4" />
              </button>
              <button
                onClick={() => calendar.navigate('next')}
                className={nextButtonClasses}
                aria-label="Next"
              >
                <NextIcon className="w-4 h-4" />
              </button>
            </div>
          )}
          <h2 className={titleClasses}>
            {formatTitle()}
          </h2>
        </div>
        
        {showViewSelector && (
          <div className={viewSelectorClasses}>
            {(['month', 'week', 'day'] as const).map((viewOption) => (
              <button
                key={viewOption}
                onClick={() => calendar.changeView(viewOption)}
                className={join(
                  'px-2 py-1 rounded capitalize transition-colors',
                  calendar.view === viewOption 
                    ? 'bg-accent text-accent-foreground' 
                    : 'hover:bg-accent/20'
                )}
              >
                {viewOption}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Weekdays header for month and week views */}
      {(calendar.view === 'month' || calendar.view === 'week') && (
        <div className={weekdaysClasses}>
          {WEEKDAYS.map(day => (
            <div key={day} className={weekdayClasses}>
              {day}
            </div>
          ))}
        </div>
      )}

      {/* Calendar grid */}
      <div className={gridClasses}>
        {calendar.daysInView.map(date => renderDateCell(date))}
      </div>
    </div>
  );
}