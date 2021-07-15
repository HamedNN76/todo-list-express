import * as Yup from 'yup';
import { validators } from '.';

export const todoListSchema = (required: boolean) =>
  Yup.object().shape({
    title: validators.string(required),
    description: validators.string(required),
    category: validators.range(required, 0, 3),
  });
