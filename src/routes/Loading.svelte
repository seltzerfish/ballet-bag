<script>
	import { globals, startIntroAnimation } from '$lib/globals.svelte';

	let assetsToLoad = $state(0);
	let assetsLoaded = $state(0);

	$effect(() => {
		preloadAssets();
	});

	$effect(() => {
		if (globals.assetsLoaded && globals.animationPhase === 'loading') {
			startIntroAnimation();
		}
	});

	function preloadAssets() {
		const staticFiles = import.meta.glob('/static/**/*', { eager: false, as: 'url' });
		const allAssets = Object.keys(staticFiles).map((path) => path.replace('/static/', ''));

		assetsToLoad = allAssets.length + 1;
		assetsLoaded = 0;

		document.fonts
			.load('400 1em "Pinyon Script"')
			.then(() => {
				handleAssetLoad();
			})
			.catch(() => {
				handleAssetLoad();
			});

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

<div
	class="pinyon-script-regular pointer-events-none fixed inset-0 h-screen w-full overflow-hidden"
>
	<div
		class="motion-duration-1000 motion-delay-200 bg-base-200 fixed top-0 flex h-screen w-full flex-col items-center justify-center space-y-8 font-bold"
		class:motion-opacity-out={globals.assetsLoaded}
		class:motion-blur-out={globals.assetsLoaded}
	>
		<h1 class="text-4xl lg:text-6xl">Loading</h1>
		<progress class="progress w-56" value={assetsLoaded} max={assetsToLoad}></progress>
	</div>
</div>
