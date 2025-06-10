<script>
	import { globals } from '$lib/globals.svelte';

	let assetsToLoad = $state(0);
	let assetsLoaded = $state(0);

	$effect(() => {
		preloadAssets();
	});

	function preloadAssets() {
		const staticFiles = import.meta.glob('/static/**/*', { eager: false, as: 'url' });
		const allAssets = Object.keys(staticFiles).map((path) => path.replace('/static/', ''));

		assetsToLoad = allAssets.length;
		assetsLoaded = 0;

		allAssets.forEach((asset) => {
			const path = asset.startsWith('/') ? asset : `/${asset}`;

			if (asset.endsWith('.mp3')) {
				const audio = new Audio(path);
				audio.addEventListener('canplaythrough', handleAssetLoad);
				audio.addEventListener('error', handleAssetLoad);
				audio.preload = 'auto';
			} else {
				const img = new Image();
				img.addEventListener('load', handleAssetLoad);
				img.addEventListener('error', handleAssetLoad);
				img.src = path;
			}
		});
	}

	function handleAssetLoad() {
		assetsLoaded++;
		if (assetsLoaded >= assetsToLoad) {
			globals.assetsLoaded = true;
		}
	}
</script>

<div class="pointer-events-none fixed inset-0 h-screen w-full overflow-hidden">
	<div
		class="motion-duration-1000 motion-delay-200 text-base-300 fixed top-0 flex h-screen w-full flex-col items-center justify-center space-y-8 bg-[#fcd6c5] font-bold"
		class:motion-opacity-out={globals.assetsLoaded}
		class:motion-blur-out={globals.assetsLoaded}
	>
		<h1 class=" text-3xl">Loading</h1>
		<span class="loading loading-spinner loading-lg"></span>
	</div>
</div>
