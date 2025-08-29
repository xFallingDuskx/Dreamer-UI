import { Link } from 'react-router-dom';

export const GettingStartedPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent mb-4">
          Dreamer UI
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A collection of beautifully designed, accessible React components built with Tailwind CSS.
        </p>
      </div>

      {/* Content */}
      <div className="prose prose-lg max-w-none">
        {/* Installation Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-foreground mb-6 flex items-center gap-3">
            <span className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center text-white text-sm font-bold">1</span>
            Installation
          </h2>
          
          <div className="space-y-6">
            <div>
              <p className="text-foreground mb-4">Install the library:</p>
              <div className="bg-muted rounded-lg p-4 border border-border">
                <pre className="text-sm text-muted-foreground overflow-x-auto">
                  <code>{`npm install @moondreamsdev/dreamer-ui
# or
yarn add @moondreamsdev/dreamer-ui
# or
pnpm add @moondreamsdev/dreamer-ui`}</code>
                </pre>
              </div>
            </div>

            <div>
              <p className="text-foreground mb-4">Then run the init script:</p>
              <div className="bg-muted rounded-lg p-4 border border-border">
                <pre className="text-sm text-muted-foreground overflow-x-auto">
                  <code>npx dreamer-ui-init</code>
                </pre>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                or, if the above command fails:
              </p>
              <div className="bg-muted rounded-lg p-4 border border-border mt-2">
                <pre className="text-sm text-muted-foreground overflow-x-auto">
                  <code>./node_modules/@moondreamsdev/dreamer-ui/dist/init.js</code>
                </pre>
              </div>
            </div>

            <div>
              <p className="text-foreground mb-4">And, finally, install the stylesheets in main CSS file (recommended):</p>
              <div className="bg-muted rounded-lg p-4 border border-border">
                <pre className="text-sm text-muted-foreground overflow-x-auto">
                  <code>{`@import '@moondreamsdev/dreamer-ui/styles'; /* non-TailwindCSS styles */
@import './dreamer-ui.css'; /* customizable, theme styles */

/* other styles */

/* for TailwindCSS styles in library to be processed */
@source "../node_modules/@moondreamsdev/dreamer-ui/dist/**/*.{js,jsx,ts,tsx}";`}</code>
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Tailwind Configuration Section */}
        <section className="mb-12">
          <h3 className="text-2xl font-medium text-foreground mb-4">Tailwind Class Name Auto-Detection</h3>
          <p className="text-foreground mb-4">
            To enable Tailwind CSS IntelliSense for component classnames like <code className="bg-muted px-2 py-1 rounded text-sm">targetClassName</code> and when using <code className="bg-muted px-2 py-1 rounded text-sm">join()</code>, add the following to your VS Code settings.json:
          </p>
          <div className="bg-muted rounded-lg p-4 border border-border">
            <pre className="text-sm text-muted-foreground overflow-x-auto">
              <code>{`{
  "tailwindCSS.classAttributes": ["class", "className", ".*ClassName"],
  "tailwindCSS.classFunctions": ["join"]
}`}</code>
            </pre>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            This configuration allows the Tailwind CSS extension to provide autocomplete and validation for any attribute that contains "className" in its name, including custom props like <code className="bg-muted px-2 py-1 rounded text-sm">targetClassName</code>, <code className="bg-muted px-2 py-1 rounded text-sm">containerClassName</code>, etc.
          </p>
        </section>

        {/* Usage Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-foreground mb-6 flex items-center gap-3">
            <span className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center text-white text-sm font-bold">2</span>
            Usage
          </h2>
          <div className="bg-muted rounded-lg p-4 border border-border">
            <pre className="text-sm text-muted-foreground overflow-x-auto">
              <code>{`import { Button, Input, Textarea } from 'dreamer-ui';

function App() {
  return (
    <div>
      <Button variant='primary'>Click me</Button>
      <Input placeholder='Enter text' />
      <Textarea placeholder='Enter message' />
    </div>
  );
}`}</code>
            </pre>
          </div>
        </section>

        {/* Requirements Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-foreground mb-6">Requirements</h2>
          <ul className="space-y-2 text-foreground">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-accent rounded-full"></span>
              React 18+
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-accent rounded-full"></span>
              Tailwind CSS 4+
            </li>
          </ul>
        </section>

        {/* Components Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-foreground mb-6">Components</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-border rounded-lg p-4 hover:border-accent/50 transition-colors">
              <h4 className="font-semibold text-foreground mb-2">Button</h4>
              <p className="text-sm text-muted-foreground">Various button styles with loading states</p>
            </div>
            <div className="border border-border rounded-lg p-4 hover:border-accent/50 transition-colors">
              <h4 className="font-semibold text-foreground mb-2">Input</h4>
              <p className="text-sm text-muted-foreground">Text inputs with validation states</p>
            </div>
            <div className="border border-border rounded-lg p-4 hover:border-accent/50 transition-colors">
              <h4 className="font-semibold text-foreground mb-2">Textarea</h4>
              <p className="text-sm text-muted-foreground">Multi-line text inputs with auto-expand</p>
            </div>
            <div className="border border-border rounded-lg p-4 hover:border-accent/50 transition-colors">
              <h4 className="font-semibold text-foreground mb-2">RadioGroup</h4>
              <p className="text-sm text-muted-foreground">Accessible radio button groups</p>
            </div>
            <div className="border border-border rounded-lg p-4 hover:border-accent/50 transition-colors">
              <h4 className="font-semibold text-foreground mb-2">Checkbox</h4>
              <p className="text-sm text-muted-foreground">Customizable checkboxes</p>
            </div>
            <div className="border border-border rounded-lg p-4 hover:border-accent/50 transition-colors">
              <h4 className="font-semibold text-foreground mb-2">Label</h4>
              <p className="text-sm text-muted-foreground">Form labels with help text</p>
            </div>
          </div>
        </section>

        {/* Footer Section */}
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Contributing</h2>
              <p className="text-foreground">
                Contributions are welcome! Please read our contributing guidelines.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">License</h2>
              <p className="text-foreground">MIT</p>
            </div>
          </div>
        </section>

        {/* Next Steps */}
        <section className="text-center py-8 border-t border-border">
          <h3 className="text-2xl font-semibold text-foreground mb-4">Ready to start building?</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/components"
              className="inline-block px-6 py-3 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-lg shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 transform hover:scale-105 transition-all duration-200"
            >
              Browse Components
            </Link>
            <Link
              to="/hooks"
              className="inline-block px-6 py-3 border border-border text-foreground font-semibold rounded-lg hover:border-accent/50 hover:text-accent transition-colors duration-200"
            >
              View Hooks
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};
