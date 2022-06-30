// import Vue from 'vue'
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import store from '@/store'
import $cookie from './cookie'
import { ElMessage } from 'element-plus'

const BASE_URL: any = import.meta.env.VITE_BASE_URL
const MODULE_URL_MAP: any = {
  LOYALTY: import.meta.env.VITE_APP_LOYALTY_API,
  MARKETING: import.meta.env.VITE_APP_MARKETING_API,
  MESSAGE: import.meta.env.VITE_APP_MESSAGE_API,
  CUSTOMER: import.meta.env.VITE_APP_CUSTOMER_API,
  BSYS_CUSTOMER: import.meta.env.VITE_APP_BSYS_CUSTOMER_API,
  SYSTEM: import.meta.env.VITE_APP_SYSTEM_API,
  CAMPAIGN: import.meta.env.VITE_APP_CAMPAIGN_API,
  SEGMENT: import.meta.env.VITE_APP_SEGMENT_API,
  TAGS: import.meta.env.VITE_APP_TAGS_API,
  XXLJOB: import.meta.env.VITE_APP_XXLJOB_API,
  DATAFLOW: import.meta.env.VITE_APP_DATAFLOW_API,
  BSYS_CHANNEL: import.meta.env.VITE_APP_BSYS_API
}
// create an axios instance
const service: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 60 * 1000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // store.dispatch('openLoading')
    config.headers['Content-Type'] = config.headers['Content-Type'] || 'application/json'
    // B 系统使用 Authorization 校验
    // const system_type = import.meta.env.VITE_APP_SISTEM_TYPE
    const loginUrls = ['/bsys/login', '/system/login']
    if ($cookie.get('token') && !loginUrls.find(url => url === config.url)) {
      config.headers['Authorization'] = `Bearer ${$cookie.get('token')}`
    }
    config.headers['tenantCode'] = 'arvato'
    config.headers['lang'] = localStorage.getItem('locale')
    // config.headers['programCode'] = 'arvato'
    config.headers['tenantId'] = $cookie.get('tenantId')
    if (!loginUrls.find(url => url === config.url)) {
      config.headers['token'] = $cookie.get('token')
    }
    //
    // config.headers['token'] =
    //   'eyJhbGciOiJIUzUxMiJ9.eyJwcm9ncmFtQ29kZSI6ImFydmF0byIsInRlbmFudENvZGUiOiJhcnZhdG8iLCJ1c2VyVHlwZSI6IkFETUlOIiwidXNlck5hbWUiOiJhZG1pbiIsImV4cCI6MTYzNzk4MTQ3NiwibG9naW5EaXJlY3Rpb24iOiJTWVNURU0ifQ.XMeRQbsFPxakUxM8lJhyl2bC3HDZndTMXMf30Md3OdcDRUN_nI9ONw6Jb6DN8s8AcQF7IkHmuPYu098GH-3FeA'
    return config
  },
  error => {
    // do something with request error
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    if (response.data.code === 403) {
      if ($cookie.get('token')) {
        ElMessage.error(response.data.msg)
        store.dispatch('logout')
      }
    }
    // store.dispatch('closeLoading')
    return response.data
  },
  error => {
    ElMessage.error('网络错误')
    return Promise.reject(error)
  }
)

const request = function (config: any) {
  const cfg: AxiosRequestConfig = config
  return service(cfg)
}

export const useModuleUrl = function (name: string, urls: any) {
  Object.keys(urls).forEach(key => {
    urls[key].url = `${MODULE_URL_MAP[name]}${urls[key].url}`
  })
  return urls
}

// Vue.prototype.$request = service
export default request
