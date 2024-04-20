'use client'

import {
  ModalBody,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  DropdownSection,
} from '@nextui-org/react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useQuery } from '@tanstack/react-query'
import { detectNullSeasons, fetchData, formatLocale } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'

import React from 'react'
import EpisodeHeader from '@/components/modal/episode-header'
import Title from '@/components/ui/title'
import ModalBackground from '@/components/modal/background'
import Seperator from '@/components/modal/seperator'
import EpisodeList from '@/components/modal/episode-list'
import { useLocale, useTranslations } from 'next-intl'

const EpisodeContent = ({
  id,
  detailsData,
  season,
  setSeason,
  setIsOpen,
}: {
  detailsData: TvDetailsWithImageAndVideos
  id: string
  season: number
  setSeason: React.Dispatch<React.SetStateAction<number>>
  // eslint-disable-next-line no-unused-vars
  setIsOpen?: (value: React.SetStateAction<boolean>) => void
}) => {
  const locale = useLocale()
  const tMessage = useTranslations('messages')
  const { isPending: loading, data } = useQuery({
    queryKey: [`tv/${id}/season/${season}?language=${formatLocale(locale)}`],
    queryFn: async () =>
      fetchData<TvSeason>(
        `tv/${id}/season/${season}?language=${formatLocale(locale)}`,
      ),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })

  return (
    <React.Fragment>
      <ModalBackground
        backdrop={detailsData.backdrop_path}
        backdropSize={'w780'}
        className={'h-[312px] mask-bottom !opacity-15'}
      />
      <React.Fragment>
        <ScrollArea
          className={
            'relative h-[75vh] lg:w-[576px] w-full rounded-large p-[1px] z-10 child:absolute child:top-0 child:right-0 child:bottom-0 child:left-0'
          }
        >
          <ModalBody
            className={'w-full h-[75vh] overflow-y-scroll disable-scrollbar'}
          >
            <EpisodeHeader
              detailsData={detailsData}
              episodeData={data!}
              season={season}
              loading={loading}
            />

            <Seperator className={'border-white/10'} />
            <div
              className={
                'flex relative w-full items-center justify-between py-1.5'
              }
            >
              <Title onModal className={'mt-1'}>
                {tMessage('episodes')}
              </Title>
              <Dropdown className={'bg-neutral-900 rounded-[10px]'}>
                <DropdownTrigger>
                  <Button
                    className={
                      'bg-white/15 rounded-[10px] w-40 flex justify-between'
                    }
                    endContent={
                      <ChevronDown
                        strokeWidth={2.5}
                        className={'w-3.5 h-3.5'}
                      />
                    }
                  >
                    {tMessage('season')} {season}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label={'seasons'}
                  variant={'flat'}
                  disabledKeys={detectNullSeasons(detailsData.seasons)}
                >
                  <DropdownSection className={'mb-0'}>
                    {[...Array(detailsData.number_of_seasons)].map((_, i) => (
                      <DropdownItem
                        key={`season-${i + 1}`}
                        aria-label={`season-${i + 1}`}
                        onClick={() => setSeason(i + 1)}
                      >
                        {tMessage('season')} {i + 1}
                      </DropdownItem>
                    ))}
                  </DropdownSection>
                </DropdownMenu>
              </Dropdown>
            </div>
            <Seperator className={'border-white/10'} />
            <EpisodeList
              loading={loading}
              data={data!}
              id={id}
              season={season}
              setIsOpen={setIsOpen}
            />
          </ModalBody>
        </ScrollArea>
      </React.Fragment>
    </React.Fragment>
  )
}

export default EpisodeContent
