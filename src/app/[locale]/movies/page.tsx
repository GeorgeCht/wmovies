'use client'

import React from 'react'
import MoviesPage from '@/components/pages/movies'

export default function Page({ params }: { params: { locale: string } }) {
  return (
    <React.Fragment>
      <MoviesPage locale={params.locale} />
    </React.Fragment>
  )
}
