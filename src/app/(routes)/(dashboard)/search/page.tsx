import SongsSlider from '@/components/SongsSlider'
import getAlbumsbyQuery from '@/services/getAlbumsbyQuery'
import getSongsbyQuery from '@/services/getSongsbyQuery'
import AlbumSlider from '@/components/AlbumSlider'

export default async function page({ searchParams }: any) {
    const songsReq = getSongsbyQuery(searchParams.query)
    const albumsReq = getAlbumsbyQuery(searchParams.query)
    const res = await Promise.all([songsReq, albumsReq])
    if (!res[0].success && !res[1].success)
        return (
            <h1 className="flex h-full items-center justify-center font-medium text-red-400">
                Something went wrong and no reason was provided
            </h1>
        )

    return (
        <div className="overflow-hidden pl-5 pt-5">
            <div className="custom-scrollbar h-full overflow-auto">
                <SongsSlider name="Songs" songs={res[0].songs} />
                <AlbumSlider albums={res[1].albums} name="Albums" />
            </div>
        </div>
    )
}
