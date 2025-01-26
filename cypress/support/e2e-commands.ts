export const LayoutComponents = {
	title: () => cy.get('[data-cy="text-headline"]'),
	subTitle: () => cy.get('[data-cy="text-sub-headline"]'),
	privacyPolicyButton: () => cy.get('[data-cy="button-privacy-policy"]'),
	fourStarSlider: () => cy.get('[data-cy="toggle-four-stars"]').closest('div'),
	fiveStarSlider: () => cy.get('[data-cy="toggle-five-stars"]').closest('div'),
	hideMarkedSlider: () => cy.get('[data-cy="toggle-hide-chars"]').closest('div'),
	resetButton: () => cy.get('[data-cy="button-reset"]'),
	undoButton: () => cy.get('[data-cy="button-undo"]')
};

export const LayoutFunctions = {
	fourStarSliderIsEnabled: () =>
		LayoutComponents.fourStarSlider().should('have.attr', 'aria-checked', 'true'),
	fourStarSliderIsntEnabled: () =>
		LayoutComponents.fourStarSlider().should('not.have.attr', 'aria-checked', 'true'),
	fiveStarSliderIsEnabled: () =>
		LayoutComponents.fiveStarSlider().should('have.attr', 'aria-checked', 'true'),
	fiveStarSliderIsntEnabled: () =>
		LayoutComponents.fiveStarSlider().should('not.have.attr', 'aria-checked', 'true'),
	hideMarkedSliderIsEnabled: () =>
		LayoutComponents.hideMarkedSlider().should('have.attr', 'aria-checked', 'true'),
	hideMarkedSliderIsntEnabled: () =>
		LayoutComponents.hideMarkedSlider().should('not.have.attr', 'aria-checked', 'true'),

	enableOnlyFiveStarSlider: () => {
		LayoutComponents.fourStarSlider()
			.invoke('attr', 'aria-checked')
			.then((isChecked) => {
				if (isChecked === 'true') {
					LayoutComponents.fourStarSlider().click();
				}
			});
		LayoutComponents.fiveStarSlider()
			.invoke('attr', 'aria-checked')
			.then((isChecked) => {
				if (isChecked !== 'true') {
					LayoutComponents.fiveStarSlider().click();
				}
			});
	},

	enableOnlyFourStarSlider: () => {
		LayoutComponents.fourStarSlider()
			.invoke('attr', 'aria-checked')
			.then((isChecked) => {
				if (isChecked !== 'true') {
					LayoutComponents.fourStarSlider().click();
				}
			});
		LayoutComponents.fiveStarSlider()
			.invoke('attr', 'aria-checked')
			.then((isChecked) => {
				if (isChecked === 'true') {
					LayoutComponents.fiveStarSlider().click();
				}
			});
	},

	enableBothStarSliders: () => {
		LayoutComponents.fourStarSlider()
			.invoke('attr', 'aria-checked')
			.then((isChecked) => {
				if (isChecked !== 'true') {
					LayoutComponents.fourStarSlider().click();
				}
			});
		LayoutComponents.fiveStarSlider()
			.invoke('attr', 'aria-checked')
			.then((isChecked) => {
				if (isChecked !== 'true') {
					LayoutComponents.fiveStarSlider().click();
				}
			});
	},

	disableBothStarSliders: () => {
		LayoutComponents.fourStarSlider()
			.invoke('attr', 'aria-checked')
			.then((isChecked) => {
				if (isChecked === 'true') {
					LayoutComponents.fourStarSlider().click();
				}
			});
		LayoutComponents.fiveStarSlider()
			.invoke('attr', 'aria-checked')
			.then((isChecked) => {
				if (isChecked === 'true') {
					LayoutComponents.fiveStarSlider().click();
				}
			});
	},

	enableHideMarkedSlider: () => {
		LayoutComponents.hideMarkedSlider()
			.invoke('attr', 'aria-checked')
			.then((isChecked) => {
				if (isChecked !== 'true') {
					LayoutComponents.hideMarkedSlider().click();
				}
			});
	},

	disableHideMarkedSlider: () => {
		LayoutComponents.hideMarkedSlider()
			.invoke('attr', 'aria-checked')
			.then((isChecked) => {
				if (isChecked === 'true') {
					LayoutComponents.hideMarkedSlider().click();
				}
			});
	}
};

export const CharacterComponents = {
	characterTile: () => cy.get('[data-cy="char-tile"]')
};

export const CharacterFunctions = {
	getMaxCharacterTiles: () => CharacterComponents.characterTile().then((tiles) => tiles.length),
	getNthCharacterTile: (n: number) => CharacterComponents.characterTile().eq(n),
	nthCharacterTileIsMarked: (n: number) =>
		CharacterComponents.characterTile().eq(n).should('have.class', 'opacity-50'),
	nthCharacterTileIsntMarked: (n: number) =>
		CharacterComponents.characterTile().eq(n).should('not.have.class', 'opacity-50')
};

export const ModalComponents = {
	modal: () => cy.get('[data-cy="modal-privacy"]'),
	closeButton: () => cy.get('[data-cy="button-modal-privacy-close"]')
};
