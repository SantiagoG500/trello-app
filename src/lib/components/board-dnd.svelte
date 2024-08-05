<script>
	import { createEventDispatcher } from 'svelte';
	import { draggable, dropZone } from '$lib/actions/dnd.js';
	import { TaskSchema, BoardItem } from '$lib/firebase/firebase.schemas.js';
	import { writable } from 'svelte/store';
	import { updateEvents, handleUpdate, editTags, findTask, editCopy } from '$lib/utils/board.js';

	import ModalControlled from '$lib/components/modal-controlled.svelte';
	import AlertControlled from '$lib/components/alert-controlled.svelte';
	import Button from '$lib/components/button.svelte';

	export let boardItems;
	export let tags;
	export let boardName;

	// saves each task modificated by the user
	let boardItemsCopy = [];
	let categoryName = '';

	// used for the form binding when editing a task
	let currentTask = writable(TaskSchema({}));

	const dispatch = createEventDispatcher();

	function updateBoard({ updateEvent, boardItem }) {
		const { newBoard } = handleUpdate({
			task: $currentTask,
			boardItems,
			boardItem,
			updateEvent
		});
		dispatch('update-board', newBoard);
	}

	const handleEdit = (event) => {
		const value = event.target.value;
		const propName = event.target.dataset.value;

		if (propName === 'tags')
			$currentTask.tags = [...editTags({ tags: $currentTask.tags, tag: value })];

		const newCopy = editCopy({ task: $currentTask, boardItemsCopy });
		boardItemsCopy = [...newCopy];
	};
	const changeCurrentTask = (task) => ($currentTask = { ...task });
	const clearCurrentTask = () => {
		$currentTask = { ...TaskSchema({}) };
	};

	let openCreateM = false;
	let openEditM = false;
	let openDeleteAlert = false;
	let openCategorymodal = false;

	const toggleDeleteAlert = () => (openDeleteAlert = !openDeleteAlert);
	const toggleCreateM = () => (openCreateM = !openCreateM);
	const toggleEditM = () => (openEditM = !openEditM);
	const toggleCategoryM = () => (openCategorymodal = !openCategorymodal);
</script>

<header>
	<h1>{boardName}</h1>
	<Button onClickFire={toggleCategoryM}>Add Category</Button>
</header>

{#each boardItems as { category, tasks }, boardIndex}
	<div>
		<h2>{category}</h2>
		<Button
			onClickFire={() => {
				clearCurrentTask();
				toggleCreateM();
				$currentTask.category = category;
			}}
		>
			+
		</Button>
	</div>

	<article
		class="dropzone"
		use:dropZone={{
			onDropZone(data) {
				const { task } = JSON.parse(data);

				if (task.category === category) return;
				task.category = category;
				$currentTask = { ...task };

				const newCopy = editCopy({ task: $currentTask, boardItemsCopy });
				boardItemsCopy = [...newCopy];

				updateBoard({ updateEvent: updateEvents.move });
			}
		}}
		ondragover="return false"
	>
		{#each tasks as task}
			{@const { done, taskName, dueDate, description, tags: taskTags } = task}

			<section
				class="task"
				use:draggable={JSON.stringify({ task, from: boardIndex })}
				draggable="true"
			>
				<header class="task__header">
					<h2>{taskName}</h2>

					<div class="task__header-div">
						<span>
							{done ? 'Done ✅' : 'To do 📌'}
						</span>
						{#if task.dueDate}
							<span>{dueDate}</span>
						{/if}
					</div>

					<button
						on:click={() => {
							toggleEditM();
							const { foundedTask } = findTask({
								task,
								tasks: boardItemsCopy
							});

							if (foundedTask) changeCurrentTask(foundedTask);
							else changeCurrentTask(task);
						}}
					>
						Edit
					</button>
					<button
						on:click={() => {
							toggleDeleteAlert();
							changeCurrentTask(task);
						}}
					>
						Delete
					</button>
				</header>

				<main class="task__content">
					<p>{description}</p>
					<p>{category}</p>
				</main>

				<footer class="task__footer">
					{#each taskTags as tag}
						<span>{tag}</span> <br />
					{/each}
				</footer>
			</section>
		{/each}
	</article>
{/each}

<ModalControlled title={'Create a new taks'} bind:openModal={openCreateM}>
	<div class="modal__div">
		<label for="task-name">Task Name</label>

		<input
			class="input"
			type="text"
			id="task-name"
			placeholder="Learn React ⚛️"
			bind:value={$currentTask.taskName}
		/>
	</div>

	<div class="modal__div">
		<label for="task-description">Description</label>

		<input
			class="input"
			type="text"
			id="task-description"
			placeholder="Details about the task"
			bind:value={$currentTask.description}
		/>
	</div>

	<div class="modal__div">
		<label for="duedate">Due date</label>

		<input class="input" type="date" id="duedate" bind:value={$currentTask.dueDate} />
	</div>

	<div class="modal__div modal__div--row">
		<label for="tag-select">Done</label>
		<input class="input" type="checkbox" bind:checked={$currentTask.done} />
	</div>

	<div class="modal__div">
		<label for="category-input">category</label>
		<select class="input" name="category" id="category-input" bind:value={$currentTask.category}>
			{#each boardItems as { category }}
				<option value={category}>{category}</option>
			{/each}
		</select>
	</div>

	{#if $currentTask.tags.length > 0}
		<div class="modal__div">
			<label for="tag-select">Choose Tags</label>
			<select
				class="input"
				name="tags"
				id="tag-select"
				on:change={(e) => {
					const tag = e.target.value;
					$currentTask.tags = [...editTags({ tag, tags: $currentTask.tags })];
					console.log($currentTask.tags);
				}}
			>
				{#each tags as tag}
					<option value={tag}>{tag}</option>
				{/each}
			</select>
		</div>
	{/if}

	{#if $currentTask.tags.length > 0}
		<div class="modal__div">
			<span>Selected Tags: </span>

			<div class="tag-selector">
				{#each $currentTask.tags as tag}
					<button
						data-tag={tag}
						on:click={() => {
							$currentTask.tags = [...editTags({ tag, tags: $currentTask.tags })];
						}}
					>
						{tag}
					</button>
				{/each}
			</div>
		</div>
	{/if}

	<button
		on:click={() => {
			updateBoard({
				updateEvent: updateEvents.create
			});
			toggleCreateM();
			clearCurrentTask();
		}}
	>
		Create Task
	</button>
</ModalControlled>

<ModalControlled title={'Edit task'} bind:openModal={openEditM}>
	<div class="modal__div">
		<label for="task-name">Task Name</label>

		<input
			class="input"
			type="text"
			id="task-name"
			placeholder="Learn React ⚛️"
			data-value="taskName"
			bind:value={$currentTask.taskName}
			on:change={(e) => handleEdit(e, 'taskName')}
		/>
	</div>

	<div class="modal__div">
		<label for="task-description">Description</label>

		<input
			class="input"
			type="text"
			id="task-description"
			placeholder="Details about the task"
			bind:value={$currentTask.description}
			data-value="description"
			on:change={(e) => handleEdit(e, 'description')}
		/>
	</div>

	<div class="modal__div">
		<label for="duedate">Due date</label>
		+
		<input
			class="input"
			type="date"
			id="duedate"
			bind:value={$currentTask.dueDate}
			data-value="dueDate"
			on:change={(e) => handleEdit(e, 'dueDate')}
		/>
	</div>

	<div class="modal__div">
		<div style="display: flex; gap:1em;">
			<span>Selected Tags: </span>

			{#each $currentTask.tags as tag}
				<button
					value={tag}
					data-value="tags"
					on:click={(e) => {
						handleEdit(e, 'tags');
					}}
				>
					{tag}
				</button>
			{/each}
		</div>

		<label for="tag-select">Choose Tags</label>
		<select name="tags" id="tag-select" data-value="tags" on:change={(e) => handleEdit(e, 'tags')}>
			{#each tags as tag}
				<option value={tag}>{tag}</option>
			{/each}
		</select>
	</div>

	<div class="modal__div">
		<label for="tag-select">Done</label>
		<input
			class="input"
			type="checkbox"
			bind:checked={$currentTask.done}
			on:change={(e) => handleEdit(e, 'done')}
		/>
	</div>

	<button
		on:click={() =>
			updateBoard({
				updateEvent: updateEvents.edit
			})}
	>
		Edit Task
	</button>
	<button
		on:click={() =>
			updateBoard({
				updateEvent: updateEvents.delete
			})}
	>
		Delete
	</button>
</ModalControlled>

<ModalControlled title={'New Category'} bind:openModal={openCategorymodal}>
	<div class="modal__div">
		<label for="category">Description</label>

		<input
			class="input"
			type="text"
			id="category"
			placeholder="Ideas 💡"
			bind:value={categoryName}
			data-value="description"
		/>
	</div>

	<button
		on:click={() =>
			updateBoard({
				updateEvent: updateEvents.newCategory,
				boardItem: BoardItem({ name: categoryName })
			})}
	>
		Create Category
	</button>
</ModalControlled>

<AlertControlled
	alertTitle={'Delete task'}
	alertDesc={'Do you want to delete this task?'}
	bind:openAlert={openDeleteAlert}
	on:confirm={(e) => {
		const confirm = e.detail;
		if (!confirm) return;
		updateBoard({ updateEvent: updateEvents.delete });
	}}
/>

<style>
	.dropzone,
	.task {
		padding: 1rem;
	}
	.dropzone {
		display: flex;
		gap: 1rem;

		overflow-x: scroll;

		border-radius: 0.5em;
		overlay: hidden;

		min-height: 10rem;

		background-color: var(--gray-950);

		border: 2px solid var(--red-400);
	}
	.dropzone:global(.droppable) {
		border-color: var(--red-300);
		background-color: var(--gray-900);
	}
	.dropzone:global(.droppable) * {
		pointer-events: none;
	}

	.task {
		position: relative;

		min-width: 100%;

		background-color: var(--red-950);
		color: var(--red-50);

		border-radius: 0.5em;
		overflow: hidden;
	}
	.task::after {
		position: absolute;
		top: 0;
		left: 0;

		content: '';
		height: 100%;
		width: 5px;

		background-color: var(--red-400);
	}
</style>
