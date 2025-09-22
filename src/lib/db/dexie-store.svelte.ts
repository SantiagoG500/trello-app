import type { Board, Category, Tag, Task } from '@/schemas/dexie-schema'
import { getBoards } from './actions/board'
import { getCategories } from './actions/category'
import { getTasks } from './actions/task'
import { getTags } from './actions/tag'
import { liveQuery } from 'dexie'
import type { ActionBaseReturn, BoardError, CategoryError, TagError, TaskError } from './types'


type getBoardsAndCategoriesReturn = ActionBaseReturn<
  { boards: Board[], categories: Category[] },
  BoardError & CategoryError
>

type getTasksAndTagsReturn = ActionBaseReturn<
  { tasks: Task[], tags: Tag[] },
  TaskError & TagError
>

export class DexieStore {
  
  boards = $state<Board[] | []>([])
  categories = $state<Category[] | []>([])
  tasks = $state<Task[] | []>([])
  tags = $state<Tag[] | []>([])
  
  currentBoard = $derived<Board | undefined>(this.boards[0])
  currentTask = $derived<Task | undefined>(undefined)
  currentCategories = $derived<Category[] | []>(this.categories.filter(cat => cat.boardId))
  currentTasks = $derived<Task[] | []>(this.tasks.filter(task => task.boardId))

  constructor() {
    liveQuery( async () => {
      const a = await this.#getBoardsAndCategories()
      const b = await this.#getTasksAndTags()

      return {
        boards: a.data.boards,
        categories: a.data.categories,
        tags: b.data.tags,
        tasks: b.data .tasks
      }
    })
    .subscribe(({ boards,categories, tags, tasks})=> {
      this.boards = boards
      this.categories = categories
      this.tags = tags
      this.tasks = tasks
    })
  }


  /**
   * **Dexie request (gets boards and categories toghether**
   * 
   * 
   * @returns A promise that resolves to an object {@link getBoardsAndCategoriesReturn}
   */
  async #getBoardsAndCategories(): Promise<getBoardsAndCategoriesReturn> {
    try {
      const boards = await getBoards()
      const categories = await getCategories()
      
      console.log('get boards and categories succesful');
      return {
        data:{
          boards: boards.data,
          categories: categories.data
        },
        success: true,
      }
      
    } catch (error) {
      console.log('get boards and categories failed');
      return {
        data: { boards: [], categories: [] },
        success: false
      }
    }
  }

  /**
  * **Dexie request (gets tasks and tags toghether)**
  * 
  * 
  * @returns A promise that resolves to an object {@link getBoardsAndCategoriesReturn}
  */
  async #getTasksAndTags(): Promise<getTasksAndTagsReturn> {
    try {
      const tasks = await getTasks()
      const tags = await getTags()

      return {
        success:true,
        data: {tags: tags.data, tasks: tasks.data}
      }
    } catch (error) {
      return {
        success: false,
        data: { tags: [], tasks: []}
      }
    }
    
  }

  // this is kinda wrong, it has to find first if it can find the board
  // then we can change the board
  changeBoard(boardId: string) {
    if (this.boards.length <= 0) return

    if (boardId) {
      this.currentBoard = this.boards.find((board) => board.id === boardId)
      this.currentCategories = this.categories.filter((cat) => cat.boardId === boardId)
    }
    else {
      this.currentBoard = this.boards[0]
    } 
  }

  changeCurrentTask(id: string) {

  }

}





// type getBoardsAndCategoriesReturn = {
//   boards: Board[]
//   categories: Category[]
// }

// type getTasksAndTagsReturn = {
//   tasks: Task[]
//   tags: Tag[]
// }

// type DexieTables = {
//   boards: Board[]
//   categories: Category[]
//   tasks: Task[]
//   tags: Tag[]
// }














// export class DexieStore {
//   categories = $state<Category[]>([])
//   boards = $state<Board[]>([])
//   tasks = $state<Task[]>([])
//   tags = $state<Tag[]>([])

//   constructor() {
//     onMount(() => this.loadData())
//   }

//   /**
//    * **Dexie request (loads all data)**
//    * - Loads boards and categories from {@link getBoardsAndCategories}
//    * - Loads tasks and tags from {@link getTasksAndTags}
//    * 
//    * @returns A promise that resolves to an object {@link getAllDataReturn}
//    */
//   async loadData() {
//     const { boards, categories } = await this.getBoardsAndCategories()
//     const { tags, tasks } = await this.getTasksAndTags()
    
//     this.boards = boards
//     this.categories = categories
//     this.tags = tags
//     this.tasks = tasks
//   }
  
//   /**
//    * **Dexie request (gets boards and categories toghether**
//    * 
//    * 
//    * @returns A promise that resolves to an object {@link getBoardsAndCategoriesReturn}
//    */
//   async getBoardsAndCategories(): Promise<getBoardsAndCategoriesReturn> {
//     try {
//       const boards = await getBoards()
//       const categories= await getCategories()

      
//       console.log('get boards and categories succesful');
//       return {
//         boards: boards ?? [],
//         categories: categories ?? []
//       }
      
//     } catch (error) {
//       console.log('get boards and categories failed');
//       return {
//         boards: [],
//         categories: []
//       }
//     }
//   }

//   /**
//   * **Dexie request (gets tasks and tags toghether)**
//   * 
//   * 
//   * @returns A promise that resolves to an object {@link getBoardsAndCategoriesReturn}
//   */
//   async getTasksAndTags(): Promise<getTasksAndTagsReturn> {
//     try {
//       const tasks = await getTasks()
//       const tags = await getTags()

//       return {
//         tasks: tasks ?? [],
//         tags: tags ?? []
//       }
//     } catch (error) {
//       return {
//         tasks: [],
//         tags: []
//       }
//     }
    
//   }

// }

