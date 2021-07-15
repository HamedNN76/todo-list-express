import mongoose from 'mongoose';
import Response from './Response';
import { TNextFunction, TReq, TRes } from './types/TExpress';
import { name } from './package.json';

export async function initDB(res?: TRes, next?: TNextFunction) {
  try {
    await mongoose.connect(`mongodb://localhost:27017/${name}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('db connected');
    next?.();
  } catch (error) {
    if (res) {
      res.send(Response.failure(res, ['DB Not Connected', error]));
    } else {
      next?.(new Error('DB Not Connected'));
    }
  }
}

export function checkDB(req: TReq, res: TRes, next: TNextFunction) {
  if (mongoose.connection.readyState === 0) {
    initDB(res, next);
  } else {
    next();
  }
}
