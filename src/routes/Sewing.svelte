<script lang="ts">
	import { globals } from '$lib/globals.svelte';

	let entering = $derived(globals.animationPhase === 'bag-exit-pause');
	let hovering = $state(false);
</script>

{#if globals.animationPhase === 'bag-exit-pause' || globals.animationPhase === 'bag-exit-components-enter' || globals.animationPhase === 'complete'}
	<div class="fixed right-[13rem] bottom-[18rem] h-[20rem] w-[20rem] scale-75">
		<div
			onpointerenter={() => (hovering = true)}
			onpointerleave={() => (hovering = false)}
			class:-motion-translate-x-in-100={entering}
			class:-motion-translate-y-in-[40%]={entering}
			class:motion-scale-in-0={entering}
			class="motion-ease-spring-bouncier motion-duration-1000 motion-delay-[200ms] relative transition-all"
		>
			<div
				class:translate-x-[1rem]={hovering}
				class="absolute inset-0 h-[20rem] w-[20rem] transition-transform"
			>
				<img src="/sewing1.png" alt="sewing" />
			</div>
			<div
				class:translate-y-[1rem]={hovering}
				class="absolute inset-0 h-[20rem] w-[20rem] transition-transform"
			>
				<img src="/sewing2.png" alt="sewing" />
			</div>
			<div
				class:-translate-x-[1rem]={hovering}
				class="absolute inset-0 h-[20rem] w-[20rem] transition-transform"
			>
				<img src="/sewing3.png" alt="sewing" />
			</div>
		</div>
	</div>
{/if}
