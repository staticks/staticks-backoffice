import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { PrivateRoute } from '@/routes/PrivateRoute'
import AuthLayout from '@/features/auth/components/AuthLayout'

const Login = lazy(() => import('@/features/auth/views/Login'))
const SignUp = lazy(() => import('@/features/auth/views/Signup'))

const Projects = lazy(() => import('@/features/project/views/Projects'))

export default () => (
  <Suspense fallback={<>로딩중</>}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route path="" element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
        </Route>
        <Route path="/projects" element={<PrivateRoute />}>
          <Route path="" element={<Projects />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Suspense>
)
