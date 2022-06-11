import { Link } from 'react-router-dom'
import { Project } from '../types'

const ProjectItem: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <Link
      to={'/project/' + project.id}
      key={project.id}
      tw="w-full h-[90px] border border-gray-300 rounded p-4 hocus:bg-gray-50"
    >
      <dl tw="flex flex-col gap-2">
        <dt tw="w-full font-bold text-xl text-gray-800 overflow-hidden truncate">
          {project.name}
        </dt>
        <dd tw="text-sm text-gray-400">{project.description}</dd>
      </dl>
    </Link>
  )
}

export default ProjectItem
