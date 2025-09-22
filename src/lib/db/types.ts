export type ActionBaseReturn<Data, ErrorMessage> = 
  | { success: boolean, data: Data }
  | { success: boolean, data: Data, error: ErrorMessage | ''}

export enum BoardError {
  CRATE_FAILED = 'Create board failed',
  FETCH_ONE_FAILED = 'Get board failed',
  FETCH_MANY_FAILED = 'Get boards failed',
  UPDATE_FAILED = 'Update board failed',
  DELETE_FAILED = 'Delete board failed'
}
export enum CategoryError {
  CRATE_FAILED = 'Create category failed',
  FETCH_ONE_FAILED = 'Get category failed',
  FETCH_MANY_FAILED = 'Get categories failed',
  UPDATE_FAILED = 'Update category failed',
  DELETE_FAILED = 'Delete category failed'
}
export enum TagError {
  CRATE_FAILED = 'Create tag failed',
  FETCH_ONE_FAILED = 'Get tag failed',
  FETCH_MANY_FAILED = 'Get tags failed',
  UPDATE_TAG_FAILED = 'Update tag failed',
  DELETE_FAILED = 'Delete tag failed'
}
export enum TaskError {
  CRATE_TASK_FAILED = 'Create task failed',
  FETCH_ONE_FAILED = 'Get task failed',
  FETCH_MANY_FAILED = 'Get tasks failed',
  UPDATE_FAILED = 'Update task failed',
  DELETE_FAILED = 'Delete task failed'
}
