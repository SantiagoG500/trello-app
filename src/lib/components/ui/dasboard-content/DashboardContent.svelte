  <script lang="ts">
    import { Button } from '$lib/components/ui/button/index'
    import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index'
    import AddCircle from '@/components/icons/AddCircle.svelte';
    import ArrowDown from '@/components/icons/ArrowDown.svelte';
    import CheckCircle from '@/components/icons/CheckCircle.svelte';
    import ClipboardAdd from '@/components/icons/Clipboard-add.svelte';
    import Gear from '@/components/icons/Gear.svelte';
    import TagAdd from '@/components/icons/TagAdd.svelte';
    import type { Board, Category, Task } from '@/schemas/dexie-schema';
    import { onMount } from 'svelte';

    interface DashboardContentProps {
      onBoardDialogOpenChange: () => void
      onTaskDialogOpenChange: () => void
      onTagDialogOpenChange: () => void

      boards: Board[] | []
      currentBoard: Board | undefined
      currentCategories: Category[] | []
      currentTasks: Task[] | []
    }
    
    const {
      onBoardDialogOpenChange,
      onTaskDialogOpenChange,
      onTagDialogOpenChange,

      boards,
      currentBoard,
      currentCategories,
      currentTasks
    }: DashboardContentProps = $props()

    

</script>


{#if boards.length > 0 && currentBoard}
  {@render dashboard()}
{:else}
  {@render noContent()}
{/if}


{#snippet dashboard()}
  <header>
    <h1 class="scroll-m-20 text-balance text-4xl font-extrabold tracking-tight">My board</h1>
    <div class="flex justify-between items-center min-w-lg my-5">
      <div class="flex items-center overflow-x-auto gap-4 scrollbar bg-secondary/55 rounded-md max-w-xs md:max-w-m">
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
        <DropdownMenu.Content color="">
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
  </header>


  <div>
    <div class="flex gap-1">
      {#each currentCategories as category}
        <div class="flex justify-between items-center w-48 py-2 px-2.5 rounded-t-sm bg-secondary/20">
          <span class="max-w-24 truncate rounded-xs text-sm py-0.5 px-1 bg-secondary/95">
            {category.name}
          </span>
  
          <div class="flex gap-0.5">
            <Button class="h-min w-min py-0.5 px-1 has-[>svg]:px-0.5 rounded-xs" variant="ghost">
              <AddCircle size="2em" classes="size-5"/>  
            </Button>
            <Button class="h-min w-min py-0.5 px-1 has-[>svg]:px-0.5 rounded-xs" variant="ghost">
              <Gear size="2em" classes="size-5"/>  
            </Button>
          </div>
        </div>
      {/each}
    </div>
    <div class="flex gap-1">
      {#each currentCategories as category}
        <div class="flex flex-col justify-between gap-2 w-48 py-2 px-2.5 rounded-b-sm bg-secondary/20">
          <div class="h-full w bg-blue-500">
          </div>
          <Button class="w-full" variant="ghost">
            Create a new task <AddCircle/>
          </Button>
        </div>
      {/each}
    </div>
  </div>

{/snippet}


{#snippet noContent()}
  <div class="flex flex-col items-center mt-24">
    <div class="">
      <h1 class="text-4xl font-extrabold tracking-tight text-center">
        No content yet!!
      </h1>
      <p class="leading-5 [&:not(:first-child)]:my-3 px-8 text-center text-accent-foreground/55">
        Create a new Board to get started
      </p>
    </div>
    <Button class="mt-2" onclick={onBoardDialogOpenChange}>
      Create a new board
      <ClipboardAdd />
    </Button>
  </div>
{/snippet}