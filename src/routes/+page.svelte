<script lang="ts">
	import { globals } from '$lib/globals.svelte';
	import Bag from './Bag.svelte';
	import Flyer from './Flyer.svelte';
	import Headphones from './Headphones.svelte';
	import Ipad from './Ipad.svelte';
	import Journal from './Journal.svelte';
	import Lipstick from './Lipstick.svelte';
	import Loading from './Loading.svelte';
	import MuteButton from './MuteButton.svelte';
	import Polaroid from './Polaroid.svelte';
	import Sewing from './Sewing.svelte';
	import Shoes from './Shoes.svelte';
	import Stamp from './Stamp.svelte';
	import TitleText from './TitleText.svelte';
	import WhiteFlash from './WhiteFlash.svelte';

	let mouseX = 0;
	let mouseY = 0;

	function handleMouseMove(event: MouseEvent) {
		const centerX = window.innerWidth / 2;
		const centerY = window.innerHeight / 2;

		mouseX = (event.clientX - centerX) / centerX;
		mouseY = (event.clientY - centerY) / centerY;

		const bgX = mouseX * 10;
		const bgY = mouseY * 10;

		document.documentElement.style.setProperty('--bg-x', `${bgX}px`);
		document.documentElement.style.setProperty('--bg-y', `${bgY}px`);
	}
</script>

<svelte:window on:mousemove={handleMouseMove} />

{#if globals.assetsLoaded}
	<Headphones />
	<Stamp />
	<Journal />
	<Shoes />
	<Sewing />
	<Lipstick />
	<Bag />
	<TitleText />
	<Polaroid />
	<Ipad />
	<Flyer />
	<WhiteFlash />
{/if}
<Loading />
<MuteButton />
