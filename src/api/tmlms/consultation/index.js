import request from '@/router/axios'
const prefixUrl = '/tmlms/trainMeet'

export function create (data) {
    return request({
        url: `${prefixUrl}/create`,
        method: 'post',
        data: data,
    })
}

export function page (params) {
    return request({
        url: `${prefixUrl}/page`,
        method: 'get',
        params: params,
    })
}

export function detail (id) {
    return request({
        url: `${prefixUrl}/${id}`,
        method: 'get',
    })
}


export function del (id) {
    return request({
        url: `${prefixUrl}/delete/${id}`,
        method: 'post',
    })
}

export function edit (data) {
    return request({
        url: `${prefixUrl}/edit`,
        method: 'post',
        data: data,
    })
}


export function detailPeople (id) {
    return request({
        url: `/tmlms/trainMeetSign/${id}`,
        method: 'get',
    })
}