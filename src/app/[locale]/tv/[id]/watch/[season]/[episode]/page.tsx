import WatchWrapper from '@/components/layout/watch-wrapper'
import MediaPlayer from '@/components/ui/media-player'
import React from 'react'

const Page = ({
  params,
}: {
  params: { id: string; season: string; episode: string }
}) => {
  return (
    <React.Fragment>
      <WatchWrapper />
      <MediaPlayer
        mediaType={'tv'}
        id={params.id}
        season={params.season}
        episode={params.episode}
      />
    </React.Fragment>
  )
}

export default Page
