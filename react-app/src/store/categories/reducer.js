import {
  CATEGORIES_CREATE_REQUEST,
  CATEGORIES_CREATE_SUCCESS,
  CATEGORIES_CREATE_FAIL,
  CATEGORIES_RETRIEVE_REQUEST,
  CATEGORIES_RETRIEVE_SUCCESS,
  CATEGORIES_RETRIEVE_FAIL,
  CATEGORIES_UPDATE_REQUEST,
  CATEGORIES_UPDATE_SUCCESS,
  CATEGORIES_UPDATE_FAIL,
  CATEGORIES_DELETE_REQUEST,
  CATEGORIES_DELETE_SUCCESS,
  CATEGORIES_DELETE_FAIL,
} from './actionTypes';
import {
  handleFailure,
  handleRequest,
  handleRetrieveSuccess,
  reducerInitialState,
} from '../utils';
import {
  handleCategoryTreeAdd,
  handleCategoryTreeUpdate,
  handleCategoryTreeDelete,
} from './utils';

export default (state = reducerInitialState, action) => {
  switch (action.type) {
    case CATEGORIES_CREATE_REQUEST:
      return handleRequest(state, action);
    case CATEGORIES_CREATE_SUCCESS:
      return handleCategoryTreeAdd(state, action);
    case CATEGORIES_CREATE_FAIL:
      return handleFailure(state, action);

    case CATEGORIES_RETRIEVE_REQUEST:
      return handleRequest(state, action);
    case CATEGORIES_RETRIEVE_SUCCESS:
      return handleRetrieveSuccess(state, action);
    case CATEGORIES_RETRIEVE_FAIL:
      return handleFailure(state, action);

    case CATEGORIES_UPDATE_REQUEST:
      return handleRequest(state, action);
    case CATEGORIES_UPDATE_SUCCESS:
      return handleCategoryTreeUpdate(state, action);
    case CATEGORIES_UPDATE_FAIL:
      return handleFailure(state, action);

    case CATEGORIES_DELETE_REQUEST:
      return handleRequest(state, action);
    case CATEGORIES_DELETE_SUCCESS:
      return handleCategoryTreeDelete(state, action);
    case CATEGORIES_DELETE_FAIL:
      return handleFailure(state, action);

    default:
      return { ...state };
  }
}
