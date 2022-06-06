import { AxiosResponse } from 'axios'
import { useQuery } from 'react-query'
import Axios from '../../../utils/axiosUtil'
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

export function useLoginService(payload: LoginPayload | any) {
  const { data, status, error, isLoading, refetch } = useQuery(
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
