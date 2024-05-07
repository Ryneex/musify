'use client'

import { MdNightsStay, MdOutlineLightMode } from 'react-icons/md'
import Searchbar from './Searchbar'
import userStore from '@/store/user.store'
import ProfileButton from './ProfileButton'
import { FaGithub } from 'react-icons/fa6'
import Link from 'next/link'

export default function TopNavigation() {
    return (
        <div className="flex items-center justify-between gap-3 px-2 sm:px-5">
            <Searchbar />
            <Link className='hidden sm:block' href="https://github.com/Ryneex/Musify" target="_blank">
                <FaGithub className="text-4xl" />
            </Link>
            <div onClick={() => userStore.toggleTheme()} className="hidden aspect-square h-full max-h-9 cursor-pointer select-none items-center justify-center rounded-full bg-black/5 text-2xl hover:bg-black/10 dark:bg-white/20 dark:hover:bg-white/30 sm:flex">
                <MdNightsStay className="hidden dark:block" />
                <MdOutlineLightMode className="block dark:hidden" />
            </div>
            <div className="hidden aspect-square h-9 shrink-0 sm:block">
                <ProfileButton />
            </div>
        </div>
    )
}
