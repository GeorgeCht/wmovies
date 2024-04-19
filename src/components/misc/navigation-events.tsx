'use client'

import { useEffect } from 'react'
import { usePathname } from '@/components/i18n/navigation'
import useInterceptorStore from '@/stores/interceptor'

const NavigationEvents = () => {
  const pathname = usePathname()
  const { pushUrl } = useInterceptorStore()

  useEffect(() => {
    pushUrl(pathname)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return null
}

export { NavigationEvents }
