import React from 'react'
import { Link } from 'react-router-dom'
import SignupForm from '../components/SignupForm'

const SignUp = () => {
  return (
    <>
      <SignupForm />
      <div tw="flex justify-between items-center">
        <p tw="text-xs text-gray-400">계정이 있으신가요?</p>
        <Link tw="text-xs text-gray-600 hocus:underline" to="/login">
          로그인
        </Link>
      </div>
    </>
  )
}

export default SignUp
