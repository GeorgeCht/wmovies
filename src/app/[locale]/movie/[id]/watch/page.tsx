import WatchWrapper from '@/components/layout/watch-wrapper'
import MediaPlayer from '@/components/ui/media-player'
import React from 'react'

const Page = ({ params }: { params: { id: string } }) => {
  return (
    <React.Fragment>
      <WatchWrapper />
      <MediaPlayer mediaType={'movie'} id={params.id} />
    </React.Fragment>
  )
}

export default Page
