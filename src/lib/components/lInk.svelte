<script>
	export let href;
</script>

<a class="a" {href}>
	<slot />
</a>

<style>
	.a {
		position: relative;

		font-weight: 700;
		text-decoration: none;
		color: var(--text-light);
	}

	.a:hover::before {
		display: inline-block;
		content: '';
		height: 0.14em;

		position: absolute;
		bottom: -0.2em;
		width: 100%;

		background-color: var(--text-light);
		transition: width 0.3s ease;
	}
</style>
