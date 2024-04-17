import { SVGProps } from 'react'

const PlayIcon = ({
  fill = 'black',
  stroke = 'black',
  ...props
}: SVGProps<SVGSVGElement> & {
  fill?: string
  stroke?: string
}) => {
  return (
    <svg
      width={'24'}
      height={'24'}
      viewBox={'0 0 24 24'}
      fill={'none'}
      xmlns={'http://www.w3.org/2000/svg'}
      {...props}
    >
      <path
        d={'M6 3L20 12L6 21V3Z'}
        fill={fill}
        stroke={stroke}
        strokeWidth={'2'}
        strokeLinecap={'round'}
        strokeLinejoin={'round'}
      />
    </svg>
  )
}

export default PlayIcon
