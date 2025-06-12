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
</script>

{#if globals.animationPhase === 'bag-exit-components-enter' || globals.animationPhase === 'complete'}
	<div
		class="journal-container"
		class:animate-from-center={globals.animationPhase === 'bag-exit-components-enter'}
		class:in-position={globals.animationPhase === 'complete'}
	>
		<button onclick={nextPage} disabled={isAnimating} class="clickable">
			<img
				src={frames[currentFrame]}
				alt="Journal page {currentPage}"
				class="h-full w-full object-contain"
			/>
		</button>
	</div>
{/if}

<style>
	.journal-container {
		position: fixed;
		bottom: 2rem;
		left: 2rem;
		width: 300px;
		height: 400px;

		transform: translate(calc(50vw - 50%), calc(-50vh + 50%)) scale(0);
		transition: transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	.animate-from-center {
		transform: translate(calc(50vw - 50%), calc(-50vh + 50%)) scale(0);
	}

	.in-position {
		transform: translate(0, 0) scale(1);
	}
</style>
