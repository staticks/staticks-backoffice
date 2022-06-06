import { PropsWithChildren } from 'react'
import { Navigate, Outlet, Route } from 'react-router-dom'
import useStore from '@/store/index'

export const PrivateRoute = ({}) => {
  const token = useStore(state => state.token)

  // 토큰이 존재하지 않는 경우 로그인 페이지로 이동
  const isAuthenticated = token !== null
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
}
