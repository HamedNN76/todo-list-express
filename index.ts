import express from 'express';
import cors from 'cors';
import { TNextFunction, TReq, TRes } from './types/TExpress';
import { name } from './package.json';
import todoListRouter from './Router/todoListRouter';
import { initDB } from './db';

initDB();

const port = 3030;

export const app = express();

app.use(cors());

app.use(express.json());

app.use(todoListRouter);

app.use((error: any, req: TReq, res: TRes, next: TNextFunction) => {
  console.log(error, 'error <==');
  next(error);
});

app.listen(port, () => console.log(`${name} app listening on port ${port}!`));

process.on('uncaughtException', (error: any) => {
  console.log(error, '<== uncaughtException error');
});
