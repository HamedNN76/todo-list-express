import mongoose, { Document, Schema } from 'mongoose';

const TodoListSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: Number,
      required: true,
    },
    removed: {
      type: Boolean,
      required: true,
    },
  },
  {
    versionKey: false,
  },
);

const TodoListModel = mongoose.model<ITodoListModel>(
  'TodoList',
  TodoListSchema,
);

export interface ITodoList {
  title: string;
  description: string;
  category: boolean;
  removed: boolean;
}
export interface ITodoListModel extends Document, ITodoList {}

export default TodoListModel;
