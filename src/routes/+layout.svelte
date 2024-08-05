<script>
	import '$lib/css/normalize.css';
	import '$lib/index.css';
	import '$lib/css/fonts.css';
	import '$lib/css/media-queries.css';

	import Header from '$lib/components/header.svelte';
	import { onAuthStateChanged } from 'firebase/auth';
	import { Auth } from '$lib/firebase/firebase.js';
	import { user, isLoggedIn } from '$lib/stores.js';
	import { onMount } from 'svelte';
	onMount(async () => {
		onAuthStateChanged(Auth.authInfo, (authUser) => {
			$user = authUser;
			$isLoggedIn = !!authUser;
		});
	});
</script>

<div class="main-container">
	<Header />

	<main class="main-content">
		<slot />
	</main>
</div>
