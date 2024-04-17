'use client'

import { fetchData } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'

const Information = ({
  id,
  mediaType = 'movie',
}: {
  id: string
  mediaType: MediaType
}) => {
  const { isPending: loading, data } = useQuery({
    queryKey: [`${mediaType}/${id}/credits`],
    queryFn: async () => fetchData<Credits>(`${mediaType}/${id}/credits`),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })

  if (loading) {
    return <p>Loading..</p>
  }

  return (
    <div className={'flex sm:flex-row flex-col w-full lg:gap-3 gap-2.5'}>
      <div className={'flex flex-col relative gap-1 sm:w-full w-1/3'}>
        <ul aria-roledescription={'cast'} className={'flex flex-col gap-4'}>
          {data?.cast.length! > 0 &&
            data?.cast.slice(0, 10).map((member, index) => (
              <li className={'*:cursor-default'} key={index}>
                <p
                  aria-roledescription={'character'}
                  className={
                    'text-xs font-semibold text-white/50 leading-none pt-1'
                  }
                >
                  {member.character}
                </p>
                <p
                  aria-roledescription={'name'}
                  className={
                    'text-sm font-normal text-white leading-[1.3em] pt-1'
                  }
                >
                  {member.name}
                </p>
              </li>
            ))}
        </ul>
      </div>
      <div className={'flex flex-col relative gap-1 sm:w-full w-1/3'}>
        <ul aria-roledescription={'crew'} className={'flex flex-col gap-4'}>
          {data?.crew.length! > 0 &&
            data?.crew.slice(0, 10).map((member, index) => (
              <li className={'*:cursor-default'} key={index}>
                <p
                  aria-roledescription={'job'}
                  className={
                    'text-xs font-semibold text-white/50 leading-none pt-1'
                  }
                >
                  {member.job}
                </p>
                <p
                  aria-roledescription={'name'}
                  className={
                    'text-sm font-normal text-white leading-[1.3em] pt-1'
                  }
                >
                  {member.name}
                </p>
              </li>
            ))}
        </ul>
      </div>
      <div className={'flex flex-col relative gap-1 sm:w-full w-1/3'}>
        <p
          className={
            'text-xs font-semibold text-white/50 leading-none pt-1 cursor-default'
          }
        >
          Produced in
        </p>
        <ul className={'flex flex-col'}>
          <li
            className={
              'text-sm font-normal text-white leading-[1.3em] cursor-default'
            }
          >
            United States of America
          </li>
        </ul>
        <p
          className={
            'text-xs font-semibold text-white/50 leading-none pt-1 cursor-default mt-3'
          }
        >
          Released
        </p>
        <ul className={'flex flex-col'}>
          <li
            className={
              'text-sm font-normal text-white leading-[1.3em] cursor-default'
            }
          >
            1 week ago
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Information
