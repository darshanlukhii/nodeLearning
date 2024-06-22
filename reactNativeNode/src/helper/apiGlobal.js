// import axios from 'axios';
// export const makeAPIRequest = ({method, url, data, params}) =>
//   new Promise(async (resolve, reject) => {
//     const apiHeader = {
//       //   Authorization: `Bearer ${access_token}`,
//       //   'Content-Type': 'application/json',
//       //   Accept: 'application/json',
//     };
//     const base_url = 'http://192.168.29.26:3000/';
//     const option = {
//       method,
//       url: base_url + url,
//       data,
//       params,
//       headers: apiHeader,
//     };
//     axios(option)
//       .then(response => {
//         if (response.status === 200) {
//           resolve(response);
//         } else if (response.status === 401) {
//           //           errorMessage({
//           //             message: response?.data?.message,
//           //           });
//           //           setTimeout(() => {
//           //             commonActions("Auth");
//           //           }, 1600);
//         } else if (response.status >= 501 || response.status <= 599) {
//           //           errorMessage({
//           //             message: strings.something_went_wrong,
//           //           });
//         } else {
//           reject(response);
//         }
//       })
//       .catch(error => {
//         reject(error?.response);
//         //         errorMessage({
//         //           message: error?.response?.data?.message || error?.message,
//         //         });
//         if (error?.response?.data?.status === 401) {
//           //           AsyncStorage.clear();
//           //           setTimeout(() => {
//           //             commonActions("Auth");
//           //           }, 1600);
//         }
//         if (
//           error?.response?.data?.status >= 501 ||
//           error?.response?.data?.status <= 599
//         ) {
//           //           errorMessage({
//           //             message: strings.something_went_wrong,
//           //           });
//         }
//         console.log('error in call', error);
//       });
//   });

import axios, {Method, AxiosRequestConfig, AxiosResponse} from 'axios';
// import {getEnvVars} from './config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {USER_TOKEN} from '../redux/types';
import ToastAlert from '../components/ToastAlert';

export const makeAPIRequest = async props => {
  const {method, url, data, headers = {}, params, ignoreError} = props;

  const base_url = 'http://192.168.1.2:3000/';

  let header = {
    // 'Content-Type': 'application/json',
    // Accept: 'application/json',
    // Authorization: JSON.parse(userToken) || null,
    // ...headers,
  };

  return new Promise((resolve, reject) => {
    const options = {
      method: method,
      url: base_url + url,
      data: data,
      headers: header,
      params: params,
    };
    axios(options)
      .then(response => {
        if (response.status === 200 || response.status === 201) {
          resolve(response.data);
        } else {
          reject(response?.data);
        }
      })
      .catch(error => {
        if (ignoreError) {
          reject();
        } else {
          console.log('error API', error);
          ToastAlert({
            title: error?.response?.data?.message,
            toastType: 'error',
          });
          reject(error?.response?.data);
        }

        if (axios.isCancel(error)) {
          console.log('Request canceled:', error.message);
        } else {
          console.log('Error:', error?.message);
        }
      });
  });
};
