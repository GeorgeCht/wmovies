'use client'

import { useEffect } from 'react'
import useInterceptorStore from '@/stores/interceptor'
import { usePathname } from '@/components/i18n/navigation'

const NavigationEvents = () => {
  const pathname = usePathname()
  const { pushUrl } = useInterceptorStore()

  useEffect(() => {
    pushUrl(pathname)
  }, [pathname])

  return null
}

export { NavigationEvents }
