import Song from '@/types/song.types'
import { proxy } from 'valtio'
import { devtools } from 'valtio/utils'

const player = proxy({
    currentSong: {} as Song,
    SongList: [] as Song[],
    Playing: false,
    Loaded: false,
    togglePlay() {
        player.Playing = !player.Playing
    },
    playPrevSong() {
        for (let i = 0; i < this.SongList.length; i++) {
            if (this.currentSong.id === this.SongList[0].id) this.currentSong = this.SongList[this.SongList.length - 1]
            if (this.SongList[i].id === this.currentSong.id) {
                this.currentSong = this.SongList[i - 1]
                break
            }
        }
    },
    playNextSong() {
        this.Playing = false
        for (let i = 0; i < this.SongList.length; i++) {
            if (this.currentSong.id === this.SongList[this.SongList.length - 1].id) this.currentSong = this.SongList[0]
            if (this.SongList[i].id === this.currentSong.id) {
                this.currentSong = this.SongList[i + 1]
                break
            }
        }
    },
})
devtools(player, { name: 'player', enabled: true })
export default player
