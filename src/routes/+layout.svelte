<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
  import MainHeader from '@/components/ui/Main-header.svelte';
	
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<MainHeader/>

{@render children?.()}
