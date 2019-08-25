import {CATEGORIES_RETRIEVE_FAIL, CATEGORIES_RETRIEVE_REQUEST, CATEGORIES_RETRIEVE_SUCCESS} from './actionTypes';
import {handleFailure, handleRequest, handleRetrieveSuccess, reducerInitialState} from '../utils';

export default (state = reducerInitialState, action) => {
  switch (action.type) {
    case CATEGORIES_RETRIEVE_REQUEST:
      return handleRequest(state, action);
    case CATEGORIES_RETRIEVE_SUCCESS:
      return handleRetrieveSuccess(state, action);
    case CATEGORIES_RETRIEVE_FAIL:
      return handleFailure(state, action);
    default:
      return { ...state };
  }
}
