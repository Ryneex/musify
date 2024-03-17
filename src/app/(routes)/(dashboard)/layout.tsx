import Player from '@/components/dashboard/player/Player'
import Sidebar from '@/components/dashboard/Sidebar'
import { ReactNode } from 'react'

export default function layout({ children }: { children: ReactNode }) {
    return (
        <div className="grid h-screen grid-cols-[250px_1fr] grid-rows-[1fr_65px] bg-slate-50 text-black dark:bg-black">
            <Sidebar />
            {children}
            <Player />
        </div>
    )
}
