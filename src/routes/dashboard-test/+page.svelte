<script>
	import { Board } from '$lib/firebase/firebase.schemas.js';

	import BoardDnd from '$lib/components/board-dnd.svelte';
	import ModalControlled from '$lib/components/modal-controlled.svelte';
	import Button from '$lib/components/button.svelte';

	let tagName;

	let tags = [];
	let currentBoard = Board({
		name: 'GTD',
		uid: 'user#1'
	});

	const handleNewTag = ({ newTag }) => {
		tags = [...tags, newTag];
		console.log(tags);
	};

	const handleUpdate = (e) => {
		const newBoard = e.detail;
		console.log({ newBoard });

		currentBoard.board = newBoard;
		currentBoard = currentBoard;
	};

	let openBoardM = false;
	let openTagM = false;

	const toggleBoardM = () => (openBoardM = !openBoardM);
	const toggleTagM = () => (openTagM = !openTagM);
</script>

<nav>
	<Button onClickFire={() => toggleBoardM()}>New Board</Button>
	<Button onClickFire={() => toggleTagM()}>New Tag</Button>

	<ModalControlled
		bind:openModal={openBoardM}
		title={'Create a new board'}
		description={'If you want to use this feature, think of sign In right now'}
	>
		<button>Create an Account</button>
	</ModalControlled>

	<ModalControlled bind:openModal={openTagM} title={'Create a new Tag'}>
		<div class="modal__div">
			<label for="tag-name">Tag Name</label>
			<input type="text" id="tag-name" bind:value={tagName} />
		</div>
		<button on:click={() => handleNewTag({ newTag: tagName })}>Create</button>
	</ModalControlled>
</nav>

<BoardDnd
	boardItems={currentBoard.board}
	boardName={currentBoard.name}
	{tags}
	on:update-board={handleUpdate}
></BoardDnd>
