<script>
	import { globals } from '$lib/globals.svelte';
</script>

{#if globals.animationPhase !== 'loading' && globals.animationPhase !== 'complete'}
	<div
		class="pointer-events-none fixed inset-0 z-50 flex items-center justify-center"
		class:bag-enter={globals.animationPhase === 'bag-enter'}
		class:bag-pause={globals.animationPhase === 'bag-pause'}
		class:bag-exit-pause={globals.animationPhase === 'bag-exit-pause'}
		class:bag-exit={globals.animationPhase === 'bag-exit-components-enter'}
	>
		<div class="bag-container">
			<img src="/bag.png" alt="Ballet bag" class="h-[30rem] w-[30rem] object-contain" />
		</div>
	</div>
{/if}

<style>
	.bag-container {
		transform: translateY(-100vh);
		transition: transform 1.8s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.bag-enter .bag-container {
		transform: translateY(0);
	}

	.bag-pause .bag-container {
		transform: translateY(0);
	}

	.bag-exit-pause .bag-container {
		transform: translateY(0);
	}

	.bag-exit .bag-container {
		transform: translateY(100vh);
		transition: transform 0.6s cubic-bezier(0.6, 0, 0.4, 1);
	}
</style>
