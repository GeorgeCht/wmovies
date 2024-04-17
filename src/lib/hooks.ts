'use client'

import { useRouter } from 'next/router'
import { useEffect } from 'react'

export const useRestoreScroll = () => {
  const router = useRouter()
  useEffect(() => {
    // Scroll restoration fix @see: https://github.com/vercel/next.js/issues/20951#issuecomment-1003746732
    router.beforePopState((state) => {
      state.options.scroll = false
      return true
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
