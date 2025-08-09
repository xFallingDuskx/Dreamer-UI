import {
  Accordion,
  AccordionItem,
  Button,
  Checkbox,
  Clickable,
  Input,
  Label,
  Modal,
  RadioGroup,
  RadioGroupItem,
  Textarea,
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
  const [modalsOpen, setModalsOpen] = useState<Record<string, boolean>>({
    basic: false,
    withTitle: false,
    contentOnly: false,
    withForm: false,
    withActions: false,
    noCloseButton: false,
  });

  const handleRadioGroupChange = (value: string, index: number) => {
    const newSelections = { ...radioGroupSelections };
    newSelections[index] = value;
    setRadioGroupSelections(newSelections);
  };

  const openModal = (modalId: string) => {
    setModalsOpen((prev) => ({ ...prev, [modalId]: true }));
  };

  const closeModal = (modalId: string) => {
    setModalsOpen((prev) => ({ ...prev, [modalId]: false }));
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
          <option value='clickable-section'>Clickable</option>
          <option value='modal-section'>Modal</option>
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
                  title:
                    'A super long title that should wrap to the next line if it is too long. It still should be readable. This is a test of the accordion component.',
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
            <Accordion triggersClassName='underline' bodiesClassName='bg-gray-50/5'>
              <AccordionItem
                title='Item 1'
                content='Lorem ipsum dolor sit amet. Sed laborum quis 33 quia libero id corporis labore sed dolores eveniet et impedit dolores eum consequatur eius. Est assumenda exercitationem qui pariatur odit et obcaecati sequi.\nVel sunt laborum et quia assumenda hic dicta vero ab facere repellat sed odio placeat aut quia nobis. Eum illo omnis ut galisum excepturi et voluptatibus amet eos nemo obcaecati. 33 praesentium voluptatem non sequi culpa in esse animi est velit voluptas.'
              />
              <AccordionItem
                title='Item 2'
                content='Content for Item 2'
                triggerClassName='text-red-300 hover:!bg-red-900/50'
                bodyClassName='bg-red-500/10'
              />
              <AccordionItem title='Item 3' content='Content for Item 3' />
            </Accordion>
          </div>

          <div id='clickable-section'>
            <h3 className='mb-2'>Clickable</h3>
            <div className='grid grid-cols-2 gap-4'>
              <Clickable linkTo='https://www.example.com' className='p-4 border border-gray-200 rounded'>
                Open page!
              </Clickable>
              <Clickable
                onButtonClick={() => alert('You clicked the button!')}
                className='p-4 border border-gray-200 rounded'
              >
                Trigger alert!
              </Clickable>
              <Clickable
                linkTo='https://google.com'
                linkProps={{
                  target: '_blank',
                }}
              >
                <img src='https://storage.needpix.com/rsynced_images/logo-google-1991840_1280.png' />
              </Clickable>
            </div>
          </div>

          <div id='modal-section'>
            <h3 className='mb-2'>Modal</h3>
            <div className='grid grid-cols-2 gap-4'>
              <Button onClick={() => openModal('basic')}>Open Basic Modal w/ Custom Overlay</Button>
              <Button onClick={() => openModal('withTitle')}>Modal with Title</Button>
              <Button onClick={() => openModal('contentOnly')}>Content Only Modal</Button>
              <Button onClick={() => openModal('withForm')}>Modal with Form</Button>
              <Button onClick={() => openModal('withActions')}>Modal with Actions</Button>
              <Button onClick={() => openModal('noCloseButton')}>Modal without Close Button</Button>
            </div>

            {/* Basic Modal */}
            <Modal
              isOpen={modalsOpen.basic}
              onClose={() => closeModal('basic')}
              className='bg-white dark:bg-gray-800 rounded-lg'
              overlayClassName='backdrop-blur-xs'
            >
              <div>
                <p>
                  This is a basic modal with just content, along with a custom blur overlay. Click outside or the X
                  button to close.
                </p>
              </div>
            </Modal>

            {/* Modal with Title */}
            <Modal
              isOpen={modalsOpen.withTitle}
              onClose={() => closeModal('withTitle')}
              title='Modal with Title'
              className='bg-white dark:bg-gray-800 rounded-lg'
            >
              <div>
                <p>This modal has a title in the header. The title is automatically styled as an h1 element.</p>
                <div className='mt-4 flex gap-2'>
                  <Button onClick={() => closeModal('withTitle')}>Close</Button>
                  <Button variant='secondary'>Cancel</Button>
                </div>
              </div>
            </Modal>

            {/* Content Only Modal */}
            <Modal isOpen={modalsOpen.contentOnly} onClose={() => closeModal('contentOnly')} contentOnly>
              <div className='bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl p-8 text-white shadow-2xl max-w-md mx-auto'>
                <h2 className='text-2xl font-bold mb-4'>Content Only Modal</h2>
                <p className='mb-6'>
                  This modal uses the contentOnly prop, so it has no default background or header. You have complete
                  control over the styling.
                </p>
                <div className='flex justify-end'>
                  <Button
                    onClick={() => closeModal('contentOnly')}
                    className='bg-white text-purple-500 hover:bg-gray-100'
                  >
                    Close
                  </Button>
                </div>
              </div>
            </Modal>

            {/* Modal with Form */}
            <Modal
              isOpen={modalsOpen.withForm}
              onClose={() => closeModal('withForm')}
              title={
                <div className='flex items-center gap-2'>
                  <span className='text-2xl'>📝</span>
                  <span>Contact Form</span>
                </div>
              }
              className='bg-white dark:bg-gray-800 rounded-lg p-6'
            >
              <div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert('Form submitted!');
                    closeModal('withForm');
                  }}
                  className='space-y-4'
                >
                  <div>
                    <Label htmlFor='name'>Name</Label>
                    <Input id='name' placeholder='Enter your name' required />
                  </div>
                  <div>
                    <Label htmlFor='email'>Email</Label>
                    <Input id='email' type='email' placeholder='Enter your email' required />
                  </div>
                  <div>
                    <Label htmlFor='message'>Message</Label>
                    <Textarea id='message' placeholder='Enter your message' required />
                  </div>
                  <div className='flex gap-2 justify-end'>
                    <Button type='button' variant='secondary' onClick={() => closeModal('withForm')}>
                      Cancel
                    </Button>
                    <Button type='submit'>Send Message</Button>
                  </div>
                </form>
              </div>
            </Modal>

            {/* Modal with Actions */}
            <Modal
              isOpen={modalsOpen.withActions}
              onClose={() => closeModal('withActions')}
              title='Save Changes?'
              actions={[
                {
                  label: 'Publish',
                  onClick: () => {
                    alert('Published successfully!');
                    closeModal('withActions');
                  },
                  variant: 'primary',
                },
                {
                  label: 'Save Draft',
                  onClick: () => {
                    alert('Saved as draft!');
                    closeModal('withActions');
                  },
                  variant: 'outline',
                },

                {
                  label: 'Cancel',
                  onClick: () => closeModal('withActions'),
                  variant: 'outline',
                },
              ]}
              className='bg-white dark:bg-gray-800 rounded-lg'
            >
              <p>You have unsaved changes. Would you like to save them before leaving?</p>
              <div className='mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded'>
                <p className='text-sm text-gray-600 dark:text-gray-300'>
                  <strong>Last saved:</strong> 2 minutes ago
                </p>
              </div>
            </Modal>

            {/* Modal without Close Button */}
            <Modal
              isOpen={modalsOpen.noCloseButton}
              onClose={() => closeModal('noCloseButton')}
              title='Processing...'
              hideCloseButton={true}
              actions={[
                {
                  label: 'Cancel',
                  onClick: () => closeModal('noCloseButton'),
                  variant: 'outline',
                },
              ]}
              className='bg-white dark:bg-gray-800 rounded-lg'
              disableCloseOnOverlayClick={true}
            >
              <div className='text-center py-4'>
                <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4'></div>
                <p>Please wait while we process your request...</p>
                <p className='text-sm text-gray-500 mt-2'>This may take a few moments.</p>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
