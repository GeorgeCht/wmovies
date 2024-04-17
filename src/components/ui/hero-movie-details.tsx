import { Button, Chip } from '@nextui-org/react'
import { DetailedHTMLProps, HTMLAttributes } from 'react'
import PlayIcon from './play-icon'

const HeroMovieDetails = ({
  genres,
  title,
  description,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  genres: Array<string>
  title: string
  description: string
}) => {
  return (
    <div className={'flex flex-col'} {...props}>
      <ul className={'flex gap-2 pb-3'}>
        {genres.map((genre, index) => (
          <li key={index}>
            <Chip
              size={'sm'}
              classNames={{
                base: 'z-10 backdrop-blur bg-white/15 px-2 py-4',
                content: 'font-semibold tracking-tight cursor-default',
              }}
            >
              {genre}
            </Chip>
          </li>
        ))}
      </ul>
      <h1
        className={
          'md:text-6xl sm:text-5xl text-[2.5rem] font-semibold leading-none tracking-tighter cursor-default pb-7'
        }
      >
        {title}
      </h1>
      <p
        className={
          'sm:text-xl text-base font-normal leading-normal max-w-[596px] cursor-default pb-7'
        }
      >
        {description}
      </p>
      <Button
        className={
          'sm:text-xl text-lg text-black font-medium rounded-full bg-white sm:px-10 px-8 py-8 w-fit'
        }
      >
        <PlayIcon className={' sm:w-6 w-5 sm:h-6 h-5'} />
        Watch Now
      </Button>
    </div>
  )
}

export default HeroMovieDetails
