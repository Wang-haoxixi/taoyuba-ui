import request from '@/router/axios'
const prefixUrl = '/tmlms/tybrate'

export function saveRate (data) {
    return request({
        url: `${prefixUrl}/save`,
        method: 'post',
        data: data,
    })
}

export function getRate (query) {
    return request({
        url: `${prefixUrl}/page`,
        method: 'get',
        params: query,
    })
}

export function delRate (id) {
    return request({
        url: `${prefixUrl}/del/${id}`,
        method: 'post',
    })
}