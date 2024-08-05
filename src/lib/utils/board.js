export const updateEvents = {
  create: 'create Task',
  edit: 'edit task',
  delete: 'delete task',
  move: 'move task',
  editCopy: 'edit copy',
  newCategory: 'new category'
}

export const handleUpdate = ({ task, boardItems, updateEvent, boardItem }) => {
  if (updateEvent === updateEvents.create) {
    const newBoard = addTask({ task, boardItems })
    return { newBoard }
  }
  if (updateEvent === updateEvents.delete) {
    const newBoard = deleteTask({ task, boardItems })
    return { newBoard }
  }
  if (updateEvent === updateEvents.edit) {
    const newBoard = editTask({ task, boardItems })
    return { newBoard }
  }
  if (updateEvent === updateEvents.move) {
    const newBoard = moveTask({ task, boardItems })
    return { newBoard }
  }
  if (updateEvent === updateEvents.editCopy) {
    const newBoard = moveTask({ task, boardItems })
    return { newBoard }
  }
  if (updateEvent === updateEvents.newCategory && boardItem) {
    const newBoard = createBoardItem({ boardItem: boardItem, boardItems })
    return { newBoard }
  }
}


export const addTask = ({ task, boardItems }) => {
  const { category, taskId } = task
  const taskInArray = t => t.taskId === taskId

  const tasks = boardItems.map(b => b.tasks).flat()

  if (tasks.some(taskInArray)) return boardItems

  return boardItems.map(bItem => {

    if (
      bItem.category === category
      && !bItem.tasks.some(taskInArray)
    ) bItem.tasks.push(task)

    return bItem
  })

};

export const editTask = ({ task, boardItems }) => {
  const { boardItem, index: bIndex } = findCategory({ category: task.category, boardItems })
  const { index: tIndex } = findTask({ task, tasks: boardItem.tasks })

  boardItems[bIndex].tasks.splice(tIndex, 1, task)

  return boardItems
};

export const deleteTask = ({ task, boardItems }) => {
  const boardIndex = boardItems.findIndex(bItem => {
    return (bItem.category === task.category)
  })
  boardItems[boardIndex].tasks = boardItems[boardIndex]
    .tasks.filter(t => {
      return t.taskId !== task.taskId
    })

  return boardItems
};
export const moveTask = ({ task, boardItems }) => {
  const { category, taskId } = task
  const taskInArray = (t) => t.taskId === taskId

  return boardItems.map(bItem => {
    if (bItem.tasks.some(taskInArray) && bItem.category !== category)
      bItem.tasks = bItem.tasks.filter(t => t.taskId !== taskId)

    if (!bItem.tasks.some(taskInArray) && bItem.category === category)
      bItem.tasks.push(task)

    return bItem
  })
}


export const findTask = ({ task, tasks }) => {
  const foundedTask = tasks.find(t => t.taskId === task.taskId)
  const index = tasks.findIndex(t => t.taskId === task.taskId)

  return { foundedTask, index }
}

export const getCurrentTask = ({ taskId, boardItems }) => {
  const tasks = boardItems.map(bItem => bItem.tasks).flat()
  const currentTask = tasks.find(t => t.taskId === taskId)
  return currentTask
};

export const editTags = ({ tag, tags }) => {
  const existingTag = (t) => t === tag;
  if (tags.some(existingTag)) {
    const filter = tags.filter((t) => t !== tag);
    tags = [...filter];
    return tags;
  }

  return [...tags, tag]
}

export const findCategory = ({ category, boardItems }) => {
  const boardItem = boardItems.find(bItem => bItem.category === category)
  const index = boardItems.findIndex(bItem => bItem.category === category)

  return { boardItem, index }
}

export const editCopy = ({ task, boardItemsCopy }) => {
  const { foundedTask, index } = findTask({ task: task, tasks: boardItemsCopy });

  if (!foundedTask) boardItemsCopy = [...boardItemsCopy, task];
  else boardItemsCopy.splice(index, 1, task);

  return boardItemsCopy
}


export const createBoardItem = ({ boardItem, boardItems }) => {
  const bItemName = boardItem.category
  const bItemsName = boardItems.map(b => b.category)

  if (bItemsName.includes(bItemName)) return boardItems
  else boardItems.push(boardItem)

  return boardItems
}