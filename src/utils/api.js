import Vue from "vue";

import axios from "axios";

let baseURL = process.env.VUE_APP_ENDPOINT;

const api = axios.create({
  baseURL,
});

api.interceptors.request.use(
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
api.all = axios.all;
api.spread = axios.spread;

api.login = (body) => {
  return api.post("api-token-auth/", body);
};
api.logout = (body) => {
  return api.post("logout_token/", body);
};

Vue.use({
  install(Vue) {
    Vue.prototype.$api = api;
  },
});

export default api;
