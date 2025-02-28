import { useState } from 'react';

function App() {
  const [component, setComponent] = useState('');

  return (
    <div className='min-h-screen w-screen bg-slate-900'>
      <div className='text-center p-10'>
        <h1 className='text-accent-medium font-bold'>Dream UI</h1>
        <p className='text-slate-200 font-semibold'>A collection of Tailwind CSS components for React</p>
      </div>

      <div className='text-center'>
        <h2 className=''>Selected Component</h2>
        <p>{component ? component : 'No component selected'}</p>
      </div>
    </div>
  );
}

export default App;
