import axios from 'axios';
import {BASE_URL_ADMIN, BASE_URL_ADDRESS} from '../../configs/baseUrl';

const clientAdmin = axios.create();

const clientAddress = axios.create();

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

clientAddress.interceptors.request.use(
  async (config) => {
    config.baseURL = BASE_URL_ADDRESS;

    return config;
  },
  (error) => Promise.reject(error),
);

clientAddress.interceptors.response.use(
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

export const getImage = async () => await clientAdmin.get('image');

export const editResident = async (data) =>
  await clientAdmin.put(`residential/${data?.id}`, data);

export const searchByHousehold = async (field, string) =>
  await clientAdmin.get(`household?${field}=${string}`);

export const getAdminByRank = async (field, string) =>
  await clientAdmin.get(`admin?${field}=${string}`);

export const updateAdmin = async (data) =>
  await clientAdmin.put(`admin/${data.id}`, data);

export const getAdminById = async (field, string) =>
  await clientAdmin.get(`admin?${field}=${string}`);

export const getCity = async () => await clientAddress.get('city');

export const getDistrict = async (field, string) =>
  await clientAddress.get(`district?${field}=${string}`);

export const getWard = async (field, string) =>
  await clientAddress.get(`ward?${field}=${string}`);
