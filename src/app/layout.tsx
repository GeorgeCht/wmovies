import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { cn } from '@nextui-org/react'

import Providers from '@/components/layout/providers'
import Navigation from '@/components/layout/navigation'
import SearchBar from '@/components/search/searchbar'
import ProgressiveBackground from '@/components/layout/progressive-bg'
import './globals.css'

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

export default function LocaleLayout({
  children,
  modal,
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  return (
    <html>
      <body className={cn(inter.className, 'dark bg-black min-h-screen')}>
        <Providers>
          <Navigation />
          <div className={'w-full h-full'}>
            <ProgressiveBackground />
            <div
              className={
                'fixed block w-full h-full top-0 left-0 bg-gradient-to-t from-black to-black/40'
              }
            />
            <main
              className={
                'relative lg:py-8 py-5 xl:px-24 lg:px-16 px-5 ml-0 lg:ml-24'
              }
            >
              <SearchBar />
              {children}
              {modal}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  )
}
