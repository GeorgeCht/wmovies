'use client'

import React, { useState } from 'react'
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  cn,
} from '@nextui-org/react'
import { findLastCanonUrl } from '@/lib/utils'
import { useScreenSize } from '@/lib/hooks'
import { useRouter } from '@/components/i18n/navigation'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useIdle } from '@uidotdev/usehooks'
import { useTranslations } from 'next-intl'

import useInterceptorStore from '@/stores/interceptor'
import MovieCarousel from '@/components/ui/movie-carousel'
import Seperator from '@/components/modal/seperator'
import Header from '@/components/modal/header'
import Information from '@/components/ui/information'
import Reviews from '@/components/ui/reviews'
import Title from '@/components/ui/title'
import Footer from '@/components/layout/footer'

const Page = ({ params }: { params: { id: string; locale: string } }) => {
  const router = useRouter()
  const idle = useIdle(4500)
  const screenSize = useScreenSize()
  const tTitle = useTranslations('titles')
  const [isOpen, setIsOpen] = useState(true)
  const { urls } = useInterceptorStore()

  return (
    <React.Fragment>
      <Modal
        key={'modal'}
        isOpen={isOpen}
        onOpenChange={() => {
          setIsOpen(false)
          router.push(findLastCanonUrl(urls)!, {
            scroll: false,
          })
        }}
        placement={'bottom'}
        backdrop={'blur'}
        size={'5xl'}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        classNames={{
          base: 'bg-[#0D0D0E] sm:!h-[95vh] !h-[90vh] !my-0 !sm:my-0',
          backdrop: 'bg-black/80',
          closeButton:
            'hover:bg-white/15 active:bg-white/20 transition-all top-2 right-2 z-[99] p-3 child:w-5 child:h-5 child:hover:text-white child:md:text-white/75 child:text-white',
        }}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: 'easeInOut',
              },
            },
            exit: {
              y: -10,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: 'easeInOut',
              },
            },
          },
        }}
      >
        <ModalContent className={'!relative h-[95vh] flex overflow-hidden'}>
          <React.Fragment>
            <ScrollArea
              className={
                'relative h-[95vh] lg:w-[1024px] w-full rounded-large p-[1px] z-10 child:absolute child:top-0 child:right-0 child:bottom-0 child:left-0'
              }
            >
              <Header
                id={params.id}
                mediaType={'movie'}
                idle={idle && screenSize.width >= 768}
                setIsOpen={setIsOpen}
              />
              <ModalBody
                className={cn(
                  'lg:w-[1024px] w-full z-20 px-4 sm:px-6 transition-opacity !duration-1000',
                  idle && screenSize.width >= 768
                    ? 'opacity-45'
                    : 'opacity-100',
                )}
              >
                <Seperator className={'pb-3'} />

                <Title onModal>{tTitle('information')}</Title>
                <Information mediaType={'movie'} id={params.id} />

                <Seperator className={'pb-3 mt-4'} />

                <Title onModal>{tTitle('reviews')}</Title>
                <Reviews mediaType={'movie'} id={params.id} onModal />

                <Seperator className={'pb-3 mt-4'} />

                <Title onModal className={'sm:pb-3 pb-2'}>
                  {tTitle('more_like_this')}
                </Title>
                <MovieCarousel
                  mediaType={'movie'}
                  id={params.id}
                  onModal
                  query={'/recommendations'}
                />
                <MovieCarousel
                  mediaType={'movie'}
                  id={params.id}
                  onModal
                  query={'/recommendations?page=2'}
                  className={'mt-4'}
                />
              </ModalBody>
              <ModalFooter>
                <Footer className={'!pt-5'} />
              </ModalFooter>
            </ScrollArea>
          </React.Fragment>
        </ModalContent>
      </Modal>
    </React.Fragment>
  )
}

export default Page
