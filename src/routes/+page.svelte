<script lang="ts">
	import CharacterTile from '$lib/CharacterTile.svelte';
	import { Accordion, AccordionItem, SlideToggle } from '@skeletonlabs/skeleton';

	export let data: { characters: { path: string; stars: number; disabled: boolean }[] };

	// Gebundener Bool für die SlideToggles
	let fourStarsActive = true;
	let fiveStarsActive = true;
	let hideMarkedCharacters = false;

	let undoStack: { path: string; previousState: boolean }[] = []; // Stack für das Rückgängigmachen von Aktionen
	$: visibleCharacters = computeVisibleCharacters();

	// Sichtbare Charaktere berechnen
	function computeVisibleCharacters() {
		return data.characters.filter((char) => {
			// Filter für 4- und 5-Sterne-Charaktere
			const starsFilter =
				(fourStarsActive && char.stars === 4) || (fiveStarsActive && char.stars === 5);
			// Filter für markierte Charaktere
			const hideFilter = hideMarkedCharacters ? !char.disabled : true;
			return starsFilter && hideFilter;
		});
	}

	// Funktion für den Reset-Button
	function resetCharacters() {
		data.characters.forEach((char) => {
			char.disabled = false;
		});
		undoStack = [];
		visibleCharacters = computeVisibleCharacters();
	}

	// Funktion für den Undo-Button
	function undoLastAction() {
		const lastAction = undoStack.pop();
		if (lastAction) {
			const char = data.characters.find((c) => c.path === lastAction.path);
			if (char) {
				char.disabled = lastAction.previousState;
				visibleCharacters = computeVisibleCharacters();
			}
		}
	}

	// Funktion beim Klicken auf einen Charakter
	function toggleCharacterState(charPath: string) {
		const char = data.characters.find((c) => c.path === charPath);
		if (char) {
			// Charakter zum Undo-Stack hinzufügen
			undoStack.push({ path: char.path, previousState: char.disabled });
			// Charakter de-/aktivieren
			char.disabled = !char.disabled;
			visibleCharacters = computeVisibleCharacters();
		}
	}
</script>

<div class="flex flex-col items-center gap-4 p-2 sm:flex-row sm:justify-center">
	<div class="flex gap-4 justify-center w-full md:w-2/5">
		<Accordion class="card">
			<AccordionItem>
				<svelte:fragment slot="summary">
					<p class="text-primary-900-50-token font-bold" data-cy="accordion-item-how-to-play">
						How to Play
					</p>
				</svelte:fragment>
				<svelte:fragment slot="content">
					<div data-cy="accordion-item-how-to-play-content" class="space-y-3">
						<p class="text-primary-900-50-token">
							Each player selects a character from the available pool, keeping their choice a
							secret.
						</p>
						<p class="text-primary-900-50-token">
							Players then take turns asking yes-or-no questions (e.g., "Does your character have a
							hat?") to narrow down the possibilities.
						</p>
						<p class="text-primary-900-50-token">
							Based on the answers, eliminate characters that don't fit the description. The first
							player to correctly guess their opponent's character wins!
						</p>
					</div>
				</svelte:fragment>
			</AccordionItem>
			<AccordionItem>
				<svelte:fragment slot="summary">
					<p class="text-primary-900-50-token font-bold" data-cy="accordion-item-information">
						Information Regarding this Website
					</p></svelte:fragment
				>
				<svelte:fragment slot="content">
					<div data-cy="accordion-item-information-content" class="space-y-3">
						<p class="text-primary-900-50-token">
							"Genshin Guess Who" aka. "genshin-guess-who.com" is an independent, fan-created
							website and is not affiliated with or endorsed by HoYoverse.
						</p>
						<p class="text-primary-900-50-token">
							Genshin Impact, along with all associated game content, character designs, images, and
							materials, are trademarks and copyrights owned by HoYoverse.
						</p>
						<p class="text-primary-900-50-token">
							All visuals, trademarks, and intellectual properties displayed on this website belong
							to their respective owners and are used here solely for non-commercial, entertainment,
							and informational purposes.
						</p>
						<p class="text-primary-900-50-token">
							This website is intended for fan enjoyment and community engagement. If you have any
							concerns regarding copyright or intellectual property, please contact me directly via
							Discord (shuryo).
						</p>
					</div>
				</svelte:fragment>
			</AccordionItem>
		</Accordion>
	</div>
</div>

<div class="flex flex-col items-center gap-4 p-2 sm:flex-row sm:justify-center">
	<div class="flex gap-4 justify-center">
		<SlideToggle
			name="four-stars"
			data-cy="toggle-four-stars"
			bind:checked={fourStarsActive}
			active="bg-[#B180BA]"
			background="bg-[#645D87]"
			on:change={() => {
				visibleCharacters = computeVisibleCharacters();
			}}
		>
			Four Stars
		</SlideToggle>
		<SlideToggle
			name="five-stars"
			data-cy="toggle-five-stars"
			bind:checked={fiveStarsActive}
			active="bg-[#C77E2C]"
			background="bg-[#936234]"
			on:change={() => {
				visibleCharacters = computeVisibleCharacters();
			}}
		>
			Five Stars
		</SlideToggle>
	</div>

	<div class="flex gap-4 justify-center">
		<SlideToggle
			name="hide-marked"
			data-cy="toggle-hide-chars"
			bind:checked={hideMarkedCharacters}
			active="bg-[#4CAF50]"
			background="bg-[#388E3C]"
			on:change={() => {
				visibleCharacters = computeVisibleCharacters();
			}}
		>
			Hide marked Characters
		</SlideToggle>
	</div>

	<div class="flex gap-4 justify-center">
		<button
			class="btn variant-filled rounded-full w-1/2 sm:w-auto sm:mt-0"
			data-cy="button-reset"
			on:click={resetCharacters}
		>
			Reset Characters
		</button>
		<button
			class="btn variant-filled rounded-full w-1/2 sm:w-auto sm:mt-0"
			data-cy="button-undo"
			on:click={undoLastAction}
		>
			Undo
		</button>
	</div>
</div>

<div class="flex flex-wrap gap-3 p-2 justify-center">
	{#if visibleCharacters.length > 0}
		{#each visibleCharacters as char}
			<CharacterTile
				charIconPath={char.path}
				bind:disabled={char.disabled}
				onToggle={toggleCharacterState}
			/>
		{/each}
	{:else}
		<p class="col-span-full text-center text-primary-700-200-token">No characters available.</p>
	{/if}
</div>
