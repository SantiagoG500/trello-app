<script>
	export let href;
	export let onClickFire;
</script>

{#if !href}
	<button class="btn btn--a" {href} on:click={onClickFire}>
		<slot />
	</button>
{:else}
	<a type="text" class="btn btn--a" {href} on:click={onClickFire}>
		<slot />
	</a>
{/if}

<style>
	.btn {
		padding: 0.5em 1em;

		border-radius: 0.5em;

		background-color: var(--red-500);
		color: var(--text-light);
		border: none;

		transition: background-color 50ms ease-in-out;
	}

	.btn:hover {
		background-color: var(--red-600);
	}

	.btn--a {
		display: inline-block;
		text-decoration: none;
	}
	.btn--a:visited {
		color: none;
	}
</style>
