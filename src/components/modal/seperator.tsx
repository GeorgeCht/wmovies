import { cn } from '@nextui-org/react'
import { DetailedHTMLProps, HTMLAttributes } from 'react'

const Seperator = ({
  className,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLHRElement>, HTMLHRElement>) => {
  return <hr className={cn('border-white/15', className)} {...props} />
}

export default Seperator
