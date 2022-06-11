import React from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '../../../components/forms'
import useStore from '../../../store'
import { useLoginService } from '../services'
import { InputField } from '@/components/forms'
import { useNavigate } from 'react-router-dom'
import { LoginResponse } from '../types'
import { AxiosError } from 'axios'
import { ErrorResponse } from '@/utils/axiosUtil'

const LoginForm: React.FC = () => {
  const navigate = useNavigate()
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

  // 로그인 성공 시 처리
  const onLoginSuccess = (data: LoginResponse) => {
    setToken(data.token)
    navigate('/project')
  }

  // 로그인 실패시 처리
  const onLoginFailure = (error: AxiosError<ErrorResponse>) => {
    const message = error?.response?.data.message
    // do nothing...
  }

  const { refetch } = useLoginService(watch(), onLoginSuccess, onLoginFailure)

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
        <Button tw="w-full" type="submit">
          Login
        </Button>
      </div>
    </form>
  )
}

export default LoginForm
