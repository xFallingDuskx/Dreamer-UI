import { useState } from 'react';
import { DropdownMenu, DropdownMenuFactories } from '@moondreamsdev/dreamer-ui/components';
import { ChevronDown, Plus, Copy, Download, Trash, Window } from '@moondreamsdev/dreamer-ui/symbols';
import { ComponentPage } from '../../components/layout/ComponentPage';

const tableOfContents = [
  { id: 'import', title: 'Import', level: 1 },
  { id: 'examples', title: 'Examples', level: 1 },
  { id: 'basic-usage', title: 'Basic Usage', level: 2 },
  { id: 'with-icons', title: 'With Icons & Shortcuts', level: 2 },
  { id: 'with-groups', title: 'With Groups', level: 2 },
  { id: 'with-submenus', title: 'With Submenus', level: 2 },
  { id: 'custom-items', title: 'Custom Items', level: 2 },
  { id: 'placement', title: 'Placement & Alignment', level: 2 },
  { id: 'usage-patterns', title: 'Usage Patterns', level: 2 },
  { id: 'props', title: 'Props', level: 1 },
  { id: 'keyboard-shortcuts', title: 'Keyboard Shortcuts', level: 1 },
];

const dropdownMenuProps = [
  {
    name: 'trigger',
    type: 'React.ReactNode',
    description: 'The element that triggers the dropdown menu.',
    required: true,
  },
  {
    name: 'items',
    type: 'DropdownMenuItem[]',
    description: 'Array of menu items created using DropdownMenuFactories.',
    required: true,
  },
  {
    name: 'onItemSelect',
    type: '(value: string) => void',
    description: 'Callback fired when a menu item is selected.',
  },
  {
    name: 'isOpen',
    type: 'boolean',
    description: 'Whether the dropdown is open (controlled mode).',
  },
  {
    name: 'onOpenChange',
    type: '(open: boolean) => void',
    description: 'Callback fired when dropdown open state changes.',
  },
  {
    name: 'placement',
    type: '"top" | "right" | "bottom" | "left"',
    default: '"bottom"',
    description: 'The preferred side of the trigger to render against.',
  },
  {
    name: 'alignment',
    type: '"start" | "center" | "end"',
    default: '"start"',
    description: 'The alignment of the menu relative to the trigger.',
  },
  {
    name: 'className',
    type: 'string',
    description: 'Additional CSS classes to apply to the dropdown menu.',
  },
  {
    name: 'id',
    type: 'string',
    description: 'Unique identifier for the dropdown menu.',
  },
];

function BasicUsageExample() {
  const { option } = DropdownMenuFactories;
  const [selectedValue, setSelectedValue] = useState<string>('');

  const basicItems = [
    option({ label: 'New Document', value: 'new' }),
    option({ label: 'Open Document', value: 'open' }),
    option({ label: 'Save Document', value: 'save' }),
    option({ label: 'Save As...', value: 'save-as' }),
  ];

  return (
    <div className="space-y-4">
      <DropdownMenu
        items={basicItems}
        onItemSelect={setSelectedValue}
        trigger={
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
            File <ChevronDown className="w-4 h-4" />
          </button>
        }
      />
      {selectedValue && (
        <p className="text-sm text-gray-600">Selected: {selectedValue}</p>
      )}
    </div>
  );
}

function WithIconsExample() {
  const { option } = DropdownMenuFactories;

  const iconItems = [
    option({ 
      label: 'New File', 
      value: 'new-file', 
      icon: <Plus className="w-4 h-4" />,
      keyboardShortcut: '⌘N' 
    }),
    option({ 
      label: 'Copy', 
      value: 'copy', 
      icon: <Copy className="w-4 h-4" />,
      keyboardShortcut: '⌘C' 
    }),
    option({ 
      label: 'Download', 
      value: 'download', 
      icon: <Download className="w-4 h-4" />,
      keyboardShortcut: '⌘D' 
    }),
    option({ 
      label: 'Delete', 
      value: 'delete', 
      icon: <Trash className="w-4 h-4" />,
      keyboardShortcut: '⌫',
      description: 'Permanently delete this item'
    }),
  ];

  return (
    <DropdownMenu
      items={iconItems}
      onItemSelect={(value) => console.log('Selected:', value)}
      trigger={
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2">
          Actions <ChevronDown className="w-4 h-4" />
        </button>
      }
    />
  );
}

function WithGroupsExample() {
  const { option, group, separator } = DropdownMenuFactories;

  const groupItems = [
    group([
      option({ label: 'New File', value: 'new-file' }),
      option({ label: 'Open File', value: 'open-file' }),
      option({ label: 'Recent Files', value: 'recent-files' }),
    ], 'File Operations'),
    
    group([
      option({ label: 'Cut', value: 'cut' }),
      option({ label: 'Copy', value: 'copy' }),
      option({ label: 'Paste', value: 'paste' }),
    ], 'Edit Operations'),
    
    separator(),
    
    group([
      option({ label: 'Settings', value: 'settings' }),
      option({ label: 'Help', value: 'help' }),
      option({ label: 'About', value: 'about' }),
    ]),
  ];

  return (
    <DropdownMenu
      items={groupItems}
      onItemSelect={(value) => console.log('Selected:', value)}
      trigger={
        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center gap-2">
          Menu <ChevronDown className="w-4 h-4" />
        </button>
      }
    />
  );
}

function WithSubmenusExample() {
  const { option, separator } = DropdownMenuFactories;

  const submenuItems = [
    option({
      label: 'Export',
      value: 'export',
      icon: <Download className="w-4 h-4" />,
      subItems: [
        option({ label: 'Export as PDF', value: 'export-pdf' }),
        option({ label: 'Export as CSV', value: 'export-csv' }),
        option({ label: 'Export as JSON', value: 'export-json' }),
        separator(),
        option({
          label: 'Advanced Export',
          value: 'advanced-export',
          subItems: [
            option({ label: 'Custom Format', value: 'custom-format' }),
            option({ label: 'Batch Export', value: 'batch-export' }),
          ],
        }),
      ],
    }),
    option({
      label: 'Import',
      value: 'import',
      icon: <Plus className="w-4 h-4" />,
      subItems: [
        option({ label: 'Import CSV', value: 'import-csv' }),
        option({ label: 'Import JSON', value: 'import-json' }),
        option({ label: 'Import XML', value: 'import-xml' }),
      ],
    }),
    separator(),
    option({ label: 'Close', value: 'close' }),
  ];

  return (
    <DropdownMenu
      items={submenuItems}
      onItemSelect={(value) => console.log('Selected:', value)}
      trigger={
        <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center gap-2">
          Data <ChevronDown className="w-4 h-4" />
        </button>
      }
    />
  );
}

function CustomItemsExample() {
  const { option, custom, separator } = DropdownMenuFactories;

  const customItems = [
    option({ label: 'Profile Settings', value: 'profile' }),
    option({ label: 'Account Settings', value: 'account' }),
    separator(),
    custom(() => (
      <div className="px-3 py-2 bg-blue-50 border border-blue-200 rounded mx-2 my-1">
        <div className="text-sm font-medium text-blue-800">Pro Feature</div>
        <div className="text-xs text-blue-600">Upgrade to access advanced features</div>
      </div>
    )),
    separator(),
    option({ label: 'Logout', value: 'logout' }),
  ];

  return (
    <DropdownMenu
      items={customItems}
      onItemSelect={(value) => console.log('Selected:', value)}
      trigger={
        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2">
          User Menu <ChevronDown className="w-4 h-4" />
        </button>
      }
    />
  );
}

function PlacementExample() {
  const { option } = DropdownMenuFactories;
  
  const items = [
    option({ label: 'Option 1', value: 'option1' }),
    option({ label: 'Option 2', value: 'option2' }),
    option({ label: 'Option 3', value: 'option3' }),
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <h4 className="font-medium">Top Placement</h4>
        <DropdownMenu
          items={items}
          onItemSelect={(value) => console.log('Selected:', value)}
          placement="top"
          trigger={
            <button className="px-3 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
              Top
            </button>
          }
        />
      </div>

      <div className="space-y-2">
        <h4 className="font-medium">Right Placement</h4>
        <DropdownMenu
          items={items}
          onItemSelect={(value) => console.log('Selected:', value)}
          placement="right"
          trigger={
            <button className="px-3 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
              Right
            </button>
          }
        />
      </div>

      <div className="space-y-2">
        <h4 className="font-medium">Center Aligned</h4>
        <DropdownMenu
          items={items}
          onItemSelect={(value) => console.log('Selected:', value)}
          alignment="center"
          trigger={
            <button className="px-3 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
              Center
            </button>
          }
        />
      </div>

      <div className="space-y-2">
        <h4 className="font-medium">End Aligned</h4>
        <DropdownMenu
          items={items}
          onItemSelect={(value) => console.log('Selected:', value)}
          alignment="end"
          trigger={
            <button className="px-3 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
              End
            </button>
          }
        />
      </div>
    </div>
  );
}

function UsagePatternsExample() {
  const { option, separator, custom } = DropdownMenuFactories;
  const [activeUser] = useState('John Doe');

  const userMenuItems = [
    custom(() => (
      <div className="px-3 py-2 border-b">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
            {activeUser.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <div className="font-medium text-sm">{activeUser}</div>
            <div className="text-xs text-gray-500">john@example.com</div>
          </div>
        </div>
      </div>
    )),
    option({ label: 'Profile', value: 'profile' }),
    option({ label: 'Settings', value: 'settings' }),
    option({ label: 'Billing', value: 'billing' }),
    separator(),
    option({ label: 'Help & Support', value: 'help' }),
    separator(),
    option({ label: 'Sign out', value: 'signout' }),
  ];

  const contextMenuItems = [
    option({ label: 'Edit', value: 'edit', icon: <Window className="w-4 h-4" /> }),
    option({ label: 'Duplicate', value: 'duplicate', icon: <Copy className="w-4 h-4" /> }),
    separator(),
    option({ label: 'Move to trash', value: 'trash', icon: <Trash className="w-4 h-4" /> }),
  ];

  const tableActionItems = [
    option({ label: 'Export selected', value: 'export', icon: <Download className="w-4 h-4" /> }),
    option({ label: 'Duplicate rows', value: 'duplicate', icon: <Copy className="w-4 h-4" /> }),
    separator(),
    option({ label: 'Delete selected', value: 'delete', icon: <Trash className="w-4 h-4" /> }),
  ];

  return (
    <div className="space-y-6">
      <div>
        <h4 className="font-medium mb-3">User Menu</h4>
        <div className="flex justify-end">
          <DropdownMenu
            items={userMenuItems}
            onItemSelect={(value) => {
              if (value === 'signout') {
                console.log('User signed out');
              } else {
                console.log('Navigate to:', value);
              }
            }}
            alignment="end"
            trigger={
              <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {activeUser.split(' ').map(n => n[0]).join('')}
                </div>
                <ChevronDown className="w-4 h-4" />
              </button>
            }
          />
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-3">Context Menu</h4>
        <div 
          className="p-4 bg-gray-100 rounded-lg cursor-pointer"
          onClick={(e) => e.preventDefault()}
        >
          <DropdownMenu
            items={contextMenuItems}
            onItemSelect={(value) => console.log('Context action:', value)}
            trigger={
              <button className="text-sm text-gray-600 hover:text-gray-800">
                Right-click me (or click for demo)
              </button>
            }
          />
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-3">Table Actions</h4>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">2 rows selected</span>
          <DropdownMenu
            items={tableActionItems}
            onItemSelect={(value) => console.log('Bulk action:', value)}
            trigger={
              <button className="px-3 py-1.5 text-sm bg-gray-200 rounded hover:bg-gray-300">
                Actions
              </button>
            }
          />
        </div>
      </div>
    </div>
  );
}

const dropdownMenuExamples = [
  {
    id: 'basic-usage',
    title: 'Basic Usage',
    description: 'Simple dropdown menu with basic options.',
    code: `function BasicUsageExample() {
  const { option } = DropdownMenuFactories;
  const [selectedValue, setSelectedValue] = useState('');

  const basicItems = [
    option({ label: 'New Document', value: 'new' }),
    option({ label: 'Open Document', value: 'open' }),
    option({ label: 'Save Document', value: 'save' }),
    option({ label: 'Save As...', value: 'save-as' }),
  ];

  return (
    <DropdownMenu
      items={basicItems}
      onItemSelect={setSelectedValue}
      trigger={
        <button>
          File <ChevronDown className="w-4 h-4" />
        </button>
      }
    />
  );
}`,
    children: <BasicUsageExample />,
  },
  {
    id: 'with-icons',
    title: 'With Icons & Shortcuts',
    description: 'Dropdown menu items with icons, descriptions, and keyboard shortcuts.',
    code: `function WithIconsExample() {
  const { option } = DropdownMenuFactories;

  const iconItems = [
    option({ 
      label: 'New File', 
      value: 'new-file', 
      icon: <Plus className="w-4 h-4" />,
      keyboardShortcut: '⌘N' 
    }),
    option({ 
      label: 'Copy', 
      value: 'copy', 
      icon: <Copy className="w-4 h-4" />,
      keyboardShortcut: '⌘C' 
    }),
    option({ 
      label: 'Delete', 
      value: 'delete', 
      icon: <Trash className="w-4 h-4" />,
      keyboardShortcut: '⌫',
      description: 'Permanently delete this item'
    }),
  ];

  return (
    <DropdownMenu
      items={iconItems}
      onItemSelect={(value) => console.log('Selected:', value)}
      trigger={<button>Actions</button>}
    />
  );
}`,
    children: <WithIconsExample />,
  },
  {
    id: 'with-groups',
    title: 'With Groups',
    description: 'Organize menu items into logical groups with separators.',
    code: `function WithGroupsExample() {
  const { option, group, separator } = DropdownMenuFactories;

  const groupItems = [
    group([
      option({ label: 'New File', value: 'new-file' }),
      option({ label: 'Open File', value: 'open-file' }),
    ], 'File Operations'),
    
    group([
      option({ label: 'Cut', value: 'cut' }),
      option({ label: 'Copy', value: 'copy' }),
      option({ label: 'Paste', value: 'paste' }),
    ], 'Edit Operations'),
    
    separator(),
    
    option({ label: 'Settings', value: 'settings' }),
  ];

  return (
    <DropdownMenu
      items={groupItems}
      onItemSelect={(value) => console.log('Selected:', value)}
      trigger={<button>Menu</button>}
    />
  );
}`,
    children: <WithGroupsExample />,
  },
  {
    id: 'with-submenus',
    title: 'With Submenus',
    description: 'Nested dropdown menus for complex hierarchical options.',
    code: `function WithSubmenusExample() {
  const { option, separator } = DropdownMenuFactories;

  const submenuItems = [
    option({
      label: 'Export',
      value: 'export',
      subItems: [
        option({ label: 'Export as PDF', value: 'export-pdf' }),
        option({ label: 'Export as CSV', value: 'export-csv' }),
        option({
          label: 'Advanced Export',
          value: 'advanced-export',
          subItems: [
            option({ label: 'Custom Format', value: 'custom-format' }),
            option({ label: 'Batch Export', value: 'batch-export' }),
          ],
        }),
      ],
    }),
    separator(),
    option({ label: 'Close', value: 'close' }),
  ];

  return (
    <DropdownMenu
      items={submenuItems}
      onItemSelect={(value) => console.log('Selected:', value)}
      trigger={<button>Data</button>}
    />
  );
}`,
    children: <WithSubmenusExample />,
  },
  {
    id: 'custom-items',
    title: 'Custom Items',
    description: 'Include custom React components alongside regular menu items.',
    code: `function CustomItemsExample() {
  const { option, custom, separator } = DropdownMenuFactories;

  const customItems = [
    option({ label: 'Profile Settings', value: 'profile' }),
    separator(),
    custom(() => (
      <div className="px-3 py-2 bg-blue-50 border border-blue-200 rounded mx-2 my-1">
        <div className="text-sm font-medium text-blue-800">Pro Feature</div>
        <div className="text-xs text-blue-600">Upgrade to access advanced features</div>
      </div>
    )),
    separator(),
    option({ label: 'Logout', value: 'logout' }),
  ];

  return (
    <DropdownMenu
      items={customItems}
      onItemSelect={(value) => console.log('Selected:', value)}
      trigger={<button>User Menu</button>}
    />
  );
}`,
    children: <CustomItemsExample />,
  },
  {
    id: 'placement',
    title: 'Placement & Alignment',
    description: 'Control where the dropdown appears relative to the trigger.',
    code: `function PlacementExample() {
  const { option } = DropdownMenuFactories;
  
  const items = [
    option({ label: 'Option 1', value: 'option1' }),
    option({ label: 'Option 2', value: 'option2' }),
  ];

  return (
    <div className="space-y-4">
      <DropdownMenu
        items={items}
        placement="top"
        trigger={<button>Top</button>}
      />
      
      <DropdownMenu
        items={items}
        placement="right"
        alignment="center"
        trigger={<button>Right Center</button>}
      />
    </div>
  );
}`,
    children: <PlacementExample />,
  },
  {
    id: 'usage-patterns',
    title: 'Usage Patterns',
    description: 'Common patterns for dropdown menus in real applications.',
    code: `function UsagePatternsExample() {
  const { option, separator, custom } = DropdownMenuFactories;

  const userMenuItems = [
    custom(() => (
      <div className="px-3 py-2 border-b">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
          <div>
            <div className="font-medium text-sm">John Doe</div>
            <div className="text-xs text-gray-500">john@example.com</div>
          </div>
        </div>
      </div>
    )),
    option({ label: 'Profile', value: 'profile' }),
    option({ label: 'Settings', value: 'settings' }),
    separator(),
    option({ label: 'Sign out', value: 'signout' }),
  ];

  return (
    <DropdownMenu
      items={userMenuItems}
      onItemSelect={(value) => console.log('Selected:', value)}
      alignment="end"
      trigger={<button>User Menu</button>}
    />
  );
}`,
    children: <UsagePatternsExample />,
  },
];

const dropdownMenuKeyboardShortcuts = [
  {
    keys: 'Arrow Keys',
    description: 'Navigate between menu items',
  },
  {
    keys: 'Enter',
    description: 'Select the focused menu item',
  },
  {
    keys: 'Space',
    description: 'Select the focused menu item',
  },
  {
    keys: 'Escape',
    description: 'Close the dropdown menu',
  },
  {
    keys: 'Arrow Right',
    description: 'Open submenu if available',
  },
  {
    keys: 'Arrow Left',
    description: 'Close current submenu and return to parent',
  },
  {
    keys: 'Home',
    description: 'Focus the first menu item',
  },
  {
    keys: 'End',
    description: 'Focus the last menu item',
  },
];

export function DropdownMenuPage() {
  return (
    <ComponentPage
      title='Dropdown Menu'
      description='Contextual menu component with keyboard navigation, submenus, and accessibility support.'
      tableOfContents={tableOfContents}
      usageInstructions='The DropdownMenu component provides a contextual menu that appears when triggered. Build menu items using DropdownMenuFactories for options, groups, separators, and custom content. It supports keyboard navigation, nested submenus, icons, shortcuts, and proper focus management for full accessibility.'
      importStatement="import { DropdownMenu, DropdownMenuFactories } from '@moondreamsdev/dreamer-ui/components';"
      componentProps={dropdownMenuProps}
      keyboardShortcuts={dropdownMenuKeyboardShortcuts}
      examples={dropdownMenuExamples}
    />
  );
}