<script>
	import { globals } from '$lib/globals.svelte';
	import { fade } from 'svelte/transition';
</script>

{#if globals.animationPhase === 'complete' || globals.animationPhase === 'bag-exit-components-enter'}
	<div
		transition:fade
		class="pointer-events-none fixed top-1/2 left-1/2 -translate-x-3/4 -translate-y-[12rem] -rotate-10 font-bold"
	>
		<h1 class="pinyon-script-regular text-6xl">What's in my ballet bag?</h1>
	</div>
{/if}
