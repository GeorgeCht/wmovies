import { createSharedPathnamesNavigation } from 'next-intl/navigation'

export const locales = ['en', 'de', 'es', 'el', 'zh', 'ko', 'ja'] as const
export const localeNames: Record<string, string> = {
  en: 'English',
  de: 'Deutsch',
  es: 'Español',
  el: 'Ελληνικά',
  zh: '普通话',
  ko: '한국어',
  ja: '日本語',
}
export const localePrefix = 'always'

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales, localePrefix })
