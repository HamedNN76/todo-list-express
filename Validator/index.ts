import * as Yup from 'yup';
import { AnyObjectSchema } from 'yup';
import Response from '../Response';
import { TNextFunction, TReq, TRes } from '../types/TExpress';

export function validate(
  schema: AnyObjectSchema,
  selector: 'body' | 'params' = 'body',
) {
  return async (req: TReq, res: TRes, next: TNextFunction) => {
    const data = req[selector];
    const isValid = await schema.isValid(data);
    if (isValid) {
      next();
    }

    schema.validate(data).catch((e) => {
      Response.failure(res, e, 400);
    });
  };
}

export const validators = {
  string: (required: boolean = false) => {
    const stringYup = Yup.string();
    return required ? stringYup.required('required') : stringYup;
  },
  number: (required: boolean = false) => {
    const numberYup = Yup.number();
    return required ? numberYup.required('required') : numberYup;
  },
  range: (required: boolean = false, min: number, max: number) => {
    const numberYup = Yup.number().min(min).max(max);
    return required ? numberYup.required('required') : numberYup;
  },
};
