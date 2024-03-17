import getTrendingData from '@/services/getTrendingData'
import SongsSlider from '@/components/SongsSlider'

export default async function page() {
    const data = await getTrendingData()
    return (
        <div>
            <SongsSlider name="Trending Songs" songs={data.songs ?? []} />
        </div>
    )
}
