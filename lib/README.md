# Dreamer UI

A collection of 35+ accessible React components built with Tailwind CSS.

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
@import '@moondreamsdev/dreamer-ui/styles'; /* non-TailwindCSS styles */
@import './dreamer-ui.css'; /* customizable, theme styles */

/* other styles */

/* for TailwindCSS styles in library to be processed */
@source "../node_modules/@moondreamsdev/dreamer-ui/dist/**/*.{js,jsx,ts,tsx}";
```

### Tailwind Class Name Auto-Detection

To enable Tailwind CSS IntelliSense for component classnames like `targetClassName` and when using `join()`, add the following to your VS Code settings.json:

```json
{
  "tailwindCSS.classAttributes": ["class", "className", ".*ClassName"],
  "tailwindCSS.classFunctions": ["join"]
}
```

This configuration allows the Tailwind CSS extension to provide autocomplete and validation for any attribute that contains "className" in its name, including custom props like `targetClassName`, `containerClassName`, etc.

## Usage

```tsx
import { Button, Input, Textarea } from '@moondreamsdev/dreamer-ui/components';

function App() {
  return (
    <div>
      <Button variant='primary'>Click me</Button>
      <Input placeholder='Enter text' />
      <Textarea placeholder='Enter message' />
    </div>
  );
}
```

## Requirements

- React 18+
- Tailwind CSS 4+

## Contributing

Contributions are welcome! Please read our contributing guidelines.

## License

MIT
