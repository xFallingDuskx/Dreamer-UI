import {
  Accordion,
  AccordionItem,
  ActionModal,
  Button,
  Checkbox,
  Clickable,
  Input,
  Label,
  Modal,
  Panel,
  RadioGroup,
  RadioGroupItem,
  Separator,
  Textarea,
  Toggle,
  Tooltip,
} from '@moondreamsdev/dreamer-ui/components';
import { useActionModal, useToast } from '@moondreamsdev/dreamer-ui/hooks';
import { ActionModalProvider, ToastProvider } from '@moondreamsdev/dreamer-ui/providers';
import { useState } from 'react';

const TestComponent = ({ index }: { index: number }) => {
  return (
    <div className='bg-slate-700 rounded-md p-2 h-full'>
      <h4>Some text for option {index}</h4>
      <p>Some description for option {index}</p>
    </div>
  );
};

function AppContent() {
  const { alert, confirm } = useActionModal();
  const { addToast } = useToast();
  const [radioGroupSelections, setRadioGroupSelections] = useState<Record<number, string>>({});
  const [modalsOpen, setModalsOpen] = useState<Record<string, boolean>>({
    basic: false,
    withTitle: false,
    contentOnly: false,
    withForm: false,
    withActions: false,
    noCloseButton: false,
  });
  const [actionModalsOpen, setActionModalsOpen] = useState<Record<string, boolean>>({
    alert: false,
    confirm: false,
    destructiveAlert: false,
    destructiveConfirm: false,
    customText: false,
  });
  const [panelsOpen, setPanelsOpen] = useState<Record<string, boolean>>({
    basic: false,
    withTitle: false,
    withForm: false,
    large: false,
    small: false,
    withFooter: false,
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

  const openActionModal = (modalId: string) => {
    setActionModalsOpen((prev) => ({ ...prev, [modalId]: true }));
  };

  const closeActionModal = (modalId: string) => {
    setActionModalsOpen((prev) => ({ ...prev, [modalId]: false }));
  };

  const openPanel = (panelId: string) => {
    setPanelsOpen((prev) => ({ ...prev, [panelId]: true }));
  };

  const closePanel = (panelId: string) => {
    setPanelsOpen((prev) => ({ ...prev, [panelId]: false }));
  };

  // Provider-based action modal handlers
  const handleProviderAlert = async () => {
    await alert({
      title: 'Success!',
      message: 'This alert was triggered using the useActionModal hook.',
    });
    console.log('Alert dismissed');
  };

  const handleProviderConfirm = async () => {
    const result = await confirm({
      title: 'Confirm Action',
      message: 'Do you want to proceed with this action?',
    });
    if (result) {
      await alert({ message: 'Action confirmed!' });
    } else {
      console.log('Action cancelled');
    }
  };

  const handleDestructiveConfirm = async () => {
    const result = await confirm({
      title: 'Delete Item',
      message: (
        <div>
          <p className='mb-2'>This will permanently delete the selected item.</p>
          <div className='bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded p-2'>
            <p className='text-sm text-red-800 dark:text-red-200'>This action cannot be undone.</p>
          </div>
        </div>
      ),
      destructive: true,
      confirmText: 'Delete',
      cancelText: 'Keep',
    });
    if (result) {
      await alert({
        message: 'Item deleted successfully!',
        destructive: true,
        confirmText: 'OK',
      });
    }
  };

  const handleCustomAlert = async () => {
    await alert({
      title: 'Custom Alert',
      message: (
        <div>
          <p className='mb-3'>This is a custom alert with React elements!</p>
          <div className='bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded p-3'>
            <p className='text-sm text-blue-800 dark:text-blue-200'>🎉 You can include any React content here.</p>
          </div>
        </div>
      ),
      confirmText: 'Awesome!',
    });
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
          <option value='toggle-section'>Toggle</option>
          <option value='inputs-section'>Input</option>
          <option value='textarea-section'>Textarea</option>
          <option value='radiogroup-section'>Radio Group</option>
          <option value='checkbox-section'>Checkbox</option>
          <option value='labels-section'>Label</option>
          <option value='accordion-section'>Accordion</option>
          <option value='clickable-section'>Clickable</option>
          <option value='modal-section'>Modal</option>
          <option value='panel-section'>Panel</option>
          <option value='actionmodal-section'>Action Modal</option>
          <option value='toast-section'>Toast</option>
          <option value='tooltip-section'>Tooltip</option>
          <option value='separator-section'>Separator</option>
        </select>

        <div className='mt-12 max-w-2xl mx-auto px-10 space-y-20'>
          <div id='buttons-section'>
            <h3 className='mb-2'>Buttons</h3>
            <div className='grid grid-cols-3 gap-4'>
              <Button>Click Me</Button>
              <Button variant='secondary'>Click Me</Button>
              <Button variant='tertiary'>Click Me</Button>
              <Button variant='destructive'>Click Me</Button>
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
              <Button linkTo='https://google.com' linkProps={{ target: '_blank' }}>
                Link to Google
              </Button>
              <Button linkTo='https://google.com' disabled={true}>
                Link to Google
              </Button>
            </div>
          </div>

          <div id='toggle-section'>
            <h3 className='mb-2'>Toggle</h3>
            <div className='space-y-6'>
              <div>
                <h4 className='mb-2 text-lg'>Sizes</h4>
                <div className='flex items-center gap-6'>
                  <div className='flex items-center gap-2'>
                    <Toggle size='sm' />
                    <Label>Small</Label>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Toggle size='md' />
                    <Label>Medium (default)</Label>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Toggle size='lg' />
                    <Label>Large</Label>
                  </div>
                </div>
              </div>

              <div>
                <h4 className='mb-2 text-lg'>Variants</h4>
                <div className='flex items-center gap-6'>
                  <div className='flex items-center gap-2'>
                    <Toggle variant='default' checked />
                    <Label>Default</Label>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Toggle variant='success' checked />
                    <Label>Success</Label>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Toggle variant='destructive' checked />
                    <Label>Destructive</Label>
                  </div>
                </div>
              </div>

              <div>
                <h4 className='mb-2 text-lg'>States</h4>
                <div className='flex items-center gap-6'>
                  <div className='flex items-center gap-2'>
                    <Toggle checked={false} />
                    <Label>Unchecked</Label>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Toggle checked />
                    <Label>Checked</Label>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Toggle disabled />
                    <Label>Disabled Unchecked</Label>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Toggle disabled checked />
                    <Label>Disabled Checked</Label>
                  </div>
                </div>
              </div>

              <div>
                <h4 className='mb-2 text-lg'>Interactive Example</h4>
                <div className='flex items-center gap-2'>
                  <Toggle onCheckedChange={(checked) => console.log('Toggle changed:', checked)} />
                  <Label>Click to toggle (check console)</Label>
                </div>
              </div>

              <div>
                <h4 className='mb-2 text-lg'>Custom Colors</h4>
                <div className='flex items-center gap-2'>
                  <Toggle
                    thumbClassName='!bg-red-500'
                    backgroundClassNames={{ checked: 'bg-red-200 focus:!ring-red-500' }}
                  />
                  <Label>I'm Red!</Label>
                </div>
              </div>
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
                id='simple-example'
                options={['Option 1', 'Option 2', 'Option 3']}
                value={radioGroupSelections[0]}
                onChange={(value) => handleRadioGroupChange(value, 0)}
              />
              <RadioGroup
                id='simple-example-2'
                options={[
                  { value: 'i1', label: 'Item 1' },
                  { value: 'i2', label: 'Item 2', disabled: true },
                  { value: 'i3', label: 'Item 3', description: 'Description for Item 3' },
                ]}
                value={radioGroupSelections[1]}
                onChange={(value) => handleRadioGroupChange(value, 1)}
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
                onButtonClick={() => window.alert('You clicked the button!')}
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
                <p>This modal has a title in the header. The title is automatically styled as an h2 element.</p>
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
                    window.alert('Form submitted!');
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
                    window.alert('Published successfully!');
                    closeModal('withActions');
                  },
                  variant: 'primary',
                },
                {
                  label: 'Save Draft',
                  onClick: () => {
                    window.alert('Saved as draft!');
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

          <div id='actionmodal-section'>
            <h3 className='mb-2'>Action Modal</h3>

            <h4 className='mb-2 text-lg'>Component-based Examples</h4>
            <div className='grid grid-cols-2 gap-4 mb-6'>
              <Button onClick={() => openActionModal('alert')}>Open Alert</Button>
              <Button onClick={() => openActionModal('confirm')}>Open Confirm</Button>
              <Button onClick={() => openActionModal('destructiveAlert')}>Destructive Alert</Button>
              <Button onClick={() => openActionModal('destructiveConfirm')}>Destructive Confirm</Button>
              <Button onClick={() => openActionModal('customText')}>Custom Text Action Modal</Button>
            </div>

            <h4 className='mb-2 text-lg'>Provider-based Examples (useActionModal)</h4>
            <div className='grid grid-cols-2 gap-4'>
              <Button onClick={handleProviderAlert}>Provider Alert</Button>
              <Button onClick={handleProviderConfirm}>Provider Confirm</Button>
              <Button onClick={handleDestructiveConfirm} variant='destructive'>
                Destructive Provider Confirm
              </Button>
              <Button onClick={handleCustomAlert} variant='secondary'>
                Custom Provider Alert
              </Button>
            </div>

            {/* Basic Alert */}
            <ActionModal
              type='alert'
              isOpen={actionModalsOpen.alert}
              onClose={() => closeActionModal('alert')}
              message='This is a simple alert message. Click OK to dismiss.'
              onConfirm={() => console.log('Alert confirmed')}
              className='bg-white dark:bg-gray-800 rounded-lg'
            />

            {/* Basic Confirm */}
            <ActionModal
              type='confirm'
              isOpen={actionModalsOpen.confirm}
              onClose={() => closeActionModal('confirm')}
              message='Are you sure you want to continue with this action?'
              onConfirm={() => {
                console.log('Action confirmed');
                window.alert('Action confirmed!');
              }}
              className='bg-white dark:bg-gray-800 rounded-lg'
            />

            {/* Destructive Alert */}
            <ActionModal
              type='alert'
              isOpen={actionModalsOpen.destructiveAlert}
              onClose={() => closeActionModal('destructiveAlert')}
              title='Error Occurred'
              message={
                <div>
                  <p className='mb-2'>An error occurred while processing your request:</p>
                  <div className='bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded p-3'>
                    <code className='text-sm text-red-800 dark:text-red-200'>
                      NetworkError: Failed to fetch data from server
                    </code>
                  </div>
                </div>
              }
              destructive
              confirmText='Understood'
              className='bg-white dark:bg-gray-800 rounded-lg'
            />

            {/* Destructive Confirm */}
            <ActionModal
              type='confirm'
              isOpen={actionModalsOpen.destructiveConfirm}
              onClose={() => closeActionModal('destructiveConfirm')}
              title='Delete Account'
              message={
                <div>
                  <p className='mb-3'>
                    This action cannot be undone. This will permanently delete your account and all associated data.
                  </p>
                  <div className='bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded p-3'>
                    <p className='text-sm text-yellow-800 dark:text-yellow-200'>
                      <strong>Warning:</strong> All your projects, settings, and data will be permanently lost.
                    </p>
                  </div>
                </div>
              }
              destructive
              confirmText='Delete Account'
              cancelText='Keep Account'
              onConfirm={() => {
                console.log('Account deletion confirmed');
                window.alert('Account would be deleted (demo)');
              }}
              className='bg-white dark:bg-gray-800 rounded-lg'
            />

            {/* Custom Text Modal */}
            <ActionModal
              type='confirm'
              isOpen={actionModalsOpen.customText}
              onClose={() => closeActionModal('customText')}
              title='Save Changes'
              message='You have unsaved changes. Would you like to save them before leaving?'
              confirmText='Save & Continue'
              cancelText='Discard Changes'
              onConfirm={() => {
                console.log('Changes saved');
                window.alert('Changes saved successfully!');
              }}
              className='bg-white dark:bg-gray-800 rounded-lg'
            />
          </div>

          <div id='panel-section'>
            <h3 className='mb-2'>Panel</h3>
            <div className='grid grid-cols-3 gap-4'>
              <Button onClick={() => openPanel('basic')}>Open Basic Panel</Button>
              <Button onClick={() => openPanel('withTitle')}>Panel with Title</Button>
              <Button onClick={() => openPanel('withForm')}>Panel with Form</Button>
              <Button onClick={() => openPanel('withFooter')}>Panel with Footer</Button>
              <Button onClick={() => openPanel('large')}>Large Panel</Button>
              <Button onClick={() => openPanel('small')}>Small Panel</Button>
            </div>

            {/* Basic Panel */}
            <Panel isOpen={panelsOpen.basic} onClose={() => closePanel('basic')}>
              <div>
                <p className='mb-4'>
                  This is a basic panel that slides in from the right side. It provides a clean overlay interface for
                  additional content without disrupting the main page flow.
                </p>
                <p className='mb-4'>
                  You can press the X button, click outside the panel, or press the Escape key to close it.
                </p>
                <div className='flex gap-2'>
                  <Button onClick={() => closePanel('basic')}>Close Panel</Button>
                  <Button variant='secondary'>Another Action</Button>
                </div>
              </div>
            </Panel>

            {/* Panel with Title */}
            <Panel
              isOpen={panelsOpen.withTitle}
              onClose={() => closePanel('withTitle')}
              title='Panel with Title'
              footer={
                <div className='flex justify-end'>
                  <Button onClick={() => closePanel('withTitle')}>Got it!</Button>
                </div>
              }
            >
              <div>
                <p className='mb-4'>
                  This panel includes a header with a title and close button. The title is automatically styled and
                  provides better context for the panel content.
                </p>
                <div className='bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mb-4'>
                  <h5 className='font-medium mb-2'>Features:</h5>
                  <ul className='space-y-1 text-sm'>
                    <li>• Slide-in animation from the right</li>
                    <li>• Accessible keyboard navigation</li>
                    <li>• Click-outside-to-close functionality</li>
                    <li>• Focus management</li>
                  </ul>
                </div>
                <p className='text-sm text-gray-500'>
                  Notice how the action button is now in the footer, creating a cleaner separation between content and
                  actions.
                </p>
              </div>
            </Panel>

            {/* Panel with Form */}
            <Panel
              isOpen={panelsOpen.withForm}
              onClose={() => closePanel('withForm')}
              title={
                <div className='flex items-center gap-2'>
                  <span className='text-2xl'>📋</span>
                  <span>Quick Survey</span>
                </div>
              }
              footer={
                <div className='flex gap-2 justify-end'>
                  <Button type='button' variant='secondary' onClick={() => closePanel('withForm')}>
                    Cancel
                  </Button>
                  <Button type='submit' form='panel-survey-form'>
                    Submit Survey
                  </Button>
                </div>
              }
            >
              <div>
                <form
                  id='panel-survey-form'
                  onSubmit={(e) => {
                    e.preventDefault();
                    window.alert('Survey submitted!');
                    closePanel('withForm');
                  }}
                  className='space-y-4'
                >
                  <div>
                    <Label htmlFor='panel-name'>Your Name</Label>
                    <Input id='panel-name' placeholder='Enter your name' required />
                  </div>
                  <div>
                    <Label htmlFor='panel-rating'>How was your experience?</Label>
                    <select
                      id='panel-rating'
                      className='w-full px-3 py-2 border border-border rounded-md bg-inherit focus:outline-none focus:ring-2 focus:ring-accent'
                      required
                    >
                      <option value=''>Select rating...</option>
                      <option value='excellent'>Excellent</option>
                      <option value='good'>Good</option>
                      <option value='fair'>Fair</option>
                      <option value='poor'>Poor</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor='panel-feedback'>Additional Feedback</Label>
                    <Textarea id='panel-feedback' placeholder='Tell us more...' rows={3} />
                  </div>
                </form>
              </div>
            </Panel>

            {/* Panel with Footer */}
            <Panel
              isOpen={panelsOpen.withFooter}
              onClose={() => closePanel('withFooter')}
              title='Panel with Custom Footer'
              footer={
                <div className='flex items-center justify-between'>
                  <div className='text-sm text-gray-500'>
                    <span className='font-medium'>Pro Tip:</span> Footers are great for actions and status information
                  </div>
                  <div className='flex gap-2'>
                    <Button variant='outline' onClick={() => window.alert('Saved as draft!')}>
                      Save Draft
                    </Button>
                    <Button
                      onClick={() => {
                        window.alert('Published successfully!');
                        closePanel('withFooter');
                      }}
                    >
                      Publish
                    </Button>
                  </div>
                </div>
              }
            >
              <div>
                <p className='mb-4'>
                  This panel demonstrates how to use the footer prop to create a consistent action bar at the bottom of
                  your panel content.
                </p>
                <div className='space-y-4 mb-4'>
                  <div>
                    <Label htmlFor='article-title'>Article Title</Label>
                    <Input id='article-title' placeholder='Enter article title...' />
                  </div>
                  <div>
                    <Label htmlFor='article-content'>Content</Label>
                    <Textarea id='article-content' placeholder='Write your article content here...' rows={8} />
                  </div>
                  <div>
                    <div className='flex items-center gap-2'>
                      <Checkbox id='featured-article' />
                      <Label htmlFor='featured-article'>Mark as featured article</Label>
                    </div>
                  </div>
                </div>
                <div className='bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded p-3'>
                  <p className='text-sm text-blue-800 dark:text-blue-200'>
                    <strong>Note:</strong> The footer remains visible at the bottom even when scrolling through long
                    content. This ensures important actions are always accessible.
                  </p>
                </div>
              </div>
            </Panel>

            {/* Large Panel */}
            <Panel isOpen={panelsOpen.large} onClose={() => closePanel('large')} title='Large Panel' size='xl'>
              <div>
                <p className='mb-4'>
                  This is a large panel that takes up more horizontal space. It's perfect for more complex content or
                  when you need more room to display information.
                </p>
                <div className='grid grid-cols-2 gap-4 mb-4'>
                  <div className='bg-violet-50 dark:bg-violet-900/20 p-4 rounded-lg'>
                    <h5 className='font-medium mb-2'>Column 1</h5>
                    <p className='text-sm'>Some content for the first column with more detailed information.</p>
                  </div>
                  <div className='bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg'>
                    <h5 className='font-medium mb-2'>Column 2</h5>
                    <p className='text-sm'>Some content for the second column with additional details.</p>
                  </div>
                </div>
                <div className='flex gap-2'>
                  <Button onClick={() => closePanel('large')}>Close</Button>
                  <Button variant='outline'>Save Draft</Button>
                </div>
              </div>
            </Panel>

            {/* Small Panel */}
            <Panel isOpen={panelsOpen.small} onClose={() => closePanel('small')} title='Compact Panel' size='sm'>
              <div>
                <p className='mb-4 text-sm'>
                  This is a smaller, more compact panel perfect for quick actions or simple information display.
                </p>
                <div className='space-y-3'>
                  <Button size='sm' onClick={() => window.alert('Quick action 1!')}>
                    Quick Action 1
                  </Button>
                  <Button size='sm' variant='secondary' onClick={() => window.alert('Quick action 2!')}>
                    Quick Action 2
                  </Button>
                </div>
                <div className='pt-4'>
                  <Button size='sm' onClick={() => closePanel('small')}>
                    Close
                  </Button>
                </div>
              </div>
            </Panel>
          </div>

          <div id='toast-section'>
            <h3 className='mb-2'>Toast</h3>
            <div className='grid grid-cols-2 gap-4'>
              <Button
                onClick={() =>
                  addToast({
                    title: 'Information',
                    description: 'This is an info toast message.',
                    type: 'info',
                  })
                }
              >
                Show Info Toast
              </Button>
              <Button
                onClick={() =>
                  addToast({
                    title: 'Warning',
                    description: 'This is a warning toast message.',
                    type: 'warning',
                  })
                }
              >
                Show Warning Toast
              </Button>
              <Button
                onClick={() =>
                  addToast({
                    title: 'Error',
                    description: 'This is an error toast message.',
                    type: 'error',
                  })
                }
              >
                Show Error Toast
              </Button>
              <Button
                onClick={() =>
                  addToast({
                    title: 'Success',
                    description: 'Operation completed successfully!',
                    type: 'info',
                    action: {
                      label: 'Undo',
                      onClick: () => console.log('Undo clicked'),
                    },
                  })
                }
              >
                Toast with Action
              </Button>
              <Button
                onClick={() =>
                  addToast({
                    title: 'Custom Duration',
                    description: 'This toast will disappear in 10 seconds.',
                    duration: 10000,
                  })
                }
              >
                Long Duration Toast
              </Button>
              <Button
                onClick={() =>
                  addToast({
                    title: 'Persistent Toast',
                    description: 'This toast will not auto-dismiss.',
                    duration: 0,
                  })
                }
              >
                Persistent Toast
              </Button>
            </div>
          </div>

          <div id='tooltip-section'>
            <h3 className='mb-2'>Tooltip</h3>
            <div className='grid grid-cols-2 gap-8 mb-8'>
              <div className='space-y-4'>
                <div className='text-center'>
                  <Tooltip message='This tooltip appears on top!' placement='top' className='bg-white text-black'>
                    <Button>Top Tooltip</Button>
                  </Tooltip>
                </div>

                <div className='text-center'>
                  <Tooltip
                    message='This tooltip appears on the bottom!'
                    placement='bottom'
                    className='bg-white text-black'
                  >
                    <Button variant='secondary'>Bottom Tooltip</Button>
                  </Tooltip>
                </div>
              </div>

              <div className='space-y-4'>
                <div className='text-center'>
                  <Tooltip message='This tooltip appears on the left!' placement='left' className='bg-white text-black'>
                    <Button variant='outline'>Left Tooltip</Button>
                  </Tooltip>
                </div>

                <div className='text-center'>
                  <Tooltip
                    message='This tooltip appears on the right!'
                    placement='right'
                    className='bg-white text-black'
                  >
                    <Button variant='tertiary'>Right Tooltip</Button>
                  </Tooltip>
                </div>
              </div>
            </div>

            <h4 className='mb-2'>Advanced Examples</h4>
            <div className='grid grid-cols-2 gap-8 mb-8'>
              <div className='space-y-4'>
                <div className='text-center'>
                  <Tooltip
                    message={
                      <div>
                        <h4 className='font-semibold mb-1'>Rich Content Tooltip</h4>
                        <p className='text-sm'>
                          Tooltips can contain <strong>formatted text</strong> and other elements!
                        </p>
                        <div className='mt-2 text-xs opacity-75'>💡 This is a React.ReactNode</div>
                      </div>
                    }
                    className='max-w-xs bg-white text-black'
                  >
                    <Button>Rich Content</Button>
                  </Tooltip>
                </div>

                <div className='text-center'>
                  <Tooltip message='This tooltip has a custom delay' delay={1000} className='bg-white text-black'>
                    <Button variant='secondary'>Slow Tooltip (1s delay)</Button>
                  </Tooltip>
                </div>
              </div>

              <div className='space-y-4'>
                <div className='text-center'>
                  <Tooltip message="I won't show up!" disabled>
                    <Button variant='outline'>Disabled Tooltip</Button>
                  </Tooltip>
                </div>

                <div className='text-center'>
                  <Tooltip
                    message='Custom styled tooltip!'
                    className='bg-purple-600 text-white border-4 border-purple-400'
                    arrowClassName='border-t-purple-600'
                  >
                    <Button variant='tertiary'>Custom Style</Button>
                  </Tooltip>
                </div>
              </div>
            </div>

            <h4 className='mb-2'>Smart Positioning</h4>
            <div className='text-sm text-gray-400 mb-4'>
              Try hovering these buttons near the edge of the viewport to see automatic repositioning:
            </div>
            <div className='grid grid-cols-4 gap-4'>
              <div className='text-left'>
                <Tooltip
                  message='I will automatically move to stay visible!'
                  placement='top'
                  className='bg-white text-black'
                >
                  <Button size='sm'>Edge Test 1</Button>
                </Tooltip>
              </div>

              <div className='text-center'>
                <Tooltip
                  message='Collision detection keeps me in view!'
                  placement='left'
                  className='bg-white text-black'
                >
                  <Button size='sm'>Edge Test 2</Button>
                </Tooltip>
              </div>

              <div className='text-center'>
                <Tooltip
                  message='I will flip to the opposite side if needed!'
                  placement='right'
                  className='bg-white text-black'
                >
                  <Button size='sm'>Edge Test 3</Button>
                </Tooltip>
              </div>

              <div className='text-right'>
                <Tooltip message='Smart positioning in action!' placement='bottom' className='bg-white text-black'>
                  <Button size='sm'>Edge Test 4</Button>
                </Tooltip>
              </div>
            </div>

            <div className='mt-8'>
              <h4 className='mb-2'>Works with Any Element</h4>
              <div className='grid grid-cols-3 gap-4'>
                <Tooltip message='Tooltip on input field' placement='top' className='bg-white text-black'>
                  <Input placeholder='Hover me' />
                </Tooltip>

                <Tooltip message='Works with checkboxes too!' placement='top' className='bg-white text-black'>
                  <div className='flex items-center gap-2'>
                    <Checkbox />
                    <Label>Hoverable checkbox</Label>
                  </div>
                </Tooltip>

                <Tooltip message='Even custom divs work!' placement='top' className='bg-white text-black'>
                  <div className='bg-slate-700 hover:bg-slate-600 transition-colors p-3 rounded cursor-pointer text-center'>
                    Custom Element
                  </div>
                </Tooltip>
              </div>
            </div>
          </div>

          <div id='separator-section'>
            <h3 className='mb-2'>Separator</h3>

            <h4 className='mb-2 text-lg'>Basic Separators</h4>
            <div className='space-y-6'>
              <div>
                <p className='text-sm text-gray-400 mb-2'>Horizontal separator</p>
                <div className='bg-slate-800 p-4 rounded'>
                  <p>Content above</p>
                  <Separator orientation='horizontal' className='my-4' />
                  <p>Content below</p>
                </div>
              </div>

              <div>
                <p className='text-sm text-gray-400 mb-2'>Vertical separator</p>
                <div className='bg-slate-800 p-4 rounded flex items-center justify-center gap-4'>
                  <p>Left content</p>
                  <Separator orientation='vertical' className='h-8' />
                  <p>Right content</p>
                </div>
              </div>
            </div>

            <h4 className='mb-2 text-lg mt-6'>Thickness Variants</h4>
            <div className='space-y-4'>
              <div className='bg-slate-800 p-4 rounded'>
                <p className='mb-2'>Thin separator (default)</p>
                <Separator thickness='thin' />
                <p className='mt-2'>Content below</p>
              </div>

              <div className='bg-slate-800 p-4 rounded'>
                <p className='mb-2'>Medium separator</p>
                <Separator thickness='medium' />
                <p className='mt-2'>Content below</p>
              </div>

              <div className='bg-slate-800 p-4 rounded'>
                <p className='mb-2'>Thick separator</p>
                <Separator thickness='thick' />
                <p className='mt-2'>Content below</p>
              </div>

              <div className='bg-slate-800 p-4 rounded'>
                <p className='mb-2'>Extra-thick separator</p>
                <Separator thickness='extra-thick' />
                <p className='mt-2'>Content below</p>
              </div>
            </div>

            <h4 className='mb-2 text-lg mt-6'>Navigation Menu Example</h4>
            <div className='bg-slate-800 p-4 rounded'>
              <nav className='flex items-center gap-4'>
                <a href='#' className='text-blue-400 hover:text-blue-300'>
                  Home
                </a>
                <Separator orientation='vertical' className='h-4' decorative />
                <a href='#' className='text-blue-400 hover:text-blue-300'>
                  About
                </a>
                <Separator orientation='vertical' className='h-4' decorative />
                <a href='#' className='text-blue-400 hover:text-blue-300'>
                  Services
                </a>
                <Separator orientation='vertical' className='h-4' decorative />
                <a href='#' className='text-blue-400 hover:text-blue-300'>
                  Contact
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <ActionModalProvider>
      <ToastProvider position='top-center'>
        <AppContent />
      </ToastProvider>
    </ActionModalProvider>
  );
}

export default App;
