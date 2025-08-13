<!-- <script lang="ts">
    import * as DropdownMenu from '../dropdown-menu/index';
    import Button from '../button/button.svelte';
    import ArrowDown from '@/components/icons/ArrowDown.svelte';
    import ClipboardAdd from '@/components/icons/Clipboard-add.svelte';
    import CheckCircle from '@/components/icons/CheckCircle.svelte';
    import TagAdd from '@/components/icons/TagAdd.svelte';

    interface DashboardHeaderProps {
      onBoardDialogOpenChange: () => void
    }
    const { onBoardDialogOpenChange }: DashboardHeaderProps = $props()

</script>
<div>
    <h1 class="scroll-m-20 text-balance text-4xl font-extrabold tracking-tight">My board</h1>
    <div class="flex justify-between items-center min-w-lg my-4">
      <div class="flex items-center overflow-x-auto scrol1lbar bg-secondary/55 rounded-md max-w-xs md:max-w-m">
          <Button variant="ghost">Board 1</Button>
          <Button variant="ghost">Board 2</Button>
          <Button variant="ghost">Board 3</Button>
          <Button variant="ghost">Board 4</Button>
  
          <Button variant="ghost">Board 4</Button>
          <Button variant="ghost">Board 4</Button>
          <Button variant="ghost">Board 4</Button>
          <Button variant="ghost">Board 4</Button>
          <Button variant="ghost">Board 4</Button>
          <Button variant="ghost">Board 4</Button>
      </div>
      <div>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          {#snippet child({ props })}
            <Button { ...props } class="flex items-center" size="sm">
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

            <DropdownMenu.Item>
              <CheckCircle/>
              Task
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              <TagAdd/>
              tag
            </DropdownMenu.Item>
          </DropdownMenu.Group>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
      </div>
    </div>
</div> -->