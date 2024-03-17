import ky from 'ky'

const request = ky.create({
    prefixUrl: 'https://www.jiosaavn.com/api.php',
    method: 'get',
    searchParams: {
        _format: 'json',
    },
    timeout: 30000,
    headers: {
        Cookie: 'L=english',
    },
})

export default request
