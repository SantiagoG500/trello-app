<script>
	import { AlertDialog } from 'bits-ui';
	import { createEventDispatcher } from 'svelte';
	import { fade, fly, scale } from 'svelte/transition';

	export let alertTitle;
	export let alertDesc;
	export let cancelText = '';
	export let actionText = '';
	export let openAlert = false;

	const closeAlert = () => (openAlert = !openAlert);
	const dispatch = createEventDispatcher();

	function confirm({ confirm }) {
		dispatch('confirm', confirm);
	}
</script>

<AlertDialog.Root
	bind:open={openAlert}
	closeOnEscape={closeAlert}
	closeOnOutsideClick={closeAlert}
	preventScroll={false}
>
	<AlertDialog.Portal>
		<AlertDialog.Overlay
			class="overlay"
			transition={fade}
			transitionConfig={{
				duration: 150
			}}
		/>
		<AlertDialog.Content transition={scale} transitionConfig={{ duration: 150 }} class="modal">
			<AlertDialog.Title>
				{alertTitle}
			</AlertDialog.Title>
			<AlertDialog.Description>
				{alertDesc}
			</AlertDialog.Description>

			<AlertDialog.Cancel>
				{cancelText || 'Cancel'}
			</AlertDialog.Cancel>
			<AlertDialog.Action on:click={() => confirm({ confirm: true })}>
				{actionText || 'Confirm'}
			</AlertDialog.Action>
		</AlertDialog.Content>
	</AlertDialog.Portal>
</AlertDialog.Root>
