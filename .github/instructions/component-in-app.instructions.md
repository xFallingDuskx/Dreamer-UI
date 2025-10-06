We should ensure that the component is discoverable in our app. We will do that with two steps.


1. **Component Documentation Page:** Create a dedicated component page in `app/pages/components/` that:

- Uses the same JSDoc strings from the component for prop descriptions
- Shows interactive examples of all variants and states
- Demonstrates accessibility features and keyboard navigation
- Include examples of the component in use
  - Use any examples that may exist in the DraftPage (app/src/pages/DraftPage.tsx)
  - Do not include more than 8 examples without permission
- Update the table of contents:
  - Use level 1 and level 2 headings
  - Include headers (i.e "Variants"), each with a description
    - Descriptions should be passive. For example, "Icons can be hidden in the Callout component for a cleaner look" is better than "Learn how to hide the icon in the Callout component for a cleaner look"
  - Refer to ButtonPage (app/src/pages/components/ButtonPage.tsx) for an example


2. **Search Integration:** Update the search content to include the new component so it can be discovered via search
  - File: app/src/components/search-bar/searchContent.ts

3. Ensure that the component is listed in all correct places:

- Routes: Ensure the component page is added to the app's routes.
  - File: app/src/App.tsx
- Top Nav: Ensure the component is listed in the top navigation bar under the "Components" dropdown menu.
  - File: app/src/components/layout/Navigation.tsx
- Navigation: Ensure the component is listed on the Component page under the appropriate category (e.g., "Alerts" or "Notifications").
  - File: app/src/pages/components/_ComponentsPage.tsx