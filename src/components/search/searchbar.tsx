'use client'

import { Input, cn } from '@nextui-org/react'
import { useDebounce } from '@uidotdev/usehooks'
import { Search } from 'lucide-react'
import { DetailedHTMLProps, HTMLAttributes, useEffect, useState } from 'react'
import { usePathname, useRouter } from '../i18n/navigation'
import { useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'

const SearchBar = ({
  className,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
  // @see: https://nextui.org/docs/components/input#controlled
  const [searchTerm, setSearchTerm] = useState('')
  const { replace } = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const tActions = useTranslations('actions')

  // Resets form value based on search params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const searchValue = params.get('search') || ''
    setSearchTerm(searchValue)
  }, [])

  // const handleSearch = useDebounce(
  //   (term: string) => {
  //     const params = new URLSearchParams(searchParams)
  //     const value = term.trim()
  //     value ? params.set('search', term) : params.delete('search')
  //     replace(`${pathname}?${params.toString()}`)
  //   },
  //   searchTerm.length >= 3 ? 700 : 0,
  // )

  const handleChange = (value: string) => {
    setSearchTerm(value)
    // handleSearch(value)
  }
  return (
    <div className={cn('flex w-full sm:max-w-96 mb-6', className)} {...props}>
      <Input
        type={'text'}
        placeholder={tActions('search')}
        isClearable
        radius={'full'}
        value={searchTerm}
        // onValueChange={handleChange}
        classNames={{
          input: ['bg-transparent text-white/90', 'placeholder:text-white/60'],
          innerWrapper: 'bg-transparent',
          inputWrapper: [
            'bg-white/15 backdrop-blur sm:h-unit-12 h-unit-10 sm:px-5 px-4',
            'data-[hover=true]:bg-white/20 !cursor-text',
            'group-data-[focus=true]:bg-white/20',
          ],
        }}
        startContent={
          <Search
            className={
              'text-neutral-400 pointer-events-none flex-shrink-0 -ml-1 pr-0.5'
            }
          />
        }
      />
    </div>
  )
}

export default SearchBar
