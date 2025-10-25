import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import { visualizer } from 'rollup-plugin-visualizer';
import { qrcode } from 'vite-plugin-qrcode';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		tailwindcss(),
		qrcode(),
		visualizer({
			filename: 'stats.html', // where the report goes
			template: 'treemap', // sunburst/treemap/network
			gzipSize: true,
			brotliSize: true,
		}),
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		// CSS from dist (build artifact) - more specific aliases go first!
			'@moondreamsdev/dreamer-ui/styles': path.resolve(__dirname, '../lib/dist/styles.css'),
			// Components from source for HMR
			'@moondreamsdev/dreamer-ui': path.resolve(__dirname, '../lib/src'),
		},
	},
	optimizeDeps: {
		exclude: ['@moondreamsdev/dreamer-ui'],
	},
	server: {
		port: 8888,
		watch: {
			ignored: ['!**/lib/**'],
		},
	},
	build: {
		chunkSizeWarningLimit: 1000, // Increase the chunk size warning limit to 1000KB
	},
});
