import request from '@/config/ky.config'
import { Endpoints } from '@/constants/endpoints'
import { formatAlbum } from '@/helpers/format.album'

export default async function getAlbumsDetails(id: string) {
    try {
        const res: any = await request
            .get('https://www.jiosaavn.com/api.php', {
                searchParams: {
                    __call: Endpoints.albums.id,
                    albumid: id,
                    limit: 1000,
                },
            })
            .json()
        return { success: true, album: formatAlbum(res) }
    } catch (data) {
        return { success: false, message: 'Something went wrong when fetching Album Queries' }
    }
}
