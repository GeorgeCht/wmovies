import Seperator from '@/components/modal/seperator'
import useInterceptorStore from '@/stores/interceptor'
import Image from 'next/image'

import { Link } from '@/components/i18n/navigation'
import { Card, Skeleton, cn } from '@nextui-org/react'
import { truncate } from '@/lib/utils'

const EpisodeList = ({
  id,
  season,
  data,
  loading,
  setIsOpen,
}: {
  id: string
  season: number
  data: TvSeason
  loading: boolean
  // eslint-disable-next-line no-unused-vars
  setIsOpen?: (value: React.SetStateAction<boolean>) => void
}) => {
  const { urls } = useInterceptorStore()

  if (loading) {
    return (
      <ul className={'pb-5'}>
        {Array.from(Array(10)).map((_, index) => (
          <li className={'w-full'} key={index}>
            <article className={'flex gap-2.5 relative w-full'}>
              <div
                className={'flex w-[170px] h-[96px]'}
                aria-roledescription={'episode-preview'}
              >
                <Skeleton className={'object-fill rounded-xl w-[170px] h-24'} />
              </div>
              <div
                className={'flex flex-col w-[calc(100%-170px)] justify-between'}
              >
                <div
                  className={'flex flex-row w-full justify-between items-start'}
                >
                  <Skeleton className={'rounded-lg w-6 h-6'} />
                  <Skeleton className={'rounded-lg w-7 h-[18px]'} />
                </div>
                <div className={'flex flex-col gap-2.5'}>
                  <Skeleton className={'rounded-lg w-44 h-[18px]'} />
                  <div className={'flex flex-col gap-1'}>
                    <Skeleton className={'rounded-lg w-[98%] h-3 pt-1.5'} />
                    <Skeleton className={'rounded-lg w-[74%] h-3'} />
                  </div>
                </div>
              </div>
            </article>
            <Seperator className={'border-white/10 mt-3 pt-3'} />
          </li>
        ))}
      </ul>
    )
  }
  return (
    <ul aria-label={'episode-list'} className={'pb-5'}>
      {data?.episodes.map((episode, index) => (
        <li className={'w-full'} key={episode.id}>
          {!episode.air_date || new Date(episode.air_date) > new Date()}
          <Link
            href={`/tv/${id}/watch/${season}/${index + 1}`}
            className={cn(
              'opacity-100',
              !episode.air_date || new Date(episode.air_date) > new Date()
                ? 'pointer-events-none opacity-25'
                : '',
              urls.some(
                (url) => url === `/tv/${id}/watch/${season}/${index + 1}`,
              ) && 'opacity-50',
            )}
            aria-disabled={
              !episode.air_date || new Date(episode.air_date) > new Date()
            }
            tabIndex={
              !episode.air_date || new Date(episode.air_date) > new Date()
                ? -1
                : undefined
            }
            onClick={() => setIsOpen && setIsOpen(false)}
          >
            <article
              aria-label={'episode'}
              className={'flex gap-2.5 relative w-full'}
            >
              <Card
                radius={'lg'}
                className={'flex w-[170px] h-[96px]'}
                aria-roledescription={'episode-preview'}
              >
                {episode.still_path && (
                  <Image
                    width={170}
                    height={96}
                    loading={'lazy'}
                    objectFit={'fill'}
                    src={`https://image.tmdb.org/t/p/w185${episode.still_path}`}
                    alt={episode.name || 'episode-still-image'}
                  />
                )}
              </Card>
              <div
                className={'flex flex-col w-[calc(100%-170px)] justify-between'}
                aria-roledescription={'episode-details'}
              >
                <div
                  className={'flex flex-row w-full justify-between items-start'}
                >
                  <h3
                    className={
                      'text-lg text-balance font-light leading-normal -mt-1'
                    }
                  >
                    #{index + 1}
                  </h3>
                  <span className={'text-white/60 text-sm'}>
                    {episode.runtime ? (
                      `${episode.runtime}m`
                    ) : (
                      <span className={'opacity-40'}>N/A</span>
                    )}
                  </span>
                </div>
                <div>
                  <h2
                    className={'text-balance text-lg leading-none text-white'}
                  >
                    {episode.name}
                  </h2>
                  <p
                    className={
                      'text-sm font-normal text-white/50 leading-[1.3em] pt-1.5'
                    }
                  >
                    {truncate(episode.overview!, 90) || ''}
                  </p>
                </div>
              </div>
            </article>
          </Link>
          {index + 1 !== data.episodes.length && (
            <Seperator className={'border-white/10 mt-3 pt-3'} />
          )}
        </li>
      ))}
    </ul>
  )
}

export default EpisodeList
