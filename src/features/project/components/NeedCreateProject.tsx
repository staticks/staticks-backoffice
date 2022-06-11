import { PlusCircleIcon } from '@heroicons/react/outline'
import { useNavigate } from 'react-router-dom'

const NeedCreateProject = () => {
  const navigate = useNavigate()
  return (
    <button
      tw="w-full h-[40vh] flex flex-col gap-4 items-center justify-center py-12 px-5 border-4 border-dotted border-gray-200 rounded-xl cursor-pointer hocus:bg-gray-50"
      onClick={() => {
        navigate('./create')
      }}
    >
      <PlusCircleIcon tw="w-12 text-blue-600" />
      <p tw="text-sm text-gray-600 text-center">
        등록된 프로젝트가 없습니다. <br /> 프로젝트를 추가하시겠습니까?
      </p>
    </button>
  )
}

export default NeedCreateProject
