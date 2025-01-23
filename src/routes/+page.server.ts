import fs from 'fs';
import path from 'path';

type CharacterEntry = {
	path: string;
	stars: number;
	disabled: boolean;
};

async function generateCharacterArray(): Promise<CharacterEntry[]> {
	const readDirectory = (directoryPath: string, stars: number): CharacterEntry[] => {
		try {
			return fs
				.readdirSync(directoryPath)
				.filter((file) => file.endsWith('.webp'))
				.map((file) => ({
					path: `/char_icons_${stars}star/${file}`,
					stars,
					disabled: false,
				}));
		} catch (error) {
			console.error(`Error reading directory ${directoryPath}:`, error);
			return [];
		}
	};

	const fourStarCharacters = readDirectory(path.resolve('static/char_icons_4star'), 4);
	const fiveStarCharacters = readDirectory(path.resolve('static/char_icons_5star'), 5);

	// Kombiniere die beiden Arrays und sortiere nach dem Charakternamen
	const combinedCharacters = [...fourStarCharacters, ...fiveStarCharacters];

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
