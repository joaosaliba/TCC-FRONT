import Vue from 'vue'

import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: "http://localhost:8040/",
    // withCredentials: true
})

axiosInstance.interceptors.request.use(
    function(config){
        const token = window.localStorage.token
        if(token){
            config.headers.Authorization = token
        }
        return config
    },
    function erro(erro){
        return Promise.reject(erro);
    }
)

export const api={
    get(endpoint){
        return axiosInstance.get(endpoint)
    },
    post(endpoint,body){
        return axiosInstance.post(endpoint,body)
    },
    patch(endpoint,body){
        return axiosInstance.patch(endpoint,body)
    },
    put(endpoint,body){
        return axiosInstance.put(endpoint,body)
    },
    delete(endpoint){
        return axiosInstance.post(endpoint)
    },
    login(body){
        return axiosInstance.post("api-token-auth/",body)
    }


}

Vue.use({
    install(Vue) {
      Vue.prototype.$api = api;
    }
  });