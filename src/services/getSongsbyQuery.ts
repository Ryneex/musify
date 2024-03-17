import request from '@/config/ky.config'
import { Endpoints } from '@/constants/endpoints'

export default async function getTrendingData() {
    try {
        const data = await request
            .get('', {
                searchParams: {
                    __call: Endpoints.search.songs,
                },
            })
            .json()
        console.log(data)
        return data
    } catch (data) {
        console.log(data)
        return { err: 'Something went wrong when fetching Trending Data' }
    }
}
