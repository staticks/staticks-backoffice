import type { AxiosResponse } from 'axios'
import { useQuery } from 'react-query'
import Axios from '@/utils/axiosUtil'
import { User } from '../types'
import { getToken } from '@/utils/storageUtil'

export const userService = {
  async getUser() {
    const res: AxiosResponse<User> = await Axios.get('/user')
    return res.data
  },
}

export function useUserService() {
  return useQuery(['user'], () => userService.getUser(), {
    enabled: getToken() !== null,
  })
}
