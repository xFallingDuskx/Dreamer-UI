import { useState } from 'react';
import { Drawer } from '@moondreamsdev/dreamer-ui/components';
import { ComponentPage } from '../../components/layout/ComponentPage';

const tableOfContents = [
  { id: 'import', title: 'Import', level: 1 },
  { id: 'examples', title: 'Examples', level: 1 },
  { id: 'basic-usage', title: 'Basic Usage', level: 2 },
  { id: 'with-footer', title: 'With Footer', level: 2 },
  { id: 'with-close-button', title: 'With Close Button', level: 2 },
  { id: 'drag-gestures', title: 'Drag Gestures', level: 2 },
  { id: 'usage-patterns', title: 'Usage Patterns', level: 2 },
  { id: 'props', title: 'Props', level: 1 },
  { id: 'keyboard-shortcuts', title: 'Keyboard Shortcuts', level: 1 },
];

const drawerProps = [
  {
    name: 'isOpen',
    type: 'boolean',
    description: 'Whether the drawer is open.',
    required: true,
  },
  {
    name: 'onClose',
    type: '() => void',
    description: 'Callback fired when the drawer should close.',
    required: true,
  },
  {
    name: 'title',
    type: 'React.ReactNode',
    description: 'Optional title for the drawer header.',
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'The content to display inside the drawer.',
    required: true,
  },
  {
    name: 'footer',
    type: 'React.ReactNode',
    description: 'Optional footer content for the drawer.',
  },
  {
    name: 'showCloseButton',
    type: 'boolean',
    default: 'false',
    description: 'Whether to show the close button in the top-right corner.',
  },
  {
    name: 'enableDragGestures',
    type: 'boolean',
    default: 'true',
    description: 'Whether to enable drag gestures on the notch for closing.',
  },
  {
    name: 'disableCloseOnOverlayClick',
    type: 'boolean',
    default: 'false',
    description: 'Whether to disable closing when clicking the overlay.',
  },
  {
    name: 'className',
    type: 'string',
    description: 'Additional CSS classes to apply to the drawer.',
  },
  {
    name: 'overlayClassName',
    type: 'string',
    description: 'Additional CSS classes to apply to the overlay.',
  },
  {
    name: 'id',
    type: 'string',
    description: 'Unique identifier for the drawer.',
  },
  {
    name: 'ref',
    type: 'React.Ref<HTMLDivElement>',
    description: 'Reference to the drawer element.',
  },
];

function BasicDrawerExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button 
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Open Basic Drawer
      </button>
      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Basic Drawer"
      >
        <div className="space-y-4">
          <p>This is a basic drawer that slides up from the bottom of the screen.</p>
          <p>Click the overlay or drag the notch down to close it.</p>
        </div>
      </Drawer>
    </div>
  );
}

function DrawerWithFooterExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button 
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
      >
        Open Drawer with Footer
      </button>
      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Drawer with Footer"
        footer={
          <div className="flex justify-end gap-2">
            <button 
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              Cancel
            </button>
            <button 
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        }
      >
        <div className="space-y-4">
          <p>This drawer includes a footer with action buttons.</p>
          <div className="space-y-2">
            <input placeholder="Enter your name" className="w-full p-2 border rounded" />
            <textarea placeholder="Enter a description" className="w-full p-2 border rounded" rows={3}></textarea>
          </div>
        </div>
      </Drawer>
    </div>
  );
}

function DrawerWithCloseButtonExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button 
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
      >
        Open Drawer with Close Button
      </button>
      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Drawer with Close Button"
        showCloseButton={true}
      >
        <div className="space-y-4">
          <p>This drawer has a close button in the top-right corner.</p>
          <p>You can close it by:</p>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Clicking the X button</li>
            <li>Clicking the overlay</li>
            <li>Dragging the notch down</li>
            <li>Pressing the Escape key</li>
          </ul>
        </div>
      </Drawer>
    </div>
  );
}

function DragGesturesExample() {
  const [isOpen, setIsOpen] = useState(false);
  const [dragEnabled, setDragEnabled] = useState(true);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <label className="flex items-center gap-2">
          <input 
            type="checkbox" 
            checked={dragEnabled} 
            onChange={(e) => setDragEnabled(e.target.checked)}
          />
          Enable drag gestures
        </label>
      </div>
      <button 
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
      >
        Open Drawer (Drag: {dragEnabled ? 'Enabled' : 'Disabled'})
      </button>
      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={`Drag Gestures ${dragEnabled ? 'Enabled' : 'Disabled'}`}
        enableDragGestures={dragEnabled}
      >
        <div className="space-y-4">
          <p>
            Drag gestures are currently <strong>{dragEnabled ? 'enabled' : 'disabled'}</strong>.
          </p>
          {dragEnabled ? (
            <p>Try dragging the notch at the top to close the drawer.</p>
          ) : (
            <p>The drag notch is hidden when drag gestures are disabled.</p>
          )}
        </div>
      </Drawer>
    </div>
  );
}

function UsagePatternsExample() {
  const [activeDrawer, setActiveDrawer] = useState<string | null>(null);

  const openDrawer = (drawer: string) => setActiveDrawer(drawer);
  const closeDrawer = () => setActiveDrawer(null);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button 
          onClick={() => openDrawer('settings')}
          className="p-4 bg-gray-800 text-white rounded-lg hover:bg-gray-700 text-left"
        >
          <h4 className="font-semibold">Settings Panel</h4>
          <p className="text-sm text-gray-400">Configure app preferences</p>
        </button>
        
        <button 
          onClick={() => openDrawer('profile')}
          className="p-4 bg-gray-800 text-white rounded-lg hover:bg-gray-700 text-left"
        >
          <h4 className="font-semibold">User Profile</h4>
          <p className="text-sm text-gray-400">View and edit profile</p>
        </button>
        
        <button 
          onClick={() => openDrawer('cart')}
          className="p-4 bg-gray-800 text-white rounded-lg hover:bg-gray-700 text-left"
        >
          <h4 className="font-semibold">Shopping Cart</h4>
          <p className="text-sm text-gray-400">Review your items</p>
        </button>
        
        <button 
          onClick={() => openDrawer('help')}
          className="p-4 bg-gray-800 text-white rounded-lg hover:bg-gray-700 text-left"
        >
          <h4 className="font-semibold">Help & Support</h4>
          <p className="text-sm text-gray-400">Get assistance</p>
        </button>
      </div>

      {/* Settings Drawer */}
      <Drawer
        isOpen={activeDrawer === 'settings'}
        onClose={closeDrawer}
        title="Settings"
        showCloseButton={true}
      >
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-semibold">Preferences</h3>
            <div className="space-y-3">
              <label className="flex items-center justify-between">
                <span>Dark mode</span>
                <input type="checkbox" defaultChecked />
              </label>
              <label className="flex items-center justify-between">
                <span>Notifications</span>
                <input type="checkbox" defaultChecked />
              </label>
              <label className="flex items-center justify-between">
                <span>Auto-save</span>
                <input type="checkbox" />
              </label>
            </div>
          </div>
        </div>
      </Drawer>

      {/* Profile Drawer */}
      <Drawer
        isOpen={activeDrawer === 'profile'}
        onClose={closeDrawer}
        title="User Profile"
        footer={
          <button 
            onClick={closeDrawer}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Save Changes
          </button>
        }
      >
        <div className="space-y-4">
          <div className="text-center">
            <div className="w-20 h-20 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
              JD
            </div>
            <h3 className="text-lg font-semibold">John Doe</h3>
            <p className="text-gray-600">john.doe@example.com</p>
          </div>
          <div className="space-y-3">
            <input placeholder="Display Name" defaultValue="John Doe" className="w-full p-2 border rounded" />
            <input placeholder="Email" defaultValue="john.doe@example.com" className="w-full p-2 border rounded" />
            <textarea placeholder="Bio" className="w-full p-2 border rounded" rows={3}></textarea>
          </div>
        </div>
      </Drawer>

      {/* Cart Drawer */}
      <Drawer
        isOpen={activeDrawer === 'cart'}
        onClose={closeDrawer}
        title="Shopping Cart (2 items)"
        footer={
          <div className="space-y-2">
            <div className="flex justify-between font-semibold">
              <span>Total: $49.98</span>
            </div>
            <button 
              onClick={closeDrawer}
              className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Proceed to Checkout
            </button>
          </div>
        }
      >
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-3 border rounded">
            <div className="w-16 h-16 bg-gray-200 rounded"></div>
            <div className="flex-1">
              <h4 className="font-medium">Product 1</h4>
              <p className="text-sm text-gray-600">$24.99</p>
            </div>
            <button className="text-red-500 hover:text-red-700">Remove</button>
          </div>
          <div className="flex items-center gap-4 p-3 border rounded">
            <div className="w-16 h-16 bg-gray-200 rounded"></div>
            <div className="flex-1">
              <h4 className="font-medium">Product 2</h4>
              <p className="text-sm text-gray-600">$24.99</p>
            </div>
            <button className="text-red-500 hover:text-red-700">Remove</button>
          </div>
        </div>
      </Drawer>

      {/* Help Drawer */}
      <Drawer
        isOpen={activeDrawer === 'help'}
        onClose={closeDrawer}
        title="Help & Support"
        showCloseButton={true}
      >
        <div className="space-y-6">
          <div className="space-y-4">
            <button className="w-full text-left p-3 border rounded hover:bg-gray-50">
              <h4 className="font-medium">Frequently Asked Questions</h4>
              <p className="text-sm text-gray-600">Find answers to common questions</p>
            </button>
            <button className="w-full text-left p-3 border rounded hover:bg-gray-50">
              <h4 className="font-medium">Contact Support</h4>
              <p className="text-sm text-gray-600">Get in touch with our team</p>
            </button>
            <button className="w-full text-left p-3 border rounded hover:bg-gray-50">
              <h4 className="font-medium">User Guide</h4>
              <p className="text-sm text-gray-600">Learn how to use the app</p>
            </button>
          </div>
        </div>
      </Drawer>
    </div>
  );
}

const drawerExamples = [
  {
    id: 'basic-usage',
    title: 'Basic Usage',
    description: 'Simple drawer that slides up from the bottom.',
    code: `function BasicDrawerExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>
        Open Drawer
      </button>
      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Basic Drawer"
      >
        <p>This is a basic drawer content.</p>
      </Drawer>
    </div>
  );
}`,
    children: <BasicDrawerExample />,
  },
  {
    id: 'with-footer',
    title: 'With Footer',
    description: 'Drawer with action buttons in the footer.',
    code: `function DrawerWithFooterExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>
        Open Drawer with Footer
      </button>
      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Drawer with Footer"
        footer={
          <div className="flex justify-end gap-2">
            <button onClick={() => setIsOpen(false)}>Cancel</button>
            <button onClick={() => setIsOpen(false)}>Save</button>
          </div>
        }
      >
        <div className="space-y-4">
          <input placeholder="Enter your name" />
          <textarea placeholder="Enter a description" rows={3} />
        </div>
      </Drawer>
    </div>
  );
}`,
    children: <DrawerWithFooterExample />,
  },
  {
    id: 'with-close-button',
    title: 'With Close Button',
    description: 'Drawer with an explicit close button in the header.',
    code: `function DrawerWithCloseButtonExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>
        Open Drawer with Close Button
      </button>
      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Drawer with Close Button"
        showCloseButton={true}
      >
        <p>This drawer has a close button in the top-right corner.</p>
      </Drawer>
    </div>
  );
}`,
    children: <DrawerWithCloseButtonExample />,
  },
  {
    id: 'drag-gestures',
    title: 'Drag Gestures',
    description: 'Control whether users can drag to close the drawer.',
    code: `function DragGesturesExample() {
  const [isOpen, setIsOpen] = useState(false);
  const [dragEnabled, setDragEnabled] = useState(true);

  return (
    <div className="space-y-4">
      <label className="flex items-center gap-2">
        <input 
          type="checkbox" 
          checked={dragEnabled} 
          onChange={(e) => setDragEnabled(e.target.checked)}
        />
        Enable drag gestures
      </label>
      <button onClick={() => setIsOpen(true)}>
        Open Drawer
      </button>
      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Drag Gestures Demo"
        enableDragGestures={dragEnabled}
      >
        <p>
          Drag gestures are {dragEnabled ? 'enabled' : 'disabled'}.
          {dragEnabled && ' Try dragging the notch to close.'}
        </p>
      </Drawer>
    </div>
  );
}`,
    children: <DragGesturesExample />,
  },
  {
    id: 'usage-patterns',
    title: 'Usage Patterns',
    description: 'Common use cases for drawer components.',
    code: `function UsagePatternsExample() {
  const [activeDrawer, setActiveDrawer] = useState(null);

  return (
    <div>
      <button onClick={() => setActiveDrawer('settings')}>
        Settings
      </button>
      <button onClick={() => setActiveDrawer('profile')}>
        Profile
      </button>
      
      <Drawer
        isOpen={activeDrawer === 'settings'}
        onClose={() => setActiveDrawer(null)}
        title="Settings"
      >
        {/* Settings content */}
      </Drawer>
      
      <Drawer
        isOpen={activeDrawer === 'profile'}
        onClose={() => setActiveDrawer(null)}
        title="Profile"
      >
        {/* Profile content */}
      </Drawer>
    </div>
  );
}`,
    children: <UsagePatternsExample />,
  },
];

const drawerKeyboardShortcuts = [
  {
    keys: 'Escape',
    description: 'Close the drawer when it has focus',
  },
  {
    keys: 'Arrow Down',
    description: 'Close the drawer when drag handle is focused',
  },
  {
    keys: 'Tab',
    description: 'Navigate between focusable elements within the drawer',
  },
];

export function DrawerPage() {
  return (
    <ComponentPage
      title='Drawer'
      description='Bottom sheet component that slides up from the bottom of the screen for contextual content and actions.'
      tableOfContents={tableOfContents}
      usageInstructions='The Drawer component provides a sliding bottom sheet that appears from the bottom of the screen. Use it for mobile-friendly interfaces, settings panels, shopping carts, or any content that should overlay the main interface. It includes drag gestures, overlay handling, and accessibility features.'
      importStatement="import { Drawer } from '@moondreamsdev/dreamer-ui/components';"
      componentProps={drawerProps}
      keyboardShortcuts={drawerKeyboardShortcuts}
      examples={drawerExamples}
    />
  );
}