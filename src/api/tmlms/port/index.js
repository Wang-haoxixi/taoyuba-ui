import request from '@/router/axios'
const prefixUrl = '/tmlms/tyb_location_port'

export function fetchList (query) {
    return request({
        url: `${prefixUrl}/page`,
        method: 'get',
        params: query,
    })
}
export function putObj (data) {
    return request({
        url: `${prefixUrl}/saveOrUpdate`,
        method: 'post',
        data: data,
    })
}
export function delObj (id) {
    return request({
        url: `${prefixUrl}/delete`,
        method: 'post',
        data: [
            id,
        ],
           
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