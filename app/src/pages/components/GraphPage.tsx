import { Graph } from '../../../graph';
import { ComponentPage } from '../../components/layout/ComponentPage';
import { ExampleSection } from '../../components/ui/ExampleSection';
import { useMemo } from 'react';
import type { DataPoint, TimeWindow } from '../../../graph';

const tableOfContents = [
  { id: 'basic-usage', title: 'Basic Usage', level: 1 },
  { id: 'sizes', title: 'Sizes', level: 1 },
  { id: 'themes', title: 'Themes', level: 1 },
  { id: 'time-filtering', title: 'Time Filtering', level: 1 },
  { id: 'custom-dimensions', title: 'Custom Dimensions', level: 1 },
  { id: 'interactive-features', title: 'Interactive Features', level: 1 },
  { id: 'empty-states', title: 'Empty States', level: 1 },
];

export function GraphPage() {
  // Generate sample data for examples
  const generateSampleData = (count: number, label: string, variance = 50): DataPoint[] => {
    const now = Date.now();
    const dayInMs = 24 * 60 * 60 * 1000;
    
    return Array.from({ length: count }, (_, i) => ({
      timestamp: now - (count - 1 - i) * dayInMs,
      value: Math.floor(Math.random() * variance) + 50 + Math.sin(i * 0.3) * 30,
      label: `${label} - Day ${i + 1}`,
      additionalContent: (
        <div className='text-xs space-y-1'>
          <div className='font-medium'>Day {i + 1} Details</div>
          <div>Change: {Math.random() > 0.5 ? '+' : '-'}{Math.floor(Math.random() * 10)}%</div>
          <div>Category: {['Revenue', 'Users', 'Sessions', 'Sales'][Math.floor(Math.random() * 4)]}</div>
        </div>
      ),
    }));
  };

  const basicData = useMemo(() => generateSampleData(20, 'Revenue'), []);
  const performanceData = useMemo(() => generateSampleData(30, 'Performance', 80), []);
  const userGrowthData = useMemo(() => generateSampleData(15, 'Users', 40), []);
  
  // Time windows for filtering examples
  const lastWeek = useMemo(() => {
    const weekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
    return { start: weekAgo, end: Date.now() };
  }, []);
  
  const lastTwoWeeks = useMemo(() => {
    const twoWeeksAgo = Date.now() - (14 * 24 * 60 * 60 * 1000);
    return { start: twoWeeksAgo, end: Date.now() };
  }, []);

  return (
    <ComponentPage
      title='Graph'
      description='A flexible line graph component for visualizing data changes over time. Features interactive hover tooltips, time window filtering, and multiple styling options.'
      tableOfContents={tableOfContents}
    >
      <ExampleSection 
        title='Basic Usage'
        description='Simple line graphs displaying time-series data with automatically scaled axes.'
        id='basic-usage'
      >
        <div className='space-y-6'>
          <Graph
            data={basicData}
            title='Daily Revenue'
          />
        </div>
      </ExampleSection>

      <ExampleSection 
        title='Sizes'
        description='Different size variants to fit various layouts and use cases.'
        id='sizes'
      >
        <div className='space-y-6'>
          <div>
            <h4 className='text-sm font-medium text-gray-600 mb-2'>Small</h4>
            <Graph
              data={userGrowthData}
              title='User Growth (Small)'
              size='sm'
            />
          </div>
          
          <div>
            <h4 className='text-sm font-medium text-gray-600 mb-2'>Medium (Default)</h4>
            <Graph
              data={basicData}
              title='Revenue Trends (Medium)'
              size='md'
            />
          </div>
          
          <div>
            <h4 className='text-sm font-medium text-gray-600 mb-2'>Large</h4>
            <Graph
              data={performanceData}
              title='Performance Metrics (Large)'
              size='lg'
            />
          </div>
        </div>
      </ExampleSection>

      <ExampleSection 
        title='Themes'
        description='Color themes that integrate with your design system.'
        id='themes'
      >
        <div className='grid gap-6'>
          <div>
            <h4 className='text-sm font-medium text-gray-600 mb-2'>Primary (Default)</h4>
            <Graph
              data={basicData.slice(0, 15)}
              title='Primary Theme'
              theme='primary'
              size='sm'
            />
          </div>
          
          <div>
            <h4 className='text-sm font-medium text-gray-600 mb-2'>Secondary</h4>
            <Graph
              data={basicData.slice(0, 15)}
              title='Secondary Theme'
              theme='secondary'
              size='sm'
            />
          </div>
          
          <div>
            <h4 className='text-sm font-medium text-gray-600 mb-2'>Accent</h4>
            <Graph
              data={basicData.slice(0, 15)}
              title='Accent Theme'
              theme='accent'
              size='sm'
            />
          </div>
        </div>
      </ExampleSection>

      <ExampleSection 
        title='Time Filtering'
        description='Filter data points within specific time windows to focus on relevant periods.'
        id='time-filtering'
      >
        <div className='space-y-6'>
          <div>
            <h4 className='text-sm font-medium text-gray-600 mb-2'>Full Dataset (30 days)</h4>
            <Graph
              data={performanceData}
              title='All Performance Data'
              size='md'
            />
          </div>
          
          <div>
            <h4 className='text-sm font-medium text-gray-600 mb-2'>Last Two Weeks</h4>
            <Graph
              data={performanceData}
              timeWindow={lastTwoWeeks}
              title='Performance - Last 2 Weeks'
              theme='accent'
              size='md'
            />
          </div>
          
          <div>
            <h4 className='text-sm font-medium text-gray-600 mb-2'>Last Week</h4>
            <Graph
              data={performanceData}
              timeWindow={lastWeek}
              title='Performance - Last Week'
              theme='secondary'
              size='md'
            />
          </div>
        </div>
      </ExampleSection>

      <ExampleSection 
        title='Custom Dimensions'
        description='Override the default dimensions for specific layout requirements.'
        id='custom-dimensions'
      >
        <div className='space-y-6'>
          <div>
            <h4 className='text-sm font-medium text-gray-600 mb-2'>Wide Layout (800×250)</h4>
            <Graph
              data={basicData}
              title='Wide Format Chart'
              width={800}
              height={250}
            />
          </div>
          
          <div>
            <h4 className='text-sm font-medium text-gray-600 mb-2'>Square Layout (400×400)</h4>
            <Graph
              data={userGrowthData}
              title='Square Format Chart'
              width={400}
              height={400}
              theme='accent'
            />
          </div>
        </div>
      </ExampleSection>

      <ExampleSection 
        title='Interactive Features'
        description='Hover over data points to see detailed information and additional context.'
        id='interactive-features'
      >
        <div className='space-y-4'>
          <div className='bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg'>
            <h4 className='text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2'>
              💡 Interactive Tooltip
            </h4>
            <p className='text-sm text-blue-800 dark:text-blue-200'>
              Hover over any data point to see detailed information including custom content, timestamps, and values.
            </p>
          </div>
          
          <Graph
            data={performanceData.slice(0, 20)}
            title='Hover for Details'
            size='md'
            theme='primary'
          />
          
          <div className='bg-gray-50 dark:bg-gray-900 p-4 rounded-lg'>
            <h4 className='text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2'>
              ⌨️ Keyboard Navigation
            </h4>
            <p className='text-sm text-gray-700 dark:text-gray-300'>
              Press <kbd className='px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs'>Tab</kbd> to focus the graph, 
              then use <kbd className='px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs'>Escape</kbd> to hide tooltips.
            </p>
          </div>
        </div>
      </ExampleSection>

      <ExampleSection 
        title='Empty States'
        description='Graceful handling when no data is available to display.'
        id='empty-states'
      >
        <div className='space-y-6'>
          <div>
            <h4 className='text-sm font-medium text-gray-600 mb-2'>No Data Available</h4>
            <Graph
              data={[]}
              title='Empty Dataset'
              size='md'
            />
          </div>
          
          <div>
            <h4 className='text-sm font-medium text-gray-600 mb-2'>Filtered Out All Data</h4>
            <Graph
              data={basicData}
              timeWindow={{ start: Date.now() + 86400000, end: Date.now() + 172800000 }}
              title='Future Time Window (No Matching Data)'
              size='md'
              theme='secondary'
            />
          </div>
        </div>
      </ExampleSection>
    </ComponentPage>
  );
}