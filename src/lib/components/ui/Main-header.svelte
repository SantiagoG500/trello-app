<script lang="ts">
    import type { HTMLAttributes } from 'svelte/elements';
    import { Button } from './button';
    
    
    const components: { title: string; href: string; description: string }[] = [
      {
        title: 'dashboard',
        description: 'description',
        href: '/dashboard'
      }
    ]
    type ListItemProps = HTMLAttributes<HTMLAnchorElement> & {
      title: string;
      href: string;
      content: string;
   };
</script>

<header class="flex justify-between py-4 px-3">
  <div class="font-bold">Trello app</div>
  <div>
    <Button class="font-bold" variant="ghost" href="/">Home</Button>
    <Button class="font-bold" variant="ghost" href="/dashboard">Dashboard</Button>
  </div>
</header>
