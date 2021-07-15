import { todoListSchema } from './../Validator/TodoListSchema';
import { Router } from 'express';
import {
  handleCreateTodo,
  handleEditTodo,
  handleGetTodoList,
  handleRemoveTodo,
} from '../Controllers/TodoListController';
import { checkDB } from '../db';
import { validate } from '../Validator';

const todoListRouter = Router();

todoListRouter.get('/todoList', checkDB, handleGetTodoList);

todoListRouter.post(
  '/todoList',
  checkDB,
  validate(todoListSchema(true)),
  handleCreateTodo,
);

todoListRouter.put(
  '/todoList/:id',
  checkDB,
  validate(todoListSchema(false)),
  handleEditTodo,
);

todoListRouter.delete('/todoList/:id', checkDB, handleRemoveTodo);

export default todoListRouter;
