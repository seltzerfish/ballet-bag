<script lang="ts">
	import { globals } from '$lib/globals.svelte';

	const frames = [
		'flyer/flyer-1.png', // crumpled
		'flyer/flyer-2.png',
		'flyer/flyer-3.png',
		'flyer/flyer-4.png',
		'flyer/flyer-5.png' // uncrumpled
	];

	let currentFrame = $state(0); // start crumpled
	let isAnimating = $state(false);
	let isCrumpled = $state(true);

	function toggleFlyer() {
		if (isAnimating) return;

		const targetFrame = isCrumpled ? 4 : 0; // frame 4 is uncrumpled, frame 0 is crumpled

		if (targetFrame === currentFrame) return;

		const audio = new Audio('/crumple.mp3');
		audio.play().catch(() => {});

		isAnimating = true;
		animateToFrame(targetFrame, () => {
			isCrumpled = !isCrumpled;
			isAnimating = false;
		});
	}

	function animateToFrame(targetFrame: number, onComplete: () => void) {
		const step = targetFrame > currentFrame ? 1 : -1;
		const interval = setInterval(() => {
			currentFrame += step;

			if (currentFrame === targetFrame) {
				clearInterval(interval);
				onComplete();
			}
		}, 100);
	}

	let entering = $derived(globals.animationPhase === 'bag-exit-pause');
</script>

{#if globals.animationPhase === 'bag-exit-pause' || globals.animationPhase === 'bag-exit-components-enter' || globals.animationPhase === 'complete'}
	<div class="fixed top-6 left-12 h-[20rem] w-[23rem]">
		<div
			class:motion-translate-x-in-100={entering}
			class:motion-translate-y-in-100={entering}
			class:motion-scale-in-0={entering}
			class="motion-ease-spring-bouncier motion-duration-1000 motion-delay-[500ms]"
		>
			<button onclick={toggleFlyer} disabled={isAnimating} class="clickable">
				<img
					src={frames[currentFrame]}
					alt="Flyer {isCrumpled ? 'crumpled' : 'uncrumpled'}"
					class="h-full w-full object-contain"
				/>
			</button>
		</div>
	</div>
{/if}
