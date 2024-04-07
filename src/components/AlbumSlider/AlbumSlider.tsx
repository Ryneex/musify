'use client'

import React, { useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md'
import AlbumType from '@/types/album.types'
import { RiExpandLeftRightFill, RiExpandUpDownFill } from 'react-icons/ri'
import Album from './Album'

type Props = {
    albums: AlbumType[] | undefined
    name: string
}

export default function AlbumSlider({ albums = [], name }: Props) {
    const [expanded, setExpanded] = useState(false)
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: 'start',
        slidesToScroll: 2,
    })

    // embla carousel gets glitched when we messup with flex-wrap, so we have to reinit it everytime
    useEffect(() => {
        emblaApi?.reInit()
    }, [expanded, emblaApi])
    if (albums.length === 0) return

    return (
        <div className="mr-2 flex-shrink-0 overflow-hidden sm:mr-5">
            <div className="mb-2 flex items-center gap-1 sm:mb-4 sm:gap-3">
                <h2 className="text-lg font-bold text-black/80 md:text-xl dark:text-white/85">{name}</h2>
                <div
                    onClick={() => setExpanded(!expanded)}
                    className="mr-auto cursor-pointer select-none rounded-md p-1 text-xl text-black/60 hover:bg-black/10 dark:text-white/60"
                >
                    {expanded ? <RiExpandUpDownFill /> : <RiExpandLeftRightFill />}
                </div>
                {!expanded && (
                    <div className="flex select-none gap-0 text-2xl text-black/60 sm:gap-2 dark:text-white/60">
                        <MdOutlineKeyboardArrowLeft className="cursor-pointer" onClick={() => emblaApi?.scrollPrev()} />
                        <MdOutlineKeyboardArrowRight
                            className="cursor-pointer"
                            onClick={() => emblaApi?.scrollNext()}
                        />
                    </div>
                )}
            </div>
            <div className="overflow-hidden" ref={emblaRef}>
                <div className={`mb-7 flex gap-2 sm:mb-10 sm:gap-3 md:gap-4 ${expanded && 'flex-wrap'}`}>
                    {albums.map((e) => (
                        <Album key={e.id} album={e} />
                    ))}
                </div>
            </div>
        </div>
    )
}
