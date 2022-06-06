import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { View } from './components/layout'
import Login from '@/features/auth/views/Login'
import SignUp from '@/features/auth/views/Signup'
import AuthLayout from './features/auth/components/AuthLayout'

const queryClient = new QueryClient()

const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route path="" element={<Login />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<SignUp />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
    </>
  )
}

export default App
