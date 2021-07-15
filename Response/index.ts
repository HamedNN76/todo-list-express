import { TRes } from './../types/TExpress';

function success(res: TRes, data: any, additionalParams?: any) {
  res.send({ data, additionalParams });
}

function failure(res: TRes, errors: any, status: number = 503) {
  res.status(status).send({ errors });
}

export default {
  success,
  failure,
};
