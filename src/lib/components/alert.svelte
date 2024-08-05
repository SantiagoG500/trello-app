<script>
	import { AlertDialog } from 'bits-ui';
	import { createEventDispatcher } from 'svelte';
	import { fade, fly } from 'svelte/transition';

	export let triggerText;
	export let alertTitle;
	export let alertDesc;
	export let cancelText = '';
	export let actionText = '';
</script>

<AlertDialog.Root>
	<AlertDialog.Trigger>
		{triggerText}
	</AlertDialog.Trigger>

	<AlertDialog.Portal>
		<AlertDialog.Overlay
			transition={fade}
			transitionConfig={{
				duration: 150
			}}
		/>
		<AlertDialog.Content transition={fade}>
			<AlertDialog.Title>
				{alertTitle}
			</AlertDialog.Title>
			<AlertDialog.Description>
				{alertDesc}
			</AlertDialog.Description>

			<AlertDialog.Cancel>
				{cancelText || 'Cancel'}
			</AlertDialog.Cancel>
			<AlertDialog.Action on:click={confirm({ confirm: true })}>
				{actionText || 'Confirm'}
			</AlertDialog.Action>
		</AlertDialog.Content>
	</AlertDialog.Portal>
</AlertDialog.Root>
