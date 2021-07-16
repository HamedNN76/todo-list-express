import TodoListModel from '../Models/TodoListModel';
import Response from '../Response';
import { TReq, TRes } from './../types/TExpress';

export type GetTodoListOptions = {
  removed?: boolean;
};
export async function getTodoList(options: GetTodoListOptions = {}) {
  const { removed } = options;

  if (removed !== undefined) {
    return TodoListModel.find({ removed });
  } else {
    return TodoListModel.find({});
  }
}

export type GetTodoListReq = TReq & {
  query: {
    removed?: boolean;
  };
};
export async function handleGetTodoList(req: GetTodoListReq, res: TRes) {
  try {
    const { all = false } = req.query;

    const todoList = await getTodoList(all ? undefined : { removed: true });

    Response.success(res, todoList);
  } catch (e) {
    Response.failure(res, e);
  }
}

export async function handleCreateTodo(req: TReq, res: TRes) {
  try {
    const { title, description, category } = req.body;

    await TodoListModel.create({
      title,
      description,
      category,
      removed: false,
    });
    const updatedTodoList = await getTodoList({ removed: false });

    Response.success(res, updatedTodoList);
  } catch (e) {
    Response.failure(res, e);
  }
}

export async function handleEditTodo(req: TReq, res: TRes) {
  try {
    const { id } = req.params;
    const { title, description, category } = req.body;

    await TodoListModel.findById(id).update({ title, description, category });
    const updatedTodoList = await getTodoList({ removed: false });

    Response.success(res, updatedTodoList);
  } catch (e) {
    Response.failure(res, e);
  }
}

export async function handleRemoveTodo(req: TReq, res: TRes) {
  try {
    const { id } = req.params;

    await TodoListModel.findById(id).update({ removed: true });
    const updatedTodoList = await getTodoList({ removed: false });

    Response.success(res, updatedTodoList);
  } catch (e) {
    Response.failure(res, e);
  }
}
