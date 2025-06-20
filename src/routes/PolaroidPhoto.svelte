<script lang="ts">
	import { globals } from '$lib/globals.svelte';
	type Props = {
		photo: number;
		visible?: boolean;
	};
	let { photo, visible = $bindable() }: Props = $props();

	const OFFSET_X = -2;
	const OFFSET_Y = -35;

	let hasTransition = $state(false);
	let previousPhoto = $state(photo);
	let xOffset = $state(-OFFSET_X);
	let yOffset = $state(OFFSET_Y);
	let modalElement: HTMLDialogElement;
	let polaroidElement: HTMLDivElement;
	let glowElement: HTMLDivElement;
	let bounds: DOMRect;

	const rotateToMouse = (e: MouseEvent) => {
		const mouseX = e.clientX;
		const mouseY = e.clientY;
		const leftX = mouseX - bounds.x;
		const topY = mouseY - bounds.y;
		const center = {
			x: leftX - bounds.width / 2,
			y: topY - bounds.height / 2
		};
		const distance = Math.sqrt(center.x ** 2 + center.y ** 2);

		if (polaroidElement) {
			polaroidElement.style.transform = `
				scale3d(1.07, 1.07, 1.07)
				rotate3d(
					${center.y / 100},
					${-center.x / 100},
					0,
					${Math.log(distance) * 2}deg
				)
			`;
		}

		if (glowElement) {
			glowElement.style.backgroundImage = `
				radial-gradient(
					circle at
					${center.x * 2 + bounds.width / 2}px
					${center.y * 2 + bounds.height / 2}px,
					#ffffff55,
					#0000000f
				)
			`;
		}
	};

	const handleMouseEnter = () => {
		if (polaroidElement) {
			bounds = polaroidElement.getBoundingClientRect();
			document.addEventListener('mousemove', rotateToMouse);
		}
	};

	const handleMouseLeave = () => {
		document.removeEventListener('mousemove', rotateToMouse);
		if (polaroidElement) {
			polaroidElement.style.transform = '';
		}
		if (glowElement) {
			glowElement.style.backgroundImage = '';
		}
	};

	$effect(() => {
		if (photo !== previousPhoto) {
			previousPhoto = photo;

			hasTransition = false;
			xOffset = OFFSET_X;
			yOffset = -OFFSET_Y;

			setTimeout(() => {
				hasTransition = true;
				xOffset = -OFFSET_X;
				yOffset = OFFSET_Y;
			}, 10);
		}
	});

	const photoClicked = () => {
		modalElement?.showModal();
	};

	const closeModal = () => {
		modalElement?.close();
		visible = false;
	};
</script>

<div class="flex h-full w-full items-center justify-center">
	<div class="h-[8rem] w-[8rem] translate-x-[1.5rem] translate-y-[12rem]">
		<div
			class="skew"
			class:has-transition={hasTransition}
			style="transform: skew(-20deg) rotate(190deg) translate({xOffset}px, {yOffset}px)"
		>
			<button onclick={photoClicked} class="clickable">
				<img
					src={`/polaroids/polaroid-${photo + 1}.png`}
					alt="printed polaroid"
					class="h-full w-full object-contain"
				/>
			</button>
		</div>
	</div>
</div>

<dialog bind:this={modalElement} class="modal" onclick={closeModal}>
	<div class="modal-container h-2/3 w-fit">
		<div
			bind:this={polaroidElement}
			class="polaroid-3d"
			onmouseenter={handleMouseEnter}
			onmouseleave={handleMouseLeave}
		>
			<img
				src={`/polaroids/polaroid-${photo + 1}.png`}
				alt="printed polaroid"
				class="h-full w-full object-contain"
			/>
			<div bind:this={glowElement} class="glow"></div>
		</div>
	</div>
</dialog>

<style>
	.skew.has-transition {
		transition: transform 1.4s linear;
	}

	.modal-container {
		perspective: 1500px;
	}

	.polaroid-3d {
		width: 100%;
		height: 100%;
		position: relative;
		transition-duration: 300ms;
		transition-property: transform;
		transition-timing-function: ease-out;
		transform: rotate3d(0);
		border-radius: 10px;
		overflow: hidden;
	}

	.polaroid-3d:hover {
		transition-duration: 150ms;
	}

	.glow {
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		background-image: radial-gradient(circle at 50% -20%, #ffffff22, #0000000f);
		pointer-events: none;
	}
</style>
