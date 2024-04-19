'use client'

import React from 'react'
import useInterceptorStore from '@/stores/interceptor'

import { Modal } from '@nextui-org/react'
import { useRouter } from '@/components/i18n/navigation'
import { findLastCanonUrl } from '@/lib/utils'
import NoSsr from '../misc/no-ssr'

const InterceptorModal = ({
  children: modal,
}: {
  children: React.ReactNode
}) => {
  const router = useRouter()
  const { isOpen, setIsOpen, urls } = useInterceptorStore()

  return (
    <React.Fragment>
      <Modal
        key={'modal'}
        isOpen={isOpen}
        onOpenChange={() => {
          if (isOpen) {
            setIsOpen(false)
          }
          findLastCanonUrl(urls) !== undefined
            ? router.push(findLastCanonUrl(urls)!)
            : router.back()
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
        <NoSsr>{modal}</NoSsr>
      </Modal>
    </React.Fragment>
  )
}

export default InterceptorModal

/* 

<NoSsr>{modal}</NoSsr>

<Modal
        key={'modal'}
        isOpen={isOpen}
        onOpenChange={() => {
          console.log('onOpenChange!')
          if (isOpen) {
            setIsOpen(false)
            console.log('setIsOpen(false)!')
          }
          setTimeout(() => {
            console.log('Changing route!')
            findLastCanonUrl(urls) !== undefined
              ? router.push(findLastCanonUrl(urls)!)
              : router.back()
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
        {modal}
      </Modal>

*/
