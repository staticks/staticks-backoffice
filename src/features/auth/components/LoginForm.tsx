import React, { useEffect } from 'react'
import { FieldValue, useForm } from 'react-hook-form'
import useStore from '../../store'
import useAuthService from '../services'

const LoginForm: React.FC = () => {
  // zustand store
  const token = useStore(state => state.token)
  const setToken = useStore(state => state.setToken)

  // form state
  const { register, handleSubmit, getValues, setValue } = useForm({
    defaultValues: {
      accountId: '',
      password: '',
    },
  })

  // server state
  const { data, refetch } = useAuthService(getValues())

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="accountId">email</label>
        <input
          id="accountId"
          type="email"
          {...register('accountId', {})}
          autoComplete="off"
        />
      </div>

      <div>
        <label htmlFor="password">password</label>
        <input
          id="password"
          type="password"
          {...register('password', {})}
          autoComplete="off"
        />
      </div>

      <div>
        <button type="submit">Login</button>
      </div>
    </form>
  )
}

export default LoginForm
