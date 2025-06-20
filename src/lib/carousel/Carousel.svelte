<script lang="ts">
	import { onMount } from 'svelte';
	import type { CarouselStyle } from './types';

	type Image = { url: string; alt: string };

	let {
		style,
		images,
		autoScroll = true,
		onMount: onMountCallback
	}: {
		style: CarouselStyle;
		images: Image[];
		autoScroll?: boolean;
		onMount?: (methods: any) => void;
	} = $props();

	let carouselContainer: HTMLDivElement | null = $state(null);

	let currentSlide = $state(0);
	$effect(() => {
		scrollToSlide(currentSlide);
	});

	const incrementSlide = () => {
		currentSlide = (currentSlide + 1) % images.length;
	};
	const decrementSlide = () => {
		currentSlide = (currentSlide - 1 + images.length) % images.length;
	};

	onMount(() => {
		if (onMountCallback) {
			onMountCallback({
				incrementSlide,
				decrementSlide,
				scrollToSlide
			});
		}
		if (autoScroll) {
			setInterval(() => {
				// TODO: do this manually
				incrementSlide();
			}, 4000);
		}
	});

	function scrollToSlide(index: number) {
		if (!carouselContainer || index < 0 || index >= images.length) return;

		currentSlide = index;
		const items = carouselContainer.querySelectorAll<HTMLDivElement>('.carousel-item');
		if (items[index]) {
			const offsetLeft = items[index].offsetLeft;
			carouselContainer.scrollTo({
				left: offsetLeft,
				behavior: 'smooth'
			});
		}
	}
</script>

{#if style === 'full_bleed'}
	<div class="relative h-full w-full overflow-hidden">
		<div bind:this={carouselContainer} class="carousel carousel-center h-full">
			{#each images as image, index}
				<div class="carousel-item h-full w-full flex-none">
					<img src={image.url} alt={image.alt} class="h-full w-full object-contain" />
				</div>
			{/each}
		</div>
	</div>
{:else if style === 'numbered'}
	<div class="px-5">
		<div class="rounded-box relative mx-auto overflow-hidden md:w-2/3">
			<div
				bind:this={carouselContainer}
				class="carousel flex w-full snap-x snap-mandatory overflow-x-auto"
			>
				{#each images as image, index}
					<div class="carousel-item w-52 flex-none snap-start">
						<img src={image.url} alt={image.alt} class="w-full" />
					</div>
				{/each}
			</div>
			<div class="absolute top-0 flex h-full w-full items-center justify-between px-1">
				<button
					class="btn btn-lg opacity-60 transition-opacity hover:opacity-100"
					onclick={decrementSlide}><span class="rotate-180">➜</span></button
				>
				<button
					class="btn btn-lg opacity-60 transition-opacity hover:opacity-100"
					onclick={incrementSlide}>➜</button
				>
			</div>
		</div>
		<div class="flex w-full justify-center gap-2 py-2">
			{#each images as _, index}
				<button
					class="btn btn-xs"
					onclick={() => scrollToSlide(index)}
					aria-label={`Go to slide ${index + 1}`}
				>
					{index + 1}
				</button>
			{/each}
		</div>
	</div>
{/if}
