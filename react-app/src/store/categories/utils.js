import _ from 'lodash';

const addToTree = (storedCategories, newCategory) => storedCategories.reduce(
  (categoriesTree, category) => {
    let addedCategory = category;
    if (newCategory.parentCategoryId === null) {
      return [
        ...categoriesTree,
        newCategory,
      ];
    } else if (category.id === newCategory.parentCategoryId) {
      addedCategory = {
        ...category,
        children: [
          ...(category.children || []),
          newCategory,
        ],
      };
    } else if (category.children) {
      addedCategory = {
        ...category,
        children: addToTree(category.children, newCategory),
      };
    }
    return [
      ...categoriesTree,
      addedCategory,
    ];
  },
  [],
);

export const handleCategoryTreeAdd = (state, action) => ({
  ...state,
  data: _.get(state.data, 'length') ? addToTree(state.data, action.category) : [action.category],
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
