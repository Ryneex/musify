import Player from '@/components/dashboard/player/Player'
import Sidebar from '@/components/dashboard/Sidebar'
import TopNavigation from '@/components/dashboard/TopNavigation'
import { ReactNode } from 'react'

export default function layout({ children }: { children: ReactNode }) {
    return (
        <div className="grid h-screen grid-cols-[250px_1fr] grid-rows-[60px_1fr_65px] bg-slate-50 text-black dark:text-white dark:bg-black">
            <Sidebar />
            <TopNavigation />
            {children}
            <Player />
        </div>
    )
}
