import { Button, InputField } from '@/components/forms'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useSignupService } from '../services'

const SignupForm: React.FC = () => {
  const navigate = useNavigate()

  // form state
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      password: '',
      name: '',
    },
  })

  // server state
  const { data, status, error, isLoading, refetch } = useSignupService(watch())

  // form submit
  const onSubmit = (data: any) => {
    refetch()
  }

  useEffect(() => {}, [])

  // 가입 처리 이후 로그인으로 이동
  useEffect(() => {
    if (status === 'success') {
      alert('가입 성공')
      navigate('/login')
    }
  }, [data, status])

  return (
    <form onSubmit={handleSubmit(onSubmit)} tw="flex flex-col gap-4">
      <InputField
        id="email"
        type="email"
        label="이메일"
        errors={errors}
        name="email"
        register={register('email', { required: '이메일을 입력해주세요' })}
      />
      <InputField
        id="password"
        type="password"
        label="비밀번호"
        errors={errors}
        name="password"
        register={register('password', { required: '비밀번호를 입력해주세요' })}
      />
      <InputField
        id="name"
        type="text"
        label="이름"
        errors={errors}
        name="name"
        register={register('name', { required: '이름을 입력해주세요' })}
      />
      <div>
        <Button tw="w-full" type="submit">
          회원가입
        </Button>
      </div>
    </form>
  )
}

export default SignupForm
