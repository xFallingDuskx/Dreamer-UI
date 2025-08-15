---
applyTo: 'app/**/*'
---

You should create a React component that meets the following requirements:

1. **Location:** Only create the component files in the `app/` folder, using a component-based architecture (i.e. `app/src/<component-name>/<ComponentName>.ts` and `app/src/<component-name>/index.ts`)
2. **Component Creation:** Use `export default function ComponentName` (DO NOT USE `const ComponentName: React.FC<Props> = () => {}` or `React.FC`)
2. **Styling:** Uses Tailwind CSS V4 and pay attention to themes colors in `dreamer-ui.css`
3. **Accessibility:** Follows best practices for accessibility, including keyboard navigation and screen reader support
4. **Props:**

- Always allow a `ref` to be passed in by using `React.Ref<HTMLDivElement>` (DO NOT USE `forwardRef`)
- Always allow a `id` prop to be passed in
- Define variants in a separate `variants.ts` file: variants should only hold styles for adjustable properties (i.e. `size`). it should not hold base styles.
- Define hooks in a separate `hooks.ts` file
- Use `data-*` attributes to store key prop values for testing and accessibility
- Only add docstring comments to explain unclear props

## Exporting
- Always export the component as default from the index file.
- Do not export any implementation details or internal types.

You should use `join` to combine class names conditionally. In `app/` folder, import `join` from `@moondreamsdev/dreamer-ui/utils`.
