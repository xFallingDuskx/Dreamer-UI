---
applyTo: 'app/**/*'
---

You should create a React component that meets the following requirements:

1. **Location:** Only create the component files in the `app/` folder, using a component-based architecture (i.e. `app/<component-name>/<ComponentName>.ts` and `app/<component-name>/index.ts`)
2. **Component Creation:** Use `export function ComponentName` (DO NOT USE `const ComponentName: React.FC<Props> = () => {}` or `React.FC`)
3. **Styling:** Uses Tailwind CSS V4 and pay attention to themes colors in `dreamer-ui.css`
4. **Accessibility:** Follows best practices for accessibility, including keyboard navigation and screen reader support
5. **Props:**

- Always allow a `ref` to be passed in by using `React.Ref<HTMLDivElement>` (DO NOT USE `forwardRef`)
- Always allow a `id` prop to be passed in
- Define variants in a separate `variants.ts` file: variants should only hold styles for adjustable properties (i.e. `size`). it should not hold base styles.
- If there is a lot of logic, extract it into hook(s) in a separate `hooks.ts` file
- Use `data-*` attributes to store key prop values for testing and accessibility
- Only add docstring comments to explain unclear props

6. **Visual Confirmation:** Render the component with its various variants/states in the `app/pages/DraftPage.tsx` file.

7. **Icons:** Use icons from the `@moondreamsdev/dreamer-ui/symbols` if available. If not, create them in a `app/<component-name>/icons.tsx` file.

**IMPORTANT:** Do not make any changes to `lib/`.

## Exporting

- Always use named exports for the component.
- Do not export any implementation details or internal types.

Example:

```
export { Input, type InputProps } from './Input';
```

You should use `join` to combine class names conditionally. In `app/` folder, import `join` from `@moondreamsdev/dreamer-ui/utils`.
