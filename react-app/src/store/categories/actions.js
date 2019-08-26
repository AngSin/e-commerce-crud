import uuid from 'uuid/v4';
import {
  CATEGORIES_CREATE_REQUEST,
  CATEGORIES_DELETE_REQUEST,
  CATEGORIES_RETRIEVE_REQUEST,
  CATEGORIES_UPDATE_REQUEST
} from './actionTypes';

export const categoriesCreateAction = category => ({
  type: CATEGORIES_CREATE_REQUEST,
  id: uuid(),
  category,
});

export const categoriesRetrieveAction = () => ({
  type: CATEGORIES_RETRIEVE_REQUEST,
  id: uuid(),
});

export const categoriesUpdateAction = category => ({
  type: CATEGORIES_UPDATE_REQUEST,
  id: uuid(),
  category,
});

export const categoriesDeleteAction = categoryId => ({
  type: CATEGORIES_DELETE_REQUEST,
  id: uuid(),
  categoryId,
});
