import type { Board, Category, Tag, Task } from '@/schemas/dexie-schema';
import Dexie, { type EntityTable } from 'dexie';
import { getBoards } from './actions/board';
import { getCategories } from './actions/category';
import { getTasks } from './actions/task';
import { getTags } from './actions/tag';


export const db = new Dexie('myDB') as Dexie & {
  boards: EntityTable<Board, 'id'>,
  categories: EntityTable<Category, 'id'>,
  tags: EntityTable<Tag, 'id'>,
  tasks: EntityTable<Task, 'id'>
}

db.version(1).stores({
  boards: '++id, name, description',
  categories: '++id, boardId, name',
  tags: '++id, boardId, name',
  tasks: '++id, boardId, categoryId, name, description, dueDate, completed',
  tasksTagks: 'taskId, tagId'
})

type getBoardsAndCategoriesReturn = {
  boards: Board[]
  categories: Category[]
}
/**
 * **Dexie request (gets boards and categories toghether**
 * 
 * 
 * @returns A promise that resolves to an object {@link getBoardsAndCategoriesReturn}
 */
export async function getBoardsAndCategories(): Promise<getBoardsAndCategoriesReturn> {
  try {
    const boards = await getBoards()
    const categories = await getCategories()
    
    console.log('get boards and categories succesful');
    return {
      boards: boards.data ?? [],
      categories: categories.data ?? []
    }
    
  } catch (error) {
    console.log('get boards and categories failed');
    return {
      boards: [],
      categories: []
    }
  }
}

type getTasksAndTagsReturn = {
  tasks: Task[]
  tags: Tag[]
}
/**
 * **Dexie request (gets tasks and tags toghether)**
 * 
 * 
 * @returns A promise that resolves to an object {@link getBoardsAndCategoriesReturn}
 */
export async function getTasksAndTags(): Promise<getTasksAndTagsReturn> {
  try {
    const tasks = await getTasks()
    const tags = await getTags()

    return {
      tasks: tasks.data ?? [],
      tags: tags.data ?? []
    }
  } catch (error) {
    return {
      tasks: [],
      tags: []
    }
  }
  
}