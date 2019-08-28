import React from 'react';
import _ from 'lodash';

import DeleteModal from './index'

import {
  productsDeleteAction,
} from '../../../store/products/actions';
import {
  createFakeStore,
  wrapperMount,
  runSagas,
  fakePopulatedState,
  timeout
} from '../../../store/fakeData';
import AxiosMockAdapter from "axios-mock-adapter";
import axios from "axios";
import {apiUrl} from "../../../store/utils";

let fakeStore;
let onCloseSpy;

const getWrapper = () => wrapperMount(
  <DeleteModal
    productToDelete={{ id: 1, name: 'PRODUCT' }}
    onClose={onCloseSpy}
    parentCategoryId={1}
  />,
  0,
  true,
  fakeStore,
);

describe('Products DeleteModal', () => {
  let dispatchSpy;
  let axiosMockAdapter;
  beforeEach(() => {
    axiosMockAdapter = new AxiosMockAdapter(axios);
    axiosMockAdapter
      .onDelete(
        `${apiUrl}/categories/1/products/1`,
      )
      .reply(204);
    onCloseSpy = jest.fn();
    fakeStore = createFakeStore(fakePopulatedState);
    runSagas();
    dispatchSpy = jest.spyOn(fakeStore, 'dispatch');

  });

  afterEach(() => {
    dispatchSpy.mockRestore();
    axiosMockAdapter.restore();
  });

  it('should close after successful deletion', async () => {
    const deleteActionResponse = productsDeleteAction(1, 1);
    const wrapper = await getWrapper();
    wrapper.find('button.red').simulate('click');
    expect(dispatchSpy).toHaveBeenCalledWith(expect.objectContaining(
      _.omit(deleteActionResponse, 'id'),
    ));
    expect(wrapper.find('button.red').hasClass('loading')).toEqual(true);
    await timeout();
    wrapper.update();
    expect(onCloseSpy).toHaveBeenCalled();
  });
});
