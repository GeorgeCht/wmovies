'use client'

import React, {
  DetailedHTMLProps,
  HTMLAttributeAnchorTarget,
  HTMLAttributes,
  LiHTMLAttributes,
  useEffect,
  useState,
} from 'react'
import {
  cn,
  useDisclosure,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from '@nextui-org/react'
import {
  ArrowRight,
  Clapperboard,
  Flame,
  Github,
  List,
  LucideIcon,
  Monitor,
} from 'lucide-react'
import {
  animateVariants,
  getNextEpisodeUrl,
  parseSeasonAndEpisode,
} from '@/lib/utils'
import { useTranslations } from 'next-intl'
import { Tooltip } from '@nextui-org/react'
import { AnimatePresence, motion as Motion } from 'framer-motion'
import { Link, usePathname } from '@/components/i18n/navigation'
import { useIdle } from '@uidotdev/usehooks'
import { useScreenSize } from '@/lib/hooks'
import { Url } from 'next/dist/shared/lib/router/router'

import LangSwitch from '@/components/i18n/lang-switch'
import EpisodePicker from '../modal/episode-picker'
import useTvSeriesTrackerStore from '@/stores/tv-series-tracker'

const NavigationItem = ({
  content,
  href,
  Icon,
  active = false,
  target = '_self',
  width,
  height,
  className,
  ...props
}: DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement> & {
  content: string
  href: Url
  Icon: LucideIcon
  active?: boolean
  target?: HTMLAttributeAnchorTarget
  width?: string | number
  height?: string | number
}) => {
  const t = useTranslations('navigation')
  return (
    <li className={cn('mb-6', className)} {...props}>
      <Tooltip
        showArrow
        placement={'right'}
        content={t(content)}
        classNames={{
          base: ['before:bg-neutral-100 dark:before:bg-white'],
          content: [
            'py-2 px-4 shadow-xl text-black text-[13px] font-semibold',
            'bg-gradient-to-br from-white to-neutral-100 rounded-lg',
          ],
        }}
      >
        <span className={'inline-block'}>
          <Link
            href={href}
            target={target}
            className={cn(
              'group relative inline-block rounded-md p-2 transition-all',
              active ? 'bg-white/10' : 'hover:bg-white/10',
            )}
          >
            <Icon
              width={width}
              height={height}
              className={cn(
                'group-hover:opacity-100 transition-all',
                active ? 'opacity-100' : 'opacity-60',
              )}
            />
          </Link>
        </span>
      </Tooltip>
    </li>
  )
}

const Navigation = ({
  className,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>) => {
  const pathname = usePathname()
  const idle = useIdle(4500)
  const screenSize = useScreenSize()
  const tNavigation = useTranslations('navigation')
  const tActions = useTranslations('actions')
  const tPopovers = useTranslations('popovers')
  const { id, data } = useTvSeriesTrackerStore()
  const [hasNextEpisode, setHasNextEpisode] = useState(false)
  const [popoverIsOpen, setPopoverIsOpen] = useState({
    nextEpisode: true,
    watchList: false,
  })

  // for managing episode picker modal disclosure
  const {
    isOpen: episodePickerIsOpen,
    onOpen: episodePickerOnOpen,
    onOpenChange: episodePickerOnOpenChange,
  } = useDisclosure()

  useEffect(() => {
    const potentialTvSeriesData = parseSeasonAndEpisode(pathname)
    if (potentialTvSeriesData) {
      const [season, episode] = potentialTvSeriesData
      if (data) {
        const episode_count = data.seasons[season - 1].episode_count
        // find next episode
        const nextEpisode = episode + 1
        // check if next episode is within episode count
        setHasNextEpisode(nextEpisode <= episode_count)
      }
    }
  }, [data, pathname])

  useEffect(() => {
    if (!localStorage.getItem('showNextEpisodeTip')) {
      localStorage.setItem('showNextEpisodeTip', 'true')
    }

    if (localStorage.getItem('showNextEpisodeTip') === 'false') {
      setPopoverIsOpen({
        nextEpisode: false,
        watchList: false,
      })
    }
  }, [])

  return (
    <React.Fragment>
      <nav
        aria-label={'navigation'}
        className={cn(
          'fixed z-20 lg:min-h-screen lg:w-24 w-full lg:border-r lg:border-white/10 transition-transform !ease-in-out !duration-700',
          idle && screenSize.width >= 768 ? '-translate-x-24' : 'translate-x-0',
          className,
        )}
        {...props}
      >
        <div
          className={
            'hidden flex-1 flex-col items-center justify-between lg:flex h-screen'
          }
        >
          <ul className={'flex flex-col items-center pt-8'}>
            <NavigationItem
              href={'/movies'}
              active={pathname.includes('movies')}
              content={'movies'}
              width={22}
              height={22}
              Icon={Clapperboard}
            />
            <NavigationItem
              href={'/tv-series'}
              active={pathname.includes('tv-series')}
              content={'tv'}
              width={22}
              height={22}
              Icon={Monitor}
            />
            <NavigationItem
              href={'/trending'}
              active={pathname.includes('trending')}
              content={'trending'}
              width={26}
              height={26}
              Icon={Flame}
            />
          </ul>
          <ul className={'flex flex-col items-center pb-6'}>
            <AnimatePresence mode={'wait'}>
              {/^\/tv\/[^\/]+\/watch/.test(pathname) && data && (
                <Motion.div
                  key={'tv-series-controlls'}
                  {...animateVariants({
                    initial: {
                      opacity: 0,
                    },
                    enter: {
                      opacity: 1,
                      transition: { delay: 1 },
                    },
                    exit: {
                      opacity: 0,
                      transition: {
                        ease: 'easeOut',
                      },
                    },
                  })}
                >
                  {hasNextEpisode && screenSize.width >= 768 && (
                    <li className={'mb-6'}>
                      <Popover
                        showArrow
                        key={'popover-next-episode'}
                        placement={'right'}
                        offset={30}
                        isOpen={popoverIsOpen.nextEpisode}
                        classNames={{
                          content: ['bg-neutral-900'],
                        }}
                        motionProps={{
                          ...animateVariants({
                            initial: {
                              transition: { delay: 1 },
                              opacity: 0,
                            },
                            enter: {
                              transition: { delay: 2 },
                              opacity: 1,
                            },
                            exit: {
                              opacity: 0,
                              transition: {
                                ease: 'easeOut',
                              },
                            },
                          }),
                        }}
                      >
                        <PopoverTrigger>
                          <Button
                            className={
                              '!bg-transparent hover:!bg-transparent active:!bg-transparent w-fit h-fit p-0'
                            }
                          >
                            <NavigationItem
                              className={'!mb-0'}
                              href={getNextEpisodeUrl(pathname)}
                              content={'next_episode'}
                              width={28}
                              height={28}
                              Icon={ArrowRight}
                            />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                          <div className={'px-1 py-2 child:cursor-default'}>
                            <p
                              className={
                                'text-base font-semibold text-white leading-[1.3em]'
                              }
                            >
                              {tPopovers('next_episode_title')}
                            </p>
                            <p
                              className={
                                'text-sm font-normal text-white/75 leading-none pt-1.5 pb-1'
                              }
                            >
                              {tPopovers('next_episode_content')}
                            </p>
                            <div className={'flex gap-2 pt-1.5'}>
                              <Button
                                className={'bg-neutral-700'}
                                onClick={() => {
                                  setPopoverIsOpen({
                                    watchList: true,
                                    nextEpisode: false,
                                  })
                                }}
                              >
                                {tActions('okay')}
                              </Button>
                              <Button
                                className={
                                  'hover:!bg-neutral-700 border-neutral-700'
                                }
                                variant={'ghost'}
                                onClick={() => {
                                  setPopoverIsOpen((state) => ({
                                    ...state,
                                    nextEpisode: false,
                                  }))
                                  localStorage.setItem(
                                    'showNextEpisodeTip',
                                    'false',
                                  )
                                }}
                              >
                                {tActions('never_show_again')}
                              </Button>
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </li>
                  )}
                  {screenSize.width >= 768 && (
                    <li className={'mb-6'}>
                      <Popover
                        showArrow
                        key={'popover-watchlist'}
                        placement={'right'}
                        offset={30}
                        isOpen={popoverIsOpen.watchList}
                        classNames={{
                          content: ['bg-neutral-900'],
                        }}
                        motionProps={{
                          ...animateVariants({
                            initial: {
                              opacity: 0,
                            },
                            enter: {
                              opacity: 1,
                            },
                            exit: {
                              opacity: 0,
                              transition: {
                                ease: 'easeOut',
                              },
                            },
                          }),
                        }}
                      >
                        <PopoverTrigger>
                          <Button
                            className={
                              '!bg-transparent hover:!bg-transparent active:!bg-transparent w-fit h-fit p-0'
                            }
                          >
                            <li className={'flex justify-center'}>
                              <Tooltip
                                showArrow
                                placement={'right'}
                                content={tNavigation('episode_list')}
                                classNames={{
                                  base: [
                                    'before:bg-neutral-100 dark:before:bg-white',
                                  ],
                                  content: [
                                    'py-2 px-4 shadow-xl text-black text-[13px] font-semibold',
                                    'bg-gradient-to-br from-white to-neutral-100 rounded-lg',
                                  ],
                                }}
                              >
                                <span className={'inline-block'}>
                                  <span
                                    onClick={() => episodePickerOnOpen()}
                                    className={
                                      'group relative inline-block rounded-md p-2 hover:bg-white/10 transition-all'
                                    }
                                  >
                                    <List
                                      width={22}
                                      height={22}
                                      className={
                                        'opacity-60 group-hover:opacity-100 transition-all'
                                      }
                                    />
                                  </span>
                                </span>
                              </Tooltip>
                            </li>
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                          <div className={'px-1 py-2 child:cursor-default'}>
                            <p
                              className={
                                'text-base font-semibold text-white leading-[1.3em]'
                              }
                            >
                              {tPopovers('watchlist_title')}
                            </p>
                            <p
                              className={
                                'text-sm font-normal text-white/75 leading-none pt-1.5 pb-1'
                              }
                            >
                              {tPopovers('watchlist_content')}
                            </p>
                            <div className={'flex gap-2 pt-1.5'}>
                              <Button
                                className={'bg-neutral-700'}
                                onClick={() => {
                                  setPopoverIsOpen((state) => ({
                                    ...state,
                                    watchList: false,
                                  }))
                                }}
                              >
                                {tActions('okay')}
                              </Button>
                              <Button
                                className={
                                  'hover:!bg-neutral-700 border-neutral-700'
                                }
                                variant={'ghost'}
                                onClick={() => {
                                  setPopoverIsOpen((state) => ({
                                    ...state,
                                    watchList: false,
                                  }))
                                  localStorage.setItem(
                                    'showNextEpisodeTip',
                                    'false',
                                  )
                                }}
                              >
                                {tActions('never_show_again')}
                              </Button>
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </li>
                  )}

                  <div className={'block h-[1px] w-full bg-white/15 mb-6'} />
                </Motion.div>
              )}
            </AnimatePresence>
            <NavigationItem
              href={'https://github.com/georgecht/wmovies'}
              target={'_blank'}
              content={'github'}
              width={22}
              height={22}
              Icon={Github}
            />
            <LangSwitch />
          </ul>
        </div>
      </nav>
      {data && (
        <EpisodePicker
          id={id}
          detailsData={data as TvDetailsWithImageAndVideos}
          isOpen={episodePickerIsOpen}
          onOpen={episodePickerOnOpen}
          onOpenChange={episodePickerOnOpenChange}
        />
      )}
    </React.Fragment>
  )
}

export default Navigation
