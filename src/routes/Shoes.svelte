<script lang="ts">
	import { globals, changeSong } from '$lib/globals.svelte';

	const clickHeadphones = () => {
		changeSong();
	};
	let entering = $derived(globals.animationPhase === 'bag-exit-pause');
	let hovering = $state(false);
</script>

{#if globals.animationPhase === 'bag-exit-pause' || globals.animationPhase === 'bag-exit-components-enter' || globals.animationPhase === 'complete'}
	<div class="fixed bottom-[22rem] left-0 h-[20rem] w-[20rem]">
		<div
			onpointerenter={() => (hovering = true)}
			onpointerleave={() => (hovering = false)}
			class:motion-translate-x-in-100={entering}
			class:-motion-translate-y-in-[40%]={entering}
			class:motion-scale-in-0={entering}
			class="motion-ease-spring-bouncier motion-duration-1000 motion-delay-[500ms] relative transition-all"
		>
			<div
				class:translate-x-[1rem]={hovering}
				class="absolute inset-0 h-[20rem] w-[20rem] transition-transform"
			>
				<img src="/shoes1.png" alt="shoes" />
			</div>
			<div
				class:translate-y-[1rem]={hovering}
				class="absolute inset-0 h-[20rem] w-[20rem] transition-transform"
			>
				<img src="/shoes2.png" alt="shoes" />
			</div>
			<div
				class:-translate-x-[1rem]={hovering}
				class="absolute inset-0 h-[20rem] w-[20rem] transition-transform"
			>
				<img src="/shoes3.png" alt="shoes" />
			</div>
		</div>
	</div>
{/if}
