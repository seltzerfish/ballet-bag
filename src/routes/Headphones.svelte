<script lang="ts">
	import { globals, changeSong } from '$lib/globals.svelte';

	const clickHeadphones = () => {
		changeSong();
	};
	let entering = $derived(globals.animationPhase === 'bag-exit-pause');
</script>

{#if globals.animationPhase === 'bag-exit-pause' || globals.animationPhase === 'bag-exit-components-enter' || globals.animationPhase === 'complete'}
	<div class="fixed right-0 bottom-0 h-[20rem] w-[20rem]">
		<div
			class:-motion-translate-x-in-100={entering}
			class:-motion-translate-y-in-[40%]={entering}
			class:motion-scale-in-0={entering}
			class="motion-ease-spring-bouncier motion-duration-1000 motion-delay-[1000ms] hue-rotate-15 transition-all hover:hue-rotate-0"
		>
			<button onclick={clickHeadphones} class="clickable clickable-rotate p-9">
				<img src="/headphones.png" alt="headphones" />
			</button>
		</div>
	</div>
{/if}
