import { util, cipher } from 'node-forge'

export default function decryptUrl(encrypted_media_url: string) {
    const key = '38346591'
    const iv = '00000000'
    const encrypted = util.decode64(encrypted_media_url)
    const decipher = cipher.createDecipher('DES-ECB', util.createBuffer(key))
    decipher.start({ iv: util.createBuffer(iv) })
    decipher.update(util.createBuffer(encrypted))
    decipher.finish()
    const media_url = decipher.output.getBytes()
    return media_url.replace('_96', '_320')
}
