import axios from "axios";
import { createAxios } from "../../config/xhr/axios";
import { AXIOS_INITIAL_VALUE } from "../../variables/initial/axios";
import { GET, POST } from "../../variables/global";

// get data without parameter
export const useAxios = () => {
  const getData = async (reqConfig) => {
    // creates the cancel token source
    var cancelSource = axios.CancelToken.source();
    // Start timing now
    console.time("Load Time");
    return new Promise(async (resolve, reject) => {
      // Initial Value
      var result = { ...AXIOS_INITIAL_VALUE };
      await createAxios(reqConfig.endpoint)({
        method: GET,
        headers: reqConfig.headers,
        url: reqConfig.url,
        params: reqConfig.params,
        cancelToken: cancelSource.token,
      })
        .then((response) => {
          result.responseData = response.data;
          result.responseStatus = response.status;
          console.timeEnd("Load Time");
          resolve(result);
        })
        .catch((error) => {
          result.responseError = true;
          if (error.response) {
            if (axios.isCancel(error))
              return cancelSource.cancel();
            result.errorContent = error.response.data;
            result.responseStatus = error.response.status;
          } else result.responseStatus = 500;
          console.timeEnd("Load Time");
          reject(result);
        });
    });
  };

  const getDataWithOnRequestInterceptors = async (
    reqConfig,
    callbackInterceptors
  ) => {
    // creates the cancel token source
    var cancelSource = axios.CancelToken.source();
    // Start timing now
    console.time("Load Time");
    return new Promise(async (resolve, reject) => {
      // Initial Value
      var result = { ...AXIOS_INITIAL_VALUE };

      const axiosInstance = createAxios(reqConfig.endpoint);
      axiosInstance.interceptors.request.use(
        async function (config) {
          const res = await callbackInterceptors();
          if (res.responseStatus === 200) return config;
          else {
            result.responseError = true;
            result.errorContent = res.message;
            result.responseStatus = res.responseStatus;
            console.timeEnd("Load Time");
            return reject(result);
          }
        },
        function (error) {
          result.responseError = true;
          result.errorContent = error.toString();
          result.responseStatus = 500;
          console.timeEnd("Load Time");
          return reject(result);
        }
      );

      await axiosInstance({
        method: GET,
        headers: reqConfig.headers,
        url: reqConfig.url,
        params: reqConfig.params,
        cancelToken: cancelSource.token,
      })
        .then((response) => {
          result.responseData = response.data;
          result.responseStatus = response.status;
          console.timeEnd("Load Time");
          resolve(result);
        })
        .catch((error) => {
          result.responseError = true;
          if (error.response) {
            if (axios.isCancel(error))
              return cancelSource.cancel();
            result.errorContent = error.response.data;
            result.responseStatus = error.response.status;
          } else result.responseStatus = 500;
          console.timeEnd("Load Time");
          reject(result);
        });
    });
  };

  const getAllData = async (reqConfigs) => {
    // Start timing now
    console.time("Load Time");
    return new Promise(async (resolve, reject) => {
      // Initial Value
      var result = { ...AXIOS_INITIAL_VALUE };

      const axiosInstance = axios;
      await axiosInstance
        .all(
          reqConfigs.map((reqConfig) => getData(reqConfig))
        )
        .then(
          axiosInstance.spread((...datas) => {
            return resolve({
              ...result,
              responseStatus: 200,
              responseData: datas,
            });
          })
        )
        .catch((error) => {
          return reject(error);
        })
        .finally(() => {
          console.timeEnd("Load Time");
        });
    });
  };

  const getAllDataWithOnRequestInterceptors = async (
    reqConfigs,
    callbackInterceptors
  ) => {
    // Start timing now
    console.time("Load Time");
    return new Promise(async (resolve, reject) => {
      // Initial Value
      var result = { ...AXIOS_INITIAL_VALUE };

      const axiosInstance = axios;
      axiosInstance.interceptors.request.use(
        async function (config) {
          const res = await callbackInterceptors();
          if (res.responseStatus === 200) return config;
          else {
            result.responseError = true;
            result.errorContent = res.message;
            result.responseStatus = res.responseStatus;
            console.timeEnd("Load Time");
            return reject(result);
          }
        },
        function (error) {
          result.responseError = true;
          result.errorContent = error.toString();
          result.responseStatus = 500;
          console.timeEnd("Load Time");
          return reject(result);
        }
      );

      await axiosInstance
        .all(
          reqConfigs.map((reqConfig) => getData(reqConfig))
        )
        .then(
          axiosInstance.spread((...datas) => {
            return resolve({
              ...result,
              responseStatus: 200,
              responseData: datas,
            });
          })
        )
        .catch((error) => {
          return reject(error);
        })
        .finally(() => {
          console.timeEnd("Load Time");
        });
    });
  };

  const postData = async (reqConfig) => {
    // creates the cancel token source
    var cancelSource = axios.CancelToken.source();
    // Start timing now
    console.time("Load Time");
    return new Promise(async (resolve, reject) => {
      // Initial Value
      var result = { ...AXIOS_INITIAL_VALUE };
      await createAxios(reqConfig.endpoint)({
        method: POST,
        headers: reqConfig.headers,
        url: reqConfig.url,
        data: reqConfig.data,
        cancelToken: cancelSource.token,
      })
        .then((response) => {
          result.responseData = response.data;
          result.responseStatus = response.status;
          console.timeEnd("Load Time");
          resolve(result);
        })
        .catch((error) => {
          result.responseError = true;
          if (error.response) {
            if (axios.isCancel(error))
              return cancelSource.cancel();
            result.errorContent = error.response.data;
            result.responseStatus = error.response.status;
          } else result.responseStatus = 500;
          console.timeEnd("Load Time");
          reject(result);
        });
    });
  };

  const postDataWithOnRequestInterceptors = async (
    reqConfig,
    callbackInterceptors
  ) => {
    // creates the cancel token source
    var cancelSource = axios.CancelToken.source();
    // Start timing now
    console.time("Load Time");
    return new Promise(async (resolve, reject) => {
      // Initial Value
      var result = { ...AXIOS_INITIAL_VALUE };

      const axiosInstance = createAxios(reqConfig.endpoint);
      axiosInstance.interceptors.request.use(
        async function (config) {
          const res = await callbackInterceptors();
          if (res.responseStatus === 200) return config;
          else {
            result.responseError = true;
            result.errorContent = res.message;
            result.responseStatus = res.responseStatus;
            return reject(result);
          }
        },
        function (error) {
          result.responseError = true;
          result.errorContent = error.toString();
          result.responseStatus = 500;
          return reject(result);
        }
      );

      await axiosInstance({
        method: POST,
        headers: reqConfig.headers,
        url: reqConfig.url,
        data: reqConfig.data,
        cancelToken: cancelSource.token,
      })
        .then((response) => {
          result.responseData = response.data;
          result.responseStatus = response.status;
          console.timeEnd("Load Time");
          resolve(result);
        })
        .catch((error) => {
          result.responseError = true;
          if (error.response) {
            if (axios.isCancel(error))
              return cancelSource.cancel();
            result.errorContent = error.response.data;
            result.responseStatus = error.response.status;
          } else result.responseStatus = 500;
          console.timeEnd("Load Time");
          reject(result);
        });
    });
  };

  return {
    getData,
    getAllData,
    getDataWithOnRequestInterceptors,
    getAllDataWithOnRequestInterceptors,
    postData,
    postDataWithOnRequestInterceptors,
  };
};
