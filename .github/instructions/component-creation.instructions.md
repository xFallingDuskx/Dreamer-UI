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

6. **Documentation:** Add comprehensive JSDoc documentation:
- Add JSDoc strings to the component with examples showing different use cases
- Add JSDoc strings to all props with clear descriptions
- Use the same JSDoc descriptions consistently across component and documentation

7. **Component Documentation Page:** Create a dedicated component page in `app/pages/components/` that:
- Uses the same JSDoc strings from the component for prop descriptions
- Shows interactive examples of all variants and states
- Demonstrates accessibility features and keyboard navigation

8. **Search Integration:** Update the search content to include the new component so it can be discovered via search

9. **Visual Confirmation:** Render the component with its various variants/states in the `app/pages/DraftPage.tsx` file.

10. **Icons:** Use icons from the `@moondreamsdev/dreamer-ui/symbols` if available. If not, create them in a `app/<component-name>/icons.tsx` file.

**IMPORTANT:** Do not make any changes to `lib/`.

## Exporting

- Always use named exports for the component.
- Do not export any implementation details or internal types.

Example:

```
export { Input, type InputProps } from './Input';
```

You should use `join` to combine class names conditionally. In `app/` folder, import `join` from `@moondreamsdev/dreamer-ui/utils`.
