import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route } from 'react-router-dom';
import {applyMiddleware, createStore} from "redux";
import createSagaMiddleware from 'redux-saga';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import reducers from "./reducers";
import sagas from "./sagas";

configure({ adapter: new Adapter() });

export const fakeEmptyState = {
  categories: {
    data: [],
    requests: {},
  },
  products: {
    data: [],
    requests: {},
    metadata: {},
  },
};

export const fakePopulatedState = {
  categories: {
    data: [
      {id: 1, name: 'category 1', description: 'category one', children: [], parentCategoryId: null, },
      {id: 2, name: 'category 2', description: 'category two', children: [], parentCategoryId: null, },
    ],
    requests: {},
  },
  products: {
    data: [
      {id: 1, categoryId: 1, name: 'product 1', description: 'product one', price: 1, priceInEuros: 1, currency: 'EUR'},
      {id: 2, categoryId: 2, name: 'product 2', description: 'product two', price: 2, priceInEuros: 2, currency: 'EUR'},
    ],
    requests: {},
    metadata: {},
  },
};

export const sagaMiddleware = createSagaMiddleware();

export const createFakeStore = (state = fakePopulatedState) => createStore(
  reducers,
  state,
  applyMiddleware(sagaMiddleware),
);

export const runSagas = () => sagaMiddleware.run(sagas);

export const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));

export const wrapperMount = async (
  node,
  timeoutDelay = 0,
  inRouter = false,
  store,
  urlEntries = ['/'],
  path = '/',
) => {
  const reduxComponent = store ? (
    <Provider store={store}>{node}</Provider>
  ) : (
    node
  );
  const routedComponent = inRouter ? (
    <MemoryRouter initialEntries={urlEntries} initialIndex={0}>
      <Route path={path} component={() => reduxComponent} />
    </MemoryRouter>
  ) : (
    reduxComponent
  );

  const wrapper = mount(routedComponent);
  await timeout(timeoutDelay);
  await wrapper.update();
  return wrapper;
};
