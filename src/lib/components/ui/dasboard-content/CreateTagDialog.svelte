<script lang="ts">
  import * as Dialog from '$lib/components/ui/dialog/index';
  import * as Form from '$lib/components/ui/form/index'
  import { Input } from '$lib/components/ui/input/index';
  import { createTagSchema, type CreateTagSchema } from '@/schemas/schema';

  import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';

  interface Props {
    data: SuperValidated<Infer<CreateTagSchema>>,
    isDialogOpen: boolean,
    onOpenChange: () => void
  }

  let { data, isDialogOpen, onOpenChange }: Props = $props()

  const form = superForm(data, {
    validators: zodClient(createTagSchema),
    id: 'tagForm'
  })

  const { form: formData, enhance } = form

</script>

<Dialog.Root bind:open={isDialogOpen} onOpenChange={onOpenChange}>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>Create a new Tag</Dialog.Title>
      <Dialog.Description>
        <form method="post" action="?/createTag" use:enhance>

          <Form.Field {form} name="name" class="mb-4">
            <Form.Control>
              {#snippet children({ props })}
                <Form.Label>Tag name</Form.Label>
                <Input {...props} bind:value={$formData.name}/>
              {/snippet}
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>

          <Form.Button>Submit</Form.Button>
        </form>
      </Dialog.Description>
    </Dialog.Header>
  </Dialog.Content>
</Dialog.Root>