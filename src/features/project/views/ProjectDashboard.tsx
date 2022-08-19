import { View, ViewPage } from '@/components/layout'
import UserMenu from '@/features/user/components/UserMenu'
import { useParams } from 'react-router-dom'
import useStore from '@/store/index'
import { useProjectMembersService, useProjectTokenService } from '../services'
import { useEffect } from 'react'
import ProjectMembers from '../components/ProjectMembers'
import toast from 'react-hot-toast'

const ProjectTop = () => {
  return (
    <div tw="flex justify-end">
      <UserMenu />
    </div>
  )
}

const ProjectDashBoard = () => {
  const { projectId } = useParams()

  const { data } = useProjectTokenService(Number(projectId))

  const setCurrentProjectId = useStore(state => state.setCurrentProjectId)
  const setApplicationToken = useStore(state => state.setApplicationToken)
  const getProjectToken = useStore(state => state.getProjectToken)

  const {
    data: members,
    refetch: refetchProjectMembers,
    isError,
  } = useProjectMembersService(Number(projectId), {
    offset: 0,
    limit: 200,
  })

  useEffect(() => {
    if (!getProjectToken(Number(projectId))) {
      setCurrentProjectId(Number(projectId))
    }
  }, [projectId])

  useEffect(() => {
    const projectToken = data?.token

    if (!projectToken) {
      // 응답이 정상이 아닌 경우에는 에러 메시지를 보여준다.
      isError && toast.error('프로젝트 토큰을 가져오는데 실패했습니다.')
      return
    }

    // 프로젝트 Id 와 토큰의 값을 매칭하기위한 해시맵
    const map: { [projectId: number]: string } = {}

    // 응답이 정상이고, 토큰값이 존재하면 해시맵에 저장한다.
    // 프로젝트 토큰 저장
    map[Number(projectId)] = projectToken
    setApplicationToken(map)
    refetchProjectMembers()
  }, [data?.token])

  return (
    <View type="full">
      <ViewPage topElement={<ProjectTop />}>
        {/* 멤버리스트 */}
        {members && <ProjectMembers members={members} />}
      </ViewPage>
    </View>
  )
}

export default ProjectDashBoard
