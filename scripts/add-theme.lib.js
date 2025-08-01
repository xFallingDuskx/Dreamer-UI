import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createInterface } from 'readline';

function promptUser(question) {
  return new Promise((resolve) => {
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

    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim().toLowerCase());
    });
  });
}

function createThemeColorsFile() {
  return new Promise(async (resolve, reject) => {
    try {
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = dirname(__filename);
      
      // Read the source theme.lib.css file
      const sourceFile = join(__dirname, '../src/theme.lib.css');
      const sourceContent = readFileSync(sourceFile, 'utf8');

      // Extract only the @theme colors block
      const themeMatch = sourceContent.match(/@theme colors\s*\{([\s\S]*?)\}/);

      if (!themeMatch) {
        throw new Error('Could not find @theme colors block in theme.lib.css');
      }

      const themeContent = themeMatch[1].trim();
      
      // Create the clean theme colors CSS content
      const cleanThemeCSS = `@theme colors {
${themeContent}
}`;

      // Ensure dist directory exists
      const distDir = join(__dirname, '../dist');
      if (!existsSync(distDir)) {
        mkdirSync(distDir, { recursive: true });
      }

      // Check if output file already exists
      const outputFile = join(distDir, 'theme-colors.css');
      if (existsSync(outputFile)) {
        const answer = await promptUser('Do you want to overwrite it? (y/N): ');
        if (answer !== 'y' && answer !== 'yes') {
          console.log('🛑 Operation cancelled.');
          resolve();
          return;
        }
      }

      // Write the clean theme colors file
      writeFileSync(outputFile, cleanThemeCSS);

      console.log(`✅ Created clean theme colors file: ${outputFile}`);
      console.log('📖 To use the colors, import the CSS file in your project:');
      console.log('   @import \'./dist/theme-colors.css\';');
      console.log('   or');
      console.log('   import \'./dist/theme-colors.css\';');
      
      resolve();
    } catch (error) {
      console.error('❌ Error creating theme colors file:', error.message);
      reject(error);
    }
  });
}

// Run if called directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  createThemeColorsFile().catch((error) => {
    process.exit(1);
  });
}

export default createThemeColorsFile;
