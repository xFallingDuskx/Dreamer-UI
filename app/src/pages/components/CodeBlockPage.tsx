import { CodeBlock } from '@moondreamsdev/dreamer-ui/components';
import { ComponentPage } from '../../components/layout/ComponentPage';

const tableOfContents = [
  { id: 'import', title: 'Import', level: 1 },
  { id: 'examples', title: 'Examples', level: 1 },
  { id: 'basic-usage', title: 'Basic Usage', level: 2 },
  { id: 'with-filename', title: 'With Filename', level: 2 },
  { id: 'interactive-features', title: 'Interactive Features', level: 2 },
  { id: 'with-line-numbers', title: 'With Line Numbers', level: 2 },
  { id: 'language-examples', title: 'Language Examples', level: 2 },
  { id: 'props', title: 'Props', level: 1 },
  { id: 'keyboard-shortcuts', title: 'Keyboard Shortcuts', level: 1 },
];

const componentProps = [
  {
    name: 'code',
    type: 'string',
    required: true,
    description: 'The code content to display',
  },
  {
    name: 'language',
    type: '"typescript" | "ts" | "tsx" | "json" | "bash" | "sh" | "css"',
    required: true,
    description: 'Programming language for syntax highlighting',
  },
  {
    name: 'filename',
    type: 'string',
    required: false,
    description: 'Optional filename to display in the header',
  },
  {
    name: 'showLineNumbers',
    type: 'boolean',
    required: false,
    description: 'Whether to show line numbers on the left side',
    defaultValue: 'false',
  },
  {
    name: 'allowCopy',
    type: 'boolean',
    required: false,
    description: 'Enable copy to clipboard functionality',
    defaultValue: 'false',
  },
  {
    name: 'allowDownload',
    type: 'boolean',
    required: false,
    description: 'Enable download as file functionality',
    defaultValue: 'false',
  },
  {
    name: 'allowFullscreen',
    type: 'boolean',
    required: false,
    description: 'Enable fullscreen viewing mode',
    defaultValue: 'false',
  },
  {
    name: 'showTrafficLights',
    type: 'boolean',
    required: false,
    description: 'Show macOS-style traffic light buttons in header',
    defaultValue: 'false',
  },
  {
    name: 'hideHeader',
    type: 'boolean',
    required: false,
    description: 'Hide the header completely for a minimal appearance',
    defaultValue: 'false',
  },
  {
    name: 'maxHeight',
    type: 'number',
    required: false,
    description: 'Maximum height in pixels before showing scroll',
  },
];

const codeBlockExamples = [
  {
    id: 'basic-usage',
    title: 'Basic Usage',
    description: 'Simple code block with syntax highlighting',
    code: `<CodeBlock
  code="function greet(name: string) {
  return \`Hello, \${name}!\`;
}"
  language="typescript"
/>`,
    children: (
      <CodeBlock
        code={`function greet(name: string) {
  return \`Hello, \${name}!\`;
}`}
        language="typescript"
      />
    ),
  },
  {
    id: 'with-filename',
    title: 'With Filename',
    description: 'Code block displaying a filename in the header',
    code: `<CodeBlock
  code="export function Button({ children, onClick }) {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  );
}"
  language="tsx"
  filename="Button.tsx"
/>`,
    children: (
      <CodeBlock
        code={`export function Button({ children, onClick }) {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  );
}`}
        language="tsx"
        filename="Button.tsx"
      />
    ),
  },
  {
    id: 'interactive-features',
    title: 'Interactive Features',
    description: 'Code block with copy, download, and fullscreen capabilities',
    code: `<CodeBlock
  code='{
  "name": "my-app",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite"
  }
}'
  language="json"
  filename="package.json"
  allowCopy={true}
  allowDownload={true}
  allowFullscreen={true}
  showTrafficLights={true}
  maxHeight={300}
/>`,
    children: (
      <CodeBlock
        code={`{
  "name": "my-app",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite"
  }
}`}
        language="json"
        filename="package.json"
        allowCopy={true}
        allowDownload={true}
        allowFullscreen={true}
        showTrafficLights={true}
        maxHeight={300}
      />
    ),
  },
  {
    id: 'with-line-numbers',
    title: 'With Line Numbers',
    description: 'Code block displaying line numbers for easy reference',
    code: `<CodeBlock
  code="#!/bin/bash

echo 'Setting up environment...'
npm install
echo 'Setup complete!'"
  language="bash"
  filename="setup.sh"
  showLineNumbers={true}
  allowCopy={true}
/>`,
    children: (
      <CodeBlock
        code={`#!/bin/bash

echo 'Setting up environment...'
npm install
echo 'Setup complete!'`}
        language="bash"
        filename="setup.sh"
        showLineNumbers={true}
        allowCopy={true}
      />
    ),
  },
  {
    id: 'language-examples',
    title: 'Supported Languages',
    description: 'Examples of syntax highlighting for different programming languages',
    code: `// CSS Example
<CodeBlock
  code={\`.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.card {
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background: white;
}\`}
  language="css"
  filename="styles.css"
  allowCopy
/>

// JSON Example  
<CodeBlock
  code={\`{
  "name": "my-awesome-app",
  "version": "2.1.0",
  "description": "A modern web application",
  "main": "dist/index.js",
  "scripts": {
    "start": "node dist/index.js",
    "build": "tsc && vite build",
    "test": "vitest",
    "dev": "vite dev --host"
  },
  "dependencies": {
    "react": "^18.2.0",
    "typescript": "^5.0.0"
  }
}\`}
  language="json"
  filename="package.json"
  allowCopy
  maxHeight={250}
/>

// Shell Script Example
<CodeBlock
  code={\`#!/bin/bash

# Build and deployment script
echo "🚀 Starting deployment..."

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Run tests  
echo "🧪 Running tests..."
npm run test

# Build application
echo "🔨 Building application..."
npm run build

# Deploy to production
echo "🌐 Deploying to production..."
rsync -avz dist/ user@server:/var/www/app/

echo "✅ Deployment completed successfully!"\`}
  language="bash"
  filename="deploy.sh"
  allowCopy
  showLineNumbers
  maxHeight={300}
/>`,
    children: (
      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-medium mb-2">CSS</h4>
          <CodeBlock
            code={`.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.card {
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background: white;
}`}
            language="css"
            filename="styles.css"
            allowCopy
          />
        </div>
        <div>
          <h4 className="text-sm font-medium mb-2">JSON Configuration</h4>
          <CodeBlock
            code={`{
  "name": "my-awesome-app",
  "version": "2.1.0",
  "description": "A modern web application",
  "main": "dist/index.js",
  "scripts": {
    "start": "node dist/index.js",
    "build": "tsc && vite build",
    "test": "vitest",
    "dev": "vite dev --host"
  },
  "dependencies": {
    "react": "^18.2.0",
    "typescript": "^5.0.0"
  }
}`}
            language="json"
            filename="package.json"
            allowCopy
            maxHeight={250}
          />
        </div>
        <div>
          <h4 className="text-sm font-medium mb-2">Shell Script</h4>
          <CodeBlock
            code={`#!/bin/bash

# Build and deployment script
echo "🚀 Starting deployment..."

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Run tests  
echo "🧪 Running tests..."
npm run test

# Build application
echo "🔨 Building application..."
npm run build

# Deploy to production
echo "🌐 Deploying to production..."
rsync -avz dist/ user@server:/var/www/app/

echo "✅ Deployment completed successfully!"`}
            language="bash"
            filename="deploy.sh"
            allowCopy
            showLineNumbers
            maxHeight={300}
          />
        </div>
      </div>
    ),
  },
];

const keyboardShortcuts = [
  {
    keys: 'Cmd/Ctrl + C',
    description: 'Copy code to clipboard when copy button is focused',
  },
  {
    keys: 'Cmd/Ctrl + S',
    description: 'Download code as file when download button is focused',
  },
  {
    keys: 'Escape',
    description: 'Exit fullscreen mode',
  },
  {
    keys: 'Tab',
    description: 'Navigate between interactive elements',
  },
];

export function CodeBlockPage() {
  return (
    <ComponentPage
      title="Code Block"
      description="Display syntax-highlighted code with copy, download, and fullscreen functionality."
      tableOfContents={tableOfContents}
      usageInstructions="Use CodeBlock to display formatted code snippets with optional interactive features like copying, downloading, and fullscreen viewing."
      importStatement="import { CodeBlock } from '@moondreamsdev/dreamer-ui';"
      componentProps={componentProps}
      examples={codeBlockExamples}
      keyboardShortcuts={keyboardShortcuts}
    />
  );
}
