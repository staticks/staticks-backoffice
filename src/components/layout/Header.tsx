import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeftIcon } from '@heroicons/react/solid'
import tw from 'twin.macro'

export interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  title: string
  hasBackButton?: boolean
  onBackButtonClick?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void
}

const PageHeader: React.FC<PageHeaderProps> = ({
  as = 'h1',
  title,
  hasBackButton = false,
  onBackButtonClick,
  ...rest
}) => {
  const style = tw`font-bold text-2xl`
  const navigate = useNavigate()

  return (
    <div tw="flex gap-3 items-center" {...rest}>
      {hasBackButton && (
        <button
          tw="w-8 h-8 p-0 m-0 hocus:bg-gray-100 border border-gray-100 flex items-center justify-center rounded"
          onClick={e => {
            console.log('onBackButtonClick', onBackButtonClick)
            onBackButtonClick ? onBackButtonClick(e) : navigate(-1)
          }}
        >
          <ChevronLeftIcon tw="w-6 text-black" />
        </button>
      )}
      {React.createElement(as, { style }, title)}
    </div>
  )
}

export default PageHeader
