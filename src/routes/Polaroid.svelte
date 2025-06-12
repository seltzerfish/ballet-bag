<script lang="ts">
	import { globals } from '$lib/globals.svelte';
	import PolaroidPhoto from './PolaroidPhoto.svelte';

	let entering = $derived(globals.animationPhase === 'bag-exit-components-enter');
	let currentPhoto = $state(0);

	const clickPolaroid = () => {
		if (globals.polaroidRecentlyClicked) return;
		globals.polaroidRecentlyClicked = true;
		setTimeout(() => {
			globals.polaroidRecentlyClicked = false;
		}, 1200);
		currentPhoto = (currentPhoto + 1) % 5;
	};
</script>

{#if globals.animationPhase === 'bag-exit-components-enter' || globals.animationPhase === 'complete'}
	<div
		class="fixed top-0 left-[35%] h-[20rem] w-[20rem]"
		class:motion-translate-y-in-[500%]={entering}
	>
		<div
			class:motion-scale-in-0={entering}
			class=" motion-ease-spring-bouncier motion-duration-1000 motion-delay-[100ms] relative"
		>
			<div class="absolute inset-0">
				<PolaroidPhoto photo={currentPhoto} />
			</div>
			<button onclick={clickPolaroid} class="clickable absolute inset-0 p-9">
				<img src="/polaroid.png" alt="polaroid" />
			</button>
		</div>
	</div>
{/if}
