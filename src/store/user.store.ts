import { proxy } from 'valtio'
import Cookie from 'js-cookie'

const user = proxy({
    theme: null as unknown as 'light' | 'dark',
    toggleTheme() {
        if (Cookie.get('theme') === 'dark') {
            this.theme = 'light'
            Cookie.set('theme', 'light')
            document.querySelector('html')!.className = this.theme
        } else {
            this.theme = 'dark'
            Cookie.set('theme', 'dark')
            document.querySelector('html')!.className = this.theme
        }
    },
})

export default user
