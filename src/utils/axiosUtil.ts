import axios, { AxiosRequestConfig } from 'axios'
import { getToken } from './storageUtil'
// interceptor 구성
// 요청 전에 실행

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_HOST,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use(
  (config: any) => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error: any) => {
    return Promise.reject(error)
  },
)

axiosInstance.interceptors.response.use(
  (response: any) => {
    return response
  },
  (error: any) => {
    return Promise.reject(error)
  },
)

export default axiosInstance
