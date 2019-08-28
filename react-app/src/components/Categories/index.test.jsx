import React from 'react';
import _ from 'lodash';

import Categories from './index'
import DeleteModal from './DeleteModal';
import AddEditModal from './AddEditModal';

import {
  categoriesRetrieveAction,
} from '../../store/categories/actions';
import {createFakeStore, wrapperMount, runSagas, fakeEmptyState, fakePopulatedState} from '../../store/fakeData';

let fakeStore;

const getWrapper = () => wrapperMount(
  <Categories />,
  0,
  true,
  fakeStore,
);

describe('Categories Component', () => {
  let dispatchSpy;
  beforeEach(() => {
    fakeStore = createFakeStore(fakeEmptyState);
    runSagas();
    dispatchSpy = jest.spyOn(fakeStore, 'dispatch');
  });

  afterEach(() => {
    dispatchSpy.mockRestore();
  });

  it('should dispatch the categories retrieve action if no categories exist in the store', async () => {
    await getWrapper();
    const actionResponse = categoriesRetrieveAction();
    expect(dispatchSpy).toHaveBeenCalledWith(expect.objectContaining(
      _.omit(categoriesRetrieveAction, 'id')
    ));
  });

  it('should not dispatch the categoriesRetrieveAction if categories exist in the store', async () => {
    fakeStore = createFakeStore(fakePopulatedState);
    await getWrapper();
    const actionResponse = categoriesRetrieveAction();
    expect(dispatchSpy).not.toHaveBeenCalled();
  });

  it('should display the DeleteModal on trash icon click', async () => {
    fakeStore = createFakeStore(fakePopulatedState);
    const wrapper = await getWrapper();

    expect(wrapper.find(DeleteModal).exists()).toEqual(false);
    wrapper.find('button.category-delete-icon').first().simulate('click');
    expect(wrapper.find(DeleteModal).exists()).toEqual(true);
  });

  it('should display the AddModal on plus icon click', async () => {
    fakeStore = createFakeStore(fakePopulatedState);
    const wrapper = await getWrapper();

    expect(wrapper.find(AddEditModal).exists()).toEqual(false);
    wrapper.find('button.category-add-icon').first().simulate('click');
    expect(wrapper.find(AddEditModal).exists()).toEqual(true);
  });

  it('should display the EditModal on plus icon click', async () => {
    fakeStore = createFakeStore(fakePopulatedState);
    const wrapper = await getWrapper();

    expect(wrapper.find(AddEditModal).exists()).toEqual(false);
    wrapper.find('button.category-edit-icon').first().simulate('click');
    expect(wrapper.find(AddEditModal).exists()).toEqual(true);
  });
});
