import {
  Button,
  Checkbox,
  Input,
  Label,
  RadioGroup,
  RadioGroupItem,
  Textarea,
  Accordion,
  AccordionItem,
} from '@moondreamsdev/dreamer-ui/components';
import { useState } from 'react';

const TestComponent = ({ index }: { index: number }) => {
  return (
    <div className='bg-slate-700 rounded-md p-2 h-full'>
      <h4>Some text for option {index}</h4>
      <p>Some description for option {index}</p>
    </div>
  );
};

function App() {
  const [radioGroupSelections, setRadioGroupSelections] = useState<Record<number, string>>({});

  const handleRadioGroupChange = (value: string, index: number) => {
    const newSelections = { ...radioGroupSelections };
    newSelections[index] = value;
    setRadioGroupSelections(newSelections);
  };

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
          <option value='radiogroup-section'>Radio Group</option>
          <option value='checkbox-section'>Checkbox</option>
          <option value='labels-section'>Label</option>
          <option value='accordion-section'>Accordion</option>
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

          <div id='radiogroup-section'>
            <h3 className='mb-2'>Radio Group</h3>
            <div className='grid grid-cols-2 gap-4'>
              <RadioGroup
                options={['Option 1', 'Option 2', 'Option 3']}
                value={radioGroupSelections[0]}
                onChange={(value) => handleRadioGroupChange(value, 0)}
                name='simple-example'
              />
              <RadioGroup
                options={[
                  { value: 'i1', label: 'Item 1' },
                  { value: 'i2', label: 'Item 2', disabled: true },
                  { value: 'i3', label: 'Item 3', description: 'Description for Item 3' },
                ]}
                value={radioGroupSelections[1]}
                onChange={(value) => handleRadioGroupChange(value, 1)}
                name='simple-example-2'
              />
              <RadioGroup value={radioGroupSelections[2]} onChange={(value) => handleRadioGroupChange(value, 2)}>
                <RadioGroupItem value='e1'>Entity 1</RadioGroupItem>
                <RadioGroupItem value='e2'>Entity 2</RadioGroupItem>
                <RadioGroupItem value='e3'>Entity 3</RadioGroupItem>
              </RadioGroup>

              <RadioGroup
                value={radioGroupSelections[3]}
                onChange={(value) => handleRadioGroupChange(value, 3)}
                className='space-y-2'
              >
                <RadioGroupItem value='t1'>
                  <TestComponent index={1} />
                </RadioGroupItem>
                <RadioGroupItem value='t2' disabled={true}>
                  <TestComponent index={2} />
                </RadioGroupItem>
                <RadioGroupItem value='t3'>
                  <TestComponent index={3} />
                </RadioGroupItem>
              </RadioGroup>

              <RadioGroup
                value={radioGroupSelections[4]}
                onChange={(value) => handleRadioGroupChange(value, 4)}
                className='col-span-2 grid grid-cols-2 gap-2'
                childrenClassName='rounded-md'
                hideInputs={true}
              >
                <RadioGroupItem value='t4'>
                  <TestComponent index={4} />
                </RadioGroupItem>
                <RadioGroupItem value='t5' disabled={true} description='Disabled option'>
                  <TestComponent index={5} />
                </RadioGroupItem>
                <RadioGroupItem value='t6'>
                  <TestComponent index={6} />
                </RadioGroupItem>
                <RadioGroupItem value='t7'>
                  <TestComponent index={7} />
                </RadioGroupItem>
              </RadioGroup>
            </div>
          </div>

          <div id='checkbox-section'>
            <h3 className='mb-2'>Checkbox</h3>
            <div className='grid grid-cols-4 justify-items-center items-center gap-4'>
              <Checkbox rounded={false} />
              <Checkbox checked={true} />
              <Checkbox checked={true} className='text-accent-medium' filled={true} />
              <Checkbox filled={true} color='red' />
              <Checkbox disabled={true} />
              <Checkbox checked={true} disabled={true} />
              <Checkbox size={30} />
              <Checkbox color='red' />
            </div>
          </div>

          <div id='label-section'>
            <h3 className='mb-2'>Label</h3>
            <div className='grid grid-cols-2 gap-4'>
              <Label htmlFor='input-1'>First Label</Label>
              <Label display='block'>Second Label</Label>
              <Label required={true}>Third Label</Label>
              <Label helpMessage='This is a help message for the label'>Label w/ Help</Label>
            </div>
          </div>

          <div id='accordion-section'>
            <h3 className='mb-2'>Accordion</h3>
            <p className='mb-2'>Passing in items w/ default and allow multiple</p>
            <Accordion
              items={[
                {
                  id: 'item-1',
                  title: 'A super long title that should wrap to the next line if it is too long. It still should be readable. This is a test of the accordion component.',
                  content:
                    'Lorem ipsum dolor sit amet. Sed laborum quis 33 quia libero id corporis labore sed dolores eveniet et impedit dolores eum consequatur eius. Est assumenda exercitationem qui pariatur odit et obcaecati sequi.\nVel sunt laborum et quia assumenda hic dicta vero ab facere repellat sed odio placeat aut quia nobis. Eum illo omnis ut galisum excepturi et voluptatibus amet eos nemo obcaecati. 33 praesentium voluptatem non sequi culpa in esse animi est velit voluptas.\n\nLorem ipsum dolor sit amet. Sed laborum quis 33 quia libero id corporis labore sed dolores eveniet et impedit dolores eum consequatur eius. Est assumenda exercitationem qui pariatur odit et obcaecati sequi.\nVel sunt laborum et quia assumenda hic dicta vero ab facere repellat sed odio placeat aut quia nobis. Eum illo omnis ut galisum excepturi et voluptatibus amet eos nemo obcaecati. 33 praesentium voluptatem non sequi culpa in esse animi est velit voluptas.\n\nLorem ipsum dolor sit amet. Sed laborum quis 33 quia libero id corporis labore sed dolores eveniet et impedit dolores eum consequatur eius. Est assumenda exercitationem qui pariatur odit et obcaecati sequi.\nVel sunt laborum et quia assumenda hic dicta vero ab facere repellat sed odio placeat aut quia nobis. Eum illo omnis ut galisum excepturi et voluptatibus amet eos nemo obcaecati. 33 praesentium voluptatem non sequi culpa in esse animi est velit voluptas.\n\nLorem ipsum dolor sit amet. Sed laborum quis 33 quia libero id corporis labore sed dolores eveniet et impedit dolores eum consequatur eius. Est assumenda exercitationem qui pariatur odit et obcaecati sequi.\nVel sunt laborum et quia assumenda hic dicta vero ab facere repellat sed odio placeat aut quia nobis. Eum illo omnis ut galisum excepturi et voluptatibus amet eos nemo obcaecati. 33 praesentium voluptatem non sequi culpa in esse animi est velit voluptas.',
                },
                { id: 'item-2', title: 'Item 2', content: 'Content for Item 2' },
                { id: 'item-3', title: 'Item 3', content: 'Content for Item 3' },
              ]}
              className='mb-5'
              allowMultiple={true}
              defaultOpenItems={['item-2']}
            />

            <p className='mb-2'>Passing in items w/o default and allow multiple</p>
            <Accordion
              items={[
                {
                  title: 'Item 1',
                  content:
                    'Lorem ipsum dolor sit amet. Sed laborum quis 33 quia libero id corporis labore sed dolores eveniet et impedit dolores eum consequatur eius. Est assumenda exercitationem qui pariatur odit et obcaecati sequi.\nVel sunt laborum et quia assumenda hic dicta vero ab facere repellat sed odio placeat aut quia nobis. Eum illo omnis ut galisum excepturi et voluptatibus amet eos nemo obcaecati. 33 praesentium voluptatem non sequi culpa in esse animi est velit voluptas.',
                },
                { title: 'Item 2', content: 'Content for Item 2', disabled: true },
                { title: 'Item 3', content: 'Content for Item 3' },
              ]}
              className='mb-5'
              allowMultiple={true}
            />

            <p className='mb-2'>Passing in items w/o default and single</p>
            <Accordion
              items={[
                {
                  title: 'Item 1',
                  content:
                    'Lorem ipsum dolor sit amet. Sed laborum quis 33 quia libero id corporis labore sed dolores eveniet et impedit dolores eum consequatur eius. Est assumenda exercitationem qui pariatur odit et obcaecati sequi.\nVel sunt laborum et quia assumenda hic dicta vero ab facere repellat sed odio placeat aut quia nobis. Eum illo omnis ut galisum excepturi et voluptatibus amet eos nemo obcaecati. 33 praesentium voluptatem non sequi culpa in esse animi est velit voluptas.',
                },
                { title: 'Item 2', content: 'Content for Item 2', disabled: true },
                { title: 'Item 3', content: 'Content for Item 3' },
              ]}
              className='mb-5'
            />

            <p className='mb-2'>Using AccordionItem components directly</p>
            <Accordion className='mb-5'>
              <AccordionItem
                title='Item 1'
                content='Lorem ipsum dolor sit amet. Sed laborum quis 33 quia libero id corporis labore sed dolores eveniet et impedit dolores eum consequatur eius. Est assumenda exercitationem qui pariatur odit et obcaecati sequi.\nVel sunt laborum et quia assumenda hic dicta vero ab facere repellat sed odio placeat aut quia nobis. Eum illo omnis ut galisum excepturi et voluptatibus amet eos nemo obcaecati. 33 praesentium voluptatem non sequi culpa in esse animi est velit voluptas.'
              />
              <AccordionItem title='Item 2' content='Content for Item 2' disabled={true} />
              <AccordionItem title='Item 3' content='Content for Item 3' />
            </Accordion>

            <p className='mb-2'>Setting custom class names</p>
            <Accordion
              triggersClassName='underline'
              bodiesClassName='bg-gray-50/5'
            >
              <AccordionItem
                title='Item 1'
                content='Lorem ipsum dolor sit amet. Sed laborum quis 33 quia libero id corporis labore sed dolores eveniet et impedit dolores eum consequatur eius. Est assumenda exercitationem qui pariatur odit et obcaecati sequi.\nVel sunt laborum et quia assumenda hic dicta vero ab facere repellat sed odio placeat aut quia nobis. Eum illo omnis ut galisum excepturi et voluptatibus amet eos nemo obcaecati. 33 praesentium voluptatem non sequi culpa in esse animi est velit voluptas.'
              />
              <AccordionItem title='Item 2' content='Content for Item 2' triggerClassName='text-red-300 hover:!bg-red-900/50' bodyClassName='bg-red-500/10' />
              <AccordionItem title='Item 3' content='Content for Item 3' />
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
