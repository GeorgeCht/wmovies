'use client'

import React, { useState } from 'react'
import Image from 'next/image'

import { Card, Chip, cn } from '@nextui-org/react'
import { Link } from '../i18n/navigation'
import { Root as AspectRatio } from '@radix-ui/react-aspect-ratio'

const MovieCard = ({
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
  const [isLoaded, setIsLoaded] = useState(false)
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
            fill
            alt={title}
            loading={'lazy'}
            onLoad={() => setIsLoaded(true)}
            className={'object-cover group-hover:scale-[1.015] !duration-700'}
            src={`https://image.tmdb.org/t/p/w342${image}`}
          />
          <div
            className={cn(
              'w-full h-full absolute inset-0 z-10 bg-black/15 transition-all !duration-500',
              isLoaded
                ? 'opacity-0 backdrop-blur-none'
                : 'opacity-100 backdrop-blur',
            )}
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
}

export default MovieCard
