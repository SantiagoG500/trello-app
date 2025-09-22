import { db } from '../dexie'
import { generateCUID2 } from '@/utils/cuid2'
import { CategoryError, type ActionBaseReturn } from '../types'
import type { Category } from '@/schemas/dexie-schema'


type CreateCategoryProps =  { name: string, boardId: string }
type CreateCategoryReturn = ActionBaseReturn<string | undefined, CategoryError>

export async function createCategory({name, boardId}: CreateCategoryProps): Promise<CreateCategoryReturn> {
  try {
    const request = await db.categories.add({
      id: generateCUID2(),
      name,
      boardId
    })

    console.log(`Create tag succesful: ${request}`)
    return {
      success: true,
      data: request,
    }
  } catch (error) {
    console.log('Create tag failed', error)

    return {
      success: false,
      data: undefined,
      error: CategoryError.CRATE_FAILED
    }
  }
}

type GetCategoryProps = { categoryId: string }
type GetCategoryReturn = ActionBaseReturn<Category | undefined, CategoryError>

export async function getCategory({ categoryId }: GetCategoryProps): Promise<GetCategoryReturn> {
  try {
    const request = await db.categories
      .where('id')
      .equals(categoryId)
      .first()
    
      
    console.log(`Create tag succesful:}`)
    return {
      success: true,
      data: request,
    }
  } catch (error) {
    console.log('Create tag failed', error)
    return {
      success: false,
      data: undefined,
      error: CategoryError.FETCH_ONE_FAILED
    }
  }
}

type GetCategoriesReturn = ActionBaseReturn<Category[] | [], CategoryError>

export async function getCategories(): Promise<GetCategoriesReturn> {
  try {
    const categories = await db.categories
      .limit(5)
      .toArray()

    console.log(`Create tag succesful`)
    return {
      success: true,
      data: categories,
    }
  } catch (error) {
    console.error('Create tag failed')
    return {
      success: false,
      data: [],
      error: CategoryError.FETCH_MANY_FAILED,
    }
  }
}

type GetCategoriesByIdProps = { categoryId: string }
type GetCategoriesByIdReturn = ActionBaseReturn<Category[] | [], CategoryError>

export async function getCategoriesById({ categoryId }: GetCategoriesByIdProps): Promise<GetCategoriesByIdReturn> {
  try {
    const request = await db.categories
      .where('id')
      .equals(categoryId)
      .toArray()

    return {
      success: true,
      data: request,
    }
  } catch (error) {
    console.error('Create tag failed')
    return {
      success: true,
      data: [],
      error: CategoryError.FETCH_MANY_FAILED
    }
  }
}