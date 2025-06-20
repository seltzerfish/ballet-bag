<script lang="ts">
	import Carousel from '$lib/carousel/Carousel.svelte';
	import { globals, changeSong } from '$lib/globals.svelte';

	let entering = $derived(globals.animationPhase === 'bag-exit-pause');

	let skirtCarousel: any = $state(null);
	let topCarousel: any = $state(null);

	const setSkirtCarousel = (methods: any) => {
		skirtCarousel = methods;
	};

	const setTopCarousel = (methods: any) => {
		topCarousel = methods;
	};

	const advanceTopCarousel = () => {
		topCarousel?.incrementSlide();
	};

	const advanceSkirtCarousel = () => {
		skirtCarousel?.incrementSlide();
	};
</script>

{#if globals.animationPhase === 'bag-exit-components-enter' || globals.animationPhase === 'complete' || entering}
	<div class="pointer-events-none fixed inset-0 flex h-full w-full items-center justify-center">
		<div class="motion-delay-800 h-[18rem] w-[18rem] pt-20" class:motion-scale-in-0={entering}>
			<div class=" relative w-fit">
				<img src="/wardrobe/ipad.png" alt="ipad" class="h-full w-full object-contain" />
				<img
					src="/pencil.png"
					alt="apple pencil"
					class="pointer-events-none absolute -top-[4rem] -left-[8rem] z-30 h-[20rem] w-[20rem] -rotate-45 object-contain"
				/>

				<div class="absolute inset-0 h-full w-full overflow-hidden p-[0.85rem]">
					<div
						class="relative flex h-full w-full flex-col items-center justify-center rounded-lg bg-gray-800"
					>
						<div class="absolute inset-7 overflow-hidden bg-gray-100">
							<div class="relative h-full w-full">
								<div class="absolute inset-0">
									<Carousel
										images={[
											{ url: '/wardrobe/skirt1.png', alt: 'a skirt' },
											{ url: '/wardrobe/skirt2.png', alt: 'a skirt' },
											{ url: '/wardrobe/skirt3.png', alt: 'a skirt' },
											{ url: '/wardrobe/skirt4.png', alt: 'a skirt' },
											{ url: '/wardrobe/skirt5.png', alt: 'a skirt' }
										]}
										style="full_bleed"
										autoScroll={false}
										onMount={setSkirtCarousel}
									/>
								</div>
								<div class="absolute inset-0">
									<Carousel
										images={[
											{ url: '/wardrobe/top1.png', alt: 'a top' },
											{ url: '/wardrobe/top2.png', alt: 'a top' },
											{ url: '/wardrobe/top3.png', alt: 'a top' },
											{ url: '/wardrobe/top4.png', alt: 'a top' }
										]}
										style="full_bleed"
										autoScroll={false}
										onMount={setTopCarousel}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>

				<button
					onclick={advanceTopCarousel}
					class="pointer-events-auto absolute top-0 left-0 h-1/2 w-full cursor-pointer bg-transparent"
					aria-label="Next top"
				></button>

				<button
					onclick={advanceSkirtCarousel}
					class="pointer-events-auto absolute bottom-0 left-0 h-1/2 w-full cursor-pointer bg-transparent"
					aria-label="Next skirt"
				></button>
				<div class="pointer-events-none absolute -top-14 -left-8 w-full">
					<div class="chat chat-end rotate-2">
						<div class="chat-bubble bg-blue-500 text-white">iPad for costume designing</div>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
