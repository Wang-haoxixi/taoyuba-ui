import request from '@/router/axios'
const prefixUrl = '/tmlms/tybgov'

export function getGov (query) {
    return request({
        url: `${prefixUrl}/page`,
        method: 'get',
        params: query,
    })
}

export function detailGov (userId) {
    return request({
        url: `${prefixUrl}/${userId}`,
        method: 'get',
    })
}

export function saveGov (data) {
    return request({
        url: `${prefixUrl}/save`,
        method: 'post',
        data: data,
    })
}

export function updateGov (data) {
    return request({
        url: `${prefixUrl}/update`,
        method: 'post',
        data: data,
    })
}

export function delGov (userId) {
    return request({
        url: `${prefixUrl}/del/${userId}`,
        method: 'post',
    })
}