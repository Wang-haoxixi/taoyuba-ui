import request from '@/router/axios'
const prefixUrl = '/tmlms/crewRegiste'


export function getCrewregisterList (query) {
    return request({
        url: `${prefixUrl}/page`,
        method: 'get',
        params: query,
    })
}
export function getCrewregisterDeatil (idcard) {
    return request({
        url: `${prefixUrl}/details/${idcard}`,
        method: 'get',
        params: idcard,
    })
}
