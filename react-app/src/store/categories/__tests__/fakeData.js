export const fakeCategoriesTree = [
  {
    id: 1,
    children: [
      { id: 101 },
      {
        id: 102,
        children: [
          { id: 10201 },
        ],
      },
    ],
  },
  {
    id: 2,
    children: null,
  },
];

export const fakeCategory = {
  id: 1,
  parentCategoryId: null,
  children: [],
};

export const fakeErrorResponse = {
  message: 'Custom error',
};
