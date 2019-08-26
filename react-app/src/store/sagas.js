import { fork, all } from 'redux-saga/effects';

import categoriesSagas from './categories/sagas'
import productsSagas from './products/sagas';

export default function* sagas() {
  yield all([
    fork(categoriesSagas),
    fork(productsSagas),
  ]);
}
