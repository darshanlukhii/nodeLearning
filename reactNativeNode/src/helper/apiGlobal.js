import axios from 'axios';
export const makeAPIRequest = ({method, url, data, params}) =>
  new Promise(async (resolve, reject) => {
    const apiHeader = {
      //   Authorization: `Bearer ${access_token}`,
      //   'Content-Type': 'application/json',
      //   Accept: 'application/json',
    };
    const base_url = 'http://192.168.29.26:3000/';
    // const base_url = 'http://192.168.29.26:8000/';
    const option = {
      method,
      url: base_url + url,
      data,
      params,
      headers: apiHeader,
    };
    axios(option)
      .then(response => {
        if (response.status === 200) {
          resolve(response);
        } else if (response.status === 401) {
          //           errorMessage({
          //             message: response?.data?.message,
          //           });
          //           setTimeout(() => {
          //             commonActions("Auth");
          //           }, 1600);
        } else if (response.status >= 501 || response.status <= 599) {
          //           errorMessage({
          //             message: strings.something_went_wrong,
          //           });
        } else {
          reject(response);
        }
      })
      .catch(error => {
        reject(error?.response);
        //         errorMessage({
        //           message: error?.response?.data?.message || error?.message,
        //         });
        if (error?.response?.data?.status === 401) {
          //           AsyncStorage.clear();
          //           setTimeout(() => {
          //             commonActions("Auth");
          //           }, 1600);
        }
        if (
          error?.response?.data?.status >= 501 ||
          error?.response?.data?.status <= 599
        ) {
          //           errorMessage({
          //             message: strings.something_went_wrong,
          //           });
        }
        console.log('error in call', error);
      });
  });
