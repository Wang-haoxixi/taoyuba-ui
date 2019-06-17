import request from '@/router/axios'
const prefixUrl = '/tmlms/agent'

export function getAgent (query) {
    return request({
        url: `${prefixUrl}/getPage`,
        method: 'get',
        params: query,
    })
}
export function saveAgent (data,type) {
    return request({
        url: `${prefixUrl}/create?type=${type}`,
        method: 'post',
        data: data,
    })
}
export function deleteAgent (id) {
    return request({
        url: `${prefixUrl}/remove?userId=${id}`,
        method: 'post',
    })
}
export function detailAgent (id) {
    return request({
        url: `${prefixUrl}/detail?userId=${id}`,
        method: 'get',
    })
}
export function editAgent (data,type) {
    return request({
        url: `${prefixUrl}/edit?type=${type}`,
        method: 'post',
        data: data,
    })
}
export function statusAgent (switchs,userId) {
    return request({
        url: `${prefixUrl}/review?status=${switchs}&userId=${userId}`,
        method: 'post',
    })
}