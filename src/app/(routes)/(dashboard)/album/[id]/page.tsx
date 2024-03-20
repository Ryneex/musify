import SongsSlider from '@/components/SongsSlider'
import getAlbumsDetails from '@/services/getAlbumDetails'
import SongsTable from './SongsTable'

export default async function page({ params }: any) {
    const { success, album } = await getAlbumsDetails(params.id)
    if (!success) return
    return (
        <div className="overflow-hidden pl-5 pt-5">
            <div className="h-full overflow-hidden">
                <div className="mb-10 flex gap-5">
                    <div className="aspect-square h-40 overflow-hidden rounded-lg">
                        <img
                            src={Array.isArray(album?.image) ? album?.image[album?.image.length - 1].url : ''}
                            alt=""
                        />
                    </div>
                    <div className="flex flex-col justify-center">
                        <span className="text-black/80 dark:text-white/80">{album?.type}</span>
                        <h1 className="text-4xl font-bold">{album?.name}</h1>
                        <span className="text-black/80 text-sm dark:text-white/80 mt-2">
                            {Array.isArray(album?.artists.primary) ? 'by ' + album?.artists.primary[0].name : ''},{' '}
                            {album?.songCount} songs - {album?.year}
                        </span>
                    </div>
                </div>
                <SongsTable songs={album?.songs} />
            </div>
        </div>
    )
}
