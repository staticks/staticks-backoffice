import RoleBadge from '@/components/badge/RoleBadge'
import React from 'react'
import { MemberItem } from '../types'

interface ProjectMembersProps {
  members: MemberItem[]
}

const ProjectMembers: React.FC<ProjectMembersProps> = ({ members }) => {
  return (
    <div>
      <h1 tw="text-xl font-bold">프로젝트 멤버</h1>
      <ul tw="py-2">
        {members.map(member => (
          <li key={member?.id} tw="flex gap-2 items-center py-1 text-sm">
            <RoleBadge backgroundColor="#337389" roleName={member.role} />
            <span tw="text-gray-800 text-sm">{member?.name}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProjectMembers
