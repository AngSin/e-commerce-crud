import React from 'react';
import _ from 'lodash';

import Products from './index'
import DeleteModal from './DeleteModal';
import AddEditModal from './AddEditModal';

import {
  productsRetrieveAction,
} from '../../store/products/actions';
import {createFakeStore, wrapperMount, runSagas, fakeEmptyState, fakePopulatedState} from '../../store/fakeData';

let fakeStore;

const getWrapper = () => wrapperMount(
  <Products />,
  0,
  true,
  fakeStore,
);

describe('Products Component', () => {
  let dispatchSpy;
  beforeEach(() => {
    fakeStore = createFakeStore(fakeEmptyState);
    runSagas();
    dispatchSpy = jest.spyOn(fakeStore, 'dispatch');
  });

  afterEach(() => {
    dispatchSpy.mockRestore();
  });

  it('should dispatch the products retrieve action if no products exist in the store', async () => {
    await getWrapper();
    const actionResponse = productsRetrieveAction();
    expect(dispatchSpy).toHaveBeenCalledWith(expect.objectContaining(
      _.omit(productsRetrieveAction, 'id')
    ));
  });

  it('should not dispatch the productsRetrieveAction if products exist in the store', async () => {
    fakeStore = createFakeStore(fakePopulatedState);
    await getWrapper();
    const actionResponse = productsRetrieveAction();
    expect(dispatchSpy).not.toHaveBeenCalled();
  });

  it('should display the DeleteModal on trash icon click', async () => {
    fakeStore = createFakeStore(fakePopulatedState);
    const wrapper = await getWrapper();

    expect(wrapper.find(DeleteModal).exists()).toEqual(false);
    wrapper.find('button.product-delete-icon').first().simulate('click');
    expect(wrapper.find(DeleteModal).exists()).toEqual(true);
  });

  it('should display the AddModal on plus icon click', async () => {
    fakeStore = createFakeStore(fakePopulatedState);
    const wrapper = await getWrapper();

    expect(wrapper.find(AddEditModal).exists()).toEqual(false);
    wrapper.find('button.product-add-icon').first().simulate('click');
    expect(wrapper.find(AddEditModal).exists()).toEqual(true);
  });

  it('should display the EditModal on plus icon click', async () => {
    fakeStore = createFakeStore(fakePopulatedState);
    const wrapper = await getWrapper();

    expect(wrapper.find(AddEditModal).exists()).toEqual(false);
    wrapper.find('button.product-edit-icon').first().simulate('click');
    expect(wrapper.find(AddEditModal).exists()).toEqual(true);
  });
});
