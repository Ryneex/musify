import getTrendingData from '@/services/getTrendingData'
import SongsSlider from './SongsSlider'
import { Input } from '@/components/shadcn/ui/input'
import { FiSearch } from 'react-icons/fi'

export default async function page() {
    const data = await getTrendingData()
    return (
        <div className="flex flex-col gap-4 overflow-auto px-10 py-4">
            <div className="relative">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-black/60 dark:text-white/60" />
                <Input className="max-w-sm rounded-full pl-10" placeholder="Search..." />
            </div>
            <SongsSlider songs={data.songs ?? []} />
        </div>
    )
}
