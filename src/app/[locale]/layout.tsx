import { locales } from '@/components/i18n/navigation'
import { unstable_setRequestLocale } from 'next-intl/server'
import React from 'react'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

// @see: https://next-intl-docs.vercel.app/docs/getting-started/app-router#static-rendering
export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  unstable_setRequestLocale(locale)

  return <React.Fragment>{children}</React.Fragment>
}
