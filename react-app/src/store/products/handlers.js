export const handleProductCreateSuccess = (state, action) => ({
  ...state,
  data: [
    action.product,
    ...state.data,
  ],
  requests: {
    ...state.requests,
    [action.id]: {
      loading: false,
      ok: true,
    },
  },
});

export const handleProductUpdateSuccess = (state, action) => ({
  ...state,
  data: state.data.map(product => product.id === action.product.id ? action.product : product),
  requests: {
    ...state.requests,
    [action.id]: {
      loading: false,
      ok: true,
    },
  },
});

export const handleProductDeleteSuccess = (state, action) => ({
  ...state,
  data: state.data.filter(product => product.id !== action.productId),
  requests: {
    ...state.requests,
    [action.id]: {
      loading: false,
      ok: true,
    },
  },
});
