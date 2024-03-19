import request from '@/config/ky.config'
import { Endpoints } from '@/constants/endpoints'

export default async function getAlbumsbyQuery(query: string) {
    try {
        const data: any = await request
            .get('', {
                searchParams: {
                    __call: Endpoints.search.albums,
                    q: query,
                },
            })
            .json()
        return data.results
    } catch (data) {
        console.log(data)
        return { err: 'Something went wrong when fetching Trending Data' }
    }
}
