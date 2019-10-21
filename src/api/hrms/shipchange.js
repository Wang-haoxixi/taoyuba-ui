import request from '@/router/axios'
const prefixUrl = '/tybship/tybshipchange'

export function getShipChange (query) {
    return request({
        url: `${prefixUrl}/page`,
        method: 'get',
        params: query,
    })
}
export function saveShipChange (data) {
    return request({
        url: `${prefixUrl}/save`,
        method: 'post',
        data: data,
    })
}
export function deleteShipChange (id) {
    return request({
        url: `${prefixUrl}/del/${id}`,
        method: 'post',
    })
}
export function editShipChange (data) {
    return request({
        url: `${prefixUrl}/update`,
        method: 'post',
        data: data,
    })
}
export function detailShipChange (id) {
    return request({
        url: `${prefixUrl}/${id}`,
        method: 'get',
    })
}
export function reviewShipChange (params) {
    return request({
        url: `${prefixUrl}/review`,
        method: 'post',
        params: params,
    })
}