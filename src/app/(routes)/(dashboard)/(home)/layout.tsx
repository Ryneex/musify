import { ReactNode } from 'react'
import Searchbar from './Searchbar'
import { FiSearch } from 'react-icons/fi'

export default function layout({ children }: { children: ReactNode }) {
    return (
        <div className="flex flex-col gap-4 overflow-auto px-10 py-4">
            <div className="relative">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-black/60 dark:text-white/60" />
                <Searchbar />
            </div>
            {children}
        </div>
    )
}
