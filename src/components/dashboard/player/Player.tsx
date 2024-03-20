'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Slider } from '@/components/dashboard/player/slider'
import { IoPlayOutline, IoShuffle, IoVolumeMedium, IoVolumeMute } from 'react-icons/io5'
import { MdSkipNext, MdSkipPrevious, MdVolumeOff, MdVolumeUp } from 'react-icons/md'
import { IoIosPause } from 'react-icons/io'
import { Duration } from 'luxon'
import { useSnapshot } from 'valtio'
import player from '@/store/player.store'

export default function Player() {
    const audioRef = useRef(null as unknown as HTMLAudioElement)
    const audio = audioRef.current
    const [sliderValue, setSliderValue] = useState(0)
    const [isPointerDown, setIsPointerDown] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const { currentSong, Playing, volume, shuffle } = useSnapshot(player)

    // Formats song Duration
    const duration = useMemo(() => {
        const time = Duration.fromObject({ second: Number(currentSong.duration) || 0 }).toFormat('mm:ss')
        return time
    }, [currentSong])

    // Formats currentTime
    const formattedCurrentTime = useMemo(() => {
        const time = Duration.fromObject({ second: currentTime }).toFormat('mm:ss')
        return time
    }, [currentTime])

    // Handles Playback
    useEffect(() => {
        if (!audio) return
        Playing && isPointerDown === false ? audio.play().catch(() => null) : audio.pause()
    }, [Playing, audio, isPointerDown, currentSong])

    // Resets currentTime , SliderValue and plays the song when currentSong changes
    useEffect(() => {
        if (!currentSong.downloadUrl) return
        setSliderValue(0)
        setCurrentTime(0)
        player.Playing = true
    }, [currentSong])

    // Syncs Slider position based on songs currentTime
    function updateSliderValue() {
        if (isPointerDown || !audio?.duration) return
        setSliderValue((audio.currentTime / audio.duration) * 100)
        setCurrentTime(audio.currentTime)
    }

    // Updates songs currentTime when slider value changes
    function updateCurrentTime([e]: any) {
        if (!audio?.duration) return
        setSliderValue(e)
        audio.currentTime = (e / 100) * audio.duration
        setCurrentTime(audio.currentTime)
    }

    //Volume controls
    useEffect(() => {
        if (audio?.volume === undefined) return
        audio.volume = volume
    }, [volume, audio])

    useEffect(() => {
        player.volume = Number(localStorage.getItem('volume') || 1)
    }, [])

    return (
        <div className="col-span-2 flex  select-none items-center justify-between gap-2 border-t-2 border-black/10 dark:border-white/10">
            <audio
                onTimeUpdate={updateSliderValue}
                ref={audioRef}
                src={
                    Array.isArray(currentSong.downloadUrl)
                        ? currentSong.downloadUrl[currentSong.downloadUrl.length - 1].url
                        : ''
                }
                onEnded={() => {
                    player.addToPlayedSong(currentSong.id)
                    player.songEnded()
                }}
            ></audio>
            <div className="flex basis-1/6 items-center gap-2 pl-5">
                <div className="aspect-square h-9 overflow-hidden rounded-md bg-gray-400">
                    <img
                        src={
                            Array.isArray(currentSong.image) ? currentSong.image[currentSong.image.length - 1].url : ''
                        }
                        alt=""
                    />
                </div>
                <div className="flex flex-col">
                    <span className="truncate text-sm font-medium text-black/90 dark:font-normal dark:text-white/90">
                        {currentSong.name || 'No Name'}
                    </span>
                    <span className="truncate text-xs text-black/80 dark:text-white/60">
                        {Array.isArray(currentSong?.artists?.primary)
                            ? currentSong?.artists?.primary[0].name
                            : 'unknown'}
                    </span>
                </div>
            </div>
            <div className="flex max-w-3xl basis-full gap-6">
                <div className="flex items-center gap-3 text-2xl text-black/90 dark:text-white/90">
                    <MdSkipPrevious onClick={() => player.playPrevSong()} className="cursor-pointer" />
                    <div
                        className="flex aspect-square w-6 cursor-pointer items-center justify-center overflow-hidden rounded-full"
                        onClick={() => audio?.src && player.togglePlay()}
                    >
                        {Playing ? (
                            <IoIosPause className="text-[20px]" />
                        ) : (
                            <IoPlayOutline className="ml-1 text-[20px]" />
                        )}
                    </div>
                    <MdSkipNext onClick={() => player.playNextSong()} className="cursor-pointer" />
                </div>
                <div className="flex basis-full items-center gap-3">
                    <span className="text-xs text-black/90 dark:text-white/50">{formattedCurrentTime}</span>
                    <Slider
                        onPointerDown={(e) => e.button === 0 && setIsPointerDown(true)}
                        onPointerUp={(e) => e.button === 0 && setIsPointerDown(false)}
                        onValueChange={updateCurrentTime}
                        value={[sliderValue]}
                        max={100}
                        step={0.1}
                    />
                    <span className="text-xs text-black/90 dark:text-white/50">{duration}</span>
                </div>
            </div>
            <div className="flex basis-1/6 items-center justify-end">
                <div className="flex items-center gap-2 pr-5">
                    <IoShuffle
                        onClick={() => player.toggleShuffle()}
                        className={`text-2xl cursor-pointer ${shuffle && 'text-blue-600 dark:text-blue-400'}`}
                    />
                    <div className="text-2xl cursor-pointer" onClick={() => player.toggleVolume()}>
                        {volume === 0 ? <MdVolumeOff /> : <MdVolumeUp />}
                    </div>
                    <Slider
                        className="w-24"
                        onValueChange={([e]) => {
                            localStorage.setItem('volume', String(e))
                            player.volume = e
                        }}
                        value={[volume]}
                        max={1}
                        min={0}
                        step={0.01}
                    />
                </div>
            </div>
        </div>
    )
}
