import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import _ from 'lodash';
import uuid from 'uuid/v4';
import { runSaga } from 'redux-saga';

import {apiUrl} from "../../utils";
import {categoriesCreateSaga, categoriesRetrieveSaga, categoriesUpdateSaga, categoriesDeleteSaga} from "../sagas";
import {fakeErrorResponse, fakeCategoriesTree, fakeCategory} from "./fakeData";
import {
  CATEGORIES_CREATE_FAIL,
  CATEGORIES_CREATE_SUCCESS, CATEGORIES_DELETE_FAIL, CATEGORIES_DELETE_SUCCESS,
  CATEGORIES_RETRIEVE_FAIL,
  CATEGORIES_RETRIEVE_SUCCESS, CATEGORIES_UPDATE_FAIL, CATEGORIES_UPDATE_SUCCESS
} from "../actionTypes";

describe('Categories sagas', () => {
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

  describe('categoriesCreateSaga', () => {
    it('should successfully run the categoriesCreateSaga and dispatch the corresponding actions', async () => {
      const category = { name: 'fake category' };
      axiosMockAdapter
        .onPost(
          `${apiUrl}/categories`,
        )
        .reply(200, fakeCategory);
      const dispatched = [];
      const id = uuid();
      await runSaga(
        {
          dispatch: action => dispatched.push(action),
        },
        categoriesCreateSaga,
        { id, category },
      ).toPromise();

      expect(dispatched).toHaveLength(1);
      expect(dispatched[0]).toEqual({
        type: CATEGORIES_CREATE_SUCCESS,
        id,
        category: fakeCategory,
      });
    });


    it('should fail to run the categoriesCreateSaga and dispatch the corresponding actions', async () => {
      const category = { name: 'fake category' };
      axiosMockAdapter
        .onPost(
          `${apiUrl}/categories`,
        )
        .reply(404, fakeErrorResponse);
      const dispatched = [];
      const id = uuid();
      await runSaga(
        {
          dispatch: action => dispatched.push(action),
        },
        categoriesCreateSaga,
        { id, category },
      ).toPromise();

      expect(dispatched).toHaveLength(1);
      expect(dispatched[0]).toEqual({
        type: CATEGORIES_CREATE_FAIL,
        id,
        error: `Request failed with status code 404: ${fakeErrorResponse.message}`,
      });
    });
  });

  describe('categoriesRetrieveSaga', () => {
    it('should successfully run the categoriesRetrieveSaga and dispatch the corresponding actions', async () => {
      axiosMockAdapter
        .onGet(
          `${apiUrl}/categories`,
        )
        .reply(200, fakeCategoriesTree);
      const dispatched = [];
      const id = uuid();
      await runSaga(
        {
          dispatch: action => dispatched.push(action),
        },
        categoriesRetrieveSaga,
        { id },
      ).toPromise();

      expect(dispatched).toHaveLength(1);
      expect(dispatched[0]).toEqual({
        type: CATEGORIES_RETRIEVE_SUCCESS,
        id,
        data: fakeCategoriesTree,
      });
    });


    it('should fail to run the categoriesCreateSaga and dispatch the corresponding actions', async () => {
      axiosMockAdapter
        .onGet(
          `${apiUrl}/categories`,
        )
        .reply(404, fakeErrorResponse);
      const dispatched = [];
      const id = uuid();
      await runSaga(
        {
          dispatch: action => dispatched.push(action),
        },
        categoriesRetrieveSaga,
        { id },
      ).toPromise();

      expect(dispatched).toHaveLength(1);
      expect(dispatched[0]).toEqual({
        type: CATEGORIES_RETRIEVE_FAIL,
        id,
        error: `Request failed with status code 404: ${fakeErrorResponse.message}`,
      });
    });
  });

  describe('categoriesUpdateSaga', () => {
    it('should successfully run the categoriesUpdateSaga and dispatch the corresponding actions', async () => {
      const category = { name: 'fake category', id: 1 };
      axiosMockAdapter
        .onPatch(
          `${apiUrl}/categories/${category.id}`,
        )
        .reply(200, fakeCategory);
      const dispatched = [];
      const id = uuid();
      await runSaga(
        {
          dispatch: action => dispatched.push(action),
        },
        categoriesUpdateSaga,
        { id, category },
      ).toPromise();

      expect(dispatched).toHaveLength(1);
      expect(dispatched[0]).toEqual({
        type: CATEGORIES_UPDATE_SUCCESS,
        id,
        category: fakeCategory,
      });
    });


    it('should fail to run the categoriesUpdateSaga and dispatch the corresponding actions', async () => {
      const category = { name: 'fake category' };
      axiosMockAdapter
        .onPatch(
          `${apiUrl}/categories/${category.id}`,
        )
        .reply(404, fakeErrorResponse);
      const dispatched = [];
      const id = uuid();
      await runSaga(
        {
          dispatch: action => dispatched.push(action),
        },
        categoriesUpdateSaga,
        { id, category },
      ).toPromise();

      expect(dispatched).toHaveLength(1);
      expect(dispatched[0]).toEqual({
        type: CATEGORIES_UPDATE_FAIL,
        id,
        error: `Request failed with status code 404: ${fakeErrorResponse.message}`,
      });
    });
  });

  describe('categoriesDeleteSaga', () => {
    it('should successfully run the categoriesDeleteSaga and dispatch the corresponding actions', async () => {
      const categoryId = 1;
      axiosMockAdapter
        .onDelete(
          `${apiUrl}/categories/${categoryId}`,
        )
        .reply(204);
      const dispatched = [];
      const id = uuid();
      await runSaga(
        {
          dispatch: action => dispatched.push(action),
        },
        categoriesDeleteSaga,
        { id, categoryId },
      ).toPromise();

      expect(dispatched).toHaveLength(1);
      expect(dispatched[0]).toEqual({
        type: CATEGORIES_DELETE_SUCCESS,
        id,
        categoryId,
      });
    });


    it('should fail to run the categoriesUpdateSaga and dispatch the corresponding actions', async () => {
      const categoryId = 1;
      axiosMockAdapter
        .onDelete(
          `${apiUrl}/categories/${categoryId}`,
        )
        .reply(404, fakeErrorResponse);
      const dispatched = [];
      const id = uuid();
      await runSaga(
        {
          dispatch: action => dispatched.push(action),
        },
        categoriesDeleteSaga,
        { id, categoryId },
      ).toPromise();

      expect(dispatched).toHaveLength(1);
      expect(dispatched[0]).toEqual({
        type: CATEGORIES_DELETE_FAIL,
        id,
        error: `Request failed with status code 404: ${fakeErrorResponse.message}`,
      });
    });
  });
});
