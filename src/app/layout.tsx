import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { cn } from '@nextui-org/react'
import { NextIntlClientProvider, useMessages } from 'next-intl'

import NoSsr from '@/components/misc/no-ssr'
import Providers from '@/components/layout/providers'
import Navigation from '@/components/layout/navigation'
import SearchBar from '@/components/search/searchbar'
import ProgressiveBackground from '@/components/layout/progressive-bg'

import './globals.css'
import MainWrapper from '@/components/layout/main-wrapper'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'WMovies | by GeorgeCht',
  description: 'Watch your favorite movies online',
  keywords: 'movies, watch, streaming, streaming movies',
}

export const viewport: Viewport = {
  themeColor: 'dark',
  width: 'device-width',
  initialScale: 1,
}

export default function Layout({
  children,
  modal,
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  const messages = useMessages()

  return (
    <html>
      <body className={cn(inter.className, 'dark bg-black min-h-screen')}>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <Navigation />
            <div className={'w-full h-full'}>
              <ProgressiveBackground />
              <div
                className={
                  'fixed block w-full h-full top-0 left-0 bg-gradient-to-t from-black to-black/40'
                }
              />
              <MainWrapper>
                <SearchBar />
                {children}
                <NoSsr>{modal}</NoSsr>
              </MainWrapper>
            </div>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
