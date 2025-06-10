<script lang="ts">
	import { globals } from '$lib/globals.svelte';
	import Headphones from './Headphones.svelte';
	import Iphone from './Iphone.svelte';
	import Loading from './Loading.svelte';
	import MuteButton from './MuteButton.svelte';
</script>

{#if globals.assetsLoaded}
	<div class="grid">
		<Headphones />
	</div>
{/if}
<Loading />
<MuteButton />
