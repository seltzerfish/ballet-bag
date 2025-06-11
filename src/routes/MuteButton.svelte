<script lang="ts">
	import { globals, toggleMute } from '$lib/globals.svelte';
	import { fade, slide } from 'svelte/transition';
</script>

{#if globals.userInteracted}
	<div transition:fade class="pointer-events-none fixed inset-2">
		<button
			class="btn btn-circle btn-primary pointer-events-auto"
			on:click={toggleMute}
			title={globals.isMuted ? 'Unmute page' : 'Mute page'}
		>
			{globals.isMuted ? '🔇' : '🔊'}
		</button>
	</div>
{/if}
