import { combineReducers } from 'redux';

import categoriesReducer from './categories/reducer';
import productsReducer from './products/reducer';

export default combineReducers({
  categories: categoriesReducer,
  products: productsReducer,
});
