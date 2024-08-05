# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/main/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

## how to do the grag and drop without failing

- Every change has to be dispatched outside the component with the array of boards updated
- When you click on edit it needs to know wich changes you made and save them (but not appliying those changes dispatching the data)

### Things that provoke the dispatch

- Creating a new task
- Moving task from place
- Editing the task (clicking on the edit button)

### Data persistence when

- You're in the editing procces, it needs to know what changes you made
