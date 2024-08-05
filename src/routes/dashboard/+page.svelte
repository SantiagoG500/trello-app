<script>
	import { goto } from '$app/navigation';

	import { getBoardsAndTags, addBoard, addTag, updateBoard } from '$lib/utils/dashboard.js';
	import { user, isLoggedIn } from '$lib/stores.js';

	import ModalControlled from '$lib/components/modal-controlled.svelte';
	import BoardDnd from '$lib/components/board-dnd.svelte';

	let userBoards = [];
	let usertags = [];

	// vars used in the modals
	let boardName = '';
	let tagName = '';

	let currentBoard = userBoards[0];

	const getData = async ({ uid }) => {
		// console.log('a');

		// if (!uid) goto('/');

		const { boards, tags } = await getBoardsAndTags({ uid });
		userBoards = [...boards];
		usertags = [...tags];
		currentBoard = userBoards[0];
	};
	const handleNewBoard = () => {
		addBoard({ boardName, boards: userBoards, uid: $user.uid });
		getData({ uid: $user.uid });
	};
	const handleNewTag = () => {
		addTag({ tag: tagName, tags: usertags, uid: $user.uid });
		getData({ uid: $user.uid });
	};

	const handleUpdate = (e) => {
		updateBoard({ newBoard: currentBoard });
		getData({ uid: $user.uid });
	};

	let openBoardModal = false;
	let openTagModal = false;

	const toggleBoardModal = () => (openBoardModal = !openBoardModal);
	const toggleTagdModal = () => (openTagModal = !openTagModal);
</script>

{#if $user}
	{#await getData({ uid: $user.uid })}
		<h1>Wait a sec... ⌛</h1>
	{:then _}
		<nav>
			<button on:click={toggleBoardModal}> Create Board </button>
			<button on:click={toggleTagdModal}> Create Tag </button>
		</nav>
		{#if !currentBoard}
			<h1>There isn't any boards yet</h1>
			<p>Create a new one</p>
		{:else}
			<BoardDnd
				boardItems={currentBoard.board}
				tags={usertags}
				on:update-board={handleUpdate}
				boardName={currentBoard.name}
			/>
		{/if}
	{:catch error}
		<h1>Something went wrong... {error}</h1>
	{/await}
{/if}

<ModalControlled title={'Create a new board'} bind:openModal={openBoardModal}>
	<div class="modal__div">
		<label for="task-name">Board name</label>
		<input type="text" id="task-name" bind:value={boardName} />
	</div>
	<button on:click={() => handleNewBoard()}>Create</button>
</ModalControlled>

<ModalControlled title={'Create a new Tag'} bind:openModal={openTagModal}>
	<div class="modal__div">
		<label for="tag-name">Tag Name</label>
		<input type="text" id="tag-name" bind:value={tagName} />
	</div>
	<button on:click={() => handleNewTag()}>Create</button>
</ModalControlled>
