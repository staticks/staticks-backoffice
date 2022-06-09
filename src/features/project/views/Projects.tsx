import { View, ViewBox, ViewPage } from '@/components/layout'
import tw from 'twin.macro'
import { css } from '@emotion/react'
import PageHeader from '@/components/layout/Header'

const Projects = () => {
  return (
    <View>
      <ViewPage>
        <PageHeader hasBackButton title="프로젝트 리스트" />
      </ViewPage>
    </View>
  )
}

export default Projects
