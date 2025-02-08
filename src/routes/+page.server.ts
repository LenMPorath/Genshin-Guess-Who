import fs from 'fs';
import path from 'path';

type CharacterEntry = {
	game: string;
	path: string;
	stars: number;
	disabled: boolean;
};

enum Game {
	HonkaiStarRail = 'hsr',
	GenshinImpact = 'genshin'
}

async function generateCharacterArray(): Promise<CharacterEntry[]> {
	const readDirectory = (directoryPath: string, game: string, stars: number): CharacterEntry[] => {
		try {
			return fs
				.readdirSync(directoryPath)
				.filter((file) => file.endsWith('.webp'))
				.map((file) => ({
					path: `/${game}/char_icons_${stars}star/${file}`,
					game,
					stars,
					disabled: false
				}));
		} catch (error) {
			console.error(`Error reading directory ${directoryPath}:`, error);
			return [];
		}
	};

	const hsrfourStarCharacters = readDirectory(
		path.resolve('static/hsr/char_icons_4star'),
		Game.HonkaiStarRail,
		4
	);
	const hsrfiveStarCharacters = readDirectory(
		path.resolve('static/hsr/char_icons_5star'),
		Game.HonkaiStarRail,
		5
	);
	const genshinfourStarCharacters = readDirectory(
		path.resolve('static/genshin/char_icons_4star'),
		Game.GenshinImpact,
		4
	);
	const genshinfiveStarCharacters = readDirectory(
		path.resolve('static/genshin/char_icons_5star'),
		Game.GenshinImpact,
		5
	);

	// Kombiniere die beiden Arrays und sortiere nach dem Charakternamen
	const combinedCharacters = [
		...hsrfourStarCharacters,
		...hsrfiveStarCharacters,
		...genshinfourStarCharacters,
		...genshinfiveStarCharacters
	];

	// Sortiere das Array alphabetisch anhand der Charakternamen
	combinedCharacters.sort((a, b) => {
		const nameA = formatCharacterName(a.path);
		const nameB = formatCharacterName(b.path);

		return nameA.localeCompare(nameB);
	});

	return combinedCharacters;
}

function formatCharacterName(path: string): string {
	const fileName = path.split('/').pop();
	if (!fileName) {
		throw new Error('Invalid path');
	}

	// Entferne die Dateiendung (.webp)
	const baseName = fileName.replace('.webp', '');

	// Ersetze Unterstriche mit Leerzeichen und formatiere den Namen
	return baseName
		.split('_')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
		.join(' ');
}

export async function load() {
	try {
		const characters = await generateCharacterArray();
		return { characters };
	} catch (error) {
		console.error('Error loading characters:', error);
		return { characters: [] };
	}
}
