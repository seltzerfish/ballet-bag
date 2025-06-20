<script lang="ts">
	import { globals } from '$lib/globals.svelte';
	import PolaroidPhoto from './PolaroidPhoto.svelte';

	let clickedOnce = $state(false);
	let entering = $derived(globals.animationPhase === 'bag-exit-pause');
	let currentPhoto = $state(0);
	let showCurrentPhoto = $state(false);

	const clickPolaroid = () => {
		clickedOnce = true;
		if (globals.polaroidRecentlyClicked) return;
		globals.polaroidRecentlyClicked = true;
		setTimeout(() => {
			globals.polaroidRecentlyClicked = false;
		}, 1200);
		currentPhoto = (currentPhoto + 1) % 5;
		showCurrentPhoto = true;

		const audio = new Audio('/polaroid.mp3');
		audio.play().catch(console.error);
	};
</script>

{#if globals.animationPhase === 'bag-exit-pause' || globals.animationPhase === 'bag-exit-components-enter' || globals.animationPhase === 'complete'}
	<div
		class="fixed top-0 left-[35%] h-[20rem] w-[20rem]"
		class:motion-translate-y-in-[500%]={entering}
	>
		<div
			class:motion-scale-in-0={entering}
			class=" motion-ease-spring-bouncier motion-duration-1000 motion-delay-[100ms] relative"
		>
			<div class="absolute inset-0" class:hidden={!clickedOnce || !showCurrentPhoto}>
				<PolaroidPhoto photo={currentPhoto} bind:visible={showCurrentPhoto} />
			</div>
			<button onclick={clickPolaroid} class="clickable absolute inset-0 p-9">
				<img src="/polaroid.png" alt="polaroid" />
			</button>
		</div>
	</div>
{/if}
