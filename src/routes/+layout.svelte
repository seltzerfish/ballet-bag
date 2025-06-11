<script lang="ts">
	import { changeSong } from '$lib/globals.svelte';
	import '../app.css';

	let { children } = $props();

	let hasTouched = $state(false);
	function pointerDownHandler(event: PointerEvent) {
		if (hasTouched) return;
		hasTouched = true;
		changeSong();
	}
</script>

{@render children()}

<svelte:window onpointerdown={pointerDownHandler} />
