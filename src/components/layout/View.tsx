import React from 'react'
import tw from 'twin.macro'
import { css } from '@emotion/react'
import { Outlet } from 'react-router-dom'

export interface ViewProps extends React.HTMLAttributes<HTMLDivElement> {
  hasOutlet?: boolean
  type?: 'center' | 'full'
  topElement?: React.ReactNode
  bottomElement?: React.ReactNode
}

const styleMap = {
  center: tw`flex justify-center h-[100vh] overflow-y-auto`,
  full: tw`p-5 md:p-10 min-h-screen`,
}

export const View: React.FC<ViewProps> = ({
  hasOutlet,
  children,
  type = 'center',
  ...rest
}) => {
  return (
    <div css={[tw`bg-gray-50 w-full`, styleMap[type]]}>
      {hasOutlet ? <Outlet /> : children}
    </div>
  )
}

export const ViewBox: React.FC<ViewProps> = ({ children, ...rest }) => {
  return (
    <div
      css={[
        tw`border border-gray-200 bg-white rounded-lg p-8 my-auto`,
        css`
          height: max-content;
        `,
      ]}
      {...rest}
    >
      {children}
    </div>
  )
}

export const ViewPage: React.FC<ViewProps> = ({
  children,
  topElement,
  bottomElement,
  ...rest
}) => {
  return (
    <>
      {topElement && (
        <aside
          css={[
            // 반응형
            tw`lg:w-[944px] lg:mx-auto`,
          ]}
        >
          {topElement}
        </aside>
      )}
      <div
        css={[
          // 내부 스타일
          tw`relative border border-gray-200 bg-white rounded-lg`,

          // 반응형
          tw`w-full lg:w-[944px] lg:mx-auto p-6 lg:p-10`,

          // topElement 존재 시
          topElement && tw`mt-4`,

          // bottomElement 존재 시
          bottomElement && tw`mb-4`,
        ]}
      >
        {children}
      </div>
      {bottomElement && (
        <aside
          css={[
            // 반응형
            tw`w-full lg:w-[944px] lg:mx-auto`,
          ]}
        >
          {bottomElement}
        </aside>
      )}
    </>
  )
}
