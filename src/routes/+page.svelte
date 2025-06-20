<script lang="ts">
	import { globals } from '$lib/globals.svelte';
	import Bag from './Bag.svelte';
	import Flyer from './Flyer.svelte';
	import Headphones from './Headphones.svelte';
	import Ipad from './Ipad.svelte';
	import Journal from './Journal.svelte';
	import Loading from './Loading.svelte';
	import MuteButton from './MuteButton.svelte';
	import Polaroid from './Polaroid.svelte';
	import TitleText from './TitleText.svelte';
	import WhiteFlash from './WhiteFlash.svelte';
</script>

{#if globals.assetsLoaded}
	<Headphones />
	<Journal />
	<Bag />
	<TitleText />
	<Polaroid />
	<Ipad />
	<Flyer />
	<WhiteFlash />
{/if}
<Loading />
<MuteButton />
