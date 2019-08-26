import {
  handleFailure,
  handleRequest,
  handleRetrieveSuccess,
  reducerInitialState
} from '../utils';
import {
  PRODUCTS_CREATE_FAIL,
  PRODUCTS_CREATE_REQUEST,
  PRODUCTS_CREATE_SUCCESS,
  PRODUCTS_DELETE_FAIL,
  PRODUCTS_DELETE_REQUEST,
  PRODUCTS_DELETE_SUCCESS,
  PRODUCTS_RETRIEVE_FAIL,
  PRODUCTS_RETRIEVE_REQUEST,
  PRODUCTS_RETRIEVE_SUCCESS,
  PRODUCTS_UPDATE_FAIL,
  PRODUCTS_UPDATE_REQUEST,
  PRODUCTS_UPDATE_SUCCESS,
} from './actionTypes';
import {
  handleProductCreateSuccess,
  handleProductDeleteSuccess,
  handleProductUpdateSuccess,
} from './handlers';

export default (state = reducerInitialState, action) => {
  switch (action.type) {
    case PRODUCTS_CREATE_REQUEST:
      return handleRequest(state, action);
    case PRODUCTS_CREATE_SUCCESS:
      return handleProductCreateSuccess(state, action);
    case PRODUCTS_CREATE_FAIL:
      return handleFailure(state, action);

    case PRODUCTS_RETRIEVE_REQUEST:
      return handleRequest(state, action);
    case PRODUCTS_RETRIEVE_SUCCESS:
      return handleRetrieveSuccess(state, action);
    case PRODUCTS_RETRIEVE_FAIL:
      return handleFailure(state, action);

    case PRODUCTS_UPDATE_REQUEST:
      return handleRequest(state, action);
    case PRODUCTS_UPDATE_SUCCESS:
      return handleProductUpdateSuccess(state, action);
    case PRODUCTS_UPDATE_FAIL:
      return handleFailure(state, action);

    case PRODUCTS_DELETE_REQUEST:
      return handleRequest(state, action);
    case PRODUCTS_DELETE_SUCCESS:
      return handleProductDeleteSuccess(state, action);
    case PRODUCTS_DELETE_FAIL:
      return handleFailure(state, action);

    default:
      return {...state};
  }
};
