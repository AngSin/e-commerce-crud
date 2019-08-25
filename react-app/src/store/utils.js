export const apiUrl = "http://localhost:8080";

export const reducerInitialState = {
  data: [],
  dataByParentCategoryId: {},
  requests: {},
  queryParams: {},
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
  data: action.data,
  requests: {
    ...state.requests,
    [action.id]: {
      code: action.code,
      loading: false,
      ok: true,
    },
  },
});

export const handleFailure = (state, action) => ({
  ...state,
  requests: {
    ...state.requests,
    [action.id]: {
      code: action.code,
      error: action.error,
      loading: false,
      ok: false,
      subRequests: action.subRequests || [],
    },
  },
});
