import type { AxiosResponse } from 'axios'
import { useMutation, useQuery } from 'react-query'
import Axios from '@/utils/axiosUtil'
import { MemberItem, ProjectList, ProjectPayload } from '../types'
import { getToken } from '@/utils/storageUtil'
import toast from 'react-hot-toast'
import useStore from '@/store'

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
  async getProjectToken(projectId: number) {
    const res: AxiosResponse<{
      token: string
    }> = await Axios.get(`/project/${projectId}/token`)
    return res.data
  },
  async getProjectMembers(payload: ProjectPayload.Members) {
    const res: AxiosResponse<MemberItem[]> = await Axios.get(
      '/project/members',
      {
        params: payload,
      },
    )
    return res.data
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

export function useProjectTokenService(projectId: number) {
  const getProjectToken = useStore(state => state.getProjectToken)

  return useQuery(
    ['projects', 'getProjectToken', projectId],
    () => ProjectService.getProjectToken(projectId),
    {
      enabled: getToken() !== null && !getProjectToken(projectId),
      retry: false,
      staleTime: Infinity,
    },
  )
}

export function useProjectMembersService(
  projectId: number,
  payload: ProjectPayload.Members,
) {
  const getProjectToken = useStore(state => state.getProjectToken)
  return useQuery(
    [
      'projects',
      'getProjectMembers',
      `projectId=${projectId}`,
      `offset=${payload?.offset}`,
      `limit=${payload?.limit}`,
    ],
    () => ProjectService.getProjectMembers(payload),
    {
      enabled: getToken() !== null && !!getProjectToken(projectId),
      keepPreviousData: true,
      retry: false,
    },
  )
}
