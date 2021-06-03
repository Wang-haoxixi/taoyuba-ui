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

export function selectShip (data) {
    return request({
        url: '/admin/gather/linkShip',
        method: 'post',
        data: data,
    })
}

export function tybpage (query) {
    return request({
        url: '/tmlms/tyb_location_message/page',
        method: 'get',
        params: query,
    })
}

export function editFace (data) {
    return request({
        url: '/admin/gather/update',
        method: 'post',
        data: data,
    })
}

export function getDatabusList (query) {
    return request({
        url: '/tmlms/databus/page',
        method: 'get',
        params: query,
    })
}

export function deleteDatabusList (id) {
    return request({
        url: `/tmlms/databus/delete/${id}`,
        method: 'post',
    })
}

export function createdDatabusList (data) {
    return request({
        url: '/tmlms/databus/create',
        method: 'post',
        data: data,
    })
}

export function editDatabusList (data) {
    return request({
        url: '/tmlms/databus/edit',
        method: 'post',
        data: data,
    })
}

export function databusDetail (id) {
    return request({
        url: `/tmlms/databus/${id}`,
        method: 'get',
    })
}

export function deviceSearch () {
    return request({
        url: '/tmlms/databus/deviceSearch',
        method: 'get',
    })
}

export function sign (data) {
    return request({
        url: '/tmlms/trainMeetSign/addSign',
        method: 'post',
        data: data,
    })
}