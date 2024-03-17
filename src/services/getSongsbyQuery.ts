import request from '@/config/ky.config'
import { Endpoints } from '@/constants/endpoints'
import decryptUrl from '@/helpers/decryptUrl'
import Song from '@/types/song.types'

export default async function getSongsbyQuery(query: string) {
    try {
        const data: any = await request
            .get('', {
                searchParams: {
                    __call: Endpoints.search.songs,
                    q: query,
                },
            })
            .json()
        const songs = data.results.map((song: Song) => {
            const download_url = decryptUrl(song.encrypted_media_url)
            return { ...song, type: 'song', download_url }
        })
        return songs
    } catch (data) {
        console.log(data)
        return { err: 'Something went wrong when fetching Trending Data' }
    }
}
