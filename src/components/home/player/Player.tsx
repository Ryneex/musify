'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Slider } from '@/components/home/player/slider'
import { IoPlayOutline } from 'react-icons/io5'
import { MdSkipNext, MdSkipPrevious } from 'react-icons/md'
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
    const { currentSong, Playing } = useSnapshot(player)

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
        if (!currentSong.download_url) return
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

    return (
        <div className="col-span-2 flex  select-none items-center justify-center gap-2 border-t-2 border-black/10 dark:border-white/10">
            <audio onTimeUpdate={updateSliderValue} ref={audioRef} src={currentSong.download_url}></audio>
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
        </div>
    )
}
