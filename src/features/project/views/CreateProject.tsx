import { View, ViewBox } from '@/components/layout'
import PageHeader from '@/components/layout/Header'
import React from 'react'
import CreateProjectForm from '../components/CreateProjectForm'
const CreateProject: React.FC = () => {
  return (
    <View>
      <ViewBox tw="w-full max-w-[320px] flex flex-col gap-6">
        <PageHeader title="프로젝트 추가" />
        <CreateProjectForm />
      </ViewBox>
    </View>
  )
}

export default CreateProject
