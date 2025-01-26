import { defineConfig } from 'cypress';

export default defineConfig({
	component: {
		devServer: {
			framework: 'svelte',
			bundler: 'vite'
		}
	},
	e2e: {
		baseUrl: 'http://localhost:5173',
		specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}'
	}
});
