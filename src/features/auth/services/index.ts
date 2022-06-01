import { AxiosResponse } from 'axios'
import { useQuery } from 'react-query'
import Axios from '../../../utils/axiosUtil'

interface LoginPayload {
  accountId: string
  password: string
  authentication: string
}

interface LoginResponse {
  type: string
  token: string
}

export const authService = {
  async login(payload: LoginPayload) {
    const res: AxiosResponse<LoginResponse> = await Axios.post('/auth/login', {
      accountId: payload.accountId,
      password: payload.password,
      authentication: 'STATICKS',
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
      enabled: !!payload.accountId && !!payload.password,
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
