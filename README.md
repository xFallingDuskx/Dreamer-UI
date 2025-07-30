# Dreamer UI

A collection of beautifully designed, accessible React components built with Tailwind CSS.

## Installation

```bash
npm install @moondreamsdev/dreamer-ui
# or
yarn add @moondreamsdev/dreamer-ui
# or
pnpm add @moondreamsdev/dreamer-ui
```

## Usage

```tsx
import { Button, Input, Textarea } from 'dreamer-ui';
import 'dreamer-ui/styles';

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
- Tailwind CSS 3+

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