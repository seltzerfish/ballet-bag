<script lang="ts">
	import { globals, SONGS } from '$lib/globals.svelte';
	import { onMount } from 'svelte';

	let justSpawned = $state(true);

	onMount(() => {
		const delayMs = 1600;
		setTimeout(() => {
			justSpawned = false;
		}, delayMs);
	});

	const clickHeadphones = () => {
		globals.songIndex = (globals.songIndex + 1) % SONGS.length;
	};
</script>

<div class="p-16">
	<button
		class:motion-scale-in-0={justSpawned}
		class:motion-ease-spring-bouncier={justSpawned}
		class:hover:scale-125={!justSpawned}
		onclick={clickHeadphones}
		class="motion-delay-600 h-[14rem] w-[14rem] transition-transform hover:rotate-6 hover:cursor-pointer active:scale-110 active:rotate-0"
		><img src="/headphones.png" alt="headphones" /></button
	>
</div>
