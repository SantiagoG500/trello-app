<script>
	import { createEventDispatcher } from 'svelte';

  export let name;
  export let id;
  export let uid;
  
  export let inbox = [];
  export let reminders = [];
  export let actions = [];

  export let userTags = []

  const dispatch = createEventDispatcher()
  const createTask = () => {
    // dispatch('createTask', {})
  }

</script>

<section class="board">
  <h1>{name}</h1>

  <article class="fields">
    <section class="fields__inbox">
      <header>
        <h2>Inbox</h2>
        <button>+</button>
      </header>
      <div>
        <!-- here it goes an each block -->
      </div>
    </section>
    <section class="fields__reminders">
      <header>
        <h2>reminders</h2>
        <button>+</button>
      </header>
      <div>
        <!-- here it goes an each block -->
      </div>
    </section>
    <section class="fields__actions">
      <header>
        <h2>Actions</h2>
        <button>+</button>
      </header>
      <div>
        <!-- here it goes an each block -->
      </div>
    </section>
  </article>

</section>

<style>
  .board {
    background-color: beige;
    height: 100%;
  }
  .fields {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

    height: 100%;
    width: 100%;
    background-color: chocolate;
  }

  .fields__inbox,
  .fields__reminders,
  .fields__actions {
    height: 12rem;
    width: 100%;
  }

  .fields__inbox {
    background-color: yellow;
  }
  .fields__reminders {
    background-color: blue;
  }
  .fields__actions {
    background-color: red;
  }
</style>