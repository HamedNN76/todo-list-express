import TodoListModel from '../Models/TodoListModel';
import Response from '../Response';
import { TReq, TRes } from './../types/TExpress';

export type GetTodoListOptions = {
  removed?: boolean;
};
export async function getTodoList(options: GetTodoListOptions = {}) {
  const { removed } = options;

  return TodoListModel.find({ removed });
}

export type GetTodoListReq = TReq & {
  query: {
    removed?: boolean;
  };
};
export async function handleGetTodoList(req: GetTodoListReq, res: TRes) {
  try {
    const { removed } = req.query;

    const todoList = await getTodoList({ removed });

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
    const updatedTodoList = await getTodoList();

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
    const updatedTodoList = await getTodoList();

    Response.success(res, updatedTodoList);
  } catch (e) {
    Response.failure(res, e);
  }
}

export async function handleRemoveTodo(req: TReq, res: TRes) {
  try {
    const { id } = req.params;

    await TodoListModel.findById(id).update({ removed: true });
    const updatedTodoList = await getTodoList();

    Response.success(res, updatedTodoList);
  } catch (e) {
    Response.failure(res, e);
  }
}
