import { PropsWithChildren } from 'react'
import { View, ViewBox } from '@/components/layout/index'
import LogoSvg from '@/assets/img/logo.svg'
import { Outlet } from 'react-router-dom'

const AuthLayout: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <View>
      <ViewBox tw="w-full max-w-[320px]">
        <div tw="flex flex-col gap-6">
          <header tw="flex justify-center">
            <img src={LogoSvg} alt="STATICKS" width={150} />
          </header>
          <Outlet />
        </div>
      </ViewBox>
    </View>
  )
}

export default AuthLayout
