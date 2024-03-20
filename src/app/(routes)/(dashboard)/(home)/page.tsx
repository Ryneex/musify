import getTrendingData from '@/services/getTrendingData'
import SongsSlider from '@/components/SongsSlider'
import AlbumSlider from '@/components/AlbumSlider'

export default async function page() {
    const data = await getTrendingData()
    if (data.success === false)
        return (
            <h1 className="flex h-full items-center justify-center font-medium text-red-400">
                {data.message || 'Something went wrong and no reason was provided'}
            </h1>
        )
    return (
        <div className="overflow-hidden pl-5 pt-5">
            <div className="h-full custom-scrollbar overflow-auto">
                <SongsSlider name="Trending Songs" songs={data.songs} />
                <AlbumSlider name="Albums" albums={data.albums} />
            </div>
        </div>
    )
}
