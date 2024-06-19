<script>
  import Board from '$lib/components/board.svelte';
  import { Database } from "$lib/firebase/firebase.js";
  import { user, isLoggedIn } from "$lib/stores.js";
  import { v4 as uuidV4 } from "uuid";

  let boards = []
  let currentBoard = {}

  const getBoards = async (userId) => {
    if (!userId) return

    const userDoc = await Database.getDocument('users', userId)
    const {boardIds, uid} = userDoc
    const {equals} = Database.queryOperators
    
    const query = await Database.queryData({
      fisrtOperand: 'uid',
      operator: equals,
      secondOperand: uid,
      docName: 'boards'
    })

    boards = [...query]
    if (boards.length > 0) currentBoard = {...boards[0]}

    return query
  }

  const goToBoard = (e) => {
    const target = e.target
    const dataId = target.dataset.id

    const foundedBoard = boards.find(board => board.uid === dataId)
    currentBoard = {...foundedBoard}    
    
    console.log(currentBoard);
  }
  const createBoard = () => {
    const boardId = uuidV4()
  }

</script>

<br>

<nav>
  <!-- <Dialog 
    Title="New Board"
    Description="create a new board" 
    triggerText="Create a new board"
  >

  </Dialog> -->
</nav>

{#if $user}
   {#await getBoards($user.uid)}
      espera
   {:then value}
     Value:  {JSON.stringify(value[0])}
   {:catch error}
     Error:  {error}
   {/await}
{/if}

<!-- {#if $user}
{#await getBoards($user.uid)}
  espera
{:then value}
  {JSON.stringify(value)}
{:catch error}
  <h1>{error}</h1>
{/await}
{/if} -->

<!-- {#await getBoards()}
  <h1>Wait for data...</h1>
  
{:then boards}
  <nav>
    <button on:click={toggleModal}>Create new board</button>
    <button>Tags</button>
  </nav>

  {#if dialogOpen}
     <div>
        <h1>modal</h1>

        <label for="name">Name</label>
        <input bind:this={nameBoard} type="text" placeholder="name" id="name">
        <button on:click={createBoard} on:click={toggleModal}>create Board</button>
        <button on:click={toggleModal}>close</button>
     </div>
  {/if}

  {#if boards.length === 0}
     <h1>You don't have any board created yet!!!</h1>
     <p>Create one to strart</p>
  {/if}

  {:catch error}
  <h1>error</h1>
  <p>error log {error}</p>
{/await} -->



<!-- 
{#if boards.length === 0}
  <h1>You have no boards Yet!!</h1>
  <h2>Create a new board to start</h2>
  {:else}
    <Board
      name={currentBoard.name}
      id={currentBoard.id}
      uid={currentBoard.uid}
      inbox={currentBoard.inbox}
      reminders={currentBoard.reminders}
      actions={currentBoard.actions}
      userTags={userModel.tags}
    />

{/if} -->

