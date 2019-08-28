import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import _ from 'lodash';
import uuid from 'uuid/v4';
import { runSaga } from 'redux-saga';

import {apiUrl} from "../../utils";
import {productsCreateSaga, productsRetrieveSaga, productsUpdateSaga, productsDeleteSaga} from "../sagas";
import {fakeErrorResponse, fakeProductPaginatedResponse, fakeProductResponse} from "./fakeData";
import {
  PRODUCTS_CREATE_FAIL,
  PRODUCTS_CREATE_SUCCESS, PRODUCTS_DELETE_FAIL, PRODUCTS_DELETE_SUCCESS,
  PRODUCTS_RETRIEVE_FAIL,
  PRODUCTS_RETRIEVE_SUCCESS, PRODUCTS_UPDATE_FAIL, PRODUCTS_UPDATE_SUCCESS
} from "../actionTypes";

describe('Normalized device group configs sagas', () => {
  let axiosMockAdapter;
  beforeEach(() => {
    axiosMockAdapter = new AxiosMockAdapter(axios);
  });

  afterEach(() => {
    axiosMockAdapter.reset();
  });

  afterAll(() => {
    axiosMockAdapter.restore();
  });

  describe('productsCreateSaga', () => {
    it('should successfully run the productsCreateSaga and dispatch the corresponding actions', async () => {
      const categoryId = 1;
      const product = { name: 'fake product' };
      axiosMockAdapter
        .onPost(
          `${apiUrl}/categories/${categoryId}/products`,
        )
        .reply(200, fakeProductResponse);
      const dispatched = [];
      const id = uuid();
      await runSaga(
        {
          dispatch: action => dispatched.push(action),
        },
        productsCreateSaga,
        { id, categoryId, product },
      ).toPromise();

      expect(dispatched).toHaveLength(1);
      expect(dispatched[0]).toEqual({
        type: PRODUCTS_CREATE_SUCCESS,
        id,
        product: fakeProductResponse,
      });
    });


    it('should fail to run the productsCreateSaga and dispatch the corresponding actions', async () => {
      const categoryId = 1;
      const product = { name: 'fake product' };
      axiosMockAdapter
        .onPost(
          `${apiUrl}/categories/${categoryId}/products`,
        )
        .reply(404, fakeErrorResponse);
      const dispatched = [];
      const id = uuid();
      await runSaga(
        {
          dispatch: action => dispatched.push(action),
        },
        productsCreateSaga,
        { id, categoryId, product },
      ).toPromise();

      expect(dispatched).toHaveLength(1);
      expect(dispatched[0]).toEqual({
        type: PRODUCTS_CREATE_FAIL,
        id,
        error: `Request failed with status code 404: ${fakeErrorResponse.message}`,
      });
    });
  });

  describe('productsRetrieveSaga', () => {
    it('should successfully run the productsRetrieveSaga and dispatch the corresponding actions', async () => {
      const categoryId = 1;
      const fakeQueryParams = { order: 'asc' };
      axiosMockAdapter
        .onGet(
          `${apiUrl}/categories/${categoryId}/products?order=asc`,
        )
        .reply(200, fakeProductPaginatedResponse);
      const dispatched = [];
      const id = uuid();
      await runSaga(
        {
          dispatch: action => dispatched.push(action),
        },
        productsRetrieveSaga,
        { id, categoryId, queryParams: fakeQueryParams },
      ).toPromise();

      expect(dispatched).toHaveLength(1);
      expect(dispatched[0]).toEqual({
        type: PRODUCTS_RETRIEVE_SUCCESS,
        id,
        data: fakeProductPaginatedResponse.content,
        metadata: _.omit(fakeProductPaginatedResponse, 'content'),
      });
    });


    it('should fail to run the productsCreateSaga and dispatch the corresponding actions', async () => {
      const categoryId = 1;
      const fakeQueryParams = { order: 'asc' };
      axiosMockAdapter
        .onGet(
          `${apiUrl}/categories/${categoryId}/products?order=asc`,
        )
        .reply(404, fakeErrorResponse);
      const dispatched = [];
      const id = uuid();
      await runSaga(
        {
          dispatch: action => dispatched.push(action),
        },
        productsRetrieveSaga,
        { id, categoryId, queryParams: fakeQueryParams },
      ).toPromise();

      expect(dispatched).toHaveLength(1);
      expect(dispatched[0]).toEqual({
        type: PRODUCTS_RETRIEVE_FAIL,
        id,
        error: `Request failed with status code 404: ${fakeErrorResponse.message}`,
      });
    });
  });

  describe('productsUpdateSaga', () => {
    it('should successfully run the productsUpdateSaga and dispatch the corresponding actions', async () => {
      const categoryId = 1;
      const product = { name: 'fake product', id: 1 };
      axiosMockAdapter
        .onPatch(
          `${apiUrl}/categories/${categoryId}/products/${product.id}`,
        )
        .reply(200, fakeProductResponse);
      const dispatched = [];
      const id = uuid();
      await runSaga(
        {
          dispatch: action => dispatched.push(action),
        },
        productsUpdateSaga,
        { id, categoryId, product },
      ).toPromise();

      expect(dispatched).toHaveLength(1);
      expect(dispatched[0]).toEqual({
        type: PRODUCTS_UPDATE_SUCCESS,
        id,
        product: fakeProductResponse,
      });
    });


    it('should fail to run the productsUpdateSaga and dispatch the corresponding actions', async () => {
      const categoryId = 1;
      const product = { name: 'fake product' };
      axiosMockAdapter
        .onPatch(
          `${apiUrl}/categories/${categoryId}/products/${product.id}`,
        )
        .reply(404, fakeErrorResponse);
      const dispatched = [];
      const id = uuid();
      await runSaga(
        {
          dispatch: action => dispatched.push(action),
        },
        productsUpdateSaga,
        { id, categoryId, product },
      ).toPromise();

      expect(dispatched).toHaveLength(1);
      expect(dispatched[0]).toEqual({
        type: PRODUCTS_UPDATE_FAIL,
        id,
        error: `Request failed with status code 404: ${fakeErrorResponse.message}`,
      });
    });
  });

  describe('productsDeleteSaga', () => {
    it('should successfully run the productsDeleteSaga and dispatch the corresponding actions', async () => {
      const categoryId = 1;
      const productId = 2;
      axiosMockAdapter
        .onDelete(
          `${apiUrl}/categories/${categoryId}/products/${productId}`,
        )
        .reply(204);
      const dispatched = [];
      const id = uuid();
      await runSaga(
        {
          dispatch: action => dispatched.push(action),
        },
        productsDeleteSaga,
        { id, categoryId, productId },
      ).toPromise();

      expect(dispatched).toHaveLength(1);
      expect(dispatched[0]).toEqual({
        type: PRODUCTS_DELETE_SUCCESS,
        id,
        productId,
      });
    });


    it('should fail to run the productsUpdateSaga and dispatch the corresponding actions', async () => {
      const categoryId = 1;
      const productId = 2;
      axiosMockAdapter
        .onDelete(
          `${apiUrl}/categories/${categoryId}/products/${productId}`,
        )
        .reply(404, fakeErrorResponse);
      const dispatched = [];
      const id = uuid();
      await runSaga(
        {
          dispatch: action => dispatched.push(action),
        },
        productsDeleteSaga,
        { id, categoryId, productId },
      ).toPromise();

      expect(dispatched).toHaveLength(1);
      expect(dispatched[0]).toEqual({
        type: PRODUCTS_DELETE_FAIL,
        id,
        error: `Request failed with status code 404: ${fakeErrorResponse.message}`,
      });
    });
  });
});
