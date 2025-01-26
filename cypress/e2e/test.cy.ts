import { CharacterFunctions, LayoutComponents, LayoutFunctions } from '../support/e2e-commands';
import assert from 'assert';

beforeEach(() => {
	cy.visit('/');
});

describe('Elements should be visible', () => {
	it('Header exists and has all Elements', () => {
		LayoutComponents.title().should('exist').and('be.visible');
		LayoutComponents.subTitle().should('exist').and('be.visible');
		LayoutComponents.privacyPolicyButton().should('exist').and('be.visible');
	});

	it('Sliders for Functions exist and are in desired State', () => {
		LayoutComponents.fourStarSlider().should('exist');
		LayoutComponents.fiveStarSlider().should('exist');
		LayoutComponents.hideMarkedSlider().should('exist');
		LayoutFunctions.fourStarSliderIsEnabled();
		LayoutFunctions.fiveStarSliderIsEnabled();
		LayoutFunctions.hideMarkedSliderIsntEnabled();
	});

	it('Buttons for Functions exist', () => {
		LayoutComponents.resetButton().should('exist');
		LayoutComponents.undoButton().should('exist');
	});

	it('Character Tiles exist', () => {
		CharacterFunctions.getMaxCharacterTiles().then((maxTiles) => {
			console.log(maxTiles);
			for (let i = 0; i < maxTiles; i++) {
				CharacterFunctions.getNthCharacterTile(i).should('exist');
			}
		});
	});
});

describe('Four Star Slider', () => {
	const fourStars: string[] = [];
	it('Slider toggle removes/adds Four Star Characters from the list', () => {
		LayoutFunctions.enableOnlyFourStarSlider();

		cy.wait(100);

		CharacterFunctions.getMaxCharacterTiles().then((maxTiles) => {
			for (let i = 0; i < maxTiles; i++) {
				CharacterFunctions.getNthCharacterTile(i)
					.find('[data-cy="char-tile-name"]')
					.invoke('text')
					.then((name) => {
						fourStars.push(name);
					});
			}
		});
		LayoutFunctions.enableOnlyFiveStarSlider();

		cy.wait(100);

		CharacterFunctions.getMaxCharacterTiles().then((maxTiles) => {
			for (let i = 0; i < maxTiles; i++) {
				console.log(maxTiles);
				CharacterFunctions.getNthCharacterTile(i)
					.find('[data-cy="char-tile-name"]')
					.invoke('text')
					.then((name) => {
						if (fourStars.includes(name)) {
							assert(false);
						}
					});
			}
		});
		LayoutFunctions.enableBothStarSliders();

		cy.wait(100);

		CharacterFunctions.getMaxCharacterTiles().then((maxTiles) => {
			for (let i = 0; i < maxTiles; i++) {
				CharacterFunctions.getNthCharacterTile(i)
					.find('[data-cy="char-tile-name"]')
					.invoke('text')
					.then((name) => {
						if (fourStars.includes(name)) {
							fourStars.splice(fourStars.indexOf(name), 1);
						}
					});
			}
		});

		cy.wait(100);

		assert(fourStars.length == 0);
	});
});

describe('Five Star Slider', () => {
	const fiveStars: string[] = [];
	it('Slider toggle removes/adds Five Star Characters from the list', () => {
		LayoutFunctions.enableOnlyFiveStarSlider();

		cy.wait(100);

		CharacterFunctions.getMaxCharacterTiles().then((maxTiles) => {
			for (let i = 0; i < maxTiles; i++) {
				CharacterFunctions.getNthCharacterTile(i)
					.find('[data-cy="char-tile-name"]')
					.invoke('text')
					.then((name) => {
						fiveStars.push(name);
					});
			}
		});
		LayoutFunctions.enableOnlyFourStarSlider();

		cy.wait(100);

		CharacterFunctions.getMaxCharacterTiles().then((maxTiles) => {
			for (let i = 0; i < maxTiles; i++) {
				console.log(maxTiles);
				CharacterFunctions.getNthCharacterTile(i)
					.find('[data-cy="char-tile-name"]')
					.invoke('text')
					.then((name) => {
						if (fiveStars.includes(name)) {
							assert(false);
						}
					});
			}
		});
		LayoutFunctions.enableBothStarSliders();

		cy.wait(100);

		CharacterFunctions.getMaxCharacterTiles().then((maxTiles) => {
			for (let i = 0; i < maxTiles; i++) {
				CharacterFunctions.getNthCharacterTile(i)
					.find('[data-cy="char-tile-name"]')
					.invoke('text')
					.then((name) => {
						if (fiveStars.includes(name)) {
							fiveStars.splice(fiveStars.indexOf(name), 1);
						}
					});
			}
		});

		cy.wait(100);

		assert(fiveStars.length == 0);
	});
});

describe('Hide Character Slider', () => {
	it('Character is grayed out when Slider is turned off', () => {
		LayoutFunctions.hideMarkedSliderIsntEnabled();

		CharacterFunctions.nthCharacterTileIsntMarked(0);
		CharacterFunctions.getNthCharacterTile(0).click();
		CharacterFunctions.nthCharacterTileIsMarked(0);
		CharacterFunctions.getNthCharacterTile(0).click();
		CharacterFunctions.nthCharacterTileIsntMarked(0);
	});
	it('Character is missing when Slider is turned on', () => {
		let firstCharName: string;

		LayoutFunctions.hideMarkedSliderIsntEnabled();

		CharacterFunctions.getNthCharacterTile(0)
			.find('[data-cy="char-tile-name"]')
			.invoke('text')
			.then((name) => {
				firstCharName = name;
			});

		cy.wait(100);

		CharacterFunctions.getNthCharacterTile(0).click();

		LayoutFunctions.enableHideMarkedSlider();

		cy.wait(100);

		LayoutFunctions.hideMarkedSliderIsEnabled();

		cy.wait(100);

		CharacterFunctions.getMaxCharacterTiles().then((maxTiles) => {
			for (let i = 0; i < maxTiles; i++) {
				console.log(maxTiles);
				CharacterFunctions.getNthCharacterTile(i)
					.find('[data-cy="char-tile-name"]')
					.invoke('text')
					.then((name) => {
						if (firstCharName == name) {
							assert(false);
						}
					});
			}
		});

		cy.wait(100);

		LayoutFunctions.disableHideMarkedSlider();

		cy.wait(100);

		LayoutFunctions.hideMarkedSliderIsntEnabled();

		cy.wait(100);

		CharacterFunctions.getNthCharacterTile(0)
			.find('[data-cy="char-tile-name"]')
			.invoke('text')
			.then((name) => {
				if (firstCharName == name) {
					assert(true);
				}
			});

		CharacterFunctions.nthCharacterTileIsMarked(0);
	});
});

describe('Reset Button', () => {
	it('Reset Button unmarks all characters', () => {
		CharacterFunctions.getNthCharacterTile(0).click();
		CharacterFunctions.getNthCharacterTile(1).click();
		CharacterFunctions.getNthCharacterTile(2).click();
		CharacterFunctions.getNthCharacterTile(3).click();
		CharacterFunctions.getNthCharacterTile(4).click();
		CharacterFunctions.nthCharacterTileIsMarked(0);
		CharacterFunctions.nthCharacterTileIsMarked(1);
		CharacterFunctions.nthCharacterTileIsMarked(2);
		CharacterFunctions.nthCharacterTileIsMarked(3);
		CharacterFunctions.nthCharacterTileIsMarked(4);

		LayoutComponents.resetButton().click();

		CharacterFunctions.nthCharacterTileIsntMarked(0);
		CharacterFunctions.nthCharacterTileIsntMarked(1);
		CharacterFunctions.nthCharacterTileIsntMarked(2);
		CharacterFunctions.nthCharacterTileIsntMarked(3);
		CharacterFunctions.nthCharacterTileIsntMarked(4);
	});

	it('Reset Characters Button is functional with changed Character Rarity', () => {
		CharacterFunctions.getNthCharacterTile(0).click();
		CharacterFunctions.nthCharacterTileIsMarked(0);
		CharacterFunctions.getNthCharacterTile(1).click();

		LayoutComponents.resetButton().click();

		cy.wait(500);

		CharacterFunctions.nthCharacterTileIsntMarked(0);
		CharacterFunctions.nthCharacterTileIsntMarked(1);
	});

	it('Reset Characters Button is functional with hidden Characters', () => {
		const firstCharNames: string[] = [];

		for (let i = 0; i < 5; i++) {
			CharacterFunctions.getNthCharacterTile(0)
				.find('[data-cy="char-tile-name"]')
				.invoke('text')
				.then((name) => {
					firstCharNames.push(name);
				});
		}

		cy.wait(100);

		LayoutFunctions.enableHideMarkedSlider();

		cy.wait(100);

		CharacterFunctions.getNthCharacterTile(0).click();

		cy.wait(100);

		CharacterFunctions.getNthCharacterTile(0).click();

		cy.wait(100);

		CharacterFunctions.getNthCharacterTile(0).click();

		cy.wait(100);

		CharacterFunctions.getNthCharacterTile(0).click();

		cy.wait(100);

		CharacterFunctions.getNthCharacterTile(0).click();

		cy.wait(100);

		CharacterFunctions.getMaxCharacterTiles().then((maxTiles) => {
			for (let i = 0; i < maxTiles; i++) {
				console.log(maxTiles);
				CharacterFunctions.getNthCharacterTile(i)
					.find('[data-cy="char-tile-name"]')
					.invoke('text')
					.then((name) => {
						if (firstCharNames.includes(name)) {
							assert(false);
						}
					});
			}
		});

		cy.wait(100);

		LayoutComponents.resetButton().click();

		cy.wait(100);

		CharacterFunctions.getMaxCharacterTiles().then((maxTiles) => {
			for (let i = 0; i < maxTiles; i++) {
				console.log(maxTiles);
				CharacterFunctions.getNthCharacterTile(i)
					.find('[data-cy="char-tile-name"]')
					.invoke('text')
					.then((name) => {
						if (firstCharNames.includes(name)) {
							firstCharNames.splice(firstCharNames.indexOf(name), 1);
						}
					});
			}
		});

		cy.wait(100);

		assert(firstCharNames.length == 0);
	});
});

describe('Undo Button', () => {
	it('Undo Button is functional', () => {
		CharacterFunctions.getNthCharacterTile(0).click();

		cy.wait(100);

		CharacterFunctions.nthCharacterTileIsMarked(0);

		LayoutComponents.undoButton().click();

		cy.wait(100);

		CharacterFunctions.nthCharacterTileIsntMarked(0);
	});
	it('Undo Button is functional with hidden Characters per Rarity Slider', () => {
		LayoutFunctions.enableOnlyFourStarSlider();

		cy.wait(100);

		CharacterFunctions.getNthCharacterTile(0).click();

		cy.wait(100);

		CharacterFunctions.nthCharacterTileIsMarked(0);
		LayoutFunctions.enableOnlyFiveStarSlider();

		cy.wait(100);

		LayoutComponents.undoButton().click();

		cy.wait(100);

		LayoutFunctions.enableOnlyFourStarSlider();

		cy.wait(100);

		CharacterFunctions.nthCharacterTileIsntMarked(0);
	});
	it('Undo Button is functional with hidden Characters per Hide marked Characters Slider', () => {
		let firstCharName: string;

		LayoutFunctions.hideMarkedSliderIsntEnabled();
		LayoutFunctions.enableHideMarkedSlider();

		cy.wait(100);

		LayoutFunctions.hideMarkedSliderIsEnabled();

		CharacterFunctions.getNthCharacterTile(0)
			.find('[data-cy="char-tile-name"]')
			.invoke('text')
			.then((name) => {
				firstCharName = name;
			});

		cy.wait(100);

		CharacterFunctions.getNthCharacterTile(0).click();

		cy.wait(100);

		CharacterFunctions.getMaxCharacterTiles().then((maxTiles) => {
			for (let i = 0; i < maxTiles; i++) {
				console.log(maxTiles);
				CharacterFunctions.getNthCharacterTile(i)
					.find('[data-cy="char-tile-name"]')
					.invoke('text')
					.then((name) => {
						if (firstCharName == name) {
							assert(false);
						}
					});
			}
		});

		LayoutComponents.undoButton().click();

		cy.wait(100);

		CharacterFunctions.getNthCharacterTile(0)
			.find('[data-cy="char-tile-name"]')
			.invoke('text')
			.then((name) => {
				if ((firstCharName = name)) assert(true);
			});
	});
	it("Undo Button doesn't undo after pressing the Reset Button", () => {
		CharacterFunctions.getNthCharacterTile(0).click();

		cy.wait(100);

		CharacterFunctions.nthCharacterTileIsMarked(0);
		LayoutComponents.resetButton().click();

		cy.wait(100);

		LayoutComponents.undoButton().click();

		cy.wait(100);

		CharacterFunctions.nthCharacterTileIsntMarked(0);
		LayoutComponents.undoButton().click();

		cy.wait(100);

		CharacterFunctions.nthCharacterTileIsntMarked(0);
		LayoutComponents.undoButton().click();

		cy.wait(100);

		CharacterFunctions.nthCharacterTileIsntMarked(0);
	});
});
