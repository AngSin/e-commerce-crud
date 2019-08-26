import axios from 'axios';

import { apiUrl } from '../utils';

export const productsCreateService = (categoryId, product) => {
  const endpoint = `${apiUrl}/categories/${categoryId}/products`;
  return axios.post(endpoint, product);
};

export const productsRetrieveService = (categoryId, queryParams) => {
  const searchParams = new URLSearchParams(queryParams);
  const endpoint = `${apiUrl}/categories/${categoryId}/products?${decodeURIComponent(searchParams.toString())}`;
  return axios.get(endpoint);
};

export const productsUpdateService = (categoryId, product) => {
  const endpoint = `${apiUrl}/categories/${categoryId}/products/${product.id}`;
  return axios.patch(endpoint, product);
};

export const productsDeleteService = (categoryId, productId) => {
  const endpoint = `${apiUrl}/categories/${categoryId}/products/${productId}`;
  return axios.delete(endpoint);
};
