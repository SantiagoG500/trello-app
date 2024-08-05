<script>
	import { Dialog } from 'bits-ui';
	import { fade, fly, scale, crossfade } from 'svelte/transition';
	export let title;
	export let description = '';

	export let openModal = false;
	const closeModal = () => (openModal = false);
</script>

<!-- closeOnScape={closeModal} -->
<Dialog.Root bind:open={openModal} closeOnOutsideClick={closeModal} preventScroll={false}>
	<Dialog.Portal>
		<Dialog.Overlay
			class="overlay overlay--alert"
			transition={fade}
			transitionConfig={{ duration: 150 }}
		/>
		<Dialog.Content class="modal" transition={scale} transitionConfig={{ duration: 150 }}>
			<Dialog.Title>{title}</Dialog.Title>
			<Dialog.Description>{description}</Dialog.Description>
			<slot />
			<Dialog.Close>close</Dialog.Close>
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
