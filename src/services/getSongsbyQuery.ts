import request from '@/config/ky.config'

export default async function getSongsbyQuery(query: string) {
    try {
        const data: any = await request
            .get('https://saavn.dev/api/search/songs', {
                searchParams: {
                    query,
                    limit: 1000,
                },
            })
            .json()
        return { success: true, songs: data.data.results }
    } catch (data) {
        return { success: false, message: 'Something went wrong when fetching Trending Data' }
    }
}
