import SongsSlider from '@/components/SongsSlider'
import getAlbumsbyQuery from '@/services/getAlbumsbyQuery'
import getSongsbyQuery from '@/services/getSongsbyQuery'
import AlbumSlider from '@/components/AlbumSlider'

export default async function page({ searchParams }: any) {
    const songs = await getSongsbyQuery(searchParams.query)
    console.log(songs)
    console.log(songs)
    return (
        <div className="text-white">
            <SongsSlider name="Songs" songs={songs ?? []} />
            {/* <AlbumSlider albums={albums ?? []} name="Albums" /> */}
        </div>
    )
}
