import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    lib: {
      entry: {
        index: 'src/index.ts',
        components: 'src/components/index.ts',
        symbols: 'src/symbols/index.ts',
        utils: 'src/utils/index.ts',
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
          if (assetInfo.names?.length > 0 && assetInfo.names[0].endsWith('.css')) {
            return 'styles.css';
          }
          return assetInfo.names?.[0] || '';
        },
      },
    },
    cssCodeSplit: false,
    sourcemap: true,
    emptyOutDir: true,
    copyPublicDir: false,
  },
});
