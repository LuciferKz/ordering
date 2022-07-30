// import Vue from 'vue'
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import store from "@/store";
import $cookie from "./cookie";
import { ElMessage } from "element-plus";

const BASE_URL: any = "http://www.zhangzhenkai.com/ordering/api/api/v1";

// create an axios instance
const service: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 60 * 1000, // request timeout
});

// request interceptor
service.interceptors.request.use(
  (config) => {
    config.headers["Content-Type"] =
      config.headers["Content-Type"] || "application/json";

    config.headers["token"] = $cookie.get("token");
    return config;
  },
  (error) => {
    // do something with request error
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  (response) => {
    if (response.data.code === 403) {
      if ($cookie.get("token")) {
        ElMessage.error(response.data.msg);
        store.dispatch("logout");
      }
    }
    // store.dispatch('closeLoading')
    return response.data;
  },
  (error) => {
    ElMessage.error("网络错误");
    return Promise.reject(error);
  }
);

const request = function (config: any) {
  const cfg: AxiosRequestConfig = config;
  return service(cfg);
};

// Vue.prototype.$request = service
export default request;
