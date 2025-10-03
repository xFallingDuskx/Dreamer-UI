import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		tailwindcss(),
		visualizer({
			filename: 'stats.html', // where the report goes
			template: 'treemap', // sunburst/treemap/network
			gzipSize: true,
			brotliSize: true,
		}),
	],
	server: {
		port: 8888,
	},
  build: {
    chunkSizeWarningLimit: 1000, // Increase the chunk size warning limit to 1000KB
  }
});
