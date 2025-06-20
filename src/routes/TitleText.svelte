<script>
	import { globals } from '$lib/globals.svelte';
	import { fade } from 'svelte/transition';
</script>

{#if globals.animationPhase === 'complete'}
	<!-- <div
		transition:fade
		class="pointer-events-none fixed inset-0 flex h-full w-full items-center justify-center font-bold"
	>
		<h1 class="pinyon-script-regular text-6xl">What's in my ballet bag?</h1>
	</div> -->
{/if}
