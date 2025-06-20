<script lang="ts">
	import { globals, changeSong } from '$lib/globals.svelte';

	const clickHeadphones = () => {
		changeSong();
	};
	let entering = $derived(globals.animationPhase === 'bag-exit-pause');
	let hovering = $state(false);
</script>

{#if globals.animationPhase === 'bag-exit-pause' || globals.animationPhase === 'bag-exit-components-enter' || globals.animationPhase === 'complete'}
	<div class="clickable-rotate fixed bottom-[12rem] left-[18rem] h-[20rem] w-[20rem] scale-50">
		<div
			onpointerenter={() => (hovering = true)}
			onpointerleave={() => (hovering = false)}
			class:motion-translate-x-in-100={entering}
			class:-motion-translate-y-in-[40%]={entering}
			class:motion-scale-in-0={entering}
			class="motion-ease-spring-bouncier motion-duration-1000 motion-delay-[500ms] relative"
		>
			<div class="absolute inset-0 h-[20rem] w-[20rem] transition-transform">
				<img src="/lipstick1.png" alt="lipstick" />
			</div>
			<div class="absolute inset-0 h-[20rem] w-[20rem] transition-transform">
				<img src="/lipstick2.png" alt="lipstick" />
			</div>
		</div>
	</div>
{/if}
