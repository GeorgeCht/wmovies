import { cn } from '@nextui-org/react'
import { DetailedHTMLProps, HTMLAttributes } from 'react'

const Title = ({
  onModal = false,
  className,
  children,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> & {
  onModal?: boolean
}) => {
  return (
    <h2
      className={cn(
        'text-white font-semibold tracking-tighter leading-none cursor-default',
        onModal
          ? 'text-2xl sm:text-[28px]'
          : 'text-2xl sm:text-3xl sm:pb-5 pb-4',
        className,
      )}
      {...props}
    >
      {children}
    </h2>
  )
}

export default Title
