<script>
	export let placeholder;
	export let type;
</script>

<input class="input" {placeholder} {type} on:change={(e) => console.log(e)} />

<style>
	.input {
		background-color: var(--gray-500);
		color: var(--text-light);
		border: 1px solid var(--bg-light);
		outline: 0px;
	}
</style>
