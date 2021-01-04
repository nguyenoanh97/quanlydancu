import axios from 'axios';
import {BASE_URL_ADMIN} from '../../configs/baseUrl';
import {toast} from '../utils/funtions';

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

export const searchImageById = async (field, string) =>
  await clientAdmin.get(`image?${field}=${string}`);

export const getImage = async () => await clientAdmin.get('image');

// const onBlur = () => {
//   if (text !== '') {
//     setLoadingSearch(true);
//     searchByPeopleCode('peopleCode', text)
//       .then((value) => {
//         if (value.length > 0) {
//           searchImageById('imageId', value[0].imageId)
//             .then((valueImage) => {
//               if (valueImage.length > 0) {
//                 setDataSearch({...value[0], ...valueImage[0]});
//               } else {
//                 setDataSearch(value[0]);
//               }
//             })
//             .catch((e) => {
//               toast(`Xảy ra lỗi: ${e}`, 'danger');
//               console.error(e);
//             })
//             .finally(() => {
//               setLoadingSearch(false);
//             });
//         } else {
//           setLoadingSearch(false);
//         }
//       })
//       .catch((e) => {
//         toast(`Xảy ra lỗi: ${e}`, 'danger');
//         setLoadingSearch(false);
//         console.error(e);
//       });
//   }
// };
