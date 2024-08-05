<script>
	import { isLoggedIn, user } from '$lib/stores.js';
	import { Auth } from '$lib/firebase/firebase.js';
	import { goto } from '$app/navigation';

	import ContextMenu from '$lib/components/context-menu.svelte';

	import Link from '$lib/components/link.svelte';
	import Button from '$lib/components/button.svelte';

	let openMenu = false;
</script>

<header class="header">
	<div class="header__div container">
		<p>logo</p>
		<ContextMenu triggerText={'adf'}>
			<li>
				<Link href={'/'} text={'home'}>Home</Link>
			</li>
			{#if $isLoggedIn}
				<li>
					<Link href={'/dashboard'}>Dashboard</Link>
				</li>
				<li>
					<Button
						onClickFire={() => {
							Auth.logOut();
							goto('/');
						}}>logOut</Button
					>
				</li>
			{/if}
		</ContextMenu>
	</div>

	<div class="header__div container">
		<Button>Theme</Button>

		{#if !$isLoggedIn}
			<Button href={'/login'}>Login</Button>
		{:else}
			<Button href={'/settings'}>Settings</Button>
		{/if}
	</div>
</header>

<style>
	.header {
		display: flex;
		justify-content: space-between;
		gap: 1em;
		width: 100%;
	}
	.header__div {
		display: flex;
		align-items: center;
		justify-content: space-around;
		gap: 1em;

		padding-left: 1em;
		padding-right: 1em;

		border-radius: 0.5em;
	}
</style>
