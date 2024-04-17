'use client'

import { fetchData, formatDateDifference } from '@/lib/utils'
import { Skeleton, cn } from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import React, { DetailedHTMLProps, HTMLAttributes, useState } from 'react'
import { AnimateHeight } from '../misc/animate-height'

const Term = ({
  className,
  children,
  ...props
}: DetailedHTMLProps<
  HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
>) => {
  return (
    <p
      className={cn(
        'text-xs font-semibold text-white/50 leading-none pt-1 cursor-default',
        className,
      )}
      {...props}
    >
      {children}
    </p>
  )
}

const Definition = ({
  className,
  children,
  ...props
}: DetailedHTMLProps<
  HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
>) => {
  return (
    <p
      className={cn(
        'text-sm font-normal text-white leading-[1.3em] pt-1 cursor-default',
        className,
      )}
      {...props}
    >
      {children}
    </p>
  )
}

const Information = ({
  id,
  mediaType = 'movie',
}: {
  id: string
  mediaType: MediaType
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const { isPending: creditsLoading, data: creditsData } = useQuery({
    queryKey: [`${mediaType}/${id}/credits`],
    queryFn: async () => fetchData<Credits>(`${mediaType}/${id}/credits`),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })
  const { isPending: detailsLoading, data: detailsData } = useQuery({
    queryKey: [`${mediaType}/${id}/details`],
    queryFn: async () =>
      fetchData<MovieDetailsWithImageAndVideos>(`${mediaType}/${id}`),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })

  if (creditsLoading || detailsLoading) {
    return (
      <div className={'flex flex-row w-full lg:gap-3 gap-2.5 mask-bottom'}>
        <div className={'flex flex-col relative gap-1 sm:w-full w-1/2'}>
          <Skeleton className={'rounded-lg mb-1 w-24'}>
            <div className={'h-2.5'} />
          </Skeleton>
          <Skeleton className={'rounded-lg mb-4 w-40'}>
            <div className={'h-3'} />
          </Skeleton>
          <Skeleton className={'rounded-lg mb-1 w-32'}>
            <div className={'h-2.5'} />
          </Skeleton>
          <Skeleton className={'rounded-lg mb-4 w-44'}>
            <div className={'h-3'} />
          </Skeleton>
        </div>
        <div className={'flex flex-col relative gap-1 sm:w-full w-1/2'}>
          <Skeleton className={'rounded-lg mb-1 w-24'}>
            <div className={'h-2.5'} />
          </Skeleton>
          <Skeleton className={'rounded-lg mb-4 w-40'}>
            <div className={'h-3'} />
          </Skeleton>
          <Skeleton className={'rounded-lg mb-1 w-32'}>
            <div className={'h-2.5'} />
          </Skeleton>
          <Skeleton className={'rounded-lg mb-4 w-44'}>
            <div className={'h-3'} />
          </Skeleton>
        </div>
        <div
          className={'hidden sm:flex flex-col relative gap-1 sm:w-full w-1/3'}
        >
          <Skeleton className={'rounded-lg mb-1 w-24'}>
            <div className={'h-2.5'} />
          </Skeleton>
          <Skeleton className={'rounded-lg mb-4 w-40'}>
            <div className={'h-3'} />
          </Skeleton>
          <Skeleton className={'rounded-lg mb-1 w-32'}>
            <div className={'h-2.5'} />
          </Skeleton>
          <Skeleton className={'rounded-lg mb-4 w-44'}>
            <div className={'h-3'} />
          </Skeleton>
        </div>
      </div>
    )
  }

  return (
    <React.Fragment>
      <AnimateHeight>
        <div
          className={cn(
            'flex flex-row w-full lg:gap-3 gap-2.5',
            !isExpanded && 'h-28 overflow-hidden mask-bottom',
          )}
        >
          <div className={'flex flex-col relative gap-1 sm:w-full w-1/2'}>
            <ul aria-roledescription={'cast'} className={'flex flex-col gap-4'}>
              {creditsData?.cast.length! > 0 &&
                creditsData?.cast.slice(0, 10).map((member, index) => (
                  <li key={index}>
                    <Term aria-roledescription={'character'}>
                      {member.character || 'N/A'}
                    </Term>
                    <Definition aria-roledescription={'name'}>
                      {member.name || 'N/A'}
                    </Definition>
                  </li>
                ))}
            </ul>
          </div>
          <div className={'flex flex-col relative gap-1 sm:w-full w-1/2'}>
            <ul aria-roledescription={'crew'} className={'flex flex-col gap-4'}>
              {creditsData?.crew.length! > 0 &&
                creditsData?.crew.slice(0, 10).map((member, index) => (
                  <li key={index}>
                    <Term aria-roledescription={'job'}>{member.job}</Term>
                    <Definition aria-roledescription={'name'}>
                      {member.name || 'N/A'}
                    </Definition>
                  </li>
                ))}
            </ul>
          </div>
          <div
            className={'hidden sm:flex flex-col relative gap-1 sm:w-full w-1/3'}
          >
            <ul
              aria-roledescription={'details'}
              className={'flex flex-col gap-4'}
            >
              {detailsData?.production_countries &&
                detailsData?.production_countries.length > 0 && (
                  <div aria-roledescription={'production-countries'}>
                    <Term>Produced in</Term>
                    {detailsData?.production_countries.map((country, index) => (
                      <Definition
                        key={index}
                        className={'pt-0'}
                        aria-roledescription={'country'}
                      >
                        {country.name || 'N/A'}
                      </Definition>
                    ))}
                  </div>
                )}
              {detailsData?.production_companies &&
                detailsData?.production_companies.length > 0 && (
                  <div aria-roledescription={'production-companies'}>
                    <Term>Produced by</Term>
                    {detailsData?.production_companies.map((company, index) => (
                      <Definition
                        key={index}
                        className={'pt-0'}
                        aria-roledescription={'country'}
                      >
                        {company.name}, {company.origin_country || 'N/A'}
                      </Definition>
                    ))}
                  </div>
                )}
              {detailsData?.homepage && (
                <div aria-roledescription={'website'}>
                  <Term>Official website</Term>
                  <Link
                    href={detailsData.homepage || '/'}
                    target={'_blank'}
                    rel={'nofollow'}
                  >
                    <Definition
                      className={'pt-0 cursor-pointer underline'}
                      aria-roledescription={'country'}
                    >
                      {detailsData.homepage || 'N/A'}
                    </Definition>
                  </Link>
                </div>
              )}
              {mediaType === 'movie' && (
                <div aria-roledescription={'production-companies'}>
                  <Term>Released</Term>
                  <Definition
                    className={'pt-0'}
                    aria-roledescription={'release-date'}
                  >
                    {formatDateDifference(detailsData?.release_date!) || 'N/A'}
                  </Definition>
                </div>
              )}
            </ul>
          </div>
        </div>
        <span
          aria-roledescription={isExpanded ? 'collapse' : 'expand'}
          className={cn(
            'text-sm font-medium text-white underline cursor-pointer',
            !isExpanded && '-mt-[18px]',
          )}
          onClick={() => setIsExpanded((state) => !state)}
        >
          {isExpanded ? 'Show less' : 'Show more'}
        </span>
      </AnimateHeight>
    </React.Fragment>
  )
}

export default Information
