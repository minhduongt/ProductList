import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

// ----------------------------------------------------------------------

interface Params {
  [key: string]: string | number | boolean | string[] | number[] | boolean[];
}

const parseParams = (params: Params): string => {
  const keys = Object.keys(params);
  let options = "";

  keys.forEach((key) => {
    const isParamTypeObject = typeof params[key] === "object";
    const isParamTypeArray =
      isParamTypeObject &&
      Array.isArray(params[key]) &&
      (params[key] as (string | number | boolean)[]).length >= 0;

    if (!isParamTypeObject) {
      options += `${key}=${params[key]}&`;
    }

    if (isParamTypeObject && isParamTypeArray) {
      (params[key] as (string | number | boolean)[]).forEach((element) => {
        options += `${key}=${element}&`;
      });
    }
  });

  return options ? options.slice(0, -1) : options;
};
const request: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  paramsSerializer: (params) => parseParams(params as Params),
});

request.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || "Error")
);

const AUTHORIZATION = "Authorization";

function _createAuthInterceptor(token: string) {
  return (requestConfig: InternalAxiosRequestConfig) => {
    requestConfig.headers = requestConfig.headers ?? {};
    requestConfig.headers[AUTHORIZATION] = `Bearer ${token}`;
    return requestConfig;
  };
}

function setAuthorizationHeader(token: string) {
  request.interceptors.request.use(_createAuthInterceptor(token));
}

export { request, setAuthorizationHeader };
