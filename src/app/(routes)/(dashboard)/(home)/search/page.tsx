import SongsSlider from '@/components/SongsSlider'
import getSongsbyQuery from '@/services/getSongsbyQuery'

export default async function page({ searchParams }: any) {
    const songs = await getSongsbyQuery(searchParams.query)
    return (
        <div className="text-white">
            <SongsSlider name="Songs" songs={songs} />
        </div>
    )
}
