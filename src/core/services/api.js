import axios from 'axios';
import {BASE_URL_ADMIN} from '../../configs/baseUrl';

const clientAdmin = axios.create();

clientAdmin.interceptors.request.use(
  async (config) => {
    config.baseURL = BASE_URL_ADMIN;

    return config;
  },
  (error) => Promise.reject(error),
);

clientAdmin.interceptors.response.use(
  function (response) {
    try {
      console.log('response', response?.data);
      return response?.data;
    } catch (error) {
      throw error;
    }
  },
  function (error) {
    throw error;
  },
);

export const getAdmin = async () => await clientAdmin.get('admin');

export const createResident = async (data) =>
  await clientAdmin.post('residential', data);

export const searchByPeopleCode = async (field, string) =>
  await clientAdmin.get(`residential?${field}=${string}`);

export const createHousehold = async (data) =>
  await clientAdmin.post('household', data);
