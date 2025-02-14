import { defineConfig } from 'cypress';

export default defineConfig({
	component: {
		devServer: {
			framework: 'svelte',
			bundler: 'vite'
		}
	},
	e2e: {
		baseUrl: process.env.BASE_URL || 'http://localhost:4173',
		specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}'
	}
});
