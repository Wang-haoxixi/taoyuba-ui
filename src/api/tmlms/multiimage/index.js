import request from '@/router/axios'
const prefixUrl = '/tmlms/tybmultiimage' 

export function getImageById (id) {
    return request({
        url: `${prefixUrl}/${id}`,
        method: 'get',
    })
}

export function getImages (relId,type) {
    return request({
      url: `${prefixUrl}/getImages`,
      method: 'get',
      params: {
        relId: relId,
        type: type,
      },
    })
}