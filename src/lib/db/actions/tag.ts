import { generateCUID2 } from '@/utils/cuid2'
import { db } from '../dexie'
import { TagError, type ActionBaseReturn } from '../types'
import type { Tag } from '@/schemas/dexie-schema'

type CreateTagProps = {name: string, boardId: string}
type CreateTagReturn = ActionBaseReturn<string | undefined, TagError>

export async function createTag({name, boardId}: CreateTagProps): Promise<CreateTagReturn> {
  try {
    const id = await db.tags.add({
      id: generateCUID2(),
      name,
      boardId
    })    
    console.log(`Create tag succesful: ${id}`)

    return {
      success: true,
      data: id,
    }
  } catch (error) {
    console.error('Create tag failed')
    return {
      success: true,
      data: undefined,
      error: TagError.CRATE_FAILED,
    }
  }
}


type GetTagReturn = ActionBaseReturn<Tag | undefined, TagError>

export async function getTag({tagId}: {tagId: string}): Promise<GetTagReturn> {
  try {
    const tag = await db.tags
      .where('id')
      .equals(tagId)
      .first()

    console.log('get task successful')
    return {
      success: true,
      data: tag,
    }
  } catch (error) {
    console.error('get task failed')
    return {
      success: true,
      data: undefined,
      error: TagError.FETCH_ONE_FAILED
    }
  }
}

type GetTagsReturn = ActionBaseReturn<Tag[] | [], TagError>

export async function getTags(): Promise<GetTagsReturn> {
  try {
    const tags = await db.tags
      .toArray()

    console.log(' get tags successful');
    return {
      success: true,
      data: tags
    }
  } catch (error) {
    console.error('get tasks failed');
    return {
      success: false,
      data: [],
      error: TagError.FETCH_MANY_FAILED
    }
  }
}


type GetTagsByIdProps = { tagId: string }
type GetTagsByIdReturn = ActionBaseReturn<Tag[] | [], TagError>

export async function getTagsById({tagId}: GetTagsByIdProps): Promise<GetTagsByIdReturn> {
  try {
    const tags = await db.tags
      .where('id')
      .equals(tagId)
      .toArray()

    console.log(' get tags successful');
    return {
      success: true,
      data: tags
    }
  } catch (error) {
    console.error('get tasks failed');
    return {
      success: false,
      data: [],
      error: TagError.FETCH_MANY_FAILED
    }
  }
}