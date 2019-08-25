import { combineReducers } from 'redux';

import categoriesReducer from './categories/reducer';

export default combineReducers({
  categories: categoriesReducer,
});
