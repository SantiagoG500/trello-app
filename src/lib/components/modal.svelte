<script>
	import { Dialog } from 'bits-ui';
	import { scale, fade } from 'svelte/transition';

	export let title;
	export let description = '';
	export let triggerText;
</script>

<Dialog.Root>
	<Dialog.Trigger>{triggerText}</Dialog.Trigger>

	<Dialog.Portal>
		<Dialog.Overlay
			class="overlay"
			transition={fade}
			transitionConfig={{
				duration: 150
			}}
		/>
		<Dialog.Content
			class="modal"
			transition={scale}
			transitionConfig={{
				duration: 150
			}}
		>
			<Dialog.Title>{title}</Dialog.Title>
			<Dialog.Description>{description}</Dialog.Description>
			<slot />
			<Dialog.Close>close</Dialog.Close>
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
