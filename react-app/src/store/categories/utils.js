import _ from 'lodash';

const addToTree = (storedCategories, newCategory) => newCategory.parentCategoryId === null
  ? storedCategories.concat([newCategory])
  : storedCategories.reduce(
    (categoriesTree, category) => {
      let addedCategory = category;
      if (category.id === newCategory.parentCategoryId) {
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
    } else {
      return [
        ...categoriesTree,
        category,
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
          children: deleteCategoryFromTree(category.children, categoryId),
        },
      ];
    } else {
      return [
        ...categoriesTree,
        category,
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
