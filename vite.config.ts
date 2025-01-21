import { purgeCss } from 'vite-plugin-tailwind-purgecss';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
	plugins: [sveltekit(), purgeCss({ legacy: true }),],
	resolve: {
		alias: {
		  '$src': path.resolve('./src'),
		},
	  },
	css: {
		postcss: path.resolve(__dirname, 'postcss.config.cjs'), // Stellt sicher, dass PostCSS richtig geladen wird
	},
});