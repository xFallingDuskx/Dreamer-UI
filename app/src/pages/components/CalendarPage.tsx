import { Calendar } from '../../../calendar';
import { ComponentPage } from '../../components/layout/ComponentPage';

const tableOfContents = [
	{ id: 'import', title: 'Import', level: 1 },
	{ id: 'examples', title: 'Examples', level: 1 },
	{ id: 'modes', title: 'Selection Modes', level: 2 },
	{ id: 'views', title: 'Calendar Views', level: 2 },
	{ id: 'navigation', title: 'Navigation Options', level: 2 },
	{ id: 'month-year-selector', title: 'Month & Year Selector', level: 2 },
	{ id: 'sizes', title: 'Sizes', level: 2 },
	{ id: 'constraints', title: 'Date Constraints', level: 2 },
	{ id: 'custom-styling', title: 'Custom Styling', level: 2 },
	{ id: 'props', title: 'Props', level: 1 },
	{ id: 'keyboard-shortcuts', title: 'Keyboard Shortcuts', level: 1 },
];

const calendarExamples = [
	{
		id: 'modes',
		title: 'Selection Modes',
		description: 'Single date selection and date range selection modes for different use cases.',
		code: `<div className='space-y-6'>
  <div>
    <h4 className='text-md font-medium mb-2'>Single Date Selection</h4>
    <Calendar 
      mode="single"
      onDateSelect={(date) => console.log('Selected:', date)}
    />
  </div>
  <div>
    <h4 className='text-md font-medium mb-2'>Date Range Selection</h4>
    <Calendar 
      mode="range"
      onRangeSelect={(range) => console.log('Range:', range)}
    />
  </div>
</div>`,
		children: (
			<div className='space-y-6'>
				<div>
					<h4 className='text-md font-medium mb-2'>Single Date Selection</h4>
					<Calendar mode='single' onDateSelect={(date) => console.log('Selected:', date)} />
				</div>
				<div>
					<h4 className='text-md font-medium mb-2'>Date Range Selection</h4>
					<Calendar mode='range' onRangeSelect={(range) => console.log('Range:', range)} />
				</div>
			</div>
		),
	},
	{
		id: 'views',
		title: 'Calendar Views',
		description: 'Different calendar views for various display requirements and navigation patterns.',
		code: `<div className='space-y-6'>
  <div>
    <h4 className='text-md font-medium mb-2'>Month View with View Selector</h4>
    <Calendar view="month" showViewSelector={true} />
  </div>
  <div>
    <h4 className='text-md font-medium mb-2'>Week View</h4>
    <Calendar view="week" />
  </div>
  <div>
    <h4 className='text-md font-medium mb-2'>Day View</h4>
    <Calendar view="day" />
  </div>
</div>`,
		children: (
			<div className='space-y-6'>
				<div>
					<h4 className='text-md font-medium mb-2'>Month View with View Selector</h4>
					<Calendar view='month' showViewSelector={true} />
				</div>
				<div>
					<h4 className='text-md font-medium mb-2'>Week View</h4>
					<Calendar view='week' />
				</div>
				<div>
					<h4 className='text-md font-medium mb-2'>Day View</h4>
					<Calendar view='day' />
				</div>
			</div>
		),
	},
	{
		id: 'navigation',
		title: 'Navigation Options',
		description: 'Different navigation layouts and options for easier date selection.',
		code: `<div className='space-y-6'>
  <div>
    <h4 className='text-md font-medium mb-2'>Around Layout (Default)</h4>
		<Calendar navigationLayout='around' />
  </div>
  <div>
    <h4 className='text-md font-medium mb-2'>Adjacent Layout</h4>
    <Calendar navigationLayout='adjacent' showViewSelector={true} />
  </div>
</div>`,
		children: (
			<div className='space-y-6'>
				<div>
					<h4 className='text-md font-medium mb-2'>Around Layout (Default)</h4>
					<Calendar navigationLayout='around' />
				</div>
				<div>
					<h4 className='text-md font-medium mb-2'>Adjacent Layout</h4>
					<Calendar navigationLayout='adjacent' showViewSelector={true} />
				</div>
			</div>
		),
	},
	{
		id: 'month-year-selector',
		title: 'Month & Year Selector',
		description: 'Enable dropdown selectors for quick navigation to specific months and years.',
		code: `<div className='space-y-6'>
  <div>
    <h4 className='text-md font-medium mb-2'>With Month & Year Selector</h4>
    <Calendar 
      useMonthYearSelector={true}
      navigationLayout="around"
    />
  </div>
  <div>
    <h4 className='text-md font-medium mb-2'>Without Month & Year Selector (Default)</h4>
    <Calendar 
      useMonthYearSelector={false}
      navigationLayout="around"
    />
  </div>
  <div>
    <h4 className='text-md font-medium mb-2'>Adjacent Layout with Selectors</h4>
    <Calendar 
      useMonthYearSelector={true}
      navigationLayout="adjacent"
    />
  </div>
</div>`,
		children: (
			<div className='space-y-6'>
				<div>
					<h4 className='text-md font-medium mb-2'>With Month & Year Selector</h4>
					<Calendar useMonthYearSelector={true} navigationLayout='around' />
				</div>
				<div>
					<h4 className='text-md font-medium mb-2'>Without Month & Year Selector (Default)</h4>
					<Calendar useMonthYearSelector={false} navigationLayout='around' />
				</div>
				<div>
					<h4 className='text-md font-medium mb-2'>Adjacent Layout with Selectors</h4>
					<Calendar useMonthYearSelector={true} navigationLayout='adjacent' />
				</div>
			</div>
		),
	},
	{
		id: 'sizes',
		title: 'Sizes',
		description: 'Calendar components can be sized to fit different layout requirements.',
		code: `<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
  <div>
    <h4 className='text-sm font-medium mb-2 text-gray-400'>Small</h4>
    <Calendar size="small" />
  </div>
  <div>
    <h4 className='text-sm font-medium mb-2 text-gray-400'>Medium</h4>
    <Calendar size="medium" />
  </div>
  <div>
    <h4 className='text-sm font-medium mb-2 text-gray-400'>Large</h4>
    <Calendar size="large" />
  </div>
</div>`,
		children: (
			<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
				<div>
					<h4 className='text-sm font-medium mb-2 text-gray-400'>Small</h4>
					<Calendar size='small' />
				</div>
				<div>
					<h4 className='text-sm font-medium mb-2 text-gray-400'>Medium</h4>
					<Calendar size='medium' />
				</div>
				<div>
					<h4 className='text-sm font-medium mb-2 text-gray-400'>Large</h4>
					<Calendar size='large' />
				</div>
			</div>
		),
	},
	{
		id: 'constraints',
		title: 'Date Constraints',
		description: 'Restrict date selection with minimum and maximum date boundaries.',
		code: `<div className='space-y-6'>
  <div>
    <h4 className='text-md font-medium mb-2'>Future dates only (from today)</h4>
    <Calendar 
      minDate={new Date()}
      maxDate={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}
    />
  </div>
</div>`,
		children: (
			<div className='space-y-6'>
				<div>
					<h4 className='text-md font-medium mb-2'>Future dates only (from today)</h4>
					<Calendar minDate={new Date()} maxDate={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)} />
				</div>
			</div>
		),
	},
	{
		id: 'custom-styling',
		title: 'Custom Styling',
		description: 'Customize the calendar appearance with custom CSS classes for different elements.',
		code: `<Calendar 
  size="medium"
  customStyles={{
    containerClassName: 'border-purple-500/50',
    headerClassName: 'bg-purple-900/20 border-purple-500/50',
    selectedCellClassName: 'bg-purple-500 text-white hover:bg-purple-600',
    todayCellClassName: 'border-purple-400 text-purple-300',
    prevButtonClassName: 'text-purple-400 hover:bg-purple-500/20',
    nextButtonClassName: 'text-purple-400 hover:bg-purple-500/20',
    cellClassName: 'hover:bg-purple-500/30!',
    weekdaysClassName: 'border-purple-500/80',
  }}
/>`,
		children: (
			<Calendar
				size='medium'
				customStyles={{
					containerClassName: 'border-purple-500/50',
					headerClassName: 'bg-purple-900/20 border-purple-500/50',
					selectedCellClassName: 'bg-purple-500 text-white hover:bg-purple-600',
					todayCellClassName: 'border-purple-400 text-purple-300',
					prevButtonClassName: 'text-purple-400 hover:bg-purple-500/20',
					nextButtonClassName: 'text-purple-400 hover:bg-purple-500/20',
					cellClassName: 'hover:bg-purple-500/30!',
					weekdaysClassName: 'border-purple-500/80',
				}}
			/>
		),
	},
];

const calendarProps = [
	{
		name: 'mode',
		type: "'single' | 'range'",
		default: "'single'",
		required: false,
		description: 'The selection mode - single date or date range selection',
	},
	{
		name: 'view',
		type: "'month' | 'week' | 'day'",
		default: "'month'",
		required: false,
		description: 'The calendar view to display',
	},
	{
		name: 'size',
		type: "'small' | 'medium' | 'large' | 'auto'",
		default: "'medium'",
		required: false,
		description: 'The size of the calendar component',
	},
	{
		name: 'initialDate',
		type: 'Date',
		required: false,
		description: 'The initial date to display and optionally select',
	},
	{
		name: 'minDate',
		type: 'Date',
		required: false,
		description: 'The minimum selectable date (dates before this will be disabled)',
	},
	{
		name: 'maxDate',
		type: 'Date',
		required: false,
		description: 'The maximum selectable date (dates after this will be disabled)',
	},
	{
		name: 'onDateSelect',
		type: '(date: Date) => void',
		required: false,
		description: 'Callback fired when a date is selected in single mode',
	},
	{
		name: 'onRangeSelect',
		type: '(range: CalendarDateRange) => void',
		required: false,
		description: 'Callback fired when a date range is selected in range mode',
	},
	{
		name: 'renderCell',
		type: '(date: Date, isSelected: boolean, isDisabled: boolean, isToday: boolean) => ReactNode',
		required: false,
		description: 'Custom render function for date cells',
	},
	{
		name: 'showViewSelector',
		type: 'boolean',
		default: 'false',
		required: false,
		description: 'Whether to show the view selector buttons',
	},
	{
		name: 'showNavigation',
		type: 'boolean',
		default: 'true',
		required: false,
		description: 'Whether to show the navigation buttons',
	},
	{
		name: 'navigationLayout',
		type: "'adjacent' | 'around'",
		default: "'around'",
		required: false,
		description: 'Layout of navigation buttons - adjacent (both on left) or around (on sides of title)',
	},
	{
		name: 'useMonthYearSelector',
		type: 'boolean',
		default: 'false',
		required: false,
		description: 'Whether to show month and year dropdown selectors for easier navigation',
	},
	{
		name: 'customStyles',
		type: 'CalendarCustomStyles',
		required: false,
		description: 'Object containing custom CSS classes for different calendar elements',
	},
	{
		name: 'className',
		type: 'string',
		required: false,
		description: 'Additional CSS classes to apply to the calendar container',
	},
	{
		name: 'id',
		type: 'string',
		required: false,
		description: 'The HTML id attribute for the calendar',
	},
	{
		name: 'ref',
		type: 'React.Ref<HTMLDivElement>',
		required: false,
		description: 'Reference to the calendar container element',
	},
];

const keyboardShortcuts = [
	{
		keys: 'Arrow Keys',
		description: 'Navigate between dates',
	},
	{
		keys: 'Space / Enter',
		description: 'Select the focused date',
	},
	{
		keys: 'Home',
		description: 'Go to the first day of the week/month',
	},
	{
		keys: 'End',
		description: 'Go to the last day of the week/month',
	},
	{
		keys: 'Page Up',
		description: 'Go to the previous month',
	},
	{
		keys: 'Page Down',
		description: 'Go to the next month',
	},
	{
		keys: 'Tab',
		description: 'Move focus to the next focusable element',
	},
	{
		keys: 'Shift + Tab',
		description: 'Move focus to the previous focusable element',
	},
];

export function CalendarPage() {
	return (
		<ComponentPage
			title='Calendar'
			description='A comprehensive calendar component supporting single date and range selection with multiple views, size options, and extensive customization capabilities.'
			tableOfContents={tableOfContents}
			usageInstructions='The Calendar component provides an intuitive interface for date selection with support for both single dates and date ranges. It includes multiple view modes (month, week, day), customizable styling, date constraints, and full accessibility support for keyboard navigation.'
			importStatement="import { Calendar } from '@moondreamsdev/dreamer-ui/components';"
			componentProps={calendarProps}
			keyboardShortcuts={keyboardShortcuts}
			examples={calendarExamples}
		/>
	);
}
