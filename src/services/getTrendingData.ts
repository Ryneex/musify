'use server'

import request from '@/config/ky.config'
import decryptUrl from '@/helpers/decryptUrl'
import Song from '@/types/song.types'
import ky from 'ky'

const getAlbums = (data: any) => {
    // Retreaving only albums from data array
    const album = data.filter((e: any) => e.type === 'album')
    return album.map(({ details, type }: any) => ({ ...details, type }))
}

const getSongs = (data: any): Song[] => {
    // Retreaving only songs from data array
    const songs = data.filter((e: any) => e.type === 'song')
    return songs.map(({ details, type }: any) => {
        const download_url = decryptUrl(details.encrypted_media_url)
        return { ...details, type, download_url }
    })
}

export default async function getTrendingData() {
    try {
        const data = await request
            .get('', {
                searchParams: {
                    __call: 'content.getTrending',
                },
            })
            .json()
        // Trending data returned alot of data for example albums playlists and songs, so we're filtering that data
        // and retreaving only necessary datas like songs and albums, because we don't want album data inside song variable
        const songs = getSongs(data)
        const albums = getAlbums(data)
        return { songs, albums }
    } catch (data) {
        console.log(data)
        return { err: 'Something went wrong when fetching Trending Data' }
    }
}
