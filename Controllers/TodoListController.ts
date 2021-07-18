import { ITodoListModel } from './../Models/TodoListModel';
import TodoListModel from '../Models/TodoListModel';
import Response from '../Response';
import { TReq, TRes } from './../types/TExpress';
import { FilterQuery } from 'mongoose';

export type GetTodoListOptions = {
  removed?: boolean;
  category?: number;
};
export async function getTodoList(options: GetTodoListOptions = {}) {
  const { removed, category } = options;
  const findOptions: FilterQuery<ITodoListModel> = {};
  if (removed !== undefined) {
    findOptions.removed = removed;
  }
  if (category !== undefined) {
    findOptions.category = category;
  }

  return TodoListModel.find(findOptions);
}

export type GetTodoListReq = TReq & {
  query: {
    removed?: boolean;
  };
};
export async function handleGetTodoList(req: GetTodoListReq, res: TRes) {
  try {
    const { all = false, category } = req.query;

    const todoList = await getTodoList({
      category: category ? Number(category) : undefined,
      removed: all ? undefined : false,
    });

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

    await TodoListModel.updateOne(
      { _id: id },
      {
        $set: {
          title,
          description,
          category,
        },
      },
    );
    const updatedTodoList = await getTodoList({ removed: false });

    Response.success(res, updatedTodoList);
  } catch (e) {
    Response.failure(res, e);
  }
}

export async function handleRemoveTodo(req: TReq, res: TRes) {
  try {
    const { id } = req.params;

    await TodoListModel.updateOne(
      { _id: id },
      {
        $set: {
          removed: true,
        },
      },
    );
    const updatedTodoList = await getTodoList({ removed: false });

    Response.success(res, updatedTodoList);
  } catch (e) {
    Response.failure(res, e);
  }
}
