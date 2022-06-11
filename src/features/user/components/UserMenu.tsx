import useStore from '@/store'
import { LogoutIcon, UserIcon } from '@heroicons/react/outline'
import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserService } from '../service'
import { User } from '../types'
import toast from 'react-hot-toast'

const UserInfo: React.FC<{
  user?: User
  isLoading: boolean
}> = ({ user, isLoading }) => {
  return (
    <div tw="bg-white p-3 border border-gray-200 rounded flex gap-2 items-center">
      <UserIcon tw="w-4 h-4 text-gray-600" />
      <p tw="text-sm text-gray-700">{isLoading ? '로딩중...' : user?.name}</p>
    </div>
  )
}

const LogoutButton: React.FC<{
  onClick: () => void
}> = ({ onClick }) => {
  const handleClick = () => {
    onClick && onClick()
  }

  return (
    <button
      tw="bg-white p-3 border border-gray-200 rounded"
      onClick={handleClick}
      title="로그아웃"
    >
      <LogoutIcon tw="w-4 h-4 text-gray-600" />
    </button>
  )
}

const UserMenu: React.FC = () => {
  const navigate = useNavigate()
  const { data: user, isLoading } = useUserService()
  const removeToken = useStore(store => store.removeToken)

  const handleLogout = useCallback(() => {
    removeToken()
    toast.success('로그아웃 되었습니다.')
    navigate('/login')
  }, [])

  return (
    <div tw="flex gap-3 items-center">
      <UserInfo user={user} isLoading={isLoading} />
      <LogoutButton onClick={handleLogout} />
    </div>
  )
}

export default UserMenu
