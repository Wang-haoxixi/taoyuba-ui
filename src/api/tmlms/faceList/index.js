import request from '@/router/axios'

export function getList (query) {
    return request({
        url: '/admin/gather/page',
        method: 'get',
        params: query,
    })
}

export function delList (data) {
    return request({
        url: '/admin/gather/del',
        method: 'post',
        params: data,
    })
}

export function detailFace (id) {
    return request({
        url: `/admin/gather/getById/${id}`,
        method: 'get',
    })
}

export function listPeople (query) {
    return request({
        url: '/tmlms/trainMeetSign/page',
        method: 'get',
        params: query,
    })
}