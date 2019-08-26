import uuid from 'uuid/v4';
import {
  PRODUCTS_CREATE_REQUEST,
  PRODUCTS_DELETE_REQUEST,
  PRODUCTS_RETRIEVE_REQUEST,
  PRODUCTS_UPDATE_REQUEST
} from "./actionTypes";

export const productsCreateAction = (categoryId, product) => ({
  type: PRODUCTS_CREATE_REQUEST,
  id: uuid(),
  categoryId,
  product,
});

export const productsRetrieveAction = (categoryId, queryParams = {}) => ({
  type: PRODUCTS_RETRIEVE_REQUEST,
  id: uuid(),
  categoryId,
  queryParams,
});

export const productsUpdateAction = (categoryId, product) => ({
  type: PRODUCTS_UPDATE_REQUEST,
  id: uuid(),
  categoryId,
  product,
});

export const productsDeleteAction = (categoryId, productId) => ({
  type: PRODUCTS_DELETE_REQUEST,
  id: uuid(),
  categoryId,
  productId,
});
