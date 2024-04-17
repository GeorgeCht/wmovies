import { cn } from '@nextui-org/react'
import { DetailedHTMLProps, HTMLAttributes } from 'react'

const Title = ({
  className,
  children,
  ...props
}: DetailedHTMLProps<
  HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>) => {
  return (
    <h2
      className={cn(
        'text-2xl sm:text-[28px] text-white font-semibold tracking-tighter leading-none pb-1 cursor-default',
        className,
      )}
      {...props}
    >
      {children}
    </h2>
  )
}

export default Title
