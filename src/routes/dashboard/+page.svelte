<script lang="ts">
  import DashboardContent from '@/components/ui/dasboard-content/DashboardContent.svelte';
  import CreateBoardDialog from '@/components/ui/dasboard-content/CreateBoardDialog.svelte';
  import CreateTaskDialog from '@/components/ui/dasboard-content/CreateTaskDialog.svelte';
  import CreateTagDialog from '@/components/ui/dasboard-content/CreateTagDialog.svelte';
  import { DexieStore } from '@/db/dexie-store.svelte.js';

  const store = new DexieStore()
  
  let { data } = $props()
  const { boardForm, taskForm, tagForm } = data
  
  let isBoardDialogOpen = $state(false)
  const onBoardDialogOpenChange = () => {
    isBoardDialogOpen = !isBoardDialogOpen
  }

  let isTaskDialogOpen = $state(false)
  const onTaskDialogOpenChange = () => {
    isTaskDialogOpen = !isTaskDialogOpen
  }
  
  let isTagDialogOpen = $state(false)
  const onTagDialogOpenChange = () => {
    isTagDialogOpen = !isTagDialogOpen
  }

</script>
<main class="flex justify-center h-screen">
  <section class="w-11/12 max-w-3xl ">
    <DashboardContent
      boards={store.boards}
      currentBoard={store.currentBoard}
      currentCategories={store.currentCategories}
      currentTasks={store.currentTasks}

      onTaskDialogOpenChange={onTaskDialogOpenChange}
      onBoardDialogOpenChange={onBoardDialogOpenChange}
      onTagDialogOpenChange={onTagDialogOpenChange}
    />
  </section>

  <CreateBoardDialog
    data={boardForm}
    isDialogOpen={isBoardDialogOpen}
    onOpenChange={onBoardDialogOpenChange}
  />

  <CreateTaskDialog
    data={taskForm}
    isDialogOpen={isTaskDialogOpen}
    onOpenChange={onTaskDialogOpenChange}
  />

  <CreateTagDialog
    data={tagForm}
    isDialogOpen={isTagDialogOpen}
    onOpenChange={onTagDialogOpenChange}
  />
</main>
