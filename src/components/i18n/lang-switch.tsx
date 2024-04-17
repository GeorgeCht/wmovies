'use client'

import React from 'react'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from '@nextui-org/react'
import {
  useRouter,
  usePathname,
  localeNames,
  locales,
} from '@/components/i18n/navigation'
import { useLocale } from 'next-intl'

const LangSwitch = () => {
  const locale = useLocale()
  const router = useRouter()
  const pathName = usePathname()

  // @see: https://next-intl-docs.vercel.app/docs
  const switchLocale = (locale: string) => {
    router.push(pathName, { locale: locale })
    router.refresh()
  }

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          className={
            'bg-white/10 text-tiny uppercase rounded-full font-bold min-w-unit-md h-unit-8'
          }
        >
          {locale}
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label={'Language Switcher'}>
        <DropdownItem
          key={localeNames.en}
          onClick={() => switchLocale(locales[0])}
        >
          {localeNames.en}
        </DropdownItem>
        <DropdownItem
          key={localeNames.de}
          onClick={() => switchLocale(locales[1])}
        >
          {localeNames.de}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}

export default LangSwitch
