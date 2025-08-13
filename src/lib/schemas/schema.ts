import z from 'zod';

export const createBoardSchema = z.object({
  name: z.string()
    .min(1, { message: 'Board title cannot be empty'})
    .max(50, { message: 'Board title cannot be longer than 50 characters' }),
  description: z.string()
    .max(100,  { message: 'Board description cannot be longer than bwq550 characters' })
    .optional()
})

export const createCategorySchema = z.object({
  name: z.string()
    .max(50,  { message: 'Category title cannot be longer than 50 characters' })
})

export const createTagSchema = z.object({
  name: z.string()
    .max(50,  { message: 'Tag title cannot be longer than 50 characters' })
})

export const createTaskSchema = z.object({
  name: z.string()
    .max(50,  { message: 'Task title cannot be longer than 50 characters' })
    .min(1,   { message: 'Board title cannot be empty' }),
  description: z.string()
    .max(5000,  { message: 'Board title cannot be longer than 5000 characters' })
    .optional(),
  dueDate: z.date()
    .optional(),
})

export type CreateBoardSchema = typeof createBoardSchema
export type CreateCategorySchema = typeof createCategorySchema
export type CreateTagSchema = typeof createTagSchema
export type CreateTaskSchema = typeof createTaskSchema
