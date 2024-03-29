import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { getProjectToken, getToken } from './storageUtil'
import toast from 'react-hot-toast'
import useStore from '@/store'
// interceptor 구성
// 요청 전에 실행

export interface ErrorResponse {
  error: string
  message: string
  statusCode: number
}

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_HOST,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use(
  (config: any) => {
    const token = getToken()
    const projectToken = getProjectToken()

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    if (projectToken) {
      config.headers.Application = `${projectToken}`
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
  (error: AxiosError<ErrorResponse>) => {
    return Promise.reject(error)
  },
)

export default axiosInstance
