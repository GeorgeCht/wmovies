import { convertScore, formatVoteCount } from '@/lib/utils'
import { cn } from '@nextui-org/react'
import React from 'react'
import { DetailedHTMLProps, HTMLAttributes, SVGProps } from 'react'

export const StarIcon = ({ ...props }: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width={'20'}
      height={'20'}
      viewBox={'0 0 20 20'}
      fill={'none'}
      xmlns={'http://www.w3.org/2000/svg'}
      {...props}
    >
      <path
        d={
          'M10 0L13.09 6.58254L20 7.64458L15 12.7655L16.18 20L10 16.5825L3.82 20L5 12.7655L0 7.64458L6.91 6.58254L10 0Z'
        }
      />
    </svg>
  )
}

const Ratings = ({
  size = 'md',
  rating,
  vote_count,
  className,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  size?: 'xs' | 'sm' | 'md' | 'lg'
  rating: number
  vote_count?: number
}) => {
  return (
    <div
      className={cn(
        'flex gap-2 items-center transition-all !duration-1000',
        className,
      )}
      {...props}
    >
      <ul className={'flex gap-0.5'} aria-roledescription={'rating'}>
        {Array.from({ length: 5 }).map((_, index) => (
          <li key={index} aria-roledescription={'star'}>
            <StarIcon
              fill={'white'}
              className={cn(
                size === 'xs' && 'w-2 h-2',
                size === 'sm' && 'w-4 h-4',
                size === 'md' && 'w-5 h-5',
                size === 'lg' && 'w-6 h-6',
                index + 1 >= convertScore(rating) && 'opacity-50',
              )}
            />
          </li>
        ))}
      </ul>
      {vote_count && (
        <div
          className={
            'flex gap-1 *:ml-1 *:mt-[1px] *:font-semibold *:text-sm *:text-white/50 *:tracking-tighter *:leading-none *:cursor-default'
          }
        >
          <span>{rating.toFixed(1)}</span>
          <span>•</span>
          <span>{formatVoteCount(vote_count)} Ratings</span>
        </div>
      )}
    </div>
  )
}

export default Ratings
