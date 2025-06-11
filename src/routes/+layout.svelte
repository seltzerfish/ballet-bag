<script lang="ts">
	import { changeSong, globals } from '$lib/globals.svelte';
	import '../app.css';

	let { children } = $props();

	function pointerDownHandler() {
		if (globals.userInteracted) return;
		globals.userInteracted = true;
		changeSong();
	}
</script>

{@render children()}

<svelte:window onpointerdown={pointerDownHandler} />
