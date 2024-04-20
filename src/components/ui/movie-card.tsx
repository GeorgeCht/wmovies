'use client'

import React, { memo } from 'react'
import { Card, Image, Chip, cn } from '@nextui-org/react'
import { Link } from '../i18n/navigation'
import { Root as AspectRatio } from '@radix-ui/react-aspect-ratio'

const MovieCard = memo(
  ({
    id,
    image,
    title,
    releaseYear,
    className,
  }: {
    id: number
    image: string
    title: string
    releaseYear: string
    className?: string
    width?: string | number
    height?: string | number
  }) => {
    return (
      <Link
        scroll={false}
        href={`/movie/${String(id)}`}
        className={cn('group block w-full relative', className)}
        aria-roledescription={'movie-card'}
      >
        <Card radius={'lg'} className={'relative border-none'}>
          <AspectRatio ratio={3 / 4.5}>
            <Image
              alt={title}
              loading={'lazy'}
              className={
                'object-cover group-hover:scale-[1.015] !duration-700 w-full h-full'
              }
              src={`https://image.tmdb.org/t/p/w342${image}`}
            />
          </AspectRatio>
          <Chip
            size={'sm'}
            classNames={{
              base: 'absolute top-0 left-0 z-10 backdrop-blur bg-black/25 px-2 py-4 m-2.5',
              content: 'font-semibold tracking-tight cursor-default',
            }}
          >
            {releaseYear}
          </Chip>
        </Card>
        <h3
          className={
            'text-balance text-lg leading-none text-white line-clamp-2 pt-4 max-w-[300px]'
          }
        >
          {title}
        </h3>
      </Link>
    )
  },
)

MovieCard.displayName = 'MovieCard'

export default MovieCard
