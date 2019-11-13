import request from '@/router/axios'
const prefixUrl = '/tmlms/tybcertapply' 

export function getCertPage (params) {
    return request({
        url: `${prefixUrl}/page`,
        method: 'get',
        params: params,
    })
}

export function getCertDetail (id) {
    return request({
        url: `${prefixUrl}/${id}`,
        method: 'get',
    })
}