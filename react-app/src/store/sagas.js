import { fork, all } from 'redux-saga/effects';

import categoriesSagas from './categories/sagas'

export default function* sagas() {
  yield all([
    fork(categoriesSagas),
  ]);
}
