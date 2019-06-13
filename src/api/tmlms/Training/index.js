import request from '@/router/axios'
const prefixUrl = '/tmlms/dept'

export function getTraining (query) {
    return request({
        url: `${prefixUrl}/page`,
        method: 'get',
        params: query,
    })
}
export function saveTraining (data) {
    return request({
        url: `${prefixUrl}/create?type=1`,
        method: 'post',
        data: data,
    })
}
export function deleteTraining (id) {
    return request({
        url: `${prefixUrl}/delete?userId=${id}`,
        method: 'post',
    })
}
export function editTraining (data) {
    return request({
        url: `${prefixUrl}/edit?type=1`,
        method: 'post',
        data: data,
    })
}
export function detailTraining (id) {
    return request({
        url: `${prefixUrl}/detail?userId=${id}`,
        method: 'get',
    })
}