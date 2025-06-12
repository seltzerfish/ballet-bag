<script lang="ts">
	import { globals } from '$lib/globals.svelte';
	import Bag from './Bag.svelte';
	import Headphones from './Headphones.svelte';
	import Iphone from './Iphone.svelte';
	import Journal from './Journal.svelte';
	import Loading from './Loading.svelte';
	import MuteButton from './MuteButton.svelte';
</script>

{#if globals.assetsLoaded}
	<div class="grid grid-cols-3 place-items-center">
		<Headphones />
		<div class="col-span-2">
			<Journal />
		</div>
	</div>
	<Bag />
{/if}
<Loading />
<MuteButton />
