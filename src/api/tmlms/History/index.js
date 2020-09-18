import request from '@/router/axios'
const prefixUrl = '/tmlms/visitRecord' 

export function getVisitRecordList (params) {
    return request({
        url: `${prefixUrl}/page`,
        method: 'get',
        params:params,
    })
}
