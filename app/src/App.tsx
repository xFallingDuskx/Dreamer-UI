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
  Pagination,
  Panel,
  RadioGroup,
  RadioGroupItem,
  ScrollArea,
  Select,
  Separator,
  Skeleton,
  Slider,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  Toggle,
  Tooltip,
} from '@moondreamsdev/dreamer-ui/components';
import { Carousel } from './carousel';
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
  const [selectedFruit, setSelectedFruit] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const [selectedCountry, setSelectedCountry] = useState<string>('PT'); // Pre-select Portugal to demo scroll-to-selected
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

  // Pagination state
  const [paginationExamples, setPaginationExamples] = useState({
    basic: 1,
    advanced: 5,
    infinite: 3,
    customColors: 1,
  });

  // Controlled tabs state
  const [controlledTab, setControlledTab] = useState('controlled-tab1');

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

      <div className='example-container'>
        <h2>Select Component</h2>
        <select className='block mx-auto my-2 focus:outline-none' onChange={handleSelectOnChange}>
          <option value='buttons-section'>Button</option>
          <option value='skeleton-section'>Skeleton</option>
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
          <option value='select-section'>Select</option>
          <option value='tooltip-section'>Tooltip</option>
          <option value='separator-section'>Separator</option>
          <option value='slider-section'>Slider</option>
          <option value='pagination-section'>Pagination</option>
          <option value='tabs-section'>Tabs</option>
          <option value='carousel-section'>Carousel</option>
          <option value='scroll-area-section'>Scroll Area</option>
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

          <div id='skeleton-section'>
            <h3 className='mb-2'>Skeleton</h3>

            <h4 className='mb-2 text-lg'>Basic Shapes</h4>
            <div className='grid grid-cols-3 gap-6 mb-6'>
              <div className='space-y-2'>
                <p className='text-sm text-gray-400'>Rectangle (default)</p>
                <Skeleton shape='rectangle' className='h-6' />
              </div>
              <div className='space-y-2'>
                <p className='text-sm text-gray-400'>Circle</p>
                <div className='flex justify-center'>
                  <Skeleton shape='circle' className='!size-20' />
                </div>
              </div>
              <div className='space-y-2'>
                <p className='text-sm text-gray-400'>Text</p>
                <Skeleton shape='text' />
              </div>
            </div>

            <h4 className='mb-2 text-lg'>Multiple Lines</h4>
            <div className='grid grid-cols-2 gap-6 mb-6'>
              <div className='space-y-2'>
                <p className='text-sm text-gray-400'>3 lines with small spacing</p>
                <Skeleton shape='text' lines={3} lineSpacing='sm' />
              </div>
              <div className='space-y-2'>
                <p className='text-sm text-gray-400'>4 lines with large spacing</p>
                <Skeleton shape='text' lines={4} lineSpacing='lg' />
              </div>
            </div>

            <h4 className='mb-2 text-lg'>Line Spacing Options</h4>
            <div className='grid grid-cols-5 gap-4 mb-6'>
              <div className='space-y-2'>
                <p className='text-sm text-gray-400'>XS spacing</p>
                <Skeleton shape='text' lines={3} lineSpacing='xs' />
              </div>
              <div className='space-y-2'>
                <p className='text-sm text-gray-400'>SM spacing</p>
                <Skeleton shape='text' lines={3} lineSpacing='sm' />
              </div>
              <div className='space-y-2'>
                <p className='text-sm text-gray-400'>MD spacing</p>
                <Skeleton shape='text' lines={3} lineSpacing='md' />
              </div>
              <div className='space-y-2'>
                <p className='text-sm text-gray-400'>LG spacing</p>
                <Skeleton shape='text' lines={3} lineSpacing='lg' />
              </div>
              <div className='space-y-2'>
                <p className='text-sm text-gray-400'>XL spacing</p>
                <Skeleton shape='text' lines={3} lineSpacing='xl' />
              </div>
            </div>

            <h4 className='mb-2 text-lg'>Animation Control</h4>
            <div className='grid grid-cols-2 gap-6 mb-6'>
              <div className='space-y-2'>
                <p className='text-sm text-gray-400'>With animation (default)</p>
                <Skeleton shape='rectangle' animate={true} className='h-6' />
              </div>
              <div className='space-y-2'>
                <p className='text-sm text-gray-400'>Without animation</p>
                <Skeleton shape='rectangle' animate={false} className='h-6' />
              </div>
            </div>

            <h4 className='mb-2 text-lg'>Card Layout Example</h4>
            <div className='bg-slate-800 p-6 rounded-lg max-w-md'>
              <div className='flex items-center gap-4 mb-4'>
                <Skeleton shape='circle' className='size-16' />
                <div className='flex-1'>
                  <Skeleton shape='text' className='w-24 mb-2' />
                  <Skeleton shape='text' className='w-16' />
                </div>
              </div>
              <Skeleton shape='rectangle' className='mb-3 h-32' />
              <Skeleton shape='text' lines={3} lineSpacing='sm' />
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

          <div id='select-section'>
            <h3 className='mb-2'>Select</h3>

            <h4 className='mb-2 text-lg'>Basic Examples</h4>
            <div className='space-y-4 mb-6'>
              <Select
                value={selectedFruit}
                onChange={setSelectedFruit}
                options={[
                  { text: 'Apple', value: 'apple' },
                  { text: 'Banana', value: 'banana' },
                  { text: 'Cherry', value: 'cherry' },
                  { text: 'Disabled Option', value: 'disabled', disabled: true },
                ]}
                placeholder='Choose a fruit...'
              />
              <div className='text-sm text-muted-foreground'>Selected: {selectedFruit || 'None'}</div>

              <Select
                options={[
                  { text: 'Option 1', value: 'opt1', description: 'This is the first option' },
                  { text: 'Option 2', value: 'opt2', description: 'This is the second option' },
                  { text: 'Option 3', value: 'opt3', description: 'This is the third option' },
                ]}
                placeholder='Select with descriptions...'
              />
            </div>

            <h4 className='mb-2 text-lg'>Searchable Select (Combobox)</h4>
            <div className='space-y-4 mb-6'>
              <Select
                searchable
                value={selectedLanguage}
                onChange={setSelectedLanguage}
                options={[
                  { text: 'JavaScript', value: 'js', description: 'Dynamic programming language' },
                  { text: 'TypeScript', value: 'ts', description: 'Typed superset of JavaScript' },
                  { text: 'Python', value: 'py', description: 'High-level programming language' },
                  { text: 'Java', value: 'java', description: 'Object-oriented programming language' },
                  { text: 'C++', value: 'cpp', description: 'Systems programming language' },
                  { text: 'Rust', value: 'rust', description: 'Memory-safe systems language' },
                ]}
                placeholder='Search for a programming language...'
              />
              <div className='text-sm text-muted-foreground'>Selected: {selectedLanguage || 'None'}</div>
            </div>

            <h4 className='mb-2 text-lg'>Keyboard Navigation & Scrolling</h4>
            <div className='space-y-4 mb-6'>
              <Select
                value={selectedCountry}
                onChange={setSelectedCountry}
                options={[
                  { text: 'Afghanistan', value: 'AF' },
                  { text: 'Albania', value: 'AL' },
                  { text: 'Algeria', value: 'DZ' },
                  { text: 'Argentina', value: 'AR' },
                  { text: 'Australia', value: 'AU' },
                  { text: 'Austria', value: 'AT' },
                  { text: 'Bangladesh', value: 'BD' },
                  { text: 'Belgium', value: 'BE' },
                  { text: 'Brazil', value: 'BR' },
                  { text: 'Canada', value: 'CA' },
                  { text: 'Chile', value: 'CL' },
                  { text: 'China', value: 'CN' },
                  { text: 'Colombia', value: 'CO' },
                  { text: 'Denmark', value: 'DK' },
                  { text: 'Egypt', value: 'EG' },
                  { text: 'Finland', value: 'FI' },
                  { text: 'France', value: 'FR' },
                  { text: 'Germany', value: 'DE' },
                  { text: 'India', value: 'IN' },
                  { text: 'Indonesia', value: 'ID' },
                  { text: 'Italy', value: 'IT' },
                  { text: 'Japan', value: 'JP' },
                  { text: 'Mexico', value: 'MX' },
                  { text: 'Netherlands', value: 'NL' },
                  { text: 'Norway', value: 'NO' },
                  { text: 'Poland', value: 'PL' },
                  { text: 'Portugal', value: 'PT' },
                  { text: 'Russia', value: 'RU' },
                  { text: 'Spain', value: 'ES' },
                  { text: 'Sweden', value: 'SE' },
                  { text: 'Switzerland', value: 'CH' },
                  { text: 'United Kingdom', value: 'GB' },
                  { text: 'United States', value: 'US' },
                ]}
                placeholder='Select a country (use arrow keys)...'
              />
              <div className='text-sm text-muted-foreground'>
                Portugal is pre-selected. When you open the dropdown, it scrolls to the selected option and keyboard
                navigation starts from there. Selected: {selectedCountry}
              </div>
            </div>

            <h4 className='mb-2 text-lg'>Different Sizes</h4>
            <div className='space-y-4 mb-6'>
              <Select
                size='sm'
                options={[
                  { text: 'Small Select', value: 'small' },
                  { text: 'Another Option', value: 'another' },
                ]}
                placeholder='Small size...'
              />

              <Select
                size='md'
                options={[
                  { text: 'Medium Select', value: 'medium' },
                  { text: 'Another Option', value: 'another' },
                ]}
                placeholder='Medium size (default)...'
              />

              <Select
                size='lg'
                options={[
                  { text: 'Large Select', value: 'large' },
                  { text: 'Another Option', value: 'another' },
                ]}
                placeholder='Large size...'
              />
            </div>

            <h4 className='mb-2 text-lg'>Clearable Select</h4>
            <div className='space-y-4 mb-6'>
              <Select
                clearable
                value={selectedFruit}
                onChange={setSelectedFruit}
                options={[
                  { text: 'Apple', value: 'apple' },
                  { text: 'Banana', value: 'banana' },
                  { text: 'Cherry', value: 'cherry' },
                ]}
                placeholder='Select a fruit (clearable)...'
              />
              <div className='text-sm text-muted-foreground'>
                You can clear the selection using the X button. Selected: {selectedFruit || 'None'}
              </div>

              <Select
                searchable
                clearable
                value={selectedLanguage}
                onChange={setSelectedLanguage}
                options={[
                  { text: 'JavaScript', value: 'js', description: 'Dynamic programming language' },
                  { text: 'TypeScript', value: 'ts', description: 'Typed superset of JavaScript' },
                  { text: 'Python', value: 'py', description: 'High-level programming language' },
                ]}
                placeholder='Searchable and clearable...'
              />
              <div className='text-sm text-muted-foreground'>
                Combined searchable and clearable. Selected: {selectedLanguage || 'None'}
              </div>
            </div>

            <h4 className='mb-2 text-lg'>Custom Styling</h4>
            <div className='space-y-4 mb-6'>
              <Select
                options={[
                  { text: 'Custom Trigger', value: 'custom1' },
                  { text: 'Another Option', value: 'custom2' },
                ]}
                placeholder='Custom trigger styling...'
                triggerClassName='bg-blue-50 border-blue-200 hover:border-blue-400'
              />

              <Select
                options={[
                  { text: 'Custom Content', value: 'content1' },
                  { text: 'Another Option', value: 'content2' },
                ]}
                placeholder='Custom content styling...'
                triggerClassName='!bg-purple-100 text-purple-950 border-purple-200 focus:!border-purple-600 focus:!ring-purple-600'
                dropdownClassName='bg-purple-100 text-purple-950 !border-purple-800'
              />
            </div>

            <h4 className='mb-2 text-lg'>Disabled State</h4>
            <div className='space-y-4'>
              <Select
                disabled
                options={[
                  { text: 'Disabled Select', value: 'disabled1' },
                  { text: 'Cannot Select', value: 'disabled2' },
                ]}
                placeholder='This select is disabled...'
              />
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

          <div id='slider-section'>
            <h3 className='mb-2'>Slider</h3>

            <h4 className='mb-2 text-lg'>Basic Examples</h4>
            <div className='space-y-6'>
              <div className='bg-slate-800 p-4 rounded'>
                <Label className='mb-2 block'>Default Slider (0-100)</Label>
                <Slider
                  onValueChange={(value) => console.log('Default slider value:', value)}
                  aria-label='Default slider'
                  rangeClassName='bg-slate-500'
                  thumbClassName='bg-slate-500'
                />
              </div>

              <div className='bg-slate-800 p-4 rounded'>
                <Label className='mb-2 block'>Slider with Custom Range (10-50, step 5)</Label>
                <Slider
                  min={10}
                  max={50}
                  step={5}
                  defaultValue={25}
                  onValueChange={(value) => console.log('Custom range slider value:', value)}
                  aria-label='Custom range slider'
                  rangeClassName='bg-slate-500'
                  thumbClassName='bg-slate-500'
                />
              </div>

              <div className='bg-slate-800 p-4 rounded'>
                <Label className='mb-2 block'>Disabled Slider</Label>
                <Slider
                  defaultValue={30}
                  disabled
                  aria-label='Disabled slider'
                  rangeClassName='bg-slate-500'
                  thumbClassName='bg-slate-500'
                />
              </div>
            </div>

            <h4 className='mb-2 text-lg mt-6'>Custom Colors</h4>
            <div className='space-y-6'>
              <div className='bg-slate-800 p-4 rounded'>
                <Label className='mb-2 block'>Success Theme</Label>
                <Slider
                  defaultValue={40}
                  rangeClassName='bg-success'
                  thumbClassName='bg-success border-white'
                  onValueChange={(value) => console.log('Success slider value:', value)}
                  aria-label='Success theme slider'
                />
              </div>

              <div className='bg-slate-800 p-4 rounded'>
                <Label className='mb-2 block'>Custom Track Colors</Label>
                <Slider
                  defaultValue={75}
                  trackClassName='bg-blue-300/30'
                  rangeClassName='bg-blue-500'
                  thumbClassName='bg-blue-500 border-blue-200'
                  onValueChange={(value) => console.log('Custom track slider value:', value)}
                  aria-label='Custom track colors slider'
                />
              </div>
            </div>

            <h4 className='mb-2 text-lg mt-6'>Volume Control Example</h4>
            <div className='bg-slate-800 p-4 rounded'>
              <div className='flex items-center gap-4'>
                <span className='text-2xl'>🔊</span>
                <div className='flex-1'>
                  <Slider
                    min={0}
                    max={100}
                    defaultValue={50}
                    onValueChange={(value) => console.log('Volume:', value + '%')}
                    aria-label='Volume control'
                    rangeClassName='bg-pink-500'
                    thumbClassName='bg-pink-500'
                    trackClassName='bg-pink-300/30'
                  />
                </div>
                <span className='text-sm text-gray-400 w-12'>100%</span>
              </div>
            </div>

            <h4 className='mb-2 text-lg mt-6'>Price Range Example</h4>
            <div className='bg-slate-800 p-4 rounded'>
              <Label className='mb-2 block'>Budget Range ($0 - $1000)</Label>
              <Slider
                min={0}
                max={1000}
                step={50}
                defaultValue={250}
                rangeClassName='bg-green-500'
                thumbClassName='bg-green-500 border-white'
                onValueChange={(value) => console.log('Budget: $' + value)}
                aria-label='Budget range slider'
              />
              <div className='flex justify-between text-sm text-gray-400 mt-2'>
                <span>$0</span>
                <span>$1000</span>
              </div>
            </div>
          </div>

          <div id='pagination-section'>
            <h3 className='mb-2'>Pagination</h3>

            <h4 className='mb-2 text-lg'>Basic Examples</h4>
            <div className='space-y-6'>
              <div className='bg-slate-800 p-4 rounded'>
                <Label className='mb-2 block'>Standard Pagination (5 pages)</Label>
                <Pagination page={1} pageCount={5} onPageChange={(page) => console.log('Page changed to:', page)} />
              </div>

              <div className='bg-slate-800 p-4 rounded'>
                <Label className='mb-2 block'>Large Page Count (50 pages, max 7 visible)</Label>
                <Pagination
                  page={25}
                  pageCount={50}
                  maxVisiblePages={7}
                  onPageChange={(page) => console.log('Large pagination page:', page)}
                />
              </div>

              <div className='bg-slate-800 p-4 rounded'>
                <Label className='mb-2 block'>Infinite Pagination</Label>
                <Pagination
                  page={5}
                  pageCount={Infinity}
                  onPageChange={(page) => console.log('Infinite pagination page:', page)}
                />
              </div>
            </div>

            <h4 className='mb-2 text-lg mt-6'>Size Variants</h4>
            <div className='space-y-6'>
              <div className='bg-slate-800 p-4 rounded'>
                <Label className='mb-2 block'>Small Size</Label>
                <Pagination
                  page={3}
                  pageCount={10}
                  size='sm'
                  onPageChange={(page) => console.log('Small pagination page:', page)}
                />
              </div>

              <div className='bg-slate-800 p-4 rounded'>
                <Label className='mb-2 block'>Medium Size (default)</Label>
                <Pagination
                  page={3}
                  pageCount={10}
                  size='md'
                  onPageChange={(page) => console.log('Medium pagination page:', page)}
                />
              </div>
            </div>

            <h4 className='mb-2 text-lg mt-6'>Style Variants</h4>
            <div className='space-y-6'>
              <div className='bg-slate-800 p-4 rounded'>
                <Label className='mb-2 block'>Link Style (default)</Label>
                <Pagination
                  page={2}
                  pageCount={7}
                  variant='link'
                  onPageChange={(page) => console.log('Link pagination page:', page)}
                />
              </div>

              <div className='bg-slate-800 p-4 rounded'>
                <Label className='mb-2 block'>Filled Style</Label>
                <Pagination
                  page={2}
                  pageCount={7}
                  variant='filled'
                  onPageChange={(page) => console.log('Filled pagination page:', page)}
                />
              </div>

              <div className='bg-slate-800 p-4 rounded'>
                <Label className='mb-2 block'>Outline Style</Label>
                <Pagination
                  page={2}
                  pageCount={7}
                  variant='outline'
                  onPageChange={(page) => console.log('Outline pagination page:', page)}
                />
              </div>
            </div>

            <h4 className='mb-2 text-lg mt-6'>Advanced Options</h4>
            <div className='space-y-6'>
              <div className='bg-slate-800 p-4 rounded'>
                <Label className='mb-2 block'>Without First/Last Buttons</Label>
                <Pagination
                  page={15}
                  pageCount={30}
                  maxVisiblePages={5}
                  showFirstLast={false}
                  onPageChange={(page) => console.log('No first/last page:', page)}
                />
              </div>

              <div className='bg-slate-800 p-4 rounded'>
                <Label className='mb-2 block'>With First/Last Buttons (when needed)</Label>
                <Pagination
                  page={15}
                  pageCount={30}
                  maxVisiblePages={5}
                  showFirstLast={true}
                  onPageChange={(page) => console.log('With first/last page:', page)}
                />
              </div>
            </div>

            <h4 className='mb-2 text-lg mt-6'>Interactive Examples</h4>
            <div className='space-y-6'>
              <div className='bg-slate-800 p-4 rounded'>
                <Label className='mb-2 block'>Interactive Basic Pagination</Label>
                <div className='mb-4 text-sm text-gray-300'>Current page: {paginationExamples.basic} of 10</div>
                <Pagination
                  page={paginationExamples.basic}
                  pageCount={10}
                  onPageChange={(page) => setPaginationExamples((prev) => ({ ...prev, basic: page }))}
                />
              </div>

              <div className='bg-slate-800 p-4 rounded'>
                <Label className='mb-2 block'>Interactive Advanced Pagination (50 pages)</Label>
                <div className='mb-4 text-sm text-gray-300'>Current page: {paginationExamples.advanced} of 50</div>
                <Pagination
                  page={paginationExamples.advanced}
                  pageCount={50}
                  maxVisiblePages={7}
                  variant='outline'
                  onPageChange={(page) => setPaginationExamples((prev) => ({ ...prev, advanced: page }))}
                />
              </div>

              <div className='bg-slate-800 p-4 rounded'>
                <Label className='mb-2 block'>Interactive Infinite Pagination</Label>
                <div className='mb-4 text-sm text-gray-300'>
                  Current page: {paginationExamples.infinite} (infinite pages)
                </div>
                <Pagination
                  page={paginationExamples.infinite}
                  pageCount={Infinity}
                  variant='filled'
                  onPageChange={(page) => setPaginationExamples((prev) => ({ ...prev, infinite: page }))}
                />
              </div>

              <div className='bg-slate-800 p-4 rounded'>
                <Label className='mb-2 block'>Interactive Custom Colors</Label>
                <div className='mb-4 text-sm text-gray-300'>
                  Current page: {paginationExamples.customColors} of 10 - Custom cyan theme with hover effects
                </div>
                <Pagination
                  page={paginationExamples.customColors}
                  pageCount={10}
                  maxVisiblePages={5}
                  showFirstLast={true}
                  buttonsClassName='border-2 border-cyan-500 !text-cyan-400 hover:!bg-cyan-500 hover:!text-white aria-current:!bg-cyan-500 aria-current:!text-white aria-current:border-cyan-400'
                  onPageChange={(page) => setPaginationExamples((prev) => ({ ...prev, customColors: page }))}
                />
              </div>
            </div>
          </div>

          <div id='tabs-section'>
            <h3 className='mb-2'>Tabs</h3>

            <h4 className='mb-2 text-lg'>Basic Tabs</h4>
            <div className='space-y-6'>
              <div className='bg-slate-800 p-4 rounded'>
                <p className='text-sm text-gray-400 mb-2'>Underline variant (default)</p>
                <Tabs defaultValue='tab1' variant='underline'>
                  <TabsList>
                    <TabsTrigger value='tab1'>First Tab</TabsTrigger>
                    <TabsTrigger value='tab2'>Second Tab</TabsTrigger>
                    <TabsTrigger value='tab3'>Third Tab</TabsTrigger>
                  </TabsList>
                  <TabsContent value='tab1'>
                    <div className='p-4 bg-slate-700 rounded-md'>
                      <h4 className='font-semibold mb-2'>First Tab Content</h4>
                      <p>
                        This is the content for the first tab. The underline variant shows a border underneath the
                        active tab.
                      </p>
                    </div>
                  </TabsContent>
                  <TabsContent value='tab2'>
                    <div className='p-4 bg-slate-700 rounded-md'>
                      <h4 className='font-semibold mb-2'>Second Tab Content</h4>
                      <p>This is the content for the second tab with some different information.</p>
                    </div>
                  </TabsContent>
                  <TabsContent value='tab3'>
                    <div className='p-4 bg-slate-700 rounded-md'>
                      <h4 className='font-semibold mb-2'>Third Tab Content</h4>
                      <p>This is the content for the third tab, showing how easy it is to add more tabs.</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              <div className='bg-slate-800 p-4 rounded'>
                <p className='text-sm text-gray-400 mb-2'>Pills variant</p>
                <Tabs defaultValue='pill1' variant='pills'>
                  <TabsList>
                    <TabsTrigger value='pill1'>Overview</TabsTrigger>
                    <TabsTrigger value='pill2'>Features</TabsTrigger>
                    <TabsTrigger value='pill3'>Settings</TabsTrigger>
                  </TabsList>
                  <TabsContent value='pill1'>
                    <div className='p-4 bg-slate-700 rounded-md'>
                      <h4 className='font-semibold mb-2'>Overview</h4>
                      <p>
                        The pills variant uses rounded backgrounds for the active tab, providing a more modern look.
                      </p>
                    </div>
                  </TabsContent>
                  <TabsContent value='pill2'>
                    <div className='p-4 bg-slate-700 rounded-md'>
                      <h4 className='font-semibold mb-2'>Features</h4>
                      <p>This tab showcases the different features available in our tabs component.</p>
                    </div>
                  </TabsContent>
                  <TabsContent value='pill3'>
                    <div className='p-4 bg-slate-700 rounded-md'>
                      <h4 className='font-semibold mb-2'>Settings</h4>
                      <p>Configuration options and preferences can be displayed in this tab.</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              <div className='bg-slate-800 p-4 rounded'>
                <p className='text-sm text-gray-400 mb-2'>Bordered variant</p>
                <Tabs defaultValue='border1' variant='bordered'>
                  <TabsList>
                    <TabsTrigger value='border1'>Documents</TabsTrigger>
                    <TabsTrigger value='border2'>Images</TabsTrigger>
                    <TabsTrigger value='border3'>Videos</TabsTrigger>
                  </TabsList>
                  <TabsContent value='border1'>
                    <div className='p-4 bg-slate-700 rounded-md'>
                      <h4 className='font-semibold mb-2'>Documents</h4>
                      <p>The bordered variant wraps the tab list in a border for a more contained appearance.</p>
                    </div>
                  </TabsContent>
                  <TabsContent value='border2'>
                    <div className='p-4 bg-slate-700 rounded-md'>
                      <h4 className='font-semibold mb-2'>Images</h4>
                      <p>Perfect for organizing different types of content or media.</p>
                    </div>
                  </TabsContent>
                  <TabsContent value='border3'>
                    <div className='p-4 bg-slate-700 rounded-md'>
                      <h4 className='font-semibold mb-2'>Videos</h4>
                      <p>Each tab can contain completely different content and layouts.</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>

            <h4 className='mb-2 text-lg mt-6'>Tab Widths</h4>
            <div className='space-y-6'>
              <div className='bg-slate-800 p-4 rounded'>
                <p className='text-sm text-gray-400 mb-2'>Fit width (default) - Tabs size to their content</p>
                <Tabs defaultValue='fit1' tabsWidth='fit' variant='pills'>
                  <TabsList>
                    <TabsTrigger value='fit1'>Short</TabsTrigger>
                    <TabsTrigger value='fit2'>Medium Length</TabsTrigger>
                    <TabsTrigger value='fit3'>Very Long Tab Name</TabsTrigger>
                  </TabsList>
                  <TabsContent value='fit1'>
                    <div className='p-4 bg-slate-700 rounded-md'>
                      <p>Content for the short tab.</p>
                    </div>
                  </TabsContent>
                  <TabsContent value='fit2'>
                    <div className='p-4 bg-slate-700 rounded-md'>
                      <p>Content for the medium length tab.</p>
                    </div>
                  </TabsContent>
                  <TabsContent value='fit3'>
                    <div className='p-4 bg-slate-700 rounded-md'>
                      <p>Content for the very long tab name.</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              <div className='bg-slate-800 p-4 rounded'>
                <p className='text-sm text-gray-400 mb-2'>Equal width - All tabs have equal width</p>
                <Tabs defaultValue='equal1' tabsWidth='full' variant='bordered'>
                  <TabsList>
                    <TabsTrigger value='equal1'>Short</TabsTrigger>
                    <TabsTrigger value='equal2'>Medium Length</TabsTrigger>
                    <TabsTrigger value='equal3'>Very Long Tab Name</TabsTrigger>
                  </TabsList>
                  <TabsContent value='equal1'>
                    <div className='p-4 bg-slate-700 rounded-md'>
                      <p>All tabs have equal width regardless of content length.</p>
                    </div>
                  </TabsContent>
                  <TabsContent value='equal2'>
                    <div className='p-4 bg-slate-700 rounded-md'>
                      <p>This creates a more uniform appearance.</p>
                    </div>
                  </TabsContent>
                  <TabsContent value='equal3'>
                    <div className='p-4 bg-slate-700 rounded-md'>
                      <p>Perfect for consistent layouts.</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>

            <h4 className='mb-2 text-lg mt-6'>Controlled Tabs</h4>
            <div className='space-y-6'>
              <div className='bg-slate-800 p-4 rounded'>
                <p className='text-sm text-gray-400 mb-2'>Controlled example with external state and button controls</p>
                <div className='mb-4 flex gap-2'>
                  <Button
                    size='sm'
                    variant={controlledTab === 'controlled-tab1' ? 'primary' : 'outline'}
                    onClick={() => setControlledTab('controlled-tab1')}
                  >
                    Go to Tab 1
                  </Button>
                  <Button
                    size='sm'
                    variant={controlledTab === 'controlled-tab2' ? 'primary' : 'outline'}
                    onClick={() => setControlledTab('controlled-tab2')}
                  >
                    Go to Tab 2
                  </Button>
                  <Button
                    size='sm'
                    variant={controlledTab === 'controlled-tab3' ? 'primary' : 'outline'}
                    onClick={() => setControlledTab('controlled-tab3')}
                  >
                    Go to Tab 3
                  </Button>
                </div>
                <div className='mb-4 text-sm text-gray-300'>
                  Current active tab: <span className='font-mono'>{controlledTab}</span>
                </div>
                <Tabs value={controlledTab} onValueChange={setControlledTab} variant='pills' tabsWidth='full'>
                  <TabsList>
                    <TabsTrigger value='controlled-tab1'>Dashboard</TabsTrigger>
                    <TabsTrigger value='controlled-tab2'>Analytics</TabsTrigger>
                    <TabsTrigger value='controlled-tab3'>Reports</TabsTrigger>
                  </TabsList>
                  <TabsContent value='controlled-tab1'>
                    <div className='p-4 bg-slate-700 rounded-md'>
                      <h4 className='font-semibold mb-2'>Dashboard</h4>
                      <p>
                        This is a controlled tabs component. The active tab is managed by external state and can be
                        changed both by clicking the tabs themselves and by using the buttons above.
                      </p>
                      <p className='mt-2 text-sm text-gray-400'>
                        Notice how the state is synchronized between the tabs and the external controls.
                      </p>
                    </div>
                  </TabsContent>
                  <TabsContent value='controlled-tab2'>
                    <div className='p-4 bg-slate-700 rounded-md'>
                      <h4 className='font-semibold mb-2'>Analytics</h4>
                      <p>
                        The controlled pattern is useful when you need to programmatically change tabs based on other
                        application logic or user actions.
                      </p>
                      <div className='mt-3 p-2 bg-blue-900/20 rounded border border-blue-800'>
                        <p className='text-sm text-blue-200'>
                          💡 Use controlled tabs when you need to sync with forms, URL routing, or other state
                          management.
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value='controlled-tab3'>
                    <div className='p-4 bg-slate-700 rounded-md'>
                      <h4 className='font-semibold mb-2'>Reports</h4>
                      <p>
                        This demonstrates how the <code className='bg-slate-600 px-1 rounded'>onValueChange</code>{' '}
                        callback works in controlled mode.
                      </p>
                      <p className='mt-2 text-sm text-gray-400'>
                        The component calls your callback whenever a tab is clicked, allowing you to update your state.
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>

            <h4 className='mb-2 text-lg mt-6'>Custom Styling</h4>
            <div className='space-y-6'>
              <div className='bg-slate-800 p-4 rounded'>
                <p className='text-sm text-gray-400 mb-2'>
                  Using `triggersClassName` and `contentClassName` for custom styling
                </p>
                <Tabs
                  defaultValue='custom1'
                  variant='underline'
                  triggersClassName='bg-orange-500/20 text-orange-300 hover:bg-orange-500/30 data-[state=active]:bg-orange-500/40 data-[state=active]:text-orange-100 data-[state=active]:border-orange-700'
                  contentClassName='bg-orange-950/30 border border-orange-500/30 rounded-lg p-4 mt-3'
                >
                  <TabsList className='border-orange-300/50'>
                    <TabsTrigger value='custom1'>Custom Tab 1</TabsTrigger>
                    <TabsTrigger value='custom2'>Custom Tab 2</TabsTrigger>
                    <TabsTrigger value='custom3'>Custom Tab 3</TabsTrigger>
                  </TabsList>
                  <TabsContent value='custom1'>
                    <h4 className='font-semibold mb-3'>Custom Styled Content</h4>
                    <p className='mb-3'>
                      This example demonstrates how to use `triggersClassName` and `contentClassName` to apply custom
                      orange styling to your tabs.
                    </p>
                    <div className='bg-orange-900/20 p-3 rounded border border-orange-500/20'>
                      <p className='text-sm text-orange-200'>
                        The triggers have custom orange backgrounds with hover and active states.
                      </p>
                    </div>
                  </TabsContent>
                  <TabsContent value='custom2'>
                    <h4 className='font-semibold mb-3'>Simple Orange Theme</h4>
                    <p className='mb-3'>The content area uses an orange-themed background for a cohesive look.</p>
                    <p className='text-sm text-orange-200'>
                      This shows how easy it is to customize the appearance while keeping all functionality intact.
                    </p>
                  </TabsContent>
                  <TabsContent value='custom3'>
                    <h4 className='font-semibold mb-3'>Consistent Styling</h4>
                    <p className='mb-3'>All tabs maintain the same orange theme for a unified design.</p>
                    <p className='text-sm text-orange-200'>
                      Both `triggersClassName` and `contentClassName` work together to create a cohesive orange theme.
                    </p>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>

          <div id='carousel-section'>
            <h3 className='mb-2'>Carousel</h3>

            <h4 className='mb-2 text-lg'>Basic Carousel</h4>
            <div className='space-y-6'>
              <div className='bg-slate-800 p-4 rounded'>
                <p className='text-sm text-gray-400 mb-2'>Basic carousel with 3 items</p>
                <Carousel className='w-full max-w-md mx-auto'>
                  <div className='bg-gradient-to-br from-blue-500 to-purple-600 h-48 rounded-lg flex items-center justify-center text-white text-xl font-semibold'>
                    Slide 1
                  </div>
                  <div className='bg-gradient-to-br from-green-500 to-teal-600 h-48 rounded-lg flex items-center justify-center text-white text-xl font-semibold'>
                    Slide 2
                  </div>
                  <div className='bg-gradient-to-br from-orange-500 to-red-600 h-48 rounded-lg flex items-center justify-center text-white text-xl font-semibold'>
                    Slide 3
                  </div>
                </Carousel>
              </div>
            </div>

            <h4 className='mb-2 text-lg mt-6'>Auto-scroll Carousel</h4>
            <div className='space-y-6'>
              <div className='bg-slate-800 p-4 rounded'>
                <p className='text-sm text-gray-400 mb-2'>Auto-scrolls every 2 seconds, pauses on hover</p>
                <Carousel 
                  className='w-full max-w-md mx-auto' 
                  autoScroll={true}
                  scrollInterval={2000}
                  pauseScrollOnHover={true}
                >
                  <div className='bg-gradient-to-br from-pink-500 to-rose-600 h-48 rounded-lg flex items-center justify-center text-white text-xl font-semibold'>
                    Auto Slide 1
                  </div>
                  <div className='bg-gradient-to-br from-indigo-500 to-blue-600 h-48 rounded-lg flex items-center justify-center text-white text-xl font-semibold'>
                    Auto Slide 2
                  </div>
                  <div className='bg-gradient-to-br from-yellow-500 to-orange-600 h-48 rounded-lg flex items-center justify-center text-white text-xl font-semibold'>
                    Auto Slide 3
                  </div>
                  <div className='bg-gradient-to-br from-purple-500 to-pink-600 h-48 rounded-lg flex items-center justify-center text-white text-xl font-semibold'>
                    Auto Slide 4
                  </div>
                </Carousel>
              </div>
            </div>

            <h4 className='mb-2 text-lg mt-6'>Multiple Items Carousel</h4>
            <div className='space-y-6'>
              <div className='bg-slate-800 p-4 rounded'>
                <p className='text-sm text-gray-400 mb-2'>Shows 2 items at once</p>
                <Carousel 
                  className='w-full max-w-2xl mx-auto' 
                  itemsToShow={2}
                >
                  {Array.from({ length: 6 }, (_, i) => (
                    <div 
                      key={i}
                      className={`h-32 rounded-lg flex items-center justify-center text-white text-lg font-semibold mx-2 ${
                        ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500'][i]
                      }`}
                    >
                      Item {i + 1}
                    </div>
                  ))}
                </Carousel>
              </div>
            </div>

            <h4 className='mb-2 text-lg mt-6'>Responsive Breakpoint Carousel</h4>
            <div className='space-y-6'>
              <div className='bg-slate-800 p-4 rounded'>
                <p className='text-sm text-gray-400 mb-2'>Responsive using breakpoint object: 1 on mobile, 2 on md, 3 on lg, 4 on xl</p>
                <Carousel 
                  className='w-full max-w-4xl mx-auto' 
                  itemsToShow={{ md: 2, lg: 3, xl: 4 }}
                >
                  {Array.from({ length: 8 }, (_, i) => (
                    <div 
                      key={i}
                      className={`h-40 rounded-lg flex flex-col items-center justify-center text-white text-lg font-semibold mx-2 ${
                        ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500'][i]
                      }`}
                    >
                      <div className='text-2xl font-bold'>#{i + 1}</div>
                      <div className='text-sm'>Responsive Item</div>
                    </div>
                  ))}
                </Carousel>
                <p className='text-xs text-gray-500 mt-2'>
                  Resize your browser window to see how the number of visible items changes
                </p>
              </div>
            </div>

            <h4 className='mb-2 text-lg mt-6'>Complex Responsive Layout</h4>
            <div className='space-y-6'>
              <div className='bg-slate-800 p-4 rounded'>
                <p className='text-sm text-gray-400 mb-2'>Advanced: 1 on mobile, 2 on sm, 3 on md, 4 on lg, 6 on xl+</p>
                <Carousel 
                  className='w-full max-w-6xl mx-auto' 
                  itemsToShow={{ sm: 2, md: 3, lg: 4, xl: 6 }}
                  autoScroll={true}
                  scrollInterval={4000}
                >
                  {Array.from({ length: 12 }, (_, i) => (
                    <div 
                      key={i}
                      className='bg-gradient-to-br from-gray-600 to-gray-800 h-24 rounded-md flex items-center justify-center text-white text-sm font-semibold border border-gray-500 mx-1'
                    >
                      Card {i + 1}
                    </div>
                  ))}
                </Carousel>
                <p className='text-xs text-gray-500 mt-2'>
                  This carousel automatically adjusts from 1 item on mobile up to 6 items on extra-large screens
                </p>
              </div>
            </div>

            <h4 className='mb-2 text-lg mt-6'>Custom Styled Carousel</h4>
            <div className='space-y-6'>
              <div className='bg-slate-800 p-4 rounded'>
                <p className='text-sm text-gray-400 mb-2'>Large buttons, ghost variant, no infinite scroll</p>
                <Carousel 
                  className='w-full max-w-lg mx-auto' 
                  buttonSize='lg'
                  buttonVariant='ghost'
                  infinite={false}
                >
                  <div className='bg-slate-700 border-2 border-slate-600 h-40 rounded-lg flex flex-col items-center justify-center text-white'>
                    <h4 className='text-xl font-bold mb-2'>Card 1</h4>
                    <p className='text-slate-300'>First card content</p>
                  </div>
                  <div className='bg-slate-700 border-2 border-slate-600 h-40 rounded-lg flex flex-col items-center justify-center text-white'>
                    <h4 className='text-xl font-bold mb-2'>Card 2</h4>
                    <p className='text-slate-300'>Second card content</p>
                  </div>
                  <div className='bg-slate-700 border-2 border-slate-600 h-40 rounded-lg flex flex-col items-center justify-center text-white'>
                    <h4 className='text-xl font-bold mb-2'>Card 3</h4>
                    <p className='text-slate-300'>Third card content</p>
                  </div>
                </Carousel>
              </div>
            </div>

            <h4 className='mb-2 text-lg mt-6'>Hidden Navigation Carousel</h4>
            <div className='space-y-6'>
              <div className='bg-slate-800 p-4 rounded'>
                <p className='text-sm text-gray-400 mb-2'>Navigation buttons hidden, only dots for navigation</p>
                <Carousel 
                  className='w-full max-w-md mx-auto' 
                  hidePrevNext={true}
                >
                  <div className='bg-gradient-to-r from-cyan-500 to-blue-500 h-48 rounded-lg flex items-center justify-center text-white text-xl font-semibold'>
                    Slide A
                  </div>
                  <div className='bg-gradient-to-r from-emerald-500 to-green-500 h-48 rounded-lg flex items-center justify-center text-white text-xl font-semibold'>
                    Slide B
                  </div>
                  <div className='bg-gradient-to-r from-violet-500 to-purple-500 h-48 rounded-lg flex items-center justify-center text-white text-xl font-semibold'>
                    Slide C
                  </div>
                </Carousel>
              </div>
            </div>

            <h4 className='mb-2 text-lg mt-6'>Button Positioning Options</h4>
            <div className='space-y-6'>
              <div className='bg-slate-800 p-4 rounded'>
                <p className='text-sm text-gray-400 mb-2'>Aligned (default) - buttons aligned with carousel edges</p>
                <Carousel 
                  className='w-full max-w-md mx-auto' 
                  buttonPosition='aligned'
                >
                  <div className='bg-gradient-to-br from-blue-500 to-purple-600 h-48 rounded-lg flex items-center justify-center text-white text-xl font-semibold'>
                    Aligned 1
                  </div>
                  <div className='bg-gradient-to-br from-green-500 to-teal-600 h-48 rounded-lg flex items-center justify-center text-white text-xl font-semibold'>
                    Aligned 2
                  </div>
                  <div className='bg-gradient-to-br from-orange-500 to-red-600 h-48 rounded-lg flex items-center justify-center text-white text-xl font-semibold'>
                    Aligned 3
                  </div>
                </Carousel>
              </div>

              <div className='bg-slate-800 p-4 rounded'>
                <p className='text-sm text-gray-400 mb-2'>Exterior - buttons positioned outside the carousel</p>
                <div className='px-16'> {/* Add padding to accommodate exterior buttons */}
                  <Carousel 
                    className='w-full max-w-md mx-auto' 
                    buttonPosition='exterior'
                    buttonVariant='outline'
                  >
                    <div className='bg-gradient-to-br from-pink-500 to-rose-600 h-48 rounded-lg flex items-center justify-center text-white text-xl font-semibold'>
                      Exterior 1
                    </div>
                    <div className='bg-gradient-to-br from-indigo-500 to-blue-600 h-48 rounded-lg flex items-center justify-center text-white text-xl font-semibold'>
                      Exterior 2
                    </div>
                    <div className='bg-gradient-to-br from-yellow-500 to-orange-600 h-48 rounded-lg flex items-center justify-center text-white text-xl font-semibold'>
                      Exterior 3
                    </div>
                  </Carousel>
                </div>
              </div>

              <div className='bg-slate-800 p-4 rounded'>
                <p className='text-sm text-gray-400 mb-2'>Interior - buttons positioned further inside the carousel</p>
                <Carousel 
                  className='w-full max-w-md mx-auto' 
                  buttonPosition='interior'
                  buttonVariant='ghost'
                  buttonSize='lg'
                >
                  <div className='bg-gradient-to-br from-purple-500 to-pink-600 h-48 rounded-lg flex items-center justify-center text-white text-xl font-semibold'>
                    Interior 1
                  </div>
                  <div className='bg-gradient-to-br from-cyan-500 to-blue-600 h-48 rounded-lg flex items-center justify-center text-white text-xl font-semibold'>
                    Interior 2
                  </div>
                  <div className='bg-gradient-to-br from-emerald-500 to-teal-600 h-48 rounded-lg flex items-center justify-center text-white text-xl font-semibold'>
                    Interior 3
                  </div>
                </Carousel>
              </div>
            </div>

            <h4 className='mb-2 text-lg mt-6'>Custom Button Content</h4>
            <div className='space-y-6'>
              <div className='bg-slate-800 p-4 rounded'>
                <p className='text-sm text-gray-400 mb-2'>Custom previous and next button content</p>
                <Carousel 
                  className='w-full max-w-md mx-auto'
                  prevButton={<span className='text-xl'>←</span>}
                  nextButton={<span className='text-xl'>→</span>}
                  buttonVariant='outline'
                >
                  <div className='bg-gradient-to-br from-amber-500 to-yellow-600 h-48 rounded-lg flex items-center justify-center text-white text-xl font-semibold'>
                    Custom 1
                  </div>
                  <div className='bg-gradient-to-br from-teal-500 to-cyan-600 h-48 rounded-lg flex items-center justify-center text-white text-xl font-semibold'>
                    Custom 2
                  </div>
                  <div className='bg-gradient-to-br from-rose-500 to-pink-600 h-48 rounded-lg flex items-center justify-center text-white text-xl font-semibold'>
                    Custom 3
                  </div>
                </Carousel>
              </div>
            </div>
          </div>

          <div id='scroll-area-section'>
            <h3 className='mb-2'>Scroll Area</h3>

            <h4 className='mb-2 text-lg'>Basic Examples</h4>
            <div className='space-y-6'>
              <div className='bg-slate-800 p-4 rounded'>
                <p className='text-sm text-gray-400 mb-2'>Fixed height with vertical scroll</p>
                <ScrollArea className='h-48 w-full border border-slate-600 rounded'>
                  <div className='p-4'>
                    <h4 className='font-semibold mb-2'>Long Content</h4>
                    <p className='mb-4'>
                      This is a scroll area with a fixed height of 12rem (h-48). When the content exceeds this height, a
                      vertical scrollbar will appear.
                    </p>
                    <p className='mb-4'>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                      nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <p className='mb-4'>
                      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                      pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                      mollit anim id est laborum.
                    </p>
                    <p className='mb-4'>
                      Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
                      totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae
                      dicta sunt explicabo.
                    </p>
                    <p className='mb-4'>
                      Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur
                      magni dolores eos qui ratione voluptatem sequi nesciunt.
                    </p>
                    <p>
                      At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum
                      deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non
                      provident.
                    </p>
                  </div>
                </ScrollArea>
              </div>

              <div className='bg-slate-800 p-4 rounded'>
                <p className='text-sm text-gray-400 mb-2'>Fixed width with horizontal scroll</p>
                <ScrollArea className='h-24 w-full border border-slate-600 rounded'>
                  <div className='p-4 w-[800px]'>
                    <h4 className='font-semibold mb-2'>Wide Content</h4>
                    <p>
                      This content is intentionally wider than the container (800px) to demonstrate horizontal
                      scrolling. You can scroll horizontally to see more content. This is useful for tables, code
                      blocks, or any wide content that doesn&apos;t fit in the available space.
                    </p>
                  </div>
                </ScrollArea>
              </div>
            </div>

            <h4 className='mb-2 text-lg mt-6'>Custom Thumb Styling</h4>
            <div className='space-y-6'>
              <div className='bg-slate-800 p-4 rounded'>
                <p className='text-sm text-gray-400 mb-2'>Custom green thumb</p>
                <ScrollArea
                  className='h-32 w-full border border-slate-600 rounded'
                  thumbClassName='!bg-green-500 hover:!bg-green-400 active:!bg-green-600'
                >
                  <div className='p-4'>
                    <h4 className='font-semibold mb-2'>Custom Green Scrollbar</h4>
                    <p className='mb-4'>
                      This scroll area uses a custom green thumb via the `thumbClassName` prop. The thumb changes color
                      on hover and when active.
                    </p>
                    <p className='mb-4'>
                      You can customize the scrollbar appearance to match your design system or brand colors.
                    </p>
                    <p className='mb-4'>
                      The scrollbar automatically appears when content overflows and disappears when it doesn&apos;t.
                    </p>
                    <p>
                      Try scrolling to see the green thumb in action. The smooth transitions make the interaction feel
                      polished.
                    </p>
                  </div>
                </ScrollArea>
              </div>

              <div className='bg-slate-800 p-4 rounded'>
                <p className='text-sm text-gray-400 mb-2'>Gradient thumb</p>
                <ScrollArea
                  className='h-32 w-full border border-slate-600 rounded'
                  thumbClassName='bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400'
                >
                  <div className='p-4'>
                    <h4 className='font-semibold mb-2'>Gradient Scrollbar</h4>
                    <p className='mb-4'>
                      This scroll area features a gradient thumb that transitions from purple to pink.
                    </p>
                    <p className='mb-4'>
                      The gradient changes on hover, creating a dynamic and visually appealing scrollbar.
                    </p>
                    <p className='mb-4'>You can use any Tailwind gradient utilities in the `thumbClassName` prop.</p>
                    <p>Gradients can help make your scrollbars stand out and match your app&apos;s visual theme.</p>
                  </div>
                </ScrollArea>
              </div>
            </div>

            <h4 className='mb-2 text-lg mt-6'>Different Sizes</h4>
            <div className='space-y-6'>
              <div className='bg-slate-800 p-4 rounded'>
                <p className='text-sm text-gray-400 mb-2'>Small scroll area</p>
                <ScrollArea className='h-20 w-64 border border-slate-600 rounded'>
                  <div className='p-4'>
                    <p>
                      Small scroll area perfect for compact spaces. This demonstrates how the scrollbar adapts to
                      different container sizes.
                    </p>
                    <p className='mt-2'>More content here to make it scrollable.</p>
                  </div>
                </ScrollArea>
              </div>

              <div className='bg-slate-800 p-4 rounded'>
                <p className='text-sm text-gray-400 mb-2'>Large scroll area</p>
                <ScrollArea className='h-64 w-full border border-slate-600 rounded'>
                  <div className='p-6'>
                    <h4 className='font-semibold mb-4'>Large Scroll Area</h4>
                    <div className='grid grid-cols-2 gap-4 mb-4'>
                      <div className='bg-slate-700 p-3 rounded'>
                        <h5 className='font-medium mb-2'>Feature 1</h5>
                        <p className='text-sm text-gray-300'>
                          Description of feature 1 with some details about what it does.
                        </p>
                      </div>
                      <div className='bg-slate-700 p-3 rounded'>
                        <h5 className='font-medium mb-2'>Feature 2</h5>
                        <p className='text-sm text-gray-300'>
                          Description of feature 2 with some details about what it does.
                        </p>
                      </div>
                      <div className='bg-slate-700 p-3 rounded'>
                        <h5 className='font-medium mb-2'>Feature 3</h5>
                        <p className='text-sm text-gray-300'>
                          Description of feature 3 with some details about what it does.
                        </p>
                      </div>
                      <div className='bg-slate-700 p-3 rounded'>
                        <h5 className='font-medium mb-2'>Feature 4</h5>
                        <p className='text-sm text-gray-300'>
                          Description of feature 4 with some details about what it does.
                        </p>
                      </div>
                    </div>
                    <p>
                      This larger scroll area can accommodate more complex layouts and content structures. The scrollbar
                      remains proportional to the content size.
                    </p>
                  </div>
                </ScrollArea>
              </div>
            </div>

            <h4 className='mb-2 text-lg mt-6'>Scrollbar Thickness</h4>
            <div className='space-y-6'>
              <div className='bg-slate-800 p-4 rounded'>
                <p className='text-sm text-gray-400 mb-2'>Thin scrollbars (6px)</p>
                <ScrollArea
                  className='h-32 w-full border border-slate-600 rounded'
                  scrollbarThickness={6}
                  thumbClassName='bg-blue-500 hover:bg-blue-400'
                >
                  <div className='p-4 w-[800px]'>
                    <h4 className='font-semibold mb-2'>Thin Scrollbars</h4>
                    <p className='mb-4'>
                      This scroll area uses thin 6px scrollbars, perfect for modern, minimalist designs where you want
                      scrollbars to be less prominent.
                    </p>
                    <p className='mb-4'>
                      The thin scrollbars take up less space while still providing clear visual feedback about scroll
                      position.
                    </p>
                    <p className='mb-4'>
                      Great for applications where screen real estate is valuable and you want a clean, unobtrusive
                      scrolling experience.
                    </p>
                    <p>You can still easily interact with them despite their smaller size.</p>
                  </div>
                </ScrollArea>
              </div>
              <div className='bg-slate-800 p-4 rounded'>
                <p className='text-sm text-gray-400 mb-2'>Custom extra-thick scrollbars (24px)</p>
                <ScrollArea
                  className='h-32 w-full border border-slate-600 rounded'
                  scrollbarThickness={24}
                  thumbClassName='bg-gradient-to-br from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400'
                >
                  <div className='p-4'>
                    <h4 className='font-semibold mb-2'>Extra-Thick Custom Scrollbars</h4>
                    <p className='mb-4'>
                      This demonstrates 24px scrollbars with a custom gradient thumb, showing how you can create bold,
                      highly visible scroll indicators.
                    </p>
                    <p className='mb-4'>
                      Extra-thick scrollbars work well for specialized applications, kiosk interfaces, or when
                      scrollbars are a key part of your design language.
                    </p>
                    <p className='mb-4'>
                      The combination of custom thickness and gradient styling creates a unique, branded scrolling
                      experience.
                    </p>
                    <p>You have complete control over both the size and appearance of your scrollbars.</p>
                  </div>
                </ScrollArea>
              </div>
            </div>

            <h4 className='mb-2 text-lg mt-6'>Practical Examples</h4>
            <div className='space-y-6'>
              <div className='bg-slate-800 p-4 rounded'>
                <p className='text-sm text-gray-400 mb-2'>Code block example</p>
                <ScrollArea className='h-40 w-full border border-slate-600 rounded bg-black'>
                  <pre className='p-4 text-sm text-green-400 font-mono text-left'>
                    <code>{`function createScrollArea() {
  const scrollArea = document.createElement('div');
  scrollArea.className = 'scroll-area';
  
  const viewport = document.createElement('div');
  viewport.className = 'viewport';
  
  const content = document.createElement('div');
  content.className = 'content';
  
  // Add some sample content
  for (let i = 0; i < 50; i++) {
    const line = document.createElement('div');
    line.textContent = \`Line \${i + 1}: Some code content here\`;
    content.appendChild(line);
  }
  
  viewport.appendChild(content);
  scrollArea.appendChild(viewport);
  
  return scrollArea;
}

// Usage
const container = document.getElementById('app');
const scrollableCode = createScrollArea();
container.appendChild(scrollableCode);

// Event handlers
scrollableCode.addEventListener('scroll', (e) => {
  console.log('Scrolled to:', e.target.scrollTop);
});`}</code>
                  </pre>
                </ScrollArea>
              </div>

              <div className='bg-slate-800 p-4 rounded'>
                <p className='text-sm text-gray-400 mb-2'>Chat messages example</p>
                <ScrollArea className='h-48 w-full border border-slate-600 rounded bg-slate-900'>
                  <div className='p-4 space-y-3'>
                    {Array.from({ length: 15 }, (_, i) => (
                      <div key={i} className={`flex ${i % 3 === 0 ? 'justify-end' : 'justify-start'}`}>
                        <div
                          className={`max-w-xs p-2 rounded-lg ${
                            i % 3 === 0 ? 'bg-blue-600 text-white' : 'bg-slate-700 text-gray-200'
                          }`}
                        >
                          <p className='text-sm'>
                            {i % 3 === 0
                              ? `This is my message ${i + 1}. I'm sending a response here.`
                              : `This is message ${i + 1} from another user. Here's some chat content.`}
                          </p>
                          <p className='text-xs opacity-70 mt-1'>
                            {new Date(Date.now() - (15 - i) * 60000).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
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
