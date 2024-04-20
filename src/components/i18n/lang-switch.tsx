'use client'

import React from 'react'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Avatar,
} from '@nextui-org/react'
import {
  useRouter,
  usePathname,
  localeNames,
  locales,
} from '@/components/i18n/navigation'
import { useLocale } from 'next-intl'
import { ChevronDown } from 'lucide-react'

const LangSwitch = ({ extended }: { extended?: boolean }) => {
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
        {extended ? (
          <Button
            className={'bg-white/15 rounded-[10px] w-40 flex justify-between'}
            endContent={
              <ChevronDown strokeWidth={2.5} className={'w-3.5 h-3.5'} />
            }
          >
            {localeNames[locale]}
          </Button>
        ) : (
          <Button
            className={
              'bg-white/10 text-tiny uppercase rounded-full font-bold min-w-unit-md h-unit-8'
            }
          >
            {locale}
          </Button>
        )}
      </DropdownTrigger>
      <DropdownMenu aria-label={'Language Switcher'}>
        <DropdownItem
          key={localeNames.en}
          onClick={() => switchLocale(locales[0])}
          startContent={
            <Avatar
              alt={localeNames.en}
              className={'w-4 h-4'}
              src={'https://flagcdn.com/gb.svg'}
            />
          }
        >
          {localeNames.en}
        </DropdownItem>
        <DropdownItem
          key={localeNames.de}
          onClick={() => switchLocale(locales[1])}
          startContent={
            <Avatar
              alt={localeNames.de}
              className={'w-4 h-4'}
              src={'https://flagcdn.com/de.svg'}
            />
          }
        >
          {localeNames.de}
        </DropdownItem>
        <DropdownItem
          key={localeNames.es}
          onClick={() => switchLocale(locales[2])}
          startContent={
            <Avatar
              alt={localeNames.es}
              className={'w-4 h-4'}
              src={'https://flagcdn.com/es.svg'}
            />
          }
        >
          {localeNames.es}
        </DropdownItem>
        <DropdownItem
          key={localeNames.el}
          onClick={() => switchLocale(locales[3])}
          startContent={
            <Avatar
              alt={localeNames.el}
              className={'w-4 h-4'}
              src={'https://flagcdn.com/gr.svg'}
            />
          }
        >
          {localeNames.el}
        </DropdownItem>
        <DropdownItem
          key={localeNames.zh}
          onClick={() => switchLocale(locales[4])}
          startContent={
            <Avatar
              alt={localeNames.zh}
              className={'w-4 h-4'}
              src={'https://flagcdn.com/cn.svg'}
            />
          }
        >
          {localeNames.zh}
        </DropdownItem>
        <DropdownItem
          key={localeNames.ko}
          onClick={() => switchLocale(locales[5])}
          startContent={
            <Avatar
              alt={localeNames.ko}
              className={'w-4 h-4'}
              src={'https://flagcdn.com/kr.svg'}
            />
          }
        >
          {localeNames.ko}
        </DropdownItem>
        <DropdownItem
          key={localeNames.ja}
          onClick={() => switchLocale(locales[6])}
          startContent={
            <Avatar
              alt={localeNames.ja}
              className={'w-4 h-4'}
              src={'https://flagcdn.com/jp.svg'}
            />
          }
        >
          {localeNames.ja}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}

export default LangSwitch
