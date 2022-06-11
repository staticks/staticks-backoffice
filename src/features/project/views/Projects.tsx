import { View, ViewPage } from '@/components/layout'
import PageHeader from '@/components/layout/Header'
import { useProjectService } from '../services'
import NeedCreateProject from '../components/NeedCreateProject'
import UserMenu from '@/features/user/components/UserMenu'
import { Link } from 'react-router-dom'
import { PlusCircleIcon } from '@heroicons/react/outline'
import ProjectItem from '../components/ProjectItem'

const ProjectTop = () => {
  return (
    <div tw="flex justify-end">
      <UserMenu />
    </div>
  )
}

const Projects = () => {
  const { data } = useProjectService({
    offset: 0,
    limit: 200,
  })

  return (
    <View type="full">
      <ViewPage tw="flex flex-col" topElement={<ProjectTop />}>
        <PageHeader tw="mb-10" title="프로젝트 리스트" />
        {data?.projects.length == 0 && <NeedCreateProject />}

        {data?.projects && data?.projects?.length > 0 && (
          <div tw="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.projects.map(project => (
              <ProjectItem project={project} key={project.id} />
            ))}
            <Link
              to={'/project/create'}
              tw="w-full h-[90px] border-2 border-dotted border-gray-300 flex justify-center items-center gap-2 hocus:bg-gray-50"
            >
              <PlusCircleIcon tw="w-6 text-blue-600" />
              <span tw="font-bold text-sm text-gray-600">프로젝트 생성</span>
            </Link>
          </div>
        )}
      </ViewPage>
    </View>
  )
}

export default Projects
