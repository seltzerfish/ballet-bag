<script lang="ts">
	import { globals } from '$lib/globals.svelte';

	const frames = [
		'journal/journal01.png', // page 0 (book closed)
		'journal/journal02.png',
		'journal/journal03.png',
		'journal/journal04.png',
		'journal/journal05.png',
		'journal/journal06.png',
		'journal/journal07.png', // page 1
		'journal/journal08.png',
		'journal/journal09.png',
		'journal/journal10.png',
		'journal/journal11.png',
		'journal/journal12.png',
		'journal/journal13.png', // page 2
		'journal/journal14.png',
		'journal/journal15.png',
		'journal/journal16.png',
		'journal/journal17.png' // page 3
	];

	const pageFrames = [0, 8, 12, 16]; // frame indices for pages 0-3
	let currentPage = $state(0);
	let currentFrame = $state(0);
	let isAnimating = $state(false);

	function nextPage() {
		if (isAnimating) return;

		const nextPageIndex = (currentPage + 1) % pageFrames.length;
		const targetFrame = pageFrames[nextPageIndex];

		if (targetFrame === currentFrame) return;

		isAnimating = true;
		animateToFrame(targetFrame, () => {
			currentPage = nextPageIndex;
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

	let entering = $derived(globals.animationPhase === 'bag-exit-components-enter');
</script>

{#if globals.animationPhase === 'bag-exit-components-enter' || globals.animationPhase === 'complete'}
	<div class="fixed top-0 right-6 h-[25rem] w-[30rem]">
		<div
			class:-motion-translate-x-in-100={entering}
			class:motion-translate-y-in-100={entering}
			class:motion-scale-in-0={entering}
			class="motion-ease-spring-bouncier motion-duration-1000 motion-delay-[300ms]"
		>
			<button onclick={nextPage} disabled={isAnimating} class="clickable">
				<img
					src={frames[currentFrame]}
					alt="Journal page {currentPage}"
					class="h-full w-full object-contain"
				/>
			</button>
		</div>
	</div>
{/if}
