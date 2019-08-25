import axios from 'axios';

import { apiUrl } from '../utils';

export const categoriesRetrieveService = () => {
  const endpoint = `${apiUrl}/categories`;
  return axios.get(endpoint);
};
