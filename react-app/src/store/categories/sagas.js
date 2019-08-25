import { call, put, takeEvery } from 'redux-saga/effects';

import {
  CATEGORIES_RETRIEVE_FAIL,
  CATEGORIES_RETRIEVE_REQUEST,
  CATEGORIES_RETRIEVE_SUCCESS,
  CATEGORIES_UPDATE_REQUEST,
} from './actionTypes';
import { categoriesRetrieveService } from './services';

export function* categoriesRetrieveSaga({ id }) {
  try {
    const { data } = yield call(categoriesRetrieveService);
    yield put({
      type: CATEGORIES_RETRIEVE_SUCCESS,
      id,
      data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: CATEGORIES_RETRIEVE_FAIL,
      id,
      error: e.message,
    });
  }
}

export function* categoriesUpdateSaga({ id, category }) {

}

export default function* categoriesSagas() {
  yield takeEvery(CATEGORIES_RETRIEVE_REQUEST, categoriesRetrieveSaga);
  yield takeEvery(CATEGORIES_UPDATE_REQUEST, categoriesUpdateSaga);
}
