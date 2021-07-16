import * as Yup from 'yup';
import { validators } from '.';

export const todoListSchema = Yup.object().shape({
  title: validators.string(true),
  description: validators.string(true),
  category: validators.range(true, 0, 3),
});
