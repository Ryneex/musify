'use client'

import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Song from '@/types/song.types'
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight, MdOutlinePauseCircle } from 'react-icons/md'
import player from '@/store/player.store'
import { useSnapshot } from 'valtio'
import { FaRegCirclePlay } from 'react-icons/fa6'

type Props = {
    songs: Song[]
}

export default function SongsSlider({ songs }: Props) {
    const { currentSong, Playing } = useSnapshot(player)
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: 'start',
        slidesToScroll: 3,
        watchDrag: false,
    })

    return (
        <div className="overflow-hidden">
            <div className="flex items-center justify-between">
                <h2 className="mb-4 text-xl font-bold text-black/95 dark:text-white/85">Trending Songs</h2>
                <div className="flex select-none gap-2 text-2xl text-black/60 dark:text-white/60">
                    <MdOutlineKeyboardArrowLeft className="cursor-pointer" onClick={() => emblaApi?.scrollPrev()} />
                    <MdOutlineKeyboardArrowRight className="cursor-pointer" onClick={() => emblaApi?.scrollNext()} />
                </div>
            </div>
            <div ref={emblaRef}>
                <div className="flex gap-4">
                    {songs.map((e) => (
                        <div
                            key={e.id}
                            className="group relative flex shrink-0 basis-[160px] flex-col gap-1 overflow-hidden rounded-2xl border border-black/10 bg-black/[0.01] p-3 backdrop-blur-lg transition duration-300 hover:bg-black/[0.08] dark:border-white/10 dark:bg-white/[0.05] dark:hover:bg-white/[0.08] xl:basis-[200px]"
                        >
                            <div className="relative w-full select-none overflow-hidden rounded-xl">
                                <img className="aspect-square w-full object-cover" src={e.image} alt={e.song} />
                                <div
                                    className={`absolute left-0 top-0 flex h-full w-full items-center justify-center bg-black/70 opacity-0 transition duration-300 group-hover:opacity-100 ${currentSong.id === e.id && 'opacity-100'}`}
                                >
                                    <div
                                        onClick={() => {
                                            player.currentSong = e
                                            player.SongList = songs
                                            player.togglePlay()
                                        }}
                                        className="cursor-pointer text-4xl text-blue-400 transition duration-300 hover:scale-110"
                                    >
                                        {currentSong.id === e.id && Playing ? (
                                            <MdOutlinePauseCircle className="text-[45px]" />
                                        ) : (
                                            <FaRegCirclePlay />
                                        )}
                                    </div>
                                </div>
                            </div>
                            <span className="truncate px-1 pt-3 text-sm text-black/90 dark:text-white/90">
                                {e.song}
                            </span>
                            <span className="truncate pl-1 text-xs text-black/70 dark:text-white/70">
                                By {e.primary_artists}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
