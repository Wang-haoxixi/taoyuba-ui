import request from '@/router/axios'
const prefixUrl = '/tmlms/tybmultiimage' 

export function getImageById (id) {
    return request({
        url: `${prefixUrl}/${id}`,
        method: 'get',
    })
}