import request from '@/router/axios'
const prefixUrl = '/tmlms/village'

export function getVillage (query) {
    return request({
        url: `${prefixUrl}/page`,
        method: 'get',
        params: query,
    })
}
export function getVillageByOrg () {
    return request({
        url: `${prefixUrl}/getVillageByOrg`,
        method: 'get',
        // params: query,
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

export function getVillageShipowner (params) {
    return request({
        url: `${prefixUrl}/page/villageshipowner`,
        method: 'get',
        params: params,
    })
}

export function getVillageShip (params) {
    return request({
        url: `${prefixUrl}/page/villageship`,
        method: 'get',
        params: params,
    })
}

export function getVillageShipList (params) {
    return request({
        url: '/tmlms/tybship/page',
        method: 'get',
        params: params,
    })
}

export function getByVillagename (params) {
    return request({
        url: `${prefixUrl}/getByVillagename`,
        method: 'get',
        params: params,
    })
}