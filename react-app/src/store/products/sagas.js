import { call, put, takeEvery } from 'redux-saga/effects';
import _ from 'lodash';

import {
  PRODUCTS_CREATE_REQUEST,
  PRODUCTS_CREATE_SUCCESS,
  PRODUCTS_CREATE_FAIL,
  PRODUCTS_RETRIEVE_REQUEST,
  PRODUCTS_RETRIEVE_SUCCESS,
  PRODUCTS_RETRIEVE_FAIL,
  PRODUCTS_UPDATE_REQUEST,
  PRODUCTS_UPDATE_SUCCESS,
  PRODUCTS_UPDATE_FAIL,
  PRODUCTS_DELETE_REQUEST,
  PRODUCTS_DELETE_SUCCESS,
  PRODUCTS_DELETE_FAIL,
} from './actionTypes';

import {
  productsCreateService,
  productsDeleteService,
  productsRetrieveService,
  productsUpdateService,
} from './services';

export function* productsCreateSaga({ id, categoryId, product }) {
  try {
    const { data } = yield call(productsCreateService, categoryId, product);
    yield put({
      type: PRODUCTS_CREATE_SUCCESS,
      id,
      product: data,
    })
  } catch(e) {
    yield put({
      type: PRODUCTS_CREATE_FAIL,
      id,
      error: `${e.message}: ${e.response.data.message}`,
    });
  }
}

export function* productsRetrieveSaga({ id, categoryId, queryParams }) {
  try {
    const { data } = yield call(productsRetrieveService, categoryId, queryParams);
    yield put({
      type: PRODUCTS_RETRIEVE_SUCCESS,
      id,
      data: data.content,
      metadata: _.omit(data, 'content'),
    });
  } catch(e) {
    yield put({
      type: PRODUCTS_RETRIEVE_FAIL,
      id,
      error: `${e.message}: ${e.response.data.message}`,
    });
  }
}

export function* productsUpdateSaga({ id, categoryId, product }) {
  try {
    const { data } = yield call(productsUpdateService, categoryId, product);
    yield put({
      type: PRODUCTS_UPDATE_SUCCESS,
      id,
      product: data,
    });
  } catch(e) {
    yield put({
      type: PRODUCTS_UPDATE_FAIL,
      id,
      error: `${e.message}: ${e.response.data.message}`,
    });
  }
}

export function* productsDeleteSaga({ id, categoryId, productId }) {
  try {
    yield call(productsDeleteService, categoryId, productId);
    yield put({
      type: PRODUCTS_DELETE_SUCCESS,
      id,
      productId,
    });
  } catch(e) {
    yield put({
      type: PRODUCTS_DELETE_FAIL,
      id,
      error: `${e.message}: ${e.response.data.message}`,
    });
  }
}

export default function* productsSagas() {
  yield takeEvery(PRODUCTS_CREATE_REQUEST, productsCreateSaga);
  yield takeEvery(PRODUCTS_RETRIEVE_REQUEST, productsRetrieveSaga);
  yield takeEvery(PRODUCTS_UPDATE_REQUEST, productsUpdateSaga);
  yield takeEvery(PRODUCTS_DELETE_REQUEST, productsDeleteSaga);
}
