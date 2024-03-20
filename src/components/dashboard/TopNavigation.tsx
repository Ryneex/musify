'use client'

import { MdNightsStay, MdOutlineLightMode } from 'react-icons/md'
import Searchbar from './Searchbar'
import user from '@/store/user.store'

export default function TopNavigation() {
    return (
        <div className="flex items-center justify-between gap-3 px-5 dark:text-white">
            <Searchbar />
            <div
                onClick={() => user.toggleTheme()}
                className="flex h-full max-h-9 cursor-pointer select-none items-center justify-center rounded-full hover:bg-black/10 dark:hover:bg-white/30 bg-black/5 dark:bg-white/20 aspect-square text-2xl"
            >
                <MdNightsStay className="hidden dark:block" />
                <MdOutlineLightMode className="block dark:hidden" />
            </div>
            <div className="flex aspect-square h-full max-h-9 select-none items-center justify-center rounded-full bg-blue-500 text-white">
                MI
            </div>
        </div>
    )
}
