import _ from 'lodash';

export const flattenCategories = categoriesTree => categoriesTree.reduce(
  (flattenedCategories, category) => [
    ...flattenedCategories,
    _.omit(category, 'children'),
    ...flattenCategories(category.children || []),
  ],
  [],
);

export const reducerInitialState = {
  data: [],
  requests: {},
  metadata: {},
};

export const getCategory = (categoriesTree = [], categoryId) => {
  const stack = [...categoriesTree];
  let category;
  while (stack.length > 0) {
    category = stack.pop();
    if (category.id === categoryId) {
      return category;
    } else if (category.children) {
      stack.push(...category.children);
    }
  }

  return null;
};

export const getParentCategory = (categoriesTree, category) => getCategory(categoriesTree, category.parentCategoryId);

export const buildBreadcrumbs = (categoriesTree = [], category, breadcrumbs = [category]) => {
  if (!category.parentCategoryId) {
    return breadcrumbs;
  }
  return buildBreadcrumbs(
    categoriesTree,
    getParentCategory(categoriesTree, category),
    [getParentCategory(categoriesTree, category), ...breadcrumbs]
  );
};

export const buildBreadcrumbsUrl = (categoriesTree, category) =>
  buildBreadcrumbs(categoriesTree, category).map(category => category.id).join('/');
