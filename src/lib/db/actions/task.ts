import { generateCUID2 } from '@/utils/cuid2'
import { db } from '../dexie'
import { TaskError, type ActionBaseReturn } from '../types'
import type { Task } from '@/schemas/dexie-schema'

type CreateTaksProps = {
  name: string,
  boardId: string,
  categoryId: string,
  completed: boolean,
  description: string,
  dueDate: string
}
type CreateTaskReturn = ActionBaseReturn<string | undefined, TaskError>

export async function createTask({
  name, 
  boardId,
  categoryId,
  completed,
  description,
  dueDate
}:CreateTaksProps ): Promise<CreateTaskReturn> {
   try {
    const request = await db.tasks.add({
      id: generateCUID2(),
      name,
      boardId,
      categoryId,
      completed,
      description,
      dueDate
    })    
    console.log(`Create task successful: `, request)

    return {
      success:true,
      data: request,
    }
  } catch (error) {
    console.error('Create task failed')

    return {
      success: false,
      data: undefined,
      error: TaskError.CRATE_TASK_FAILED
    }
  }
}

type GetTaskProps = { taskId: string }
type GetTaskReturn = ActionBaseReturn<Task | undefined, TaskError>

export async function getTask({ taskId }: GetTaskProps): Promise<GetTaskReturn> {
  try {
    const task = await db.tasks
      .where('id')
      .equals(taskId)
      .first()

    console.log('get task successful')
    return {
      success: true,
      data: task,
    }
  } catch (error) {
    console.error('get task failed')
    return {
      success: false,
      data: undefined,
      error: TaskError.FETCH_ONE_FAILED
    }
  }
}

type GetTasksReturn  = ActionBaseReturn<Task[] | [], TaskError>

export async function getTasks(): Promise<GetTasksReturn> {
  try {
    const tasks = await db.tasks
      .toArray()

    console.log(' get task successful');
    return {
      success: true,
      data: tasks,
    }
  } catch (error) {
    console.error('get tasks failed');
    return {
      success: false,
      data: [],
      error: TaskError.FETCH_MANY_FAILED
    }
  }
}

type GetTasksByIdProps  = {taskId: string}
type GetTasksByIdReturn  = ActionBaseReturn<Task[] | [], TaskError>

export async function getTasksById({taskId}: GetTasksByIdProps): Promise<GetTasksByIdReturn> {
  try {
    const tasks = await db.tasks
      .where('id')
      .equals(taskId)
      .toArray()

    console.log(' get task successful');
    return {
      success: true,
      data: tasks,
    }
  } catch (error) {
    console.error('get tasks failed');
    return {
      success: false,
      data: [],
      error: TaskError.FETCH_MANY_FAILED
    }
  }
}