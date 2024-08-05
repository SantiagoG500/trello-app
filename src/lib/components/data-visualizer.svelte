<script>
	export let data;
</script>

<footer class="footer-debugger">
	{JSON.stringify(data, null, 4)}
</footer>

<style>
	.footer-debugger {
		position: fixed;
		bottom: 12px;
		right: 13px;

		width: 50%;
		padding: 1em 2em;
		z-index: 99999999;

		background-color: rgba(42, 22, 63, 0.363);
		color: white;
	}
</style>
