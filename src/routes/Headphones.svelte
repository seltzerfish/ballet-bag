<script lang="ts">
	import { currentMusic, songs } from '$lib/globals.svelte';
	import { onMount } from 'svelte';

	let justSpawned = $state(true);
	let songIndex = $state(0);

	onMount(() => {
		const delayMs = 1000;
		setTimeout(() => {
			justSpawned = false;
		}, delayMs);
	});

	const clickHeadphones = () => {
		songIndex = (songIndex + 1) % songs.length;
		currentMusic.current = songs[songIndex];
	};
</script>

<div class="p-10">
	<button
		class:motion-scale-in-0={justSpawned}
		class:motion-ease-spring-bouncier={justSpawned}
		class:hover:scale-125={!justSpawned}
		onclick={clickHeadphones}
		class="not-active:motion-preset- h-[10rem] w-[10rem] transition-transform hover:rotate-6 hover:cursor-pointer active:scale-110 active:rotate-0"
		><img src="/headphones.png" alt="headphones" /></button
	>
</div>
