import { AxiosResponse } from 'axios'
import { useQuery } from 'react-query'
import Axios from '../../../utils/axiosUtil'
import { Authentication, LoginPayload, LoginResponse } from '../types'

export const authService = {
  async login(payload: LoginPayload) {
    const res: AxiosResponse<LoginResponse> = await Axios.post('/auth/login', {
      accountId: payload.accountId,
      password: payload.password,
      authentication: Authentication.STATICKS,
    })

    return res.data
  },
}

function useAuthService(payload: LoginPayload | any) {
  const { data, error, isLoading, refetch } = useQuery(
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
    isLoading,
    refetch,
  }
}

export default useAuthService
