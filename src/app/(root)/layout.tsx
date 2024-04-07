import Player from '@/components/root/player/Player'
import Sidebar from '@/components/root/Sidebar'
import TopNavigation from '@/components/root/TopNavigation'
import { ReactNode } from 'react'
import AuthProvider from '@/components/AuthProvider/AuthProvider'

export default async function layout({ children }: { children: ReactNode }) {
    return (
        <AuthProvider>
            <div className="grid h-screen grid-cols-[45px_1fr] grid-rows-[50px_1fr_65px] bg-slate-50 dark:bg-zinc-950 sm:grid-rows-[60px_1fr_65px] lg:grid-cols-[250px_1fr]">
                <Sidebar />
                <TopNavigation />
                {children}
                <Player />
            </div>
        </AuthProvider>
    )
}
