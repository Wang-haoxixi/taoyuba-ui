import request from '@/router/axios'
const prefixUrl = '/tmlms/orgRelation'

export function getPage (query) {
    return request({
        url: `${prefixUrl}/getPage`,
        method: 'get',
        params: query,
    })
}

export function getPageById (id) {
    return request({
        url: `${prefixUrl}/${id}`,
        method: 'get',
    })
}

export function createPage (query) {
    return request({
        url: `${prefixUrl}/create`,
        method: 'post',
        data: query,
    })
}

export function updatePage (query) {
    return request({
        url: `${prefixUrl}/edit`,
        method: 'post',
        data: query,
    })
}

export function removePage (id) {
    return request({
        url: `${prefixUrl}/remove/${id}`,
        method: 'post',
    })
}