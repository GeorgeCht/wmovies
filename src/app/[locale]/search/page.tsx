'use client'

import Footer from '@/components/layout/footer'
import MovieCarousel from '@/components/ui/movie-carousel'
import TvCarousel from '@/components/ui/tv-carousel'
import Title from '@/components/ui/title'
import useBGManager from '@/stores/bg-manager'
import React, { useEffect } from 'react'

import { useTranslations } from 'next-intl'
import { fetchData } from '@/lib/utils'
import { useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { Skeleton } from '@nextui-org/react'

const Page = () => {
  const tMessage = useTranslations('messages')
  const searchParams = useSearchParams()
  const { setBackdrop, setVideo } = useBGManager()

  const { isPending: loading, data } = useQuery({
    queryKey: [
      `search/multi?include_adult=false&query=${searchParams.get('query')}`,
    ],
    queryFn: async () =>
      fetchData<Response<MovieResult | TvResult>>(
        `search/multi?include_adult=false&query=${searchParams.get('query')}`,
      ),
    staleTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })

  useEffect(() => {
    if (!searchParams.get('query')) {
      setBackdrop('none')
      setVideo('none')
      return
    }
    if (data && data.total_results !== 0) {
      const index = Math.floor(Math.random() * 10)
      data.results[index].backdrop_path &&
        setBackdrop(data.results[index].backdrop_path!)
      setVideo('none')
    }
    return () => {
      setBackdrop('none')
      setVideo('none')
    }
  }, [data, searchParams, setBackdrop, setVideo])

  return (
    <React.Fragment>
      <section
        className={'flex flex-col justify-between min-h-[calc(100vh-140px)]'}
      >
        <div>
          <div className={'flex flex-col justify-end xl:mb-12 lg:mb-6 mb-2'}>
            <h1
              className={
                'md:text-6xl sm:text-5xl text-[2.5rem] w-full max-w-[578px] text-balance font-semibold leading-none tracking-tighter cursor-default md:pb-7 pb-3'
              }
            >
              {searchParams.get('query') ? (
                <React.Fragment>
                  {loading ? (
                    <Skeleton
                      className={
                        'rounded-lg *:rounded-lg w-full sm:w-[20rem] h-12'
                      }
                    />
                  ) : (
                    <React.Fragment>
                      {data ? (
                        <React.Fragment>
                          {data.total_results !== 0 ? (
                            <React.Fragment>
                              {tMessage('results_found', {
                                count: data.total_results,
                              })}
                            </React.Fragment>
                          ) : (
                            <React.Fragment>
                              {tMessage('results_found', { count: 0 })}
                            </React.Fragment>
                          )}
                        </React.Fragment>
                      ) : (
                        <React.Fragment>
                          {tMessage('results_found', { count: 0 })}
                        </React.Fragment>
                      )}
                    </React.Fragment>
                  )}
                </React.Fragment>
              ) : (
                <React.Fragment>{tMessage('type_to_continue')}</React.Fragment>
              )}
            </h1>
          </div>
          {searchParams.get('query') ? (
            <div className={'flex flex-col w-full gap-1'}>
              <div className={'lg:mb-20 mb-10'}>
                {loading ? (
                  <Skeleton
                    className={
                      'rounded-lg *:rounded-lg w-full sm:w-[16rem] h-8 sm:mb-5 mb-4'
                    }
                  />
                ) : (
                  <Title onModal={false}>
                    {tMessage('movie_results', {
                      query: searchParams.get('query'),
                    })}
                  </Title>
                )}
                <MovieCarousel
                  queryFlag
                  query={`search/movie?query=${searchParams.get('query')}&include_adult=false&page=1`}
                  renderWhenInView={false}
                  onModal={false}
                  fallback={
                    <React.Fragment>
                      <h4
                        className={
                          'text-sm font-normal text-white leading-[1.3em] pt-1 cursor-default'
                        }
                      >
                        {tMessage('no_movies_found')}
                      </h4>
                      <p
                        className={
                          'text-xs font-semibold text-white/50 leading-none pt-1 cursor-default'
                        }
                      >
                        {tMessage('search_opt')}
                      </p>
                    </React.Fragment>
                  }
                />
                <MovieCarousel
                  queryFlag
                  query={`search/movie?query=${searchParams.get('query')}&include_adult=false&page=2`}
                  renderWhenInView={false}
                  className={'md:pt-6 pt-4'}
                  onModal={false}
                />
              </div>
              <div className={'lg:mb-20 mb-10'}>
                {loading ? (
                  <Skeleton
                    className={
                      'rounded-lg *:rounded-lg w-full sm:w-[18rem] h-8 sm:mb-5 mb-4'
                    }
                  />
                ) : (
                  <Title onModal={false}>
                    {tMessage('tv_series_results', {
                      query: searchParams.get('query'),
                    })}
                  </Title>
                )}
                <TvCarousel
                  queryFlag
                  query={`search/tv?query=${searchParams.get('query')}&include_adult=false&page=1`}
                  renderWhenInView={false}
                  onModal={false}
                  fallback={
                    <React.Fragment>
                      <h4
                        className={
                          'text-sm font-normal text-white leading-[1.3em] pt-1 cursor-default'
                        }
                      >
                        {tMessage('no_tv_series_found')}
                      </h4>
                      <p
                        className={
                          'text-xs font-semibold text-white/50 leading-none pt-1 cursor-default'
                        }
                      >
                        {tMessage('search_opt')}
                      </p>
                    </React.Fragment>
                  }
                />
                <TvCarousel
                  queryFlag
                  query={`search/tv?query=${searchParams.get('query')}&include_adult=false&page=2`}
                  renderWhenInView={false}
                  className={'md:pt-6 pt-4'}
                  onModal={false}
                />
              </div>
            </div>
          ) : (
            <div>
              <h4
                className={
                  'text-sm font-normal text-white leading-[1.3em] pt-1 cursor-default'
                }
              >
                {tMessage('results_found', { count: 0 })}
              </h4>
              <p
                className={
                  'text-xs font-semibold text-white/50 leading-none pt-1 cursor-default'
                }
              >
                {tMessage('type_to_continue_2')}
              </p>
            </div>
          )}
        </div>
        <Footer />
      </section>
    </React.Fragment>
  )
}

export default Page
