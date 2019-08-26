export const apiUrl = "http://localhost:8080";

export const reducerInitialState = {
  data: [],
  dataByParentCategoryId: {},
  requests: {},
  queryParams: {},
};

const addToTree = (storedCategories, newCategory) => storedCategories.reduce(
  (categoriesTree, category) => {
    let updatedCategory = category;
    if (category.id === newCategory.parentCategoryId) {
      updatedCategory = {
        ...category,
        children: [
          ...(category.children || []),
          newCategory,
        ],
      };
    } else if (category.children) {
      updatedCategory = {
        ...category,
        children: addToTree(category.children, newCategory),
      };
    }
    return [
      ...categoriesTree,
      updatedCategory,
    ];
  },
  [],
);

export const handleCategoryTreeAdd = (state, action) => ({
  ...state,
  data: addToTree(state.data, action.category),
  requests: {
    ...state.requests,
    [action.id]: {
      loading: false,
      ok: true,
    },
  },
});

const updateTree = (storedCategories, updatedCategory) => storedCategories.reduce(
  (categoriesTree, category) => {
    if (category.id === updatedCategory.id) {
      return [
        ...categoriesTree,
        updatedCategory,
      ];
    } else if (category.children) {
      return [
        ...categoriesTree,
        {
          ...category,
          children: updateTree(category.children, updatedCategory),
        },
      ];
    }
  },
  [],
);

export const handleCategoryTreeUpdate = (state, action) => ({
  ...state,
  data: updateTree(state.data, action.category),
  requests: {
    ...state.requests,
    [action.id]: {
      loading: false,
      ok: true,
    },
  },
});

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
  data: action.data,
  requests: {
    ...state.requests,
    [action.id]: {
      loading: false,
      ok: true,
    },
  },
  queryParams: action.queryParams,
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

const deleteCategoryFromTree = (storedCategories, categoryId) => storedCategories.reduce(
  (categoriesTree, category) => {
    if (category.id === categoryId) {
      return [...categoriesTree];
    } else if (category.children) {
      return [
        ...categoriesTree,
        {
          ...category,
          children: updateTree(category.children, categoryId),
        },
      ];
    }
  },
  [],
);

export const handleCategoryTreeDelete = (state, action) => ({
  ...state,
  data: deleteCategoryFromTree(state.data, action.categoryId),
  requests: {
    ...state.requests,
    [action.id]: {
      loading: false,
      ok: true,
    },
  },
});
