import React from 'react'
import LoginForm from '@/features/auth/components/LoginForm'
import { Link } from 'react-router-dom'

const Login: React.FC = () => {
  return (
    <>
      <LoginForm />
      <div tw="flex justify-between items-center">
        <p tw="text-xs text-gray-400">계정이 없으신가요?</p>
        <Link tw="text-xs text-gray-600 hocus:underline" to="/signup">
          회원가입
        </Link>
      </div>
    </>
  )
}

export default Login
