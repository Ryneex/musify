import Song from '@/types/song.types'
import SongsTableRow from './SongsTableRow'

type Props = {
    songs: Song[] | undefined
}

export default function SongsTable({ songs = [] }: Props) {
    if (songs.length === 0) return
    return (
        <div className="flex w-full flex-col gap-5 pr-5 overflow-hidden">
            <div className="flex border-b-[1px] border-black/20 pb-3 text-black/70 dark:border-white/30 dark:text-white/70">
                <div className="w-full max-w-7 text-end">#</div>
                <div className="w-full pl-4">Title</div>
                <div className="w-full max-w-40 pr-2 text-end">Duration</div>
            </div>
            <div className="flex flex-col gap-3 overflow-scroll">
                {songs.map((song, i) => (
                    <SongsTableRow key={i} i={i + 1} song={song} songList={songs} />
                ))}
            </div>
        </div>
    )
}
