import request from '@/router/axios'
const prefixUrl = '/tmlms/village'

export function getVillage (query) {
    return request({
        url: `${prefixUrl}/page`,
        method: 'get',
        params: query,
    })
}
export function saveVillage (data,type) {
    return request({
        url: `${prefixUrl}/create?type=${type}`,
        method: 'post',
        data: data,
    })
}
export function deleteVillage (id) {
    return request({
        url: `${prefixUrl}/delete?userId=${id}`,
        method: 'post',
    })
}
export function editVillage (data,type) {
    return request({
        url: `${prefixUrl}/edit?type=${type}`,
        method: 'post',
        data: data,
    })
}
export function detailVillage (id) {
    return request({
        url: `${prefixUrl}/detail?userId=${id}`,
        method: 'get',
    })
}
export function statusVillage (switchs,userId) {
    return request({
        url: `${prefixUrl}/review?status=${switchs}&userId=${userId}`,
        method: 'post',
    })
}