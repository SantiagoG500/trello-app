<script>
	import { Auth, Database } from '$lib/firebase/firebase.js';
	import { User } from '$lib/firebase/firebase.schemas.js';
	import { writable } from 'svelte/store';

	import Button from '$lib/components/button.svelte';

	let error = writable(undefined);

	const login = async ({ provider }) => {
		try {
			const userInfo = await Auth.signInWithPopUp(provider);

			if (userInfo instanceof Error) {
				const { cause, message, name } = userInfo;
				$error = { cause, message, name };
				return;
			}

			const { user, providerId } = userInfo;
			const { displayName, email, uid } = user;

			const newUser = User({
				name: displayName,
				uid,
				email,
				providerId
			});

			await Database.setData('users', uid, newUser);
		} catch (err) {
			const { cause, message, name } = err;
			$error = { cause, message, name };
		}
	};
</script>

<section>
	<div>
		<h2>Login with Email and password</h2>
		<label for="email">Email</label>
		<input type="text" id="email" placeholder="yourAccount@example.com" />
		<br />
		<label for="password">Password</label>
		<input type="password" id="password" />
	</div>
	<div>
		<h2>Login With Provider</h2>

		<Button
			onClickFire={() => {
				login({ provider: 'google' });
				$error = undefined;
			}}
		>
			Login With Google
		</Button>
		<Button
			onClickFire={() => {
				login({ provider: 'gitHub' });
				$error = undefined;
			}}
		>
			Login With GitHub
		</Button>
	</div>

	{#if $error}
		<div>
			<h3>You have an error</h3>
			<p>{$error.message}</p>
		</div>
	{/if}
</section>
