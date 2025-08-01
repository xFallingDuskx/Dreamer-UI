import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite'; // Add this import

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    lib: {
      entry: {
        index: 'src/index.lib.ts',
        components: 'src/components.lib.ts',
      },
      name: 'DreamerUI',
      fileName: (format, entryName) => `${entryName}.${format === 'es' ? 'esm' : format}.js`,
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'react/jsx-runtime',
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.names[0]?.endsWith('.css')) {
            return 'styles.css';
          }
          return assetInfo.names[0] || '';
        },
      },
    },
    cssCodeSplit: false, // Add this to bundle CSS together
    sourcemap: true,
    emptyOutDir: true,
    copyPublicDir: false,
  },
});
