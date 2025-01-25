describe('Home Page', () => {
	it('should load the home page', () => {
	  cy.visit('/');
	  cy.contains('Genshin-Guess-Who').should('be.visible');
	});
});