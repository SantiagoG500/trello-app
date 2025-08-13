import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { createBoardSchema, createTagSchema, createTaskSchema } from '$lib/schemas/schema';
import { fail } from '@sveltejs/kit';
import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  return {
    boardForm: await superValidate(zod(createBoardSchema)),
    taskForm: await superValidate(zod(createTaskSchema)),
    tagForm: await superValidate(zod(createTagSchema))
  };
};  

export const actions: Actions = {
  createBoard: async (event) => {
    const form = await superValidate(event, zod(createBoardSchema));
    
    if (!form.valid) {
      return fail(400, { boardForm: form });
    }
    return { boardForm: form };
  },

  createTask: async (event) => {
    const form = await superValidate(event, zod(createTaskSchema))
    if (!form.valid) {
      return fail(400, { taskForm: form })      
    }

    return { taskForm: form };
  },

  createTag: async (event) => {
    const form = await superValidate(event, zod(createTaskSchema))

    if (!form.valid) {
      return fail(400, { tagForm: form })
    }

    return { tagForm: form }
  }
};

