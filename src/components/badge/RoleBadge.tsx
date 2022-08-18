import tw from 'twin.macro'

interface RoleBadgeProps {
  backgroundColor: string
  color?: string
  roleName: string
}

const RoleBadge: React.FC<RoleBadgeProps> = ({
  backgroundColor,
  color = 'white',
  roleName,
}) => {
  return (
    <div tw="text-center px-2 py-1 rounded" style={{ backgroundColor, color }}>
      {roleName}
    </div>
  )
}

export default RoleBadge
