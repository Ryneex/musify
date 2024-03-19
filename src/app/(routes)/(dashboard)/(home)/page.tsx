import getTrendingData from '@/services/getTrendingData'
import SongsSlider from '@/components/SongsSlider'

export default async function page() {
    const data = await getTrendingData()
    if (data.success === false)
        return (
            <h1 className="flex h-full items-center justify-center font-medium text-red-400">
                {data.message || 'Something went wrong and no reason was provided'}
            </h1>
        )
    return (
        <div>
            <SongsSlider name="Trending Songs" songs={data.songs ?? []} />
            {/* <AlbumSlider albums={data.albums ?? []} name="Albums" /> */}
        </div>
    )
}
