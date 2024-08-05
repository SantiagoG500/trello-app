<script>
	export let triggerText = '';
	let openMenu = false;
</script>

<div class="container">
	<button on:click={() => (openMenu = !openMenu)}>{triggerText}</button>
	{#if openMenu}
		<nav class="context-menu">
			<ul class="context-menu__ul">
				<slot />
			</ul>
		</nav>
	{/if}
</div>

<style>
	.container {
		position: relative;
	}
	.context-menu {
		position: absolute;
		background-color: rgb(71, 84, 95);
	}
	.context-menu__ul {
		display: flex;
		flex-direction: column;
		padding-left: 0;

		gap: 1rem;

		list-style-type: none;
		background-color: rgb(100, 75, 38);
	}
</style>
