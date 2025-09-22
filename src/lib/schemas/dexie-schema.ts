export interface Board {
  id: string
  name: string
  description: string | undefined
}

export interface Category {
  id: string
  boardId: string
  name: string
}

export interface Tag {
  id: string
  boardId: string
  name: string
}

export interface Task {
  id: string
  boardId: string
  categoryId: string

  name: string
  description: string
  dueDate: string
  completed: boolean
}

