'use client'

// import { useRestoreScroll } from '@/lib/hooks'
import { fetchData } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import HeroMovieDetails from '../ui/hero-movie-details'
import { Skeleton, cn } from '@nextui-org/react'

const PageWrapper = ({
  query,
  mediaType,
  multiple = false,
  showMoreInfo = true,
  className,
  children,
}: {
  query: string
  mediaType?: MediaType
  single?: boolean
  multiple?: boolean
  showMoreInfo?: boolean
  className?: string
  children?: React.ReactNode
}) => {
  // useRestoreScroll()
  const { data } = useQuery({
    queryKey: [`${query}`],
    queryFn: async () => fetchData<Response<MovieResult>>(`${query}`),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })

  const random = Math.floor(Math.random() * 10)

  return (
    <React.Fragment>
      <React.Fragment>
        <div
          className={cn(
            'flex flex-col justify-end h-[50vh] xl:mb-24 lg:mb-20 mb-10',
            className,
          )}
        >
          {data ? (
            <React.Fragment>
              <HeroMovieDetails
                // @ts-expect-error: id is not infered
                id={multiple ? (data.results[random].id as number) : data.id}
                mediaType={
                  multiple ? data.results[random].media_type : mediaType!
                }
                showMoreInfo={showMoreInfo}
              />
            </React.Fragment>
          ) : (
            <div className={'flex flex-col lg:w-[1024px] w-full gap-1 z-20'}>
              <div className={'w-full max-w-[596px]'}>
                <div className={'flex gap-2 pb-3'}>
                  <Skeleton className={'rounded-full *:rounded-full w-24'}>
                    <div className={'w-24 h-8'}></div>
                  </Skeleton>
                  <Skeleton className={'rounded-full *:rounded-full w-20'}>
                    <div className={'w-20 h-8'}></div>
                  </Skeleton>
                </div>
                <Skeleton
                  className={
                    'rounded-lg *:rounded-lg mb-10 w-full sm:w-[27rem] h-12'
                  }
                ></Skeleton>
                <div className={'space-y-3 mb-10'}>
                  <Skeleton
                    className={'w-full sm:w-[90%] h-4 rounded-lg *:rounded-lg'}
                  ></Skeleton>
                  <Skeleton
                    className={'w-full sm:w-[94%] h-4 rounded-lg *:rounded-lg'}
                  ></Skeleton>
                  <Skeleton
                    className={'w-full sm:w-[92%] h-4 rounded-lg *:rounded-lg'}
                  ></Skeleton>
                </div>
                <div className={'flex gap-3'}>
                  <Skeleton
                    className={'w-56 h-16 rounded-full *:rounded-full'}
                  />
                  {showMoreInfo && (
                    <Skeleton
                      className={' w-48 h-16 rounded-full *:rounded-full '}
                    />
                  )}

                  <Skeleton className={'rounded-full *:rounded-full h-16'}>
                    <div className={'w-16 h-16'}></div>
                  </Skeleton>
                </div>
              </div>
            </div>
          )}
        </div>
      </React.Fragment>
      {children}
    </React.Fragment>
  )
}

export default PageWrapper
