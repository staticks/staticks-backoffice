import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input } from '../../../components/forms'
import useStore from '../../store'
import useAuthService from '../services'
import { InputField } from '@/components/forms'

const LoginForm: React.FC = () => {
  const setToken = useStore(state => state.setToken)

  // form state
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      accountId: '',
      password: '',
    },
  })

  // server state
  const { data, refetch } = useAuthService(watch())

  useEffect(() => {
    if (data?.token) {
      // 토큰이 있는 경우 저장
      setToken(data.token)
    }
  }, [data])

  // form submit
  const onSubmit = (data: any) => {
    refetch()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} tw="flex flex-col gap-4">
      <InputField
        id="accountId"
        type="email"
        label="이메일"
        errors={errors}
        name="accountId"
        register={register('accountId', {
          required: '이메일을 입력해주세요',
        })}
      />

      <InputField
        id="password"
        type="password"
        label="비밀번호"
        errors={errors}
        name="password"
        register={register('password', {
          required: '비밀번호를 입력해주세요',
        })}
      />

      <div>
        <Button tw="w-full hocus:bg-gray-800 hocus:text-white" type="submit">
          Login
        </Button>
      </div>
    </form>
  )
}

export default LoginForm
