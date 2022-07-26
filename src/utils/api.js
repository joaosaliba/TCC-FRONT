import Vue from "vue";

import axios from "axios";

let baseURL = process.env.VUE_APP_ENDPOINT;

const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use(
  function(config) {
    const token = window.localStorage.token;
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  function erro(erro) {
    return Promise.reject(erro);
  }
);

export const api = {
  get(endpoint) {
    return axiosInstance.get(endpoint);
  },
  post(endpoint, body) {
    return axiosInstance.post(endpoint, body);
  },
  patch(endpoint, body) {
    return axiosInstance.patch(endpoint, body);
  },
  put(endpoint, body) {
    return axiosInstance.put(endpoint, body);
  },
  delete(endpoint) {
    return axiosInstance.delete(endpoint);
  },
  login(body) {
    return axiosInstance.post("api-token-auth/", body);
  },
  logout(body) {
    return axiosInstance.post("api-auth/logout/", body);
  },
};

Vue.use({
  install(Vue) {
    Vue.prototype.$api = api;
  },
});
