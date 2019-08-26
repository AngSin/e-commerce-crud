import { call, put, takeEvery } from 'redux-saga/effects';

import {
  CATEGORIES_CREATE_REQUEST,
  CATEGORIES_CREATE_SUCCESS,
  CATEGORIES_CREATE_FAIL,
  CATEGORIES_RETRIEVE_FAIL,
  CATEGORIES_RETRIEVE_REQUEST,
  CATEGORIES_RETRIEVE_SUCCESS,
  CATEGORIES_UPDATE_REQUEST,
  CATEGORIES_UPDATE_SUCCESS,
  CATEGORIES_UPDATE_FAIL,
  CATEGORIES_DELETE_REQUEST, CATEGORIES_DELETE_SUCCESS, CATEGORIES_DELETE_FAIL,
} from './actionTypes';
import {
  categoriesCreateService,
  categoriesRetrieveService,
  categoriesUpdateService,
  categoriesDeleteService,
} from './services';

export function* categoriesCreateSaga({ id, category }) {
  try {
    const { data: newCategory } = yield call(categoriesCreateService, category);
    yield put({
      type: CATEGORIES_CREATE_SUCCESS,
      id,
      category: newCategory,
    });
  } catch (e) {
    yield put({
      type: CATEGORIES_CREATE_FAIL,
      id,
      error: e.response.data.message,
    });
  }
}

export function* categoriesRetrieveSaga({ id }) {
  try {
    const { data } = yield call(categoriesRetrieveService);
    yield put({
      type: CATEGORIES_RETRIEVE_SUCCESS,
      id,
      data,
    });
  } catch (e) {
    yield put({
      type: CATEGORIES_RETRIEVE_FAIL,
      id,
      error: e.response.data.message,
    });
  }
}

export function* categoriesUpdateSaga({ id, category }) {
  try {
    const { data: updatedCategory } = yield call(categoriesUpdateService, category);
    yield put({
      type: CATEGORIES_UPDATE_SUCCESS,
      id,
      category: updatedCategory,
    });
  } catch (e) {
    yield put({
      type: CATEGORIES_UPDATE_FAIL,
      id,
      error: e.response.data.message,
    });
  }
}

export function* categoriesDeleteSaga({ id, categoryId }) {
  try {
    yield call(categoriesDeleteService, categoryId);
    yield put({
      type: CATEGORIES_DELETE_SUCCESS,
      id,
      categoryId,
    });
  } catch (e) {
    console.log({ e });
    yield put({
      type: CATEGORIES_DELETE_FAIL,
      id,
      error: e.response.data.message,
    });
  }
}

export default function* categoriesSagas() {
  yield takeEvery(CATEGORIES_CREATE_REQUEST, categoriesCreateSaga);
  yield takeEvery(CATEGORIES_RETRIEVE_REQUEST, categoriesRetrieveSaga);
  yield takeEvery(CATEGORIES_UPDATE_REQUEST, categoriesUpdateSaga);
  yield takeEvery(CATEGORIES_DELETE_REQUEST, categoriesDeleteSaga);
}
