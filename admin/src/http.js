import axios from "axios";
import Vue from "vue";
import router from './router'
const http = axios.create({
  baseURL: process.env.VUE_APP_API_URL || '/admin/api',
  // baseURL: "http://localhost:3000/admin/api",
});

http.interceptors.request.use(
  function(config) {
    console.log('in request');
    if(localStorage.token){
      config.headers.Authorization = "Bearer " + localStorage.token;
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    if (error.response.data.message) {
      Vue.prototype.$message({
        type: "error",
        message: error.response.data.message,
      });
    }
    if(error.response.status===401){
      router.push('/login')
    }
    return Promise.reject(error);
  }
);

export default http;
