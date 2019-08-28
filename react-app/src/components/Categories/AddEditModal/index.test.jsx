import React from 'react';
import _ from 'lodash';
import AxiosMockAdapter from "axios-mock-adapter";
import axios from "axios";

import AddEditModal from './index'

import {
  categoriesCreateAction,
  categoriesDeleteAction, categoriesUpdateAction,
} from '../../../store/categories/actions';
import {
  createFakeStore,
  wrapperMount,
  runSagas,
  fakePopulatedState,
  timeout
} from '../../../store/fakeData';

import {apiUrl} from "../../../store/utils";
import {fakeProductResponse} from "../../../store/products/__tests__/fakeData";

let fakeStore;
let onCloseSpy;

const getWrapper = (categoryToEdit) => wrapperMount(
  <AddEditModal
    categoryToEdit={categoryToEdit}
    onClose={onCloseSpy}
    addingToCategoryId={1}
  />,
  0,
  true,
  fakeStore,
);

describe('Categories AddEditModal', () => {
  let dispatchSpy;
  let axiosMockAdapter;
  beforeEach(() => {
    axiosMockAdapter = new AxiosMockAdapter(axios);
    axiosMockAdapter
      .onPatch(
        `${apiUrl}/categories/1`,
      )
      .reply(200, fakeProductResponse);
    axiosMockAdapter
      .onPost(
        `${apiUrl}/categories`,
      )
      .reply(200, fakeProductResponse);
    onCloseSpy = jest.fn();
    fakeStore = createFakeStore(fakePopulatedState);
    runSagas();
    dispatchSpy = jest.spyOn(fakeStore, 'dispatch');

  });

  afterEach(() => {
    dispatchSpy.mockRestore();
    axiosMockAdapter.restore();
  });

  it('should close after successful edition', async () => {
    const category = {
      id: 1,
      name: 'name',
    };
    const updatedCategory = {
      id: 1,
      name: 'new name',
    };
    const categoriesUpdateActionResponse = categoriesUpdateAction(updatedCategory);
    const wrapper = await getWrapper(category);

    expect(wrapper.find('button.primary').hasClass('disabled')).toEqual(true);
    wrapper.find('.category-name-input input').simulate('change', { target: { value: 'new name' } });
    expect(wrapper.find('button.primary').hasClass('disabled')).toEqual(false);

    wrapper.find('button.primary').simulate('click');
    expect(dispatchSpy).toHaveBeenCalledWith(expect.objectContaining(
      _.omit(categoriesUpdateActionResponse, 'id'),
    ));
    expect(wrapper.find('button.primary').hasClass('loading')).toEqual(true);
    await timeout();
    wrapper.update();
    expect(onCloseSpy).toHaveBeenCalled();
  });

  it('should close after successful addition', async () => {
    const category = {
      name: 'name',
      description: '',
      parentCategoryId: 1,
    };

    const categoriesCreateActionResponse = categoriesCreateAction(category);
    const wrapper = await getWrapper();

    expect(wrapper.find('button.primary').hasClass('disabled')).toEqual(true);
    wrapper.find('.category-name-input input').simulate('change', { target: { value: 'name' } });
    expect(wrapper.find('button.primary').hasClass('disabled')).toEqual(false);

    wrapper.find('button.primary').simulate('click');
    expect(dispatchSpy).toHaveBeenCalledWith(expect.objectContaining(
      _.omit(categoriesCreateActionResponse, 'id'),
    ));
    expect(wrapper.find('button.primary').hasClass('loading')).toEqual(true);
    await timeout();
    wrapper.update();
    expect(onCloseSpy).toHaveBeenCalled();
  });
});
