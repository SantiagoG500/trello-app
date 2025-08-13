<script lang="ts">
  import * as Dialog from '$lib/components/ui/dialog/index';
  import * as Form from '$lib/components/ui/form/index'
  import { Input } from '$lib/components/ui/input/index';

  import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
  import { createBoardSchema, type CreateBoardSchema } from '$lib/schemas/schema';
  import { zodClient } from 'sveltekit-superforms/adapters';
  
  interface Props { 
    data: SuperValidated<Infer<CreateBoardSchema>>,
    isDialogOpen: boolean,
    onOpenChange: () => void
  }

  let { data, isDialogOpen, onOpenChange }: Props = $props();
  const form = superForm(data, {
    validators: zodClient(createBoardSchema),
    id: 'boardForm'
  })

  const { form: formData, enhance } = form

</script>
 
<Dialog.Root bind:open={isDialogOpen} onOpenChange={onOpenChange}>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title class="mb-4">Create a new board</Dialog.Title>
      <Dialog.Description>

        <form method="POST" action="?/createBoard" use:enhance>

          <Form.Field {form} name="name" class='mb-4'>
            <Form.Control>
              {#snippet children({ props })}
                <Form.Label>Name</Form.Label>
                <Input {...props} bind:value={$formData.name} />
              {/snippet}
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>

          <Form.Field {form} name="description" class='mb-4'>
            <Form.Control>
              {#snippet children({ props })}
                <Form.Label>Description</Form.Label>
                <Input {...props} bind:value={$formData.description}/>
              {/snippet}
            </Form.Control>
          </Form.Field>

          <Form.Button>Submit</Form.Button>
        </form>

      </Dialog.Description>
    </Dialog.Header>
  </Dialog.Content>
</Dialog.Root>