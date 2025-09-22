import { generateCUID2 } from '@/utils/cuid2';
import { db } from '../dexie';
import { BoardError, type ActionBaseReturn } from '../types';
import type { Board } from '@/schemas/dexie-schema';
import { createCategory } from './category';

type CreateBoardReturn = ActionBaseReturn< string | undefined, BoardError >
type CreateBoardProps = {
  name: string
  description: string | undefined
}

export async function createBoard ({name, description}: CreateBoardProps): Promise<CreateBoardReturn> {
  try {
    const boardId = generateCUID2()
    const request = await db.boards.add({
      id: boardId,
      name,
      description
    })

    // Creating default categories
    createCategory({ name: 'To do', boardId})
    createCategory({ name: 'In progress', boardId})
    createCategory({ name: 'Done', boardId})
   
    console.log(`Create board successful: ${request}`);
    return {
      success: true,
      data: request,
    }
  } catch (error) {
    console.error('Create board failed ', error);

    return {
      success: false,
      data: undefined,
      error: BoardError.CRATE_FAILED
    }
  }
}

type getboardProps = { boardId: string }
type getboardReturn = ActionBaseReturn<Board | undefined, BoardError>

export async function getBoard({ boardId }: getboardProps): Promise<getboardReturn> {
  try {
    const request = await db.boards
      .where('id')
      .equals(boardId)
      .first()

    console.log(`Get boards successful ${request}`);

    return {
      success: true,
      data: request,
    }
  } catch (error) {
    console.log('Get boards failed ', error);

    return {
      success: false,
      data: undefined,
      error: BoardError.FETCH_ONE_FAILED
    }
  }
}

type getBoardsReturn = ActionBaseReturn<Board[] | [], BoardError>
export async function getBoards(): Promise<getBoardsReturn> {
  try {
    const boards = await db.boards
      .limit(10)
      .toArray()

    console.log(`Get boards successful`);
    return {
      success: true,
      data: boards ?? [],
    }
  } catch (error) {
    console.log('Get boards failed ', error);
    return {
      data: [],
      success: false,
      error: BoardError.FETCH_MANY_FAILED
    }
  }
}

type GetBoardsByIdProps = { boardId: string }
type GetBoardsByIdReturn = ActionBaseReturn<Board[] | [], BoardError>

export async function getBoardsById({ boardId }: GetBoardsByIdProps): Promise<GetBoardsByIdReturn> {
  try {
    const boards = await db.boards
      .where('id')
      .equals(boardId)
      .limit(10)
      .toArray()

    console.log(`Get boards successful`);
    return {
      success: true,
      data: boards ?? [],
    }
  } catch (error) {
    console.log('Get boards failed ', error);
    return {
      data: [],
      success: false,
      error: BoardError.FETCH_MANY_FAILED
    }
  }
}
