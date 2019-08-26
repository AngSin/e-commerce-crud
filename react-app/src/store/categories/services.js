import axios from 'axios';

import { apiUrl } from '../utils';

export const categoriesCreateService = category => {
  const endpoint = `${apiUrl}/categories`;
  return axios.post(endpoint, category);
};

export const categoriesRetrieveService = () => {
  const endpoint = `${apiUrl}/categories`;
  return axios.get(endpoint);
};

export const categoriesUpdateService = category => {
  const endpoint = `${apiUrl}/categories/${category.id}`;
  return axios.patch(endpoint, category);
};

export const categoriesDeleteService = categoryId => {
  const endpoint = `${apiUrl}/categories/${categoryId}`;
  return axios.delete(endpoint);
};
