import request from '@/router/axios'
const prefixUrl = '/tmlms/tybcrewsyslog' 

export function getPageBy (data) {
    return request({
        url: `${prefixUrl}/statistics`,
        method: 'post',
        data:data,
    })
}
