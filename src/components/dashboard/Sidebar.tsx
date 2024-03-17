import Link from 'next/link'
import { BiAlbum, BiHeart } from 'react-icons/bi'
import { GoHome } from 'react-icons/go'

export default function Sidebar() {
    return (
        <div className="border-r-2 border-black/10 px-3 py-2 backdrop-blur-md dark:border-white/10">
            <h1 className="text-2xl font-bold text-black/90 dark:text-white/90">Musify</h1>
            <div className="mt-5 flex flex-col gap-2 font-medium text-black/80 dark:font-normal dark:text-white/70">
                <Link href="/" className="flex items-center gap-2 hover:text-black dark:hover:text-white">
                    <GoHome className="text-xl" />
                    Discover
                </Link>
                <Link href="/" className="flex items-center gap-2 hover:text-black dark:hover:text-white">
                    <BiAlbum className="text-xl" />
                    Top Albums
                </Link>
                <Link href="/" className="flex items-center gap-2 hover:text-black dark:hover:text-white">
                    <BiHeart className="text-xl" />
                    Favourite
                </Link>
            </div>
        </div>
    )
}
