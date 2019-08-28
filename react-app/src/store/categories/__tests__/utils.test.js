import {
  handleCategoryTreeAdd,
  handleCategoryTreeUpdate,
  handleCategoryTreeDelete,
} from "../utils";

import { fakeCategoriesTree } from './fakeData';

const fakeState = {
  data: fakeCategoriesTree,
  requests: {
    '1': {
      loading: true,
    },
  },
};

describe('Categories handlers tests', () => {
  it('should handle category tree add', () => {
    const fakeAction = {
      category: {
        parentCategoryId: 102,
        id: 10202,
      },
      id: 1,
    };
    expect(handleCategoryTreeAdd(fakeState, fakeAction)).toEqual({
      data: [
        {
          id: 1,
          children: [
            { id: 101 },
            {
              id: 102,
              children: [
                { id: 10201 },
                {
                  parentCategoryId: 102,
                  id: 10202,
                },
              ],
            },
          ],
        },
        {
          id: 2,
          children: null,
        },
      ],
      requests: {
        '1': {
          loading: false,
          ok: true,
        }
      }
    });
  });

  it('should handle category tree update', () => {
    const fakeAction = {
      category: {
        id: 10201,
        newField: 'custom field',
      },
      id: 1,
    };
    expect(handleCategoryTreeUpdate(fakeState, fakeAction)).toEqual({
      data: [
        {
          id: 1,
          children: [
            { id: 101 },
            {
              id: 102,
              children: [
                {
                  id: 10201,
                  newField: 'custom field',
                },
              ],
            },
          ],
        },
        {
          id: 2,
          children: null,
        },
      ],
      requests: {
        '1': {
          loading: false,
          ok: true,
        }
      }
    });
  });

  it('should handle category tree delete', () => {
    const fakeAction = {
      categoryId: 10201,
      id: 1,
    };
    expect(handleCategoryTreeDelete(fakeState, fakeAction)).toEqual({
      data: [
        {
          id: 1,
          children: [
            { id: 101 },
            {
              id: 102,
              children: [],
            },
          ],
        },
        {
          id: 2,
          children: null,
        },
      ],
      requests: {
        '1': {
          loading: false,
          ok: true,
        }
      }
    });
  });
});
