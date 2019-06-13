import request from '@/router/axios'
const prefixUrl = '/tmlms/ship_owner'

export function getShipowner (query) {
    return request({
        url: `${prefixUrl}/page`,
        method: 'get',
        params: query,
    })
}
export function saveShipowner (data) {
    return request({
        url: `${prefixUrl}/create?type=1`,
        method: 'post',
        data: data,
    })
}
export function deleteShipowner (id) {
    return request({
        url: `${prefixUrl}/delete?userId=${id}`,
        method: 'post',
    })
}
export function getShipownerDetail (id) {
    return request({
        url: `${prefixUrl}/detail?userId=${id}`,
        method: 'get',
    })
}
export function getAllArea (id) {
    return request({
        url: `admin/region/wholeInfoList?areaCode=${id}`,
        method: 'get',
    })
}
export function editShipowner (data) {
    return request({
        url: `${prefixUrl}/edit?type=1`,
        method: 'post',
        data: data,
    })
}
export function getAllAreaName (id) {
    return request({
        url: `admin/region/wholeInfo?areaCode=${id}`,
        method: 'get',
    })
}
export function statusShipowner (switchs,userId) {
    return request({
        url: `${prefixUrl}/review?status=${switchs}&userId=${userId}`,
        method: 'post',
    })
}