'use server'

import request from '@/config/ky.config'
import { Endpoints } from '@/constants/endpoints'
import { formatSong } from '@/helpers/format.song'
import Song from '@/types/song.types'

const getAlbums = (data: any) => {
    // Retreaving only albums from data array
    const album = data.filter((e: any) => e.type === 'album')
    return album.map(({ details, type }: any) => ({ ...details, type }))
}

const getSongs = (data: any): Song[] => {
    // Retreaving only songs from data array
    const songs = data.filter((e: any) => e.type === 'song')
    return songs.map((e: any) => formatSong(e))
}

export default async function getTrendingData() {
    try {
        const data = await request
            .get('https://www.jiosaavn.com/api.php', {
                searchParams: {
                    __call: Endpoints.trending,
                },
            })
            .json()
        // Trending data returned alot of data for example albums playlists and songs, so we're filtering that data
        // and retreaving only necessary datas like songs and albums, because we don't want album data inside song variable
        const songs = getSongs(data)
        const albums = getAlbums(data)
        return { success: true, songs, albums }
    } catch (data) {
        console.log(data)
        return { success: false, message: 'Something went wrong when fetching Trending Data' }
    }
}
