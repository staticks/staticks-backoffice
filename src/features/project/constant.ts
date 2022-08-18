export enum ProjectType {
  PERSONAL = 'PERSONAL',
  PROJECT = 'PROJECT',
}

export const ProjectTypeLabelMap: {
  [key in ProjectType]: string
} = {
  PERSONAL: '개인용',
  PROJECT: '프로젝트',
}

export enum UserRole {
  ADMIN = 'ADMIN',
}
