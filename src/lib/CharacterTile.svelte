<script lang="ts">
	export let charIconPath: string;
	export let disabled: boolean = false;
	export let onToggle: (charPath: string) => void;

	$: charName = formatCharacterName(charIconPath);

	function formatCharacterName(path: string): string {
		const fileName = path.split('/').pop();
		if (!fileName) throw new Error('Invalid path');

		return fileName
			.replace('.webp', '')
			.split('_')
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
			.join(' ');
	}
</script>

<button
	class="sm:w-[15%] md:w-[10%] lg:w-[6%] w-[17%] sm:h-auto bg-primary-600-300-token shadow-md rounded-lg flex flex-col items-center sm:p-3 p-1 space-y-2
    border border-primary-500-400-token hover:shadow-lg transition-all duration-200
    cursor-pointer relative box-border"
	class:opacity-50={disabled}
	on:click={() => onToggle(charIconPath)}
	data-cy="char-tile"
>
	<div class="w-[100%] bg-gray-100 rounded-full overflow-hidden border border-gray-300">
		<img
			src={charIconPath}
			alt={charName}
			data-cy="char-tile-image"
			class="object-cover w-full h-full"
		/>
	</div>

	<h1
		class="text-center sm:text-xs text-[clamp(0.3rem,3vw,0.52rem)] break-words sm:font-sans leading-tight text-gray-800"
		data-cy="char-tile-name"
	>
		{charName}
	</h1>

	{#if disabled}
		<div class="absolute bg-opacity-50 rounded-lg flex items-center justify-center">
			<img src="/cross.webp" alt="" class="object-cover w-2/3 h-full" />
		</div>
	{/if}
</button>
