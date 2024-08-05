import { getUUID } from '../utils/uuid';

export const UserSchema = ({ uid, name, email }) => {
  const boardIds = [];
  const tags = [];

  return {
    uid,
    name,
    email,
    boardIds,
    tags
  };
};

export const Board = ({
  name,
  uid,
}) => {
  const inbox = BoardItem({ name: 'Inbox' })
  const reminders = BoardItem({ name: 'Reminders' })
  const actions = BoardItem({ name: 'Tasks' })

  const tags = [];

  return {
    name,
    id: getUUID(),
    uid,
    board: [
      inbox,
      reminders,
      actions
    ],
    tags
  };
};

export const TaskSchema = ({
  taskName = '',
  dueDate = '',
  description = '',
  tags = [],
  category = '',
  done = false
}) => {
  return {
    taskName,
    dueDate,
    description,
    tags,
    done,
    category,
    taskId: getUUID()
  };
};

export const BoardItem = ({ name }) => {

  return {
    category: name,
    tasks: []
  }

}

export const User = ({ uid, name, email, providerId }) => {

  return {
    name,
    uid,
    email,
    providerId,
    boardIds: [],
    tags: [],
  }

}