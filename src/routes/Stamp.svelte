<script lang="ts">
	import { globals } from '$lib/globals.svelte';
	import { spring } from 'svelte/motion';

	let stampLayer: HTMLDivElement;
	const inkedStampImage = '/inkedStamp.png'; // to be printed on the stamp layer

	let stampedImages = $state<Array<{ x: number; y: number; id: number }>>([]);
	let nextId = 0;

	const cursorX = spring(0, { stiffness: 0.1, damping: 0.4 });
	const cursorY = spring(0, { stiffness: 0.1, damping: 0.4 });

	const clickStamp = () => {
		globals.usingStamp = true;
	};
	const clickInkpad = () => {
		globals.usingStamp = false;
	};
	let entering = $derived(globals.animationPhase === 'bag-exit-pause');

	const stampHere = (event: PointerEvent) => {
		if (globals.usingStamp) {
			const rect = stampLayer.getBoundingClientRect();
			const x = event.clientX - rect.left;
			const y = event.clientY - rect.top;

			stampedImages.push({
				x: x - 50, // offset to center the stamp image
				y: y - 50,
				id: nextId++
			});
		}
	};

	const updateCursorPosition = (event: MouseEvent) => {
		cursorX.set(event.clientX);
		cursorY.set(event.clientY);
	};
</script>

<svelte:window onmousemove={updateCursorPosition} />

{#if globals.animationPhase === 'bag-exit-pause' || globals.animationPhase === 'bag-exit-components-enter' || globals.animationPhase === 'complete'}
	<div class="fixed bottom-0 left-0 z-50 h-[20rem] w-[20rem]">
		<div
			class:motion-translate-x-in-100={entering}
			class:-motion-translate-y-in-[40%]={entering}
			class:motion-scale-in-0={entering}
			class="motion-ease-spring-bouncier motion-duration-1000 motion-delay-[1000ms] relative h-full w-full"
		>
			<button
				onclick={clickInkpad}
				disabled={!globals.usingStamp}
				class:clickable={globals.usingStamp}
				class="absolute z-10 p-9"
			>
				<img src="/inkpad.png" alt="inkpad" class="h-full w-full object-contain" />
			</button>
			<button
				class:hidden={globals.usingStamp}
				onclick={clickStamp}
				class="clickable absolute top-4 left-16 z-50 h-full w-full p-16"
			>
				<img src="/stamp.png" alt="stamp" class="h-full w-full object-contain" />
			</button>
		</div>
	</div>
{/if}

{#if globals.usingStamp}
	<img
		src="/stamp.png"
		alt="cursor stamp"
		class="pointer-events-none fixed z-[60] w-[150px] object-contain"
		style="left: {$cursorX - 80}px; top: {$cursorY - 80}px;"
	/>
{/if}

<div
	onpointerdown={stampHere}
	bind:this={stampLayer}
	class:pointer-events-none={!globals.usingStamp}
	class="fixed z-40 h-screen w-screen"
>
	{#each stampedImages as stamp (stamp.id)}
		<img
			src={inkedStampImage}
			alt="stamped"
			class="pointer-events-none absolute h-[100px] w-[100px]"
			style="left: {stamp.x}px; top: {stamp.y}px;"
		/>
	{/each}
</div>
