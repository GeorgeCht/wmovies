import { cn } from '@nextui-org/react'
import React, { DetailedHTMLProps, HTMLAttributes } from 'react'
import Ratings from './ratings'
import { formatDateDifference } from '@/lib/utils'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from '@nextui-org/react'
import Seperator from '../modal/seperator'
import { ScrollArea } from '@radix-ui/react-scroll-area'

const ReviewCard = ({
  review,
  width = 320,
  className,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  review: ReviewResult
  width?: string | number
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <React.Fragment>
      <div
        style={{ maxWidth: width }}
        onClick={onOpen}
        aria-roledescription={'review'}
        className={cn(
          'flex flex-col gap-2 p-3 rounded-large bg-white/[.08] w-full cursor-pointer',
          className,
        )}
        {...props}
      >
        <Ratings size={'md'} rating={review.author_details.rating} />
        <p
          className={
            'text-xs font-semibold text-white/50 leading-none overflow-hidden truncate w-full line-clamp-1 pt-1'
          }
        >
          {review.author}, {formatDateDifference(review.created_at)}
        </p>
        <div
          dangerouslySetInnerHTML={{ __html: review.content }}
          className={
            'w-full text-sm font-normal text-balance text-white leading-[1.3em] min-h-[calc(4*1.3em)] truncate line-clamp-4'
          }
        />
      </div>
      <Modal
        size={'sm'}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop={'blur'}
        classNames={{
          base: 'bg-[#0D0D0E]',
          backdrop: 'bg-black/80',
          closeButton:
            'hover:bg-white/15 active:bg-white/20 transition-all top-2 right-2 z-[99] p-3 child:w-5 child:h-5 child:hover:text-white child:md:text-white/75 child:text-white',
        }}
      >
        <ModalContent className={'h-[40rem] !relative flex overflow-hidden'}>
          {(onClose) => (
            <React.Fragment>
              <ModalHeader className={'flex flex-col w-full'}>
                <Ratings size={'md'} rating={review.author_details.rating} />
                <p
                  className={
                    'text-sm font-medium text-white/50 leading-none pt-2 cursor-default'
                  }
                >
                  {review.author}, {formatDateDifference(review.created_at)}
                </p>
              </ModalHeader>
              <Seperator className={'border-white/10'} />
              <ScrollArea
                className={
                  'relative h-[40rem] lg:w-[384px] w-full rounded-large p-[1px] z-10 child:absolute child:top-0 child:right-0 child:bottom-0 child:left-0'
                }
              >
                <ModalBody
                  className={
                    'w-full h-[40rem] overflow-y-scroll disable-scrollbar'
                  }
                >
                  <div
                    className={
                      'w-full text-base font-normal text-balance text-white pt-2 pb-[9rem]'
                    }
                    dangerouslySetInnerHTML={{ __html: review.content }}
                  />
                </ModalBody>
              </ScrollArea>
              <Seperator className={'border-white/10'} />
              <ModalFooter
                className={'bg-[#0D0D0E] z-20 px-2 py-3 border-white/10'}
              >
                <Button
                  className={'w-full !bg-transparent !border-transparent'}
                  variant={'ghost'}
                  onPress={onClose}
                >
                  Dismiss
                </Button>
              </ModalFooter>
            </React.Fragment>
          )}
        </ModalContent>
      </Modal>
    </React.Fragment>
  )
}

export default ReviewCard
