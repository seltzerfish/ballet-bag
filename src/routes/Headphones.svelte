<script lang="ts">
	import { globals, changeSong } from '$lib/globals.svelte';

	const clickHeadphones = () => {
		changeSong();
	};

	let entering = $derived(globals.animationPhase === 'bag-exit-components-enter');
</script>

{#if globals.animationPhase === 'bag-exit-components-enter' || globals.animationPhase === 'complete'}
	<div
		class:motion-translate-x-in-100={entering}
		class:motion-translate-y-in-100={entering}
		class:motion-scale-in-0={entering}
		class="motion-ease-spring-bouncier motion-duration-1000"
	>
		<button onclick={clickHeadphones} class="clickable clickable-rotate p-9">
			<img src="/headphones.png" alt="headphones" />
		</button>
	</div>
{/if}

<style>
</style>
