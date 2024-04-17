'use client'

import { Input, cn } from '@nextui-org/react'
import { Search } from 'lucide-react'
import { DetailedHTMLProps, HTMLAttributes, useState } from 'react'

const SearchBar = ({
  className,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
  // @see: https://nextui.org/docs/components/input#controlled
  const [value, setValue] = useState('')

  return (
    <div className={cn('flex w-full sm:max-w-96 mb-6', className)} {...props}>
      <Input
        type={'text'}
        placeholder={'Search movies and tv series'}
        isClearable
        radius={'full'}
        value={value}
        onValueChange={setValue}
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
