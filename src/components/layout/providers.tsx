'use client'

import * as React from 'react'
import { NextUIProvider } from '@nextui-org/system'
import { QueryClient } from '@tanstack/react-query'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { NavigationEvents } from '@/components/misc/navigation-events'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 60 * 24, // 24 hour
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
})

const localStoragePersister = createSyncStoragePersister({
  storage: typeof window !== 'undefined' ? window.localStorage : undefined,
})

const Providers = ({ children }: React.PropsWithChildren) => {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister: localStoragePersister,
      }}
    >
      <NextUIProvider>{children}</NextUIProvider>
      <React.Suspense fallback={null}>
        <NavigationEvents />
      </React.Suspense>
    </PersistQueryClientProvider>
  )
}

export default Providers
