import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { PrivateRoute } from '@/routes/PrivateRoute'
import AuthLayout from '@/features/auth/components/AuthLayout'
import { View, ViewBox } from '@/components/layout'

const Login = lazy(() => import('@/features/auth/views/Login'))
const SignUp = lazy(() => import('@/features/auth/views/Signup'))
const Projects = lazy(() => import('@/features/project/views/Projects'))
const CreateProject = lazy(
  () => import('@/features/project/views/CreateProject'),
)

export default () => (
  <Suspense
    fallback={
      <View>
        <ViewBox>로딩중...</ViewBox>
      </View>
    }
  >
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route path="" element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
        </Route>
        <Route path="/project" element={<PrivateRoute />}>
          <Route path="" element={<Projects />} />
          <Route path="create" element={<CreateProject />} />
          <Route
            path=":projectId"
            element={
              <View>
                <ViewBox>페이지 준비중...</ViewBox>
              </View>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </Suspense>
)
