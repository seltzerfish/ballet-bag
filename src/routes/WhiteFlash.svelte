<script lang="ts">
	import { globals } from '$lib/globals.svelte';
</script>

<div
	class:hidden={!globals.polaroidRecentlyClicked}
	class:motion-opacity-out-0={globals.polaroidRecentlyClicked}
	class="motion-duration-[1200ms] pointer-events-none fixed inset-0 h-full w-full bg-white opacity-90"
></div>
