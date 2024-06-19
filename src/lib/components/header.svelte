<script>
  import { isLoggedIn, user } from "$lib/stores.js";
  import { Auth } from "$lib/firebase/firebase.js";
</script>

<header class="header">
  <div class="header__logo-container container">
    <p>logo</p>
  </div>

  <div class="context-menu">
    <div>
      <a href="/">Home</a>
    </div>
    <div >
      <a href="/dashboard">Dashboard</a>
    </div>
    <div>
      <a href="/usr-settings">Settings</a>
    </div>
    <button on:click={() => Auth.logOut()}>
      logOut
    </button>
  </div>

  <div class="header__config container">
    <button>Theme</button>
    
    {#if !$isLoggedIn}
       <button><a href="/login">Login to start</a></button>
       {:else}
       <button><a href="/settings">Settings</a></button>
       
    {/if}
  </div>
</header>


<style>
  .header, 
  .header__nav, 
  .header__ul,
  .header__config {
    gap: 1em;
    display: flex;
  }
  .header {
    justify-content: space-between;
    align-items: stretch;
    
  }
  
  .header__nav, .header__logo-container, .header__config {
      background-color: aliceblue;
      padding-left: 1rem;
      padding-right: 1rem;
  }

  .header__nav {
    justify-self: right;
  }

  .header__ul{
    padding: 0;
    list-style: none;
  }
  .header__config {
    gap: .5em;
    align-items: center;
  }

</style>