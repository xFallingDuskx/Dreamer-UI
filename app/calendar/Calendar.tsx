import React from 'react';
import { join } from '@moondreamsdev/dreamer-ui/utils';
import { ChevronLeft, ChevronRight } from '@moondreamsdev/dreamer-ui/symbols';
import { useCalendar, UseCalendarProps } from './hooks';
import { CalendarSize, CalendarSizes, CalendarVariant, CalendarVariants } from './variants';

export interface CalendarProps extends UseCalendarProps, React.HTMLAttributes<HTMLDivElement> {
  id?: string;
  ref?: React.Ref<HTMLDivElement>;
  /** Size variant of the calendar */
  size?: CalendarSize;
  /** Visual variant of the calendar */
  variant?: CalendarVariant;
  /** Show week numbers */
  showWeekNumbers?: boolean;
  /** Custom class for the header */
  headerClassName?: string;
  /** Custom class for navigation buttons */
  navigationClassName?: string;
  /** Custom class for day cells */
  dayClassName?: string;
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function Calendar({
  id,
  ref,
  size = 'md',
  variant = 'default',
  showWeekNumbers = false,
  className,
  headerClassName,
  navigationClassName,
  dayClassName,
  // Separate calendar-specific props from HTML props
  defaultDate,
  selectedDate,
  onDateSelect,
  minDate,
  maxDate,
  disabledDates,
  ...htmlProps
}: CalendarProps) {
  const {
    currentMonth,
    selectedDate: currentSelectedDate,
    calendarData,
    selectDate,
    navigateMonth,
  } = useCalendar({
    defaultDate,
    selectedDate,
    onDateSelect,
    minDate,
    maxDate,
    disabledDates,
  });

  const monthName = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  // Group days into weeks
  const weeks = [];
  for (let i = 0; i < calendarData.length; i += 7) {
    weeks.push(calendarData.slice(i, i + 7));
  }

  return (
    <div
      id={id}
      ref={ref}
      className={join(
        'bg-card text-card-foreground p-4 rounded-lg border border-border w-fit',
        CalendarSizes[size],
        CalendarVariants[variant],
        className
      )}
      data-size={size}
      data-variant={variant}
      role="grid"
      aria-label="Calendar"
      {...htmlProps}
    >
      {/* Header with month/year and navigation */}
      <div className={join(
        'flex items-center justify-between mb-4',
        headerClassName
      )}>
        <button
          type="button"
          onClick={() => navigateMonth('prev')}
          className={join(
            'p-1 rounded hover:bg-muted focus:outline-none focus:ring-2 focus:ring-accent',
            navigationClassName
          )}
          aria-label="Previous month"
        >
          <ChevronLeft size={20} />
        </button>
        
        <h2 className="font-semibold text-lg select-none">
          {monthName}
        </h2>
        
        <button
          type="button"
          onClick={() => navigateMonth('next')}
          className={join(
            'p-1 rounded hover:bg-muted focus:outline-none focus:ring-2 focus:ring-accent',
            navigationClassName
          )}
          aria-label="Next month"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Days of week header */}
      <div className={join(
        'grid mb-2',
        showWeekNumbers ? 'grid-cols-8' : 'grid-cols-7',
        CalendarVariants[variant]
      )}>
        {showWeekNumbers && (
          <div className="text-center text-muted-foreground font-medium text-xs p-2">
            Wk
          </div>
        )}
        {WEEKDAYS.map((day) => (
          <div
            key={day}
            className="text-center text-muted-foreground font-medium text-xs p-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="space-y-1">
        {weeks.map((week, weekIndex) => {
          // Calculate week number if needed
          const weekNumber = showWeekNumbers ? getWeekNumber(week[0].date) : undefined;
          
          return (
            <div
              key={weekIndex}
              className={join(
                'grid',
                showWeekNumbers ? 'grid-cols-8' : 'grid-cols-7',
                CalendarVariants[variant]
              )}
            >
              {showWeekNumbers && (
                <div className="text-center text-muted-foreground text-xs p-2 flex items-center justify-center">
                  {weekNumber}
                </div>
              )}
              {week.map((dayData, dayIndex) => {
            const { date, isCurrentMonth, isSelected, isToday, isDisabled } = dayData;
            
            return (
              <button
                key={dayIndex}
                type="button"
                onClick={() => !isDisabled && selectDate(date)}
                disabled={isDisabled}
                className={join(
                  'p-2 text-center relative rounded text-sm font-normal transition-colors',
                  'hover:bg-muted focus:outline-none focus:ring-2 focus:ring-accent focus:z-10',
                  'disabled:text-muted-foreground disabled:cursor-not-allowed disabled:hover:bg-transparent',
                  !isCurrentMonth && 'text-muted-foreground/50',
                  isSelected && 'bg-primary text-primary-foreground hover:bg-primary/90',
                  isToday && !isSelected && 'bg-accent text-accent-foreground',
                  dayClassName
                )}
                aria-label={date.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
                aria-selected={isSelected}
                aria-disabled={isDisabled}
                data-date={date.toISOString()}
                data-current-month={isCurrentMonth}
                data-selected={isSelected}
                data-today={isToday}
                data-disabled={isDisabled}
              >
                {date.getDate()}
              </button>
            );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Helper function to get ISO week number
function getWeekNumber(date: Date): number {
  const target = new Date(date);
  const dayNr = (date.getDay() + 6) % 7;
  target.setDate(target.getDate() - dayNr + 3);
  const firstThursday = target.valueOf();
  target.setMonth(0, 1);
  if (target.getDay() !== 4) {
    target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
  }
  return 1 + Math.ceil((firstThursday - target.valueOf()) / 604800000);
}