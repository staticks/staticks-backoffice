import React from 'react'
import { ExclamationCircleIcon } from '@heroicons/react/solid'

export interface NotYetProps {
  message?: string
}

const NotYet: React.FC<NotYetProps> = ({ message = '준비중입니다.' }) => {
  return (
    <div>
      <ExclamationCircleIcon tw="w-10 text-blue-600 mx-auto mb-4" />
      <p tw="text-center">{message}</p>
    </div>
  )
}

export default NotYet
