import type { AxiosResponse } from 'axios'
import { useMutation, useQuery } from 'react-query'
import Axios from '@/utils/axiosUtil'
import { ProjectList, ProjectPayload } from '../types'
import { getToken } from '@/utils/storageUtil'
import toast from 'react-hot-toast'

export const ProjectService = {
  async getProjectMe(payload: ProjectPayload.Me) {
    const res: AxiosResponse<ProjectList> = await Axios.get('/project/me', {
      params: payload,
    })
    return res.data
  },
  async createProject(payload: ProjectPayload.Create) {
    return await Axios.post('/project', payload)
  },
}

export function useProjectService(payload: ProjectPayload.Me) {
  return useQuery(
    [
      'projects',
      'getProjectMe',
      `offset=${payload?.offset}`,
      `limit=${payload?.limit}`,
    ],
    () => ProjectService.getProjectMe(payload),
    {
      enabled: getToken() !== null,
      retry: false,
    },
  )
}

export function useCreateProject(
  payload: ProjectPayload.Create,
  onSuccess: () => void,
  onError: () => void,
) {
  const { status, data, mutate } = useMutation(
    ['projects', 'createProject'],
    () => ProjectService.createProject(payload),
    {
      onSuccess: () => {
        toast.success('프로젝트 생성 성공', {
          duration: 1000,
        })
        onSuccess && onSuccess()
      },
      onError: () => {
        toast.error('프로젝트 생성 실패', {
          duration: 1000,
        })
        onError && onError()
      },
    },
  )

  return {
    mutate,
    status,
    data,
  }
}
