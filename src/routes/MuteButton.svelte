<script lang="ts">
	import { globals, toggleMute } from '$lib/globals.svelte';
</script>

<div class="pointer-events-none fixed inset-2">
	<button
		class="btn btn-circle btn-primary pointer-events-auto"
		on:click={toggleMute}
		title={globals.isMuted ? 'Unmute page' : 'Mute page'}
	>
		{globals.isMuted ? '🔇' : '🔊'}
	</button>
</div>
