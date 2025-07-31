import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: {
        index: 'src/index.lib.ts',
        components: 'src/components.lib.ts',
      },
      name: 'DreamerUI',
      fileName: (format, entryName) => `${entryName}.${format === 'es' ? 'esm' : format}.js`,
      formats: ['es', 'cjs'],
      cssFileName: 'style.css',
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
          console.log('assetInfo.names[0]', assetInfo.names[0]); // REMOVE
          if (assetInfo.names[0]?.endsWith('.css')) {
            return 'styles.css';
          }
          return assetInfo.names[0] || '';
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
});