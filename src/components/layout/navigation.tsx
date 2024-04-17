import { cn } from '@nextui-org/react'
import { Url } from 'next/dist/shared/lib/router/router'
import { Clapperboard, Flame, Github, LucideIcon, Search } from 'lucide-react'
import {
  DetailedHTMLProps,
  HTMLAttributeAnchorTarget,
  HTMLAttributes,
  LiHTMLAttributes,
} from 'react'
import { useTranslations } from 'next-intl'
import { Tooltip } from '@nextui-org/react'
import { Link } from '@/components/i18n/navigation'
import LangSwitch from '../i18n/lang-switch'

const NavigationItem = ({
  content,
  href,
  Icon,
  active = false,
  target = '_self',
  width,
  height,
  className,
  ...props
}: DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement> & {
  content: string
  href: Url
  Icon: LucideIcon
  active?: boolean
  target?: HTMLAttributeAnchorTarget
  width?: string | number
  height?: string | number
}) => {
  const t = useTranslations('navigation')
  return (
    <li className={cn('mb-6', className)} {...props}>
      <Tooltip
        showArrow
        placement={'right'}
        content={t(content)}
        classNames={{
          base: ['before:bg-neutral-100 dark:before:bg-white'],
          content: [
            'py-2 px-4 shadow-xl text-black text-[13px] font-semibold',
            'bg-gradient-to-br from-white to-neutral-100 rounded-lg',
          ],
        }}
      >
        <span className={'inline-block'}>
          <Link
            href={href}
            target={target}
            className={cn(
              'group relative inline-block rounded-md p-2 transition-all',
              active ? 'bg-white/10' : 'hover:bg-white/10',
            )}
          >
            <Icon
              width={width}
              height={height}
              className={cn(
                'group-hover:opacity-100 transition-all',
                active ? 'opacity-100' : 'opacity-60',
              )}
            />
          </Link>
        </span>
      </Tooltip>
    </li>
  )
}

const Navigation = ({
  className,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>) => {
  return (
    <nav
      className={cn(
        'lg:w-24 fixed w-full z-20 lg:min-h-screen lg:border-r lg:border-white/10',
        className,
      )}
      {...props}
    >
      <div
        className={
          'hidden flex-1 flex-col items-center justify-between lg:flex h-screen'
        }
      >
        <ul className={'flex flex-col items-center pt-8'}>
          <NavigationItem
            href={'/'}
            content={'home'}
            width={22}
            height={22}
            Icon={Clapperboard}
            active
          />
          <NavigationItem
            href={'/search'}
            content={'search'}
            width={24}
            height={24}
            Icon={Search}
          />
          <NavigationItem
            href={'/trending'}
            content={'trending'}
            width={26}
            height={26}
            Icon={Flame}
          />
        </ul>
        <ul className={'flex flex-col items-center pb-6'}>
          <NavigationItem
            href={'/https://github.com'}
            target={'_blank'}
            content={'github'}
            width={22}
            height={22}
            Icon={Github}
          />
          <LangSwitch />
        </ul>
      </div>
    </nav>
  )
}

export default Navigation
