import {applyMiddleware, createStore} from "redux";
import reducers from "./reducers";

export const apiUrl = "http://localhost:8080";

export const reducerInitialState = {
  data: [],
  requests: {},
  metadata: {},
};

export const handleRequest = (state, action) => ({
  ...state,
  requests: {
    ...state.requests,
    [action.id]: action.id
      ? {
        loading: true,
      }
      : undefined,
  },
});

export const handleRetrieveSuccess = (state, action) => ({
  ...state,
  data: action.data || [],
  requests: {
    ...state.requests,
    [action.id]: {
      loading: false,
      ok: true,
    },
  },
  metadata: action.metadata,
});

export const handleFailure = (state, action) => ({
  ...state,
  requests: {
    ...state.requests,
    [action.id]: {
      error: action.error,
      loading: false,
      ok: false,
    },
  },
});
