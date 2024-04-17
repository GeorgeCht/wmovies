'use client'

import { useRestoreScroll } from '@/lib/hooks'
import React from 'react'

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  useRestoreScroll()
  return <React.Fragment>{children}</React.Fragment>
}

export default PageWrapper
