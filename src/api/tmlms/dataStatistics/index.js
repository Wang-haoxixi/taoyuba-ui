import request from '@/router/axios'
const prefixUrl = '/tmlms/statistic'

export function getCertTitleNum (query) {
    return request({
        url: `${prefixUrl}/certTitle`,
        method: 'get',
        params: query,
    })
}
export function getPositionInfor (positionId) {
    return request({
        url: `${prefixUrl}/position?positionId=${positionId}`,
        method: 'get',
        params: positionId,
    })
}

export function getPositionInforByOrgID (params) {
    return request({
        url: `${prefixUrl}/positionOrgRelation`,
        method: 'get',
        params: params,
    })
}

export function getCrewByOrg (orgId) {
    return request({
        url: `${prefixUrl}/crewOrgRelation?orgRelationId=${orgId}`,
        method: 'get',
        params: orgId,
    })
}
export function getCountCrew (orgId) {
    return request({
        url: `${prefixUrl}/countOrgRelationCrew?orgRelationId=${orgId}`,
        method: 'get',
        params: orgId,
    })
}

export function getVillage (params) {
    return request({
        url: '/tmlms/orgRelation/village_page',
        method: 'get',
        params: params,
    })
}

export function getCrewOrgRelationVillage (params) {
    return request({
        url: `${prefixUrl}/crewOrgRelationVillage`,
        method: 'get',
        params: params,
    })
}

export function getCountCrewVillage (params) {
    return request({
        url: `${prefixUrl}/vi_countOrgRelationCrew`,
        method: 'get',
        params: params,
    })
}

export function getPositionInforVillage  (params) {
    return request({
        url: `${prefixUrl}/positionOrgRelationVillage`,
        method: 'get',
        params: params,
    })
}
export function getShipCount  (params) {
    return request({
        url: `${prefixUrl}/shipCount`,
        method: 'get',
        params: params,
    })
}
export function getShipCountVillage  (params) {
    return request({
        url: `${prefixUrl}/shipCountVillage`,
        method: 'get',
        params: params,
    })
}