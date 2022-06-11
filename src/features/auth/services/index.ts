import type { AxiosError, AxiosResponse } from 'axios'
import { useQuery } from 'react-query'
import toast from 'react-hot-toast'
import Axios, { ErrorResponse } from '@/utils/axiosUtil'
import {
  Authentication,
  LoginPayload,
  LoginResponse,
  SinupPayload,
} from '../types'

export const authService = {
  async login(payload: LoginPayload) {
    const res: AxiosResponse<LoginResponse> = await Axios.post('/auth/login', {
      accountId: payload.accountId,
      password: payload.password,
      authentication: Authentication.STATICKS,
    })

    return res.data
  },
  async signup(payload: SinupPayload) {
    const res: AxiosResponse<LoginResponse> = await Axios.post('/auth', {
      email: payload.email,
      password: payload.password,
      name: payload.name,
    })

    return res.data
  },
}

export function useLoginService(
  payload: LoginPayload | any,
  onSuccess: (data: LoginResponse) => void,
  onError: (error: AxiosError<ErrorResponse>) => void,
) {
  return useQuery<LoginResponse, AxiosError<ErrorResponse>>(
    [
      'auth',
      'login',
      `accountId=${payload.accountId}`,
      `password=${payload.password}`,
    ],
    () => authService.login(payload),
    {
      enabled: false,
      staleTime: Infinity,
      retry: false,
      onSuccess: data => {
        toast.success('로그인 성공', {
          duration: 1000,
        })
        onSuccess && onSuccess(data)
      },
      onError: data => {
        toast.error(data.response?.data.message || '로그인 실패', {
          duration: 1000,
        })
        onError && onError(data)
      },
    },
  )
}

export function useSignupService(payload: SinupPayload) {
  const { data, status, error, isLoading, refetch } = useQuery(
    [
      'auth',
      'signup',
      `email=${payload.email}`,
      `password=${payload.password}`,
      `name=${payload.name}`,
    ],
    () => authService.signup(payload),
    {
      enabled: false,
      staleTime: Infinity,
      retry: false,
      onSuccess: data => {
        toast.success('회원가입 성공', {
          duration: 1000,
        })
      },
      onError: data => {
        toast.error('회원가입 실패', {
          duration: 1000,
        })
      },
    },
  )
  return {
    data,
    error,
    status,
    isLoading,
    refetch,
  }
}
