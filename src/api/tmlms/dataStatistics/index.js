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