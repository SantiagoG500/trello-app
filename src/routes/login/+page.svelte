<script>
  import { goto } from "$app/navigation";
  import { Auth, Database } from "$lib/firebase/firebase.js";
	import { onMount } from 'svelte';
  import {isLoggedIn } from "$lib/stores.js";
	import { ProviderId, getRedirectResult } from 'firebase/auth';


  if ($isLoggedIn) goto('dashboard/')

  onMount( async () => {
    try {
      const redirectRes = await getRedirectResult(Auth.authInfo)
      if (!redirectRes) return
      const user = redirectRes.user
      const userInDatabase = await Database.getDocument('users', user.uid)


      if (!userInDatabase) {
        // get provider
        const {uid, displayName, email} = user
        const userData = {
          name: displayName,
          uid,
          email,
          boardIds: [],
          tags: [],
          ProviderId: redirectRes.providerId
        }

        // here uid is the unique identificator for the usre collection
        Database.setData('users', uid, userData)
      }
      
      
      // console.log({userInDatabase, user});
      // console.log({redirectRes, userInDatabase});
    } catch (error) {
      console.error(`Error getting auth redirect Result ${error}`);
    }

  } )
  // onMount(() => {
  //   getRedirectResult(Auth.authInfo)
  //   .then(res => {
  //     if (!res) return
  //     console.log(res);
  //   })
  //   .catch( err => console.error(`Error with credentials: ${err}`))
    
  // } )

</script>

<section>
  <div>
    <h2>Login with Email and password</h2>    
    <label for="email">Email</label>
    <input type="text" id="email" placeholder="yourAccount@example.com">
    <br>
    <label for="password">Password</label>
    <input type="password" id="password">
  </div>
  <div>
    <h2>Login With Provider</h2>
    <button on:click={() => Auth.sigInWithRedirect('Google')}>Login With Google</button>
    <button on:click={() => Auth.sigInWithRedirect('GitHub')}>Login With GitHub</button>
    <!-- <button on:click={loginGitHub}>Login With GitHub</button> -->
  </div>
</section>

<!-- <form action="?/login" method="post">
  <hgroup>
    <h2>Login With Email and password</h2>
  </hgroup>

  <label for="email">Email</label>
  <input type="text" id="email">

  <label for="password">Email</label>
  <input type="text" id="password">

  <button type="submit">Login with email and password</button>
</form>
<form method="post" action="login">
  <button formaction="?/login&provider=github">Login with Github</button>
</form> -->

