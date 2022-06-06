import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input } from '../../../components/forms'
import useStore from '../../../store'
import { useLoginService } from '../services'
import { InputField } from '@/components/forms'
import { useNavigate } from 'react-router-dom'

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

  // server state
  const { data, refetch } = useLoginService(watch())

  useEffect(() => {
    if (data?.token) {
      // 토큰이 있는 경우 저장
      setToken(data.token)

      // 로그인 성공 시 `/projects` 로 이동
      navigate('/projects')
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
        <Button tw="w-full" type="submit">
          Login
        </Button>
      </div>
    </form>
  )
}

export default LoginForm
