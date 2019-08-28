import {
  handleProductCreateSuccess,
  handleProductUpdateSuccess,
  handleProductDeleteSuccess,
} from '../utils';
import {fakeProducts} from "./fakeData";

const fakeState = {
  data: fakeProducts,
  requests: {
    '1': {
      loading: true,
    },
  },
};

describe('Products handlers', () => {
  it('should handle product create success', () => {
    const fakeAction = {
      product: { id: 0 },
      id: 1,
    };
    expect(handleProductCreateSuccess(fakeState, fakeAction)).toEqual({
      data: [
        { id: 0 },
        { id: 1 },
        { id: 2 },
        { id: 3 },
      ],
      requests: {
        '1': {
          loading: false,
          ok: true,
        },
      },
    });
  });

  it('should handle product update success', () => {
    const fakeAction = {
      product: { id: 2, newField: 'Something new' },
      id: 1,
    };
    expect(handleProductUpdateSuccess(fakeState, fakeAction)).toEqual({
      data: [
        { id: 1 },
        { id: 2, newField: 'Something new' },
        { id: 3 },
      ],
      requests: {
        '1': {
          loading: false,
          ok: true,
        },
      },
    });
  });

  it('should handle product delete success', () => {
    const fakeAction = {
      productId: 2,
      id: 1,
    };
    expect(handleProductDeleteSuccess(fakeState, fakeAction)).toEqual({
      data: [
        { id: 1 },
        { id: 3 },
      ],
      requests: {
        '1': {
          loading: false,
          ok: true,
        },
      },
    })
  });
});
