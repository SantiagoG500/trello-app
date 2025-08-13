<script lang="ts">
  import { Button } from '$lib/components/ui/button/index'
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index'
  import ArrowDown from '@/components/icons/ArrowDown.svelte';
  import CheckCircle from '@/components/icons/CheckCircle.svelte';
  import ClipboardAdd from '@/components/icons/Clipboard-add.svelte';
  import TagAdd from '@/components/icons/TagAdd.svelte';

  interface DashboardContentProps {
    onBoardDialogOpenChange: () => void,
    onTaskDialogOpenChange: () => void
    onTagDialogOpenChange: () => void
  }
  const { onBoardDialogOpenChange, onTaskDialogOpenChange, onTagDialogOpenChange }: DashboardContentProps = $props()
</script>

<div>
    <h1 class="scroll-m-20 text-balance text-4xl font-extrabold tracking-tight">My board</h1>
    <div class="flex justify-between items-center min-w-lg my-5">
      <div class="flex items-center overflow-x-auto gap-4 scrollbar bg-secondary/55 rounded-md max-w-xs md:max-w-m">
          <Button variant="ghost">Board 1</Button>
          <Button variant="ghost">Board 2</Button>
          <Button variant="ghost">Board 3</Button>
          <Button variant="ghost">Board 4</Button>
      </div>
      <div>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          {#snippet child({ props })}
            <Button { ...props } variant="secondary" class="flex items-center" size="sm">
              New
              <ArrowDown/>
            </Button>
          {/snippet}
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Group>
            <DropdownMenu.Label>Create a new</DropdownMenu.Label>
            <DropdownMenu.Separator />

            <DropdownMenu.Item onclick={onBoardDialogOpenChange}>
              <ClipboardAdd/>
              Board
            </DropdownMenu.Item>

            <DropdownMenu.Item onclick={onTaskDialogOpenChange}>
              <CheckCircle/>
              Task
            </DropdownMenu.Item>
            <DropdownMenu.Item onclick={onTagDialogOpenChange}>
              <TagAdd/>
              tag
            </DropdownMenu.Item>
          </DropdownMenu.Group>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
      </div>
    </div>
</div>
