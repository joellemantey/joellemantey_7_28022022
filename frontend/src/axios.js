// Configuration global axios pour stocker le TOKEN//

import originalAxios from 'axios';

const axios = originalAxios.create({
  baseURL: 'http://localhost:3000/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getToken = () => {
  const token = localStorage.getItem('token');

  if (token) {
    // eslint-disable-next-line no-param-reassign
    return `Bearer ${token}`;
  }

  return null;
};

/*
 * L'intercepteur permet d'ajouter le token pour chaque request
 */
axios.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (token) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = token;
    }

    return config;
  },

  (error) => Promise.reject(error),
);

export default axios;
