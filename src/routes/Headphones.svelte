<script lang="ts">
	import { globals, changeSong } from '$lib/globals.svelte';

	const clickHeadphones = () => {
		changeSong();
	};
</script>

{#if globals.animationPhase === 'bag-exit-components-enter' || globals.animationPhase === 'complete'}
	<div
		class="headphones-container"
		class:animate-from-center={globals.animationPhase === 'bag-exit-components-enter'}
		class:in-position={globals.animationPhase === 'complete'}
	>
		<button
			onclick={clickHeadphones}
			class="p-9 transition-transform hover:scale-110 hover:rotate-6 hover:cursor-pointer active:scale-100 active:rotate-0"
		>
			<img src="/headphones.png" alt="headphones" />
		</button>
	</div>
{/if}

<style>
</style>
