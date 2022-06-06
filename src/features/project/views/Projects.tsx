import { View, ViewBox } from '@/components/layout'
import { Link } from 'react-router-dom'
import { ExclamationCircleIcon } from '@heroicons/react/solid'

const Projects = () => {
  return (
    <View>
      <ViewBox>
        <ExclamationCircleIcon tw="w-10 text-blue-600 mx-auto mb-4" />
        <p tw="text-center">준비중입니다...</p>
      </ViewBox>
    </View>
  )
}

export default Projects
