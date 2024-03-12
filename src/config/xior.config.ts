import xior from 'xior'

export const request = xior.create({
    baseURL: 'https://apiexampledomian.com/api',
    params: {
        _format: 'json',
    },
    headers: {
        Cookie: 'L=english',
    },
})
