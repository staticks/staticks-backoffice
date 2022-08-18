import { View, ViewPage } from '@/components/layout'
import UserMenu from '@/features/user/components/UserMenu'
import { useParams } from 'react-router-dom'
import useStore from '@/store/index'
import { useProjectMembersService, useProjectTokenService } from '../services'
import { useEffect } from 'react'
import ProjectMembers from '../components/ProjectMembers'

const ProjectTop = () => {
  return (
    <div tw="flex justify-end">
      <UserMenu />
    </div>
  )
}

const ProjectDashBoard = () => {
  const { projectId } = useParams()

  const { data, isLoading } = useProjectTokenService(Number(projectId))
  const setCurrentProjectId = useStore(state => state.setCurrentProjectId)
  const setApplicationToken = useStore(state => state.setApplicationToken)
  const getProjectToken = useStore(state => state.getProjectToken)

  useEffect(() => {
    if (!getProjectToken(Number(projectId))) {
      setCurrentProjectId(Number(projectId))
    }
  }, [projectId])

  useEffect(() => {
    // 프로젝트 Id 와 토큰의 값을 매칭하기위한 해시맵
    const map: { [projectId: number]: string } = {}

    // 응답이 정상이고, 토큰값이 존재하면 해시맵에 저장한다.
    if (data?.token) {
      // 프로젝트 토큰 저장
      map[Number(projectId)] = data.token
      setApplicationToken(map)
    }
  }, [data])

  const { data: members } = useProjectMembersService(Number(projectId), {
    offset: 0,
    limit: 200,
  })

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
