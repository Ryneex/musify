import getTrendingData from '@/services/getTrendingData'
import SongsSlider from './SongsSlider'
import { FiSearch } from 'react-icons/fi'
import Searchbar from './Searchbar'

export default async function page() {
    const data = await getTrendingData()
    return <SongsSlider songs={data.songs ?? []} />
}
