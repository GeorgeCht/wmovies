import { createSharedPathnamesNavigation } from 'next-intl/navigation'

export const locales = ['en', 'de'] as const
export const localeNames: Record<string, string> = {
  en: 'English',
  de: 'Deutsch',
}
export const localePrefix = 'always'

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales, localePrefix })
