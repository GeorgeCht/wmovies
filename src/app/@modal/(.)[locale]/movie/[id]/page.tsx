'use client'

import React, { useState } from 'react'
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  cn,
} from '@nextui-org/react'
import { useRouter } from '@/components/i18n/navigation'
import { AnimatePresence } from 'framer-motion'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useIdle } from '@uidotdev/usehooks'

import MovieCarousel from '@/components/ui/movie-carousel'
import Seperator from '@/components/modal/seperator'
import Header from '@/components/modal/header'
import Information from '@/components/ui/information'
import Reviews from '@/components/ui/reviews'
import Title from '@/components/modal/title'

const Page = ({ params }: { params: { id: string } }) => {
  const router = useRouter()
  const idle = useIdle(4500)
  const [isOpen, setIsOpen] = useState(true)

  return (
    <>
      <ModalContent className={'!relative h-[95vh] flex overflow-hidden'}>
        <React.Fragment>
          <ScrollArea
            className={
              'relative h-[95vh] lg:w-[1024px] w-full rounded-large p-[1px] z-10 child:absolute child:top-0 child:right-0 child:bottom-0 child:left-0'
            }
          >
            <Header id={params.id} mediaType={'movie'} idle={idle} />
            <ModalBody
              className={cn(
                'lg:w-[1024px] w-full z-20 px-4 sm:px-6 transition-opacity !duration-1000',
                idle ? 'opacity-45' : 'opacity-100',
              )}
            >
              <Seperator className={'pb-3'} />

              <Title>Information</Title>
              <Information mediaType={'movie'} id={params.id} />

              <Seperator className={'pb-3 mt-4'} />

              <Title>Reviews</Title>
              <Reviews mediaType={'movie'} id={params.id} onModal />

              <Seperator className={'pb-3 mt-4'} />

              <Title className={'sm:pb-3 pb-2'}>More Like This</Title>
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
            <ModalFooter></ModalFooter>
          </ScrollArea>
        </React.Fragment>
      </ModalContent>
    </>
  )
}

export default Page
