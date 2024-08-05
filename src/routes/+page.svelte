<script>
	import Link from '$lib/components/link.svelte';
</script>

<main class="main">
	<h1 class="h1 h1--centered">Wellcome to GTD Master</h1>
	<p class="p p--centered">
		A task management application that harnesses the power of the Getting Things Done.
	</p>
	<p class="p p--centered">
		<Link href="/login">Create New Account</Link>
		Or
		<Link href="/dashboard-test">Try it out</Link> now to see if you like it
	</p>
</main>

<!-- <script>
	import { boards } from '$lib/boards.json';
	import { writable } from 'svelte/store';
	import BoardDnd from '../lib/components/board-dnd.svelte';

	import ModalControlled from '$lib/components/modal-controlled.svelte';
	import { Board } from '$lib/firebase/firebase.schemas.js';

	let boardsCopy = boards;
	let currentBoard = boardsCopy[0];

	let tags = ['React', 'movies'];

	const handleUpdate = (event) => {
		const newBoard = event.detail;

		currentBoard = { ...currentBoard, board: newBoard };
	};

	let boardName = '';
	let tagName = '';

	let openBoardModal = false;
	let openTagModal = false;

	const toggleBoardModal = () => (openBoardModal = !openBoardModal);
	const toggleTagdModal = () => (openTagModal = !openTagModal);

	const createNewBoard = () => {
		const newBoard = Board({ name: boardName, uid: 'user1' });
		boardsCopy = [...boards, newBoard];
	};
	const changeCurrentBoard = ({ boardName }) => {
		const newCurrentBoard = boardsCopy.find((b) => b.name === boardName);
		currentBoard = { ...newCurrentBoard };
	};

	const createNewTag = ({ tag }) => {
		const setOfTags = new Set(tags);
		setOfTags.add(tag);
		console.log(Array.from(setOfTags));
	};
</script>

<nav>
	<button on:click={toggleBoardModal}> Create Board </button>
	<button on:click={toggleTagdModal}> Create Tag </button>

	<div>
		{#each boardsCopy as b}
			<button on:click={() => changeCurrentBoard({ boardName: b.name })}>
				{b.name}
			</button>
		{/each}
	</div>
</nav>

<BoardDnd
	boardItems={currentBoard.board}
	on:update-board={handleUpdate}
	{tags}
	boardName={currentBoard.name}
></BoardDnd>

<ModalControlled
	title={'Create a new board'}
	triggerText={'New Boards'}
	bind:openModal={openBoardModal}
>
	<div class="modal__div">
		<label for="task-name">Board name</label>
		<input type="text" id="task-name" bind:value={boardName} />
	</div>
	<button on:click={createNewBoard}>Create</button>
</ModalControlled>

<ModalControlled title={'Create a new Tag'} triggerText={'New Tags'} bind:openModal={openTagModal}>
	<div class="modal__div">
		<label for="tag-name">Tag Name</label>
		<input type="text" id="tag-name" bind:value={tagName} />
	</div>
	<button on:click={() => createNewTag({ tag: tagName })}>Create</button>
</ModalControlled> -->
