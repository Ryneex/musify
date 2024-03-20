'use client'

import player from '@/store/player.store'
import Song from '@/types/song.types'
import { Duration } from 'luxon'
import React, { useMemo } from 'react'
import { IoIosPause } from 'react-icons/io'
import { IoPlayOutline } from 'react-icons/io5'
import { useSnapshot } from 'valtio'
type Props = {
    song: Song
    i: number
    songList: Song[]
}
export default function SongsTableRow({ song, i, songList = [] }: Props) {
    const { currentSong, Playing } = useSnapshot(player)
    const duration = useMemo(() => {
        const time = Duration.fromObject({ second: Number(song?.duration) || 0 }).toFormat('mm:ss')
        return time
    }, [song])
    return (
        <div
            className="flex cursor-pointer rounded-md py-4 pr-3 hover:bg-black/5 dark:hover:bg-white/5"
            key={song.id}
            onClick={() => {
                player.currentSong = song
                player.SongList = songList
            }}
        >
            <div className="flex w-full max-w-7 items-center justify-end text-sm text-black/70 dark:text-white/60">
                {currentSong.id === song.id ? (
                    <div
                        className={`select-none ${currentSong.id === song.id && '!text-blue-600 dark:!text-blue-400'}`}
                        onClick={() => player.togglePlay()}
                    >
                        {Playing ? <IoIosPause className="text-[20px]" /> : <IoPlayOutline className="text-[20px]" />}
                    </div>
                ) : (
                    <span className="mr-1">{i}</span>
                )}
            </div>
            <div className="flex w-full flex-col justify-center gap-2 pl-4">
                <span
                    className={`truncate text-sm font-medium leading-[15px] text-black/90 dark:font-normal dark:text-white/90 ${currentSong.id === song.id && '!text-blue-600 dark:!text-blue-400'}`}
                >
                    {song.name}
                </span>
                <span className="truncate text-xs leading-[9px] text-black/80 dark:text-white/50">
                    {Array.isArray(song?.artists?.primary) ? song?.artists?.primary[0].name : 'unknown'}
                </span>
            </div>
            <div className="flex w-full max-w-40 items-center justify-end text-sm text-black/80 dark:text-white/60">
                {duration}
            </div>
        </div>
    )
}
