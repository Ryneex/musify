'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { BiAlbum, BiHeart } from 'react-icons/bi'
import { GoHome } from 'react-icons/go'

export default function Sidebar() {
    const pathname = usePathname()

    useEffect(() => {
        console.log(pathname)
    }, [pathname])

    const links = [
        { name: 'Discover', href: '/', icon: <GoHome /> },
        { name: 'Top Albums', href: '/albums', icon: <BiAlbum /> },
        { name: 'Favourite', href: '/favourite', icon: <BiHeart /> },
    ]

    return (
        <div className="border-r-2 border-black/10 px-3 py-2 backdrop-blur-md dark:border-white/10">
            <h1 className="text-2xl font-bold text-black/90 dark:text-white/90">Musify</h1>
            <div className="mt-5 flex flex-col gap-1 font-medium text-black/80 dark:font-normal dark:text-white/80">
                {links.map((link, i) => (
                    <Link
                        key={i}
                        href={link.href}
                        className={`flex h-8 items-center gap-2 rounded-md hover:bg-black/5 dark:hover:bg-white/5 ${pathname === link.href && ' text-blue-600 dark:text-blue-400'}`}
                    >
                        <div className="text-xl">{link.icon}</div>
                        {link.name}
                    </Link>
                ))}
            </div>
        </div>
    )
}
