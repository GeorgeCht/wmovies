import { Modal, ModalContent } from '@nextui-org/react'
import React, { useState } from 'react'
import EpisodeContent from './episode-content'

const EpisodePicker = ({
  id,
  detailsData,
  isOpen,
  // eslint-disable-next-line no-unused-vars
  onOpen,
  onOpenChange,
  setIsOpen,
}: {
  id: string
  detailsData: TvDetailsWithImageAndVideos
  isOpen: boolean
  onOpen: () => void
  // eslint-disable-next-line no-unused-vars
  onOpenChange?: ((isOpen: boolean) => void) | undefined
  // eslint-disable-next-line no-unused-vars
  setIsOpen?: (value: React.SetStateAction<boolean>) => void
}) => {
  const [season, setSeason] = useState(1)

  return (
    <Modal
      size={'xl'}
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
      <ModalContent className={'h-[75vh] !relative flex overflow-hidden'}>
        <EpisodeContent
          id={id}
          season={season}
          setSeason={setSeason}
          detailsData={detailsData}
          setIsOpen={setIsOpen}
        />
      </ModalContent>
    </Modal>
  )
}

export default EpisodePicker
