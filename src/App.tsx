import { ReactElement, useState } from 'react';
import Button from './core/components/buttons/Button';

const Components: Record<string, ReactElement> = {
  button: <Button>Click Me</Button>,
};

type ComponentOption = keyof typeof Components;

function App() {
  const [component, setComponent] = useState<ComponentOption>('button');

  const selectComponent = (comp: ComponentOption) => {
    setComponent(comp);
  };

  return (
    <div className='min-h-screen w-screen bg-slate-900'>
      <div className='text-center p-10'>
        <h1 className='text-accent-medium font-bold'>Dream UI</h1>
        <p className='text-slate-200 font-semibold'>A collection of Tailwind CSS components for React</p>
      </div>

      <div className='text-center'>
        <h2>Select Component</h2>
        <select className='block mx-auto my-2 focus:outline-none' onChange={(e) => selectComponent(e.target.value as ComponentOption)}>
          <option value='button'>Button</option>
        </select>

        {component && Components[component]}
      </div>
    </div>
  );
}

export default App;
