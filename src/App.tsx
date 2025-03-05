import { Button } from './core/components/button';
import { Input } from './core/components/input';
import { Textarea } from './core/components/textarea';

function App() {
  const handleSelectOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    const section = document.getElementById(selectedValue);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className='min-h-screen w-screen pb-24 bg-slate-900'>
      <div className='text-center p-10'>
        <h1 className='text-accent-medium font-bold'>Dream UI</h1>
        <p className='text-slate-200 font-semibold'>A collection of Tailwind CSS components for React</p>
      </div>

      <div className='text-center'>
        <h2>Select Component</h2>
        <select className='block mx-auto my-2 focus:outline-none' onChange={handleSelectOnChange}>
          <option value='buttons-section'>Button</option>
          <option value='inputs-section'>Input</option>
          <option value='textarea-section'>Textarea</option>
        </select>

        <div className='mt-12 max-w-2xl mx-auto px-10 space-y-20'>
          <div id='buttons-section'>
            <h3 className='mb-2'>Buttons</h3>
            <div className='grid grid-cols-3 gap-4'>
              <Button>Click Me</Button>
              <Button variant='secondary'>Click Me</Button>
              <Button variant='tertiary'>Click Me</Button>
              <Button variant='danger'>Click Me</Button>
              <Button variant='outline'>Click Me</Button>
              <Button variant='link' size='md'>
                Click Me
              </Button>
              <Button variant='base'>Click Me</Button>
              <Button loading={true}>Click Me</Button>
              <Button variant='base' disabled={true}>
                Click Me
              </Button>
              <Button variant='base' size='fitted'>
                Click Me
              </Button>
              <Button linkTo='https://google.com'>Link to Google</Button>
              <Button linkTo='https://google.com' disabled={true}>
                Link to Google
              </Button>
            </div>
          </div>

          <div id='inputs-section'>
            <h3 className='mb-2'>Inputs</h3>
            <div className='grid grid-cols-2 gap-4'>
              <Input rounded='lg' placeholder='Enter a thing' />
              <Input variant='underline' placeholder='Enter your name' />
              <Input variant='outline' placeholder='Enter your email' />
              <Input disabled={true} placeholder='Cannot enter anything' />
              <Input variant='underline' errorMessage='There was an error' placeholder='Enter valid name' />
              <Input variant='outline' successMessage='Valid input received' placeholder='Enter valid name' />
              <Input type='password' placeholder='Enter password' />
              <Input
                rounded='lg'
                displayOnlyMode={true}
                value={'Entered value'}
                onChange={() => {}}
                className='text-2xl text-accent-medium'
              />
              <Input rounded='lg' displayOnlyMode={true} placeholder='Placeholder text' />
              <Input type='file' />
              <Input type='number' placeholder='123' width={48} />
            </div>
          </div>

          <div id='textarea-section'>
            <h3 className='mb-2'>Textarea</h3>
            <Textarea variant='base' placeholder='Enter your message' />
            <Textarea placeholder='Enter your message' />
            <Textarea placeholder='Cannot enter your message' disabled={true} />
            <Textarea variant='left-line' placeholder='Enter your message' autoExpand={true} />
            <Textarea placeholder='Enter your message' hideResizeHandle={true} />
            <Textarea placeholder='Enter your message' errorMessage='Invalid input' />
            <Textarea placeholder='Enter your message' successMessage='Looks good!' />
            <Textarea displayOnlyMode={true} placeholder='Enter your message' />
            <Textarea characterLimit={50} placeholder='Enter your message' />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
