import { useState } from 'react';
import { Calendar } from '../../../calendar';
import { ComponentPage } from '../../components/layout/ComponentPage';
import { ExampleSection } from '../../components/ui/ExampleSection';

const tableOfContents = [
  { id: 'variants', title: 'Variants', level: 1 },
  { id: 'sizes', title: 'Sizes', level: 1 },
  { id: 'features', title: 'Features', level: 1 },
  { id: 'date-restrictions', title: 'Date Restrictions', level: 1 },
  { id: 'controlled-usage', title: 'Controlled Usage', level: 1 },
];

export function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [multiSelectDates, setMultiSelectDates] = useState<Date[]>([]);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    console.log('Selected date:', date);
  };

  const handleMultiSelect = (date: Date) => {
    setMultiSelectDates(prev => {
      const dateExists = prev.some(d => d.toDateString() === date.toDateString());
      if (dateExists) {
        return prev.filter(d => d.toDateString() !== date.toDateString());
      } else {
        return [...prev, date];
      }
    });
  };

  return (
    <ComponentPage
      title='Calendar'
      description='A flexible calendar component for date selection with support for various sizes, variants, and date restrictions. Perfect for date pickers, scheduling interfaces, and date-based navigation.'
      tableOfContents={tableOfContents}
    >
      <ExampleSection 
        title='Variants'
        description='Visual variants adjust the spacing and layout density of the calendar.'
        id='variants'
      >
        <div className='space-y-6'>
          <div>
            <h4 className='text-sm font-medium mb-3'>Default</h4>
            <Calendar />
          </div>
          <div>
            <h4 className='text-sm font-medium mb-3'>Compact</h4>
            <Calendar variant='compact' />
          </div>
        </div>
      </ExampleSection>

      <ExampleSection 
        title='Sizes'
        description='Different size options to fit your interface needs.'
        id='sizes'
      >
        <div className='space-y-6'>
          <div>
            <h4 className='text-sm font-medium mb-3'>Small</h4>
            <Calendar size='sm' />
          </div>
          <div>
            <h4 className='text-sm font-medium mb-3'>Medium (Default)</h4>
            <Calendar size='md' />
          </div>
          <div>
            <h4 className='text-sm font-medium mb-3'>Large</h4>
            <Calendar size='lg' />
          </div>
        </div>
      </ExampleSection>

      <ExampleSection 
        title='Features'
        description='Additional features enhance the calendar functionality and user experience.'
        id='features'
      >
        <div className='space-y-6'>
          <div>
            <h4 className='text-sm font-medium mb-3'>With Week Numbers</h4>
            <Calendar showWeekNumbers />
          </div>
          <div>
            <h4 className='text-sm font-medium mb-3'>Pre-selected Date</h4>
            <Calendar defaultDate={new Date()} />
          </div>
          <div>
            <h4 className='text-sm font-medium mb-3'>Large with Week Numbers</h4>
            <Calendar size='lg' showWeekNumbers variant='compact' />
          </div>
        </div>
      </ExampleSection>

      <ExampleSection 
        title='Date Restrictions'
        description='Control which dates can be selected by users with minimum, maximum, and disabled date options.'
        id='date-restrictions'
      >
        <div className='space-y-6'>
          <div>
            <h4 className='text-sm font-medium mb-3'>Future Dates Only</h4>
            <p className='text-sm text-muted-foreground mb-3'>Past dates are disabled.</p>
            <Calendar minDate={new Date()} />
          </div>
          <div>
            <h4 className='text-sm font-medium mb-3'>Date Range</h4>
            <p className='text-sm text-muted-foreground mb-3'>Only next 30 days are selectable.</p>
            <Calendar 
              minDate={new Date()} 
              maxDate={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}
            />
          </div>
          <div>
            <h4 className='text-sm font-medium mb-3'>Disabled Specific Dates</h4>
            <p className='text-sm text-muted-foreground mb-3'>Weekends are disabled.</p>
            <Calendar 
              disabledDates={getWeekends()}
            />
          </div>
        </div>
      </ExampleSection>

      <ExampleSection 
        title='Controlled Usage'
        description='Use the calendar in controlled mode for integration with forms and state management.'
        id='controlled-usage'
      >
        <div className='space-y-6'>
          <div>
            <h4 className='text-sm font-medium mb-3'>Single Date Selection</h4>
            <div className='space-y-3'>
              <Calendar 
                selectedDate={selectedDate}
                onDateSelect={handleDateSelect}
              />
              <div className='text-sm'>
                <strong>Selected:</strong> {selectedDate ? selectedDate.toLocaleDateString() : 'None'}
              </div>
            </div>
          </div>
          <div>
            <h4 className='text-sm font-medium mb-3'>With Custom Styling</h4>
            <Calendar 
              size='sm'
              variant='compact'
              className='border-2 border-accent'
              headerClassName='bg-accent/10'
              navigationClassName='text-accent hover:bg-accent hover:text-accent-foreground'
            />
          </div>
        </div>
      </ExampleSection>
    </ComponentPage>
  );
}

// Helper function to generate weekend dates for the next 2 months
function getWeekends(): Date[] {
  const weekends: Date[] = [];
  const today = new Date();
  const twoMonthsFromNow = new Date();
  twoMonthsFromNow.setMonth(today.getMonth() + 2);
  
  const currentDate = new Date(today);
  while (currentDate <= twoMonthsFromNow) {
    const dayOfWeek = currentDate.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) { // Sunday or Saturday
      weekends.push(new Date(currentDate));
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return weekends;
}