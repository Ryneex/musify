import Song from '@/types/song.types'
import { proxy } from 'valtio'
import { devtools } from 'valtio/utils'

const player = proxy({
    currentSong: {} as Song,
    SongList: [] as Song[],
    Playing: false,
    togglePlay() {
        player.Playing = !player.Playing
    },
    playPrevSong() {
        const currentSongIndex = this.SongList.findIndex((song) => song.id === this.currentSong.id)
        //We want to play the last song if currentSong is the first song
        if (currentSongIndex === 0) {
            this.currentSong = this.SongList[this.SongList.length - 1]
            return
        }
        this.currentSong = this.SongList[currentSongIndex - 1]
    },
    playNextSong() {
        const currentSongIndex = this.SongList.findIndex((song) => song.id === this.currentSong.id)
        //We want to play the first song if currentSong is the last song
        if (currentSongIndex === this.SongList.length - 1) {
            this.currentSong = this.SongList[0]
            return
        }
        this.currentSong = this.SongList[currentSongIndex + 1]
    },
})
devtools(player, { name: 'player', enabled: true })
export default player
