import { Database } from '$lib/firebase/firebase.js';
import { Board } from '$lib/firebase/firebase.schemas.js'
// import { taskUploadStates, taskUpload } from "$lib/stores.js";

export const getBoardsAndTags = async ({ uid }) => {
  try {
    if (!uid) return { boards: [], tags: [] }

    const userDoc = await Database.getDocument('users', uid);
    const { tags } = userDoc;

    const { equals } = Database.queryOperators;
    const boards = await Database.queryData({
      fisrtOperand: 'uid',
      operator: equals,
      secondOperand: uid,
      docName: 'boards'
    });

    return { boards, tags };
  } catch (error) {
    console.error(`Error from GetboardsAndTags(): ${error}`);
  }
};

export const addBoard = async ({ boardName, uid, boards }) => {
  try {
    const boardFinded = boards.find(b => b.name === boardName)
    if (boardFinded) return

    const newBoard = Board({ name: boardName, uid });

    await Database.setData('boards', newBoard.id, newBoard)
  } catch (error) {
    console.error(`Error from addBoard(): ${error}`);
  }
}

export const addTag = async ({ tag, tags, uid }) => {
  try {
    const setOfTags = new Set(tags)
      .add(tag);
    const newTags = Array.from(setOfTags)

    await Database.updateData('users', uid, { tags: newTags })
  } catch (error) {
    console.error(`Error from addTag(): ${error}`);

  }
}

export const updateBoard = async ({ newBoard }) => {
  Database.updateData('boards', newBoard.id, { ...newBoard })
}
