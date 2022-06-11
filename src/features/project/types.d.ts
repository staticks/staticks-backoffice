import { ProjectType } from './constant'

export interface ProjectList {
  projects: Project[]
}

export interface Project {
  id: number
  name: string
  description: string
  createdAt: string
  type: ProjectType
}

export module ProjectPayload {
  type Me = {
    offset?: number
    limit?: number
  }
  type Create = {
    name: string
    description: string
    type: ProjectType
  }
}
