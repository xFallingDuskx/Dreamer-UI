# Dreamer UI

A collection of beautifully designed, accessible React components built with Tailwind CSS.

## Installation

Install the library:

```bash
npm install @moondreamsdev/dreamer-ui
# or
yarn add @moondreamsdev/dreamer-ui
# or
pnpm add @moondreamsdev/dreamer-ui
```

Then run the init script:

```bash
npx dreamer-ui-init
```

or, if the above command fails:

```bash
./node_modules/@moondreamsdev/dreamer-ui/dist/init.js
```

And, finally, install the stylesheets in main CSS file (recommended):

```css
@import "@moondreamsdev/dreamer-ui/styles"; /* non-TailwindCSS styles */
@import './dreamer-ui.css'; /* customizable, theme styles */

/* other styles */

/* for TailwindCSS styles in library to be processed */
@source "../node_modules/@moondreamsdev/dreamer-ui/dist/**/*.{js,jsx,ts,tsx}";
```

## Usage

```tsx
import { Button, Input, Textarea } from 'dreamer-ui';

function App() {
  return (
    <div>
      <Button variant="primary">Click me</Button>
      <Input placeholder="Enter text" />
      <Textarea placeholder="Enter message" />
    </div>
  );
}
```

## Requirements

- React 18+
- Tailwind CSS 4+

## Components

- **Button** - Various button styles with loading states
- **Input** - Text inputs with validation states
- **Textarea** - Multi-line text inputs with auto-expand
- **RadioGroup** - Accessible radio button groups
- **Checkbox** - Customizable checkboxes
- **Label** - Form labels with help text

## Contributing

Contributions are welcome! Please read our contributing guidelines.

## License

MIT