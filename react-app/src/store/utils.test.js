import { handleFailure, handleRequest, handleRetrieveSuccess } from "./utils";

const fakeState = {
  data: [1],
  requests: {
    '1': {
      loading: true,
    },
  },
  metadata: {},
};

describe('handler tests', () => {
  it('should handle requests', () => {
    const fakeAction = { id: 2, };
    expect(handleRequest(fakeState, fakeAction)).toEqual({
      data: [1],
      metadata: {},
      requests: {
        '1': {
          loading: true,
        },
        '2': {
          loading: true,
        },
      },
    });
  });

  it('should handle failures', () => {
    const fakeAction = { id: 1, error: 'Request failed' };
    expect(handleFailure(fakeState, fakeAction)).toEqual({
      data: [1],
      metadata: {},
      requests: {
        '1': {
          loading: false,
          error: 'Request failed',
          ok: false,
        },
      },
    });
  });

  it('should handle success', () => {
    const fakeAction = { id: 1, data: [2], metadata: { a: 2 } };
    expect(handleRetrieveSuccess(fakeState, fakeAction)).toEqual({
      data: [2],
      metadata: {
        a: 2,
      },
      requests: {
        '1': {
          loading: false,
          ok: true,
        },
      },
    });
  });
});
