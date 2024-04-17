// ***
// * WITH MODAL
// ***

'use client'

import React, { useState } from 'react'
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
} from '@nextui-org/react'
import { useRouter } from '@/components/i18n/navigation'
import { AnimatePresence } from 'framer-motion'
import { ScrollArea } from '@/components/ui/scroll-area'
import MovieCarousel from '@/components/ui/movie-carousel'
import Seperator from '@/components/modal/seperator'
import ReviewCarousel from '@/components/ui/review-carousel'
import Header from '@/components/modal/header'
import Information from '@/components/ui/information'

const Page = ({ params }: { params: { id: string } }) => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(true)

  return (
    <>
      <AnimatePresence mode={'wait'}>
        <Modal
          key={'modal'}
          isOpen={isOpen}
          onOpenChange={() => {
            setIsOpen(false)
            setTimeout(() => {
              router.back()
            }, 200)
          }}
          placement={'bottom'}
          backdrop={'blur'}
          size={'5xl'}
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
            {(onClose) => (
              <React.Fragment>
                <ScrollArea
                  className={
                    'relative h-[95vh] lg:w-[1024px] w-full rounded-large p-[1px] z-10 child:absolute child:top-0 child:right-0 child:bottom-0 child:left-0'
                  }
                >
                  <Header movieId={params.id} />
                  <ModalBody className={'lg:w-[1024px] w-full z-20 px-6'}>
                    <Seperator className={'pb-3'} />
                    <h2
                      className={
                        'text-2xl sm:text-[28px] font-semibold tracking-tighter leading-none pb-1'
                      }
                    >
                      Information
                    </h2>
                    <Information mediaType={'movie'} id={params.id} />
                    <Seperator className={'pb-3 mt-4'} />
                    <h2
                      className={
                        'text-2xl sm:text-[28px] font-semibold tracking-tighter leading-none pb-1'
                      }
                    >
                      Reviews
                    </h2>
                    <div className={'flex justify-between w-full items-end'}>
                      <div className={'flex items-end gap-2'}>
                        <h3
                          className={
                            'md:text-6xl sm:text-5xl text-[2.5rem] font-semibold leading-none tracking-tighter cursor-default -mb-1.5'
                          }
                        >
                          8.3
                        </h3>
                        <span
                          className={
                            'text-sm font-medium text-white/50 leading-none cursor-default'
                          }
                        >
                          out of 10
                        </span>
                      </div>
                      <span
                        className={
                          'text-xs font-semibold text-white/50 leading-none pt-1 cursor-default'
                        }
                      >
                        2.7k Ratings
                      </span>
                    </div>
                    <ReviewCarousel movieId={params.id} onModal />
                    <Seperator className={'pb-3 mt-4'} />
                    <h2
                      className={
                        'text-2xl sm:text-[28px] font-semibold tracking-tighter leading-none sm:pb-3 pb-2'
                      }
                    >
                      More Like This
                    </h2>
                    <MovieCarousel movieId={params.id} onModal />

                    <div className={'block relative h-64'}></div>
                    <div className={'block relative h-64'}></div>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button color="primary" onPress={onClose}>
                      Action
                    </Button>
                  </ModalFooter>
                </ScrollArea>
              </React.Fragment>
            )}
          </ModalContent>
        </Modal>
      </AnimatePresence>
    </>
  )
}

export default Page
