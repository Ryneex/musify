'use client'

import React, { useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md'
import Album from '@/types/album.types'
import { RiExpandLeftRightFill, RiExpandUpDownFill } from 'react-icons/ri'
import { useRouter } from 'next-nprogress-bar'

type Props = {
    albums: Album[] | undefined
    name: string
}

export default function AlbumSlider({ albums = [], name }: Props) {
    const router = useRouter()
    const [expanded, setExpanded] = useState(true)
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: 'start',
        slidesToScroll: 3,
        watchDrag: false,
    })

    // embla carousel gets glitched when we messup with flex-wrap, so we have to reinit it everytime
    useEffect(() => {
        emblaApi?.reInit()
    }, [expanded, emblaApi])
    if (albums.length === 0) return

    return (
        <div className="mr-5 flex-shrink-0 overflow-hidden">
            <div className="mb-4 flex items-center justify-between gap-3">
                <h2 className="text-xl font-bold text-black/80 dark:text-white/85">{name}</h2>
                <div
                    onClick={() => setExpanded(!expanded)}
                    className="mr-auto cursor-pointer select-none rounded-md p-1 text-xl text-black/60 hover:bg-black/10 dark:text-white/60"
                >
                    {expanded ? <RiExpandUpDownFill /> : <RiExpandLeftRightFill />}
                </div>
                {!expanded && (
                    <div className="flex select-none gap-2 text-2xl text-black/60 dark:text-white/60">
                        <MdOutlineKeyboardArrowLeft className="cursor-pointer" onClick={() => emblaApi?.scrollPrev()} />
                        <MdOutlineKeyboardArrowRight
                            className="cursor-pointer"
                            onClick={() => emblaApi?.scrollNext()}
                        />
                    </div>
                )}
            </div>
            <div className="overflow-hidden" ref={emblaRef}>
                <div className={`mb-10 flex gap-4 ${expanded && 'flex-wrap'}`}>
                    {albums.map((e) => (
                        <div
                            key={e.id}
                            className="group relative flex shrink-0 basis-[160px] cursor-pointer flex-col gap-1 overflow-hidden rounded-2xl border border-black/10 bg-black/[0.01] p-3 backdrop-blur-lg transition duration-300 hover:bg-black/[0.08] xl:basis-[200px] dark:border-white/10 dark:bg-white/[0.05] dark:hover:bg-white/[0.08]"
                            onClick={() => router.push(`/album/${e.id}`)}
                        >
                            <div className="relative w-full select-none overflow-hidden rounded-xl">
                                <img
                                    className="aspect-square w-full object-cover"
                                    src={e.image[e.image.length - 1].url || ''}
                                    alt={e?.name}
                                />
                            </div>
                            <span className="truncate px-1 pt-3 text-sm text-black/90 dark:text-white/90">
                                {e.name}
                            </span>
                            {e.artists.primary.length !== 0 && (
                                <span className="truncate pl-1 text-xs text-black/70 dark:text-white/70">
                                    By {e.artists.primary[0].name}
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
