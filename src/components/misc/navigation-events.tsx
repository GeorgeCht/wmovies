'use client'

import { useEffect } from 'react'
import { usePathname } from '@/components/i18n/navigation'
import useInterceptorStore from '@/stores/interceptor'

const NavigationEvents = () => {
  const pathname = usePathname()
  const { pushUrl } = useInterceptorStore()

  // Prevent mobile zoom in
  // @see: https://github.com/vercel/next.js/discussions/39685
  // @see: https://stackoverflow.com/questions/11689353/disable-pinch-zoom-on-mobile-web/52201924#52201924
  useEffect(() => {
    document.addEventListener('gesturestart', function (e) {
      e.preventDefault()
      // @ts-expect-error
      document.body.style.zoom = 0.9999
    })

    document.addEventListener('gesturechange', function (e) {
      e.preventDefault()
      // @ts-expect-error
      document.body.style.zoom = 0.9999
    })
    document.addEventListener('gestureend', function (e) {
      e.preventDefault()
      // @ts-expect-error
      document.body.style.zoom = 1
    })
  }, [])

  useEffect(() => {
    pushUrl(pathname)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return null
}

export { NavigationEvents }
