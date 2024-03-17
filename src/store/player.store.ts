import Song from '@/types/song.types'
import { proxy } from 'valtio'
import { devtools } from 'valtio/utils'

const player = proxy({
    currentSong: {} as Song,
    SongList: [] as Song[],
    Playing: false,
    togglePlay() {
        this.Playing = !this.Playing
    },
})
devtools(player, { name: 'player', enabled: true })
export default player
