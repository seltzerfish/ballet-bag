<script lang="ts">
	import Carousel from '$lib/carousel/Carousel.svelte';
	import { globals, changeSong } from '$lib/globals.svelte';

	let entering = $derived(globals.animationPhase === 'bag-exit-components-enter');
</script>

{#if globals.animationPhase === 'bag-exit-components-enter' || globals.animationPhase === 'complete'}
	<div class="pointer-events-none fixed inset-0 flex h-full w-full items-center justify-center">
		<div class="h-[18rem] w-[18rem]">
			<div class=" relative w-fit">
				<img src="/wardrobe/ipad.png" alt="ipad" class="h-full w-full object-contain" />

				<div class="absolute inset-0 h-full w-full overflow-hidden p-4">
					<div class="flex h-full w-full flex-col items-center justify-center rounded-xl">
						<Carousel
							images={[
								{ url: '/wardrobe/skirt1.png', alt: 'a skirt' },
								{ url: '/wardrobe/skirt2.png', alt: 'a skirt' },
								{ url: '/wardrobe/skirt3.png', alt: 'a skirt' },
								{ url: '/wardrobe/skirt4.png', alt: 'a skirt' },
								{ url: '/wardrobe/skirt5.png', alt: 'a skirt' }
							]}
							style="full_bleed"
							autoScroll={true}
						/>
					</div>
				</div>
				<div class="absolute inset-0 h-full w-full overflow-hidden p-4">
					<div class="flex h-full w-full flex-col items-center justify-center rounded-xl">
						<Carousel
							images={[
								{ url: '/wardrobe/top1.png', alt: 'a top' },
								{ url: '/wardrobe/top2.png', alt: 'a top' },
								{ url: '/wardrobe/top3.png', alt: 'a top' },
								{ url: '/wardrobe/top4.png', alt: 'a top' }
							]}
							style="full_bleed"
							autoScroll={true}
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
