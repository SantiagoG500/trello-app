<script>
  import { Dialog } from "bits-ui";
	import { Description } from 'bits-ui/dist/bits/alert-dialog';
  export let title
  export let description = ''
  export let triggerText
</script>

<Dialog.Root>
  <Dialog.Trigger>{triggerText}</Dialog.Trigger>

  <Dialog.Portal>
    <Dialog.Overlay>
      <Dialog.Content>
        <Dialog.Title>{title}</Dialog.Title>
        {#if description !== ''}
           <Dialog.Description>
            {description}
          </Dialog.Description>
        {/if}
        <slot>

        </slot>
        <Dialog.Close>Close</Dialog.Close>
      </Dialog.Content>
    </Dialog.Overlay>
  </Dialog.Portal>
</Dialog.Root>