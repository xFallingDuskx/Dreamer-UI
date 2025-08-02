#!/usr/bin/env node

import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { createInterface } from 'readline';
import { fileURLToPath } from 'url';

function extractColorsFromSource() {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const sourceFile = join(__dirname, 'theme.css');
    const sourceContent = readFileSync(sourceFile, 'utf8');

    // Extract the @theme library block content only
    const themeMatch = sourceContent.match(/@theme library\s*\{([\s\S]*?)\}/);

    if (themeMatch) {
      const topLevelComment = '/** Necessary theme styles for Dreamer UI library - Customize as desired! */\n';
      const themeContent = themeMatch[1].trim();
      
      // Add proper indentation to each line of theme content
      const indentedThemeContent = themeContent
        .split('\n')
        .map(line => line.trim() ? `  ${line.trim()}` : line)
        .join('\n');
      
      return `${topLevelComment}\n@theme dreamer-ui {\n${indentedThemeContent}\n}`;
    } else {
      throw new Error('Could not find @theme library block in source file');
    }
  } catch (error) {
    console.error('❌ Error reading source file:', error.message);
    process.exit(1);
  }
}

async function createCSSFile(targetPath, cssContent) {
  try {
    // Check if file already exists
    if (existsSync(targetPath)) {
      console.log(`📄 CSS file already exists at: ${targetPath}`);
      
      // Ask user if they want to overwrite (only in interactive mode)
      const isCI = process.env.CI || process.env.NODE_ENV === 'production' || !process.stdin.isTTY;
      
      if (!isCI) {
        const rl = createInterface({
          input: process.stdin,
          output: process.stdout
        });
        
        // Handle Ctrl+C interruption
        rl.on('SIGINT', () => {
          console.log('\n🛑 Operation cancelled by user.');
          rl.close();
          process.exit(0);
        });
        
        return new Promise((resolve) => {
          rl.question('Do you want to overwrite it? (y/N): ', (answer) => {
            rl.close();
            if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
              writeFile();
              resolve(true); // Indicate file was written
            } else {
              console.log('⏭️  Skipping CSS generation');
              resolve(false); // Indicate file was not written
            }
          });
        });
      } else {
        // In CI, skip overwriting
        console.log('⏭️  Skipping CSS generation (file exists)');
        return false;
      }
    }
    
    writeFile();
    return true; // Indicate file was written

    function writeFile() {
      // Ensure target directory exists
      const targetDir = dirname(targetPath);
      if (!existsSync(targetDir)) {
        mkdirSync(targetDir, { recursive: true });
      }

      // Write the CSS file
      writeFileSync(targetPath, cssContent);
      console.log(`✅ Generated dreamer-ui colors at: ${targetPath}`);
    }
  } catch (error) {
    console.error('❌ Error writing CSS file:', error.message);
    process.exit(1);
  }
}

function getDefaultPath() {
  // Look for common CSS directories
  const possiblePaths = [
    './src/styles/dreamer-ui.css',
    './styles/dreamer-ui.css',
    './css/dreamer-ui.css',
    './src/dreamer-ui.css',
    './dreamer-ui.css'
  ];

  for (const p of possiblePaths) {
    const dir = dirname(p);
    if (existsSync(dir)) {
      return p;
    }
  }

  return './dreamer-ui.css';
}

async function promptUserForPath() {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const defaultPath = getDefaultPath();

  return new Promise((resolve) => {
    rl.question(
      `Where would you like to save the Dreamer UI colors CSS file? (default: ${defaultPath}): `,
      (answer) => {
        rl.close();
        resolve(answer.trim() || defaultPath);
      }
    );
  });
}

async function main() {
  console.log('🎨 Setting up Dreamer UI colors...');

  // Check if running in CI or non-interactive environment
  const isCI = process.env.CI || process.env.NODE_ENV === 'production' || !process.stdin.isTTY;

  let targetPath;

  if (isCI) {
    // In CI/non-interactive, use default path
    targetPath = getDefaultPath();
    console.log(`📁 Using default path: ${targetPath}`);
  } else {
    // Interactive mode
    targetPath = await promptUserForPath();
  }

  // Generate CSS content
  const cssContent = extractColorsFromSource();

  // Create the file
  const fileCreated = await createCSSFile(targetPath, cssContent);

  // Only show usage instructions if file was actually created/overwritten
  if (fileCreated) {
    console.log('\n📖 To use the colors, import the CSS file in your project:');
    console.log(`   @import '${targetPath}';`);
    console.log('   or');
    console.log(`   import '${targetPath}';`);
  }
}

// Run if called directly
// ES module-compatible entrypoint check
if (process.argv[1] === new URL(import.meta.url).pathname) {
  main().catch(console.error);
}

export default main;