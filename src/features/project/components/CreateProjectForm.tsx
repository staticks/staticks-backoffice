import { Button, InputField } from '@/components/forms'
import RadioGroupField from '@/components/forms/RadioGroupField'
import { useForm } from 'react-hook-form'
import { QueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { ProjectType, ProjectTypeLabelMap } from '../constant'
import { useCreateProject } from '../services'
import { ProjectPayload } from '../types'

const CreateProjectForm: React.FC = () => {
  const navigate = useNavigate()
  const queryClient = new QueryClient()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ProjectPayload.Create>({
    mode: 'onSubmit',
    defaultValues: {
      name: '',
      description: '',
      type: ProjectType.PERSONAL,
    },
  })

  const { mutate: createProject } = useCreateProject(
    watch(),
    () => {
      queryClient.invalidateQueries(['projects', 'getProjectMe'])
      navigate('../')
    },
    () => {
      // do nothing...
    },
  )

  const onSubmit = (data: ProjectPayload.Create) => {
    createProject()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} tw="flex flex-col gap-4">
      <InputField
        id="name"
        type="text"
        label="프로젝트명"
        errors={errors}
        name="name"
        register={register('name', { required: '프로젝트명을 입력해주세요' })}
      />
      <InputField
        id="description"
        type="text"
        label="어떤 프로젝트 인가요?"
        errors={errors}
        name="name"
        register={register('description', {
          required: '프로젝트 설명을 입력해주세요',
        })}
      />
      <RadioGroupField
        options={[
          {
            value: ProjectType.PERSONAL,
            label: ProjectTypeLabelMap[ProjectType.PERSONAL],
          },
          {
            value: ProjectType.PROJECT,
            label: ProjectTypeLabelMap[ProjectType.PROJECT],
          },
        ]}
        label="프로젝트 종류"
        name="type"
        value={ProjectType.PROJECT}
        onChange={() => {}}
        errors={errors}
        register={register('type', {
          required: '프로젝트 종류를 선택해주세요',
        })}
      />
      <div>
        <Button tw="w-full" type="submit">
          추가하기
        </Button>
      </div>
    </form>
  )
}

export default CreateProjectForm
